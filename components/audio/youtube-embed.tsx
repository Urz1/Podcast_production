'use client';

import { useRef, useEffect, useCallback, useState } from 'react';
import { cn } from '@/lib/utils';
import { useSoundscape } from '@/components/audio/soundscape-provider';
import { Play } from 'lucide-react';
import Image from 'next/image';

interface YouTubeEmbedProps {
    videoUrl: string;
    episodeId: string;
    episodeSlug: string;
    title: string;
    coverImageUrl?: string;
    duration?: number;
    chapters?: { timestamp: number }[];
    className?: string;
}

// Extract YouTube video ID from various URL formats
function extractVideoId(url: string): string | null {
    const patterns = [
        /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/,
        /youtube\.com\/v\/([a-zA-Z0-9_-]{11})/,
    ];
    for (const pattern of patterns) {
        const match = url.match(pattern);
        if (match) return match[1];
    }
    return null;
}

// YouTube IFrame API types
declare global {
    interface Window {
        YT?: {
            Player: new (
                element: HTMLElement | string,
                config: {
                    videoId: string;
                    playerVars?: Record<string, unknown>;
                    events?: Record<string, (event: YTEvent) => void>;
                }
            ) => YTPlayer;
            PlayerState: {
                PLAYING: number;
                PAUSED: number;
                ENDED: number;
                BUFFERING: number;
            };
        };
        onYouTubeIframeAPIReady?: () => void;
    }
}

interface YTEvent {
    data: number;
    target: YTPlayer;
}

interface YTPlayer {
    destroy: () => void;
    getCurrentTime: () => number;
    getDuration: () => number;
    getPlayerState: () => number;
}

// Load YouTube IFrame API script once
let apiLoaded = false;
let apiPromise: Promise<void> | null = null;

function loadYouTubeAPI(): Promise<void> {
    if (apiLoaded && window.YT) return Promise.resolve();
    if (apiPromise) return apiPromise;

    apiPromise = new Promise<void>((resolve) => {
        if (window.YT) {
            apiLoaded = true;
            resolve();
            return;
        }

        window.onYouTubeIframeAPIReady = () => {
            apiLoaded = true;
            resolve();
        };

        const script = document.createElement('script');
        script.src = 'https://www.youtube.com/iframe_api';
        script.async = true;
        document.head.appendChild(script);
    });

    return apiPromise;
}

export function YouTubeEmbed({
    videoUrl,
    episodeId,
    title,
    coverImageUrl,
    duration,
    chapters = [],
    className,
}: YouTubeEmbedProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const playerRef = useRef<YTPlayer | null>(null);
    const timerRef = useRef<ReturnType<typeof setInterval> | undefined>(undefined);
    const { setPlaying, setProgress, setChapter } = useSoundscape();
    const [isReady, setIsReady] = useState(false);
    const [showCover, setShowCover] = useState(true);

    const videoId = extractVideoId(videoUrl);

    // Find which chapter we're in based on current time
    const findChapterIndex = useCallback(
        (time: number) => {
            if (chapters.length === 0) return 0;
            for (let i = chapters.length - 1; i >= 0; i--) {
                if (time >= chapters[i].timestamp) return i;
            }
            return 0;
        },
        [chapters]
    );

    // Poll current time and update soundscape
    const startProgressPolling = useCallback(() => {
        if (timerRef.current) clearInterval(timerRef.current);

        timerRef.current = setInterval(() => {
            if (!playerRef.current) return;
            try {
                const currentTime = playerRef.current.getCurrentTime();
                const totalDuration = duration || playerRef.current.getDuration() || 1;
                const progress = currentTime / totalDuration;

                setProgress(progress);
                setChapter(findChapterIndex(currentTime));
            } catch {
                // Player may not be ready
            }
        }, 500); // Poll at 2Hz — enough for chapter detection + progress
    }, [duration, setProgress, setChapter, findChapterIndex]);

    const stopProgressPolling = useCallback(() => {
        if (timerRef.current) {
            clearInterval(timerRef.current);
            timerRef.current = undefined;
        }
    }, []);

    // Initialize YouTube player
    const initPlayer = useCallback(async () => {
        if (!videoId || !containerRef.current) return;

        await loadYouTubeAPI();
        if (!window.YT) return;

        // Create a target div for the player by first clearing the container (vital for React Strict Mode & client navigation)
        containerRef.current.innerHTML = '';
        const targetId = `yt-player-${episodeId}`;
        const target = document.createElement('div');
        target.id = targetId;
        target.className = 'absolute inset-0 w-full h-full';
        containerRef.current.appendChild(target);

        playerRef.current = new window.YT.Player(targetId, {
            videoId,
            width: '100%',
            height: '100%',
            playerVars: {
                modestbranding: 1,
                rel: 0,
                playsinline: 1,
                origin: window.location.origin,
            },
            events: {
                onReady: () => {
                    setIsReady(true);
                },
                onStateChange: (event: YTEvent) => {
                    if (!window.YT) return;

                    switch (event.data) {
                        case window.YT.PlayerState.PLAYING:
                            setPlaying(true);
                            setShowCover(false);
                            startProgressPolling();
                            break;
                        case window.YT.PlayerState.PAUSED:
                            setPlaying(false);
                            stopProgressPolling();
                            break;
                        case window.YT.PlayerState.ENDED:
                            setPlaying(false);
                            stopProgressPolling();
                            break;
                        case window.YT.PlayerState.BUFFERING:
                            // Keep current state during buffering
                            break;
                    }
                },
            },
        });
    }, [videoId, episodeId, setPlaying, startProgressPolling, stopProgressPolling]);

    useEffect(() => {
        initPlayer();

        return () => {
            stopProgressPolling();
            if (playerRef.current) {
                try {
                    playerRef.current.destroy();
                } catch {
                    // Ignore cleanup errors
                }
            }
            setPlaying(false);
        };
    }, [initPlayer, stopProgressPolling, setPlaying]);

    if (!videoId) {
        return (
            <div className={cn('rounded-2xl border border-border bg-muted p-8 text-center', className)}>
                <p className="text-muted-foreground">Video unavailable</p>
            </div>
        );
    }

    return (
        <div
            className={cn(
                'group relative overflow-hidden rounded-2xl border border-border/50 bg-card shadow-2xl shadow-primary/5',
                className
            )}
        >
            {/* Cover image shown before play */}
            {showCover && coverImageUrl && (
                <div className="absolute inset-0 z-10 pointer-events-none">
                    <Image
                        src={coverImageUrl}
                        alt=""
                        fill
                        className="object-cover transition-opacity duration-700"
                        style={{ opacity: showCover ? 1 : 0 }}
                        sizes="(max-width: 1024px) 100vw, 66vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent" />
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-background/60 text-foreground shadow-2xl backdrop-blur-md border border-white/10 transition-transform duration-300 group-hover:scale-110">
                            <Play className="h-7 w-7 translate-x-0.5 fill-current" />
                        </div>
                    </div>
                </div>
            )}

            {/* YouTube embed container */}
            <div
                ref={containerRef}
                className="relative aspect-video w-full"
            />

            {/* Loading state */}
            {!isReady && (
                <div className="absolute inset-0 flex items-center justify-center bg-card z-0">
                    <div className="flex flex-col items-center gap-3">
                        <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                        <p className="text-sm text-muted-foreground">Loading player...</p>
                    </div>
                </div>
            )}
        </div>
    );
}
