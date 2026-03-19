'use client';

import { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { useAnalytics } from '@/lib/analytics/use-analytics';
import { formatDuration } from '@/lib/seo/metadata';
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  SkipBack,
  SkipForward,
  Maximize2,
} from 'lucide-react';

interface MediaPlayerProps {
  audioUrl: string;
  videoUrl?: string;
  episodeId: string;
  episodeSlug: string;
  title: string;
  coverImageUrl?: string;
  duration: number;
  initialTime?: number;
  onTimeUpdate?: (time: number) => void;
  className?: string;
}

export function MediaPlayerWrapper({
  audioUrl,
  episodeId,
  episodeSlug,
  title,
  duration,
  initialTime = 0,
  onTimeUpdate,
  className,
}: MediaPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(initialTime);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const { trackPodcastPlay } = useAnalytics();

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
      onTimeUpdate?.(audio.currentTime);
    };

    const handleEnded = () => {
      setIsPlaying(false);
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [onTimeUpdate]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
      trackPodcastPlay(episodeId, episodeSlug, 'inline_player', audio.currentTime);
    }
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (value: number[]) => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = value[0];
    setCurrentTime(value[0]);
  };

  const handleVolumeChange = (value: number[]) => {
    const audio = audioRef.current;
    if (!audio) return;
    const newVolume = value[0];
    audio.volume = newVolume;
    setVolume(newVolume);
    setIsMuted(newVolume === 0);
  };

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;
    
    if (isMuted) {
      audio.volume = volume || 1;
      setIsMuted(false);
    } else {
      audio.volume = 0;
      setIsMuted(true);
    }
  };

  const skip = (seconds: number) => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = Math.max(0, Math.min(duration, audio.currentTime + seconds));
  };

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className={cn('rounded-lg bg-card p-4', className)}>
      <audio ref={audioRef} src={audioUrl} preload="metadata" />
      
      {/* Title */}
      <p className="mb-3 truncate text-sm font-medium text-card-foreground">{title}</p>
      
      {/* Progress bar */}
      <div className="mb-3">
        <Slider
          value={[currentTime]}
          min={0}
          max={duration}
          step={1}
          onValueChange={handleSeek}
          aria-label="Playback progress"
          className="cursor-pointer"
        />
        <div className="mt-1 flex justify-between text-xs text-muted-foreground">
          <span>{formatDuration(Math.floor(currentTime))}</span>
          <span>{formatDuration(duration)}</span>
        </div>
      </div>
      
      {/* Controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => skip(-15)}
            aria-label="Skip back 15 seconds"
            className="h-9 w-9"
          >
            <SkipBack className="h-4 w-4" />
          </Button>
          
          <Button
            variant="default"
            size="icon"
            onClick={togglePlay}
            aria-label={isPlaying ? 'Pause' : 'Play'}
            className="h-10 w-10"
          >
            {isPlaying ? (
              <Pause className="h-5 w-5" />
            ) : (
              <Play className="h-5 w-5 translate-x-0.5" />
            )}
          </Button>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={() => skip(30)}
            aria-label="Skip forward 30 seconds"
            className="h-9 w-9"
          >
            <SkipForward className="h-4 w-4" />
          </Button>
        </div>
        
        {/* Volume control */}
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleMute}
            aria-label={isMuted ? 'Unmute' : 'Mute'}
            className="h-8 w-8"
          >
            {isMuted ? (
              <VolumeX className="h-4 w-4" />
            ) : (
              <Volume2 className="h-4 w-4" />
            )}
          </Button>
          <Slider
            value={[isMuted ? 0 : volume]}
            min={0}
            max={1}
            step={0.1}
            onValueChange={handleVolumeChange}
            aria-label="Volume"
            className="w-20"
          />
        </div>
      </div>
    </div>
  );
}

interface VideoPlayerProps {
  videoUrl: string;
  episodeId: string;
  episodeSlug: string;
  title: string;
  className?: string;
}

export function VideoPlayer({
  videoUrl,
  episodeId,
  episodeSlug,
  title,
  className,
}: VideoPlayerProps) {
  const { trackVideoPlayClick } = useAnalytics();

  // For external video URLs (YouTube, etc.), show a link
  const isYouTube = videoUrl.includes('youtube.com') || videoUrl.includes('youtu.be');

  const handleClick = () => {
    trackVideoPlayClick(episodeId, episodeSlug, isYouTube ? 'youtube' : undefined);
  };

  if (isYouTube) {
    return (
      <a
        href={videoUrl}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleClick}
        className={cn(
          'group flex items-center gap-3 rounded-lg border border-border bg-card p-4 transition-colors hover:bg-secondary',
          className
        )}
      >
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-600 text-white">
          <Play className="h-5 w-5 translate-x-0.5" />
        </div>
        <div>
          <p className="font-medium text-card-foreground group-hover:text-primary">
            Watch on YouTube
          </p>
          <p className="text-sm text-muted-foreground">{title}</p>
        </div>
        <Maximize2 className="ml-auto h-4 w-4 text-muted-foreground" />
      </a>
    );
  }

  return null;
}
