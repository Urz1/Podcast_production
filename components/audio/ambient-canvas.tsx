'use client';

import { useRef, useEffect, useCallback } from 'react';
import { useTheme } from 'next-themes';
import { useSoundscape } from '@/components/audio/soundscape-provider';
import {
    createBlobs,
    updateBlobs,
    renderToCanvas,
    interpolatePalette,
    DEFAULT_CONFIG,
    type Blob,
    type EngineConfig,
} from '@/lib/audio/gradient-engine';

interface AmbientCanvasProps {
    /** Topic colors to seed the palette */
    topicColors?: string[];
    /** Override opacity (0..1) */
    opacity?: number;
    /** Custom engine config overrides */
    config?: Partial<EngineConfig>;
    /** CSS class for the wrapper */
    className?: string;
}

export function AmbientCanvas({
    topicColors = [],
    opacity,
    config: configOverrides,
    className,
}: AmbientCanvasProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const blobsRef = useRef<Blob[] | null>(null);
    const rafRef = useRef<number>(0);
    const prevColorsRef = useRef<string[]>([]);
    const { state } = useSoundscape();
    const { resolvedTheme } = useTheme();

    // Merge config
    const config: EngineConfig = {
        ...DEFAULT_CONFIG,
        ...configOverrides,
        globalOpacity: opacity ?? configOverrides?.globalOpacity ?? DEFAULT_CONFIG.globalOpacity,
    };

    // Check reduced motion preference
    const prefersReducedMotion =
        typeof window !== 'undefined' &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Initialize blobs
    const ensureBlobs = useCallback(() => {
        if (!blobsRef.current) {
            blobsRef.current = createBlobs(config, topicColors);
            prevColorsRef.current = topicColors;
        }
        return blobsRef.current;
    }, [config, topicColors]);

    // Handle canvas resize
    const resizeCanvas = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const dpr = Math.min(window.devicePixelRatio || 1, 2); // Cap at 2x for performance
        const rect = canvas.getBoundingClientRect();

        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;

        const ctx = canvas.getContext('2d');
        if (ctx) ctx.scale(dpr, dpr);
    }, []);

    useEffect(() => {
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);
        return () => window.removeEventListener('resize', resizeCanvas);
    }, [resizeCanvas]);

    // Smoothly transition palette when topic colors change
    useEffect(() => {
        const blobs = blobsRef.current;
        if (!blobs || topicColors.length === 0) return;

        // Only transition if colors actually changed
        const colorsChanged =
            topicColors.length !== prevColorsRef.current.length ||
            topicColors.some((c, i) => c !== prevColorsRef.current[i]);

        if (colorsChanged) {
            prevColorsRef.current = topicColors;
            // Gradual interpolation over several frames (handled in render loop)
        }
    }, [topicColors]);

    // Main render loop
    useEffect(() => {
        if (prefersReducedMotion) {
            // Render a single static frame
            const canvas = canvasRef.current;
            if (!canvas) return;
            const ctx = canvas.getContext('2d');
            if (!ctx) return;

            const blobs = ensureBlobs();
            const rect = canvas.getBoundingClientRect();
            renderToCanvas(ctx, rect.width, rect.height, blobs, state, config, resolvedTheme === 'dark');
            return;
        }

        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let lastTime: number | null = null;

        const animate = (timestamp: number) => {
            if (lastTime === null) lastTime = timestamp;
            const deltaTime = timestamp - lastTime;
            lastTime = timestamp;

            const blobs = ensureBlobs();
            const rect = canvas.getBoundingClientRect();

            // If topic colors changed, smoothly interpolate
            if (topicColors.length > 0) {
                interpolatePalette(blobs, topicColors, 0.02); // Slow lerp each frame
            }

            // Update blob positions based on noise + playback state using deltaTime
            updateBlobs(blobs, deltaTime, state, config);

            // Render
            renderToCanvas(ctx, rect.width, rect.height, blobs, state, config, resolvedTheme === 'dark');

            rafRef.current = requestAnimationFrame(animate);
        };

        rafRef.current = requestAnimationFrame(animate);

        return () => {
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
        };
    }, [state, resolvedTheme, prefersReducedMotion, ensureBlobs, topicColors, config]);

    return (
        <canvas
            ref={canvasRef}
            aria-hidden="true"
            className={className}
            style={{
                position: 'fixed',
                inset: 0,
                width: '100%',
                height: '100%',
                zIndex: 0,
                pointerEvents: 'none',
                // Ensure it stays behind everything
                isolation: 'isolate',
            }}
        />
    );
}
