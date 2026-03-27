'use client';

import { createContext, useContext, useState, useCallback, useMemo } from 'react';
import type { SoundscapeState } from '@/lib/audio/gradient-engine';

interface SoundscapeContextValue {
    state: SoundscapeState;
    setPlaying: (playing: boolean) => void;
    setProgress: (progress: number) => void;
    setChapter: (index: number) => void;
    setTopicColors: (colors: string[]) => void;
}

const defaultState: SoundscapeState = {
    isPlaying: false,
    progress: 0,
    energy: 0,
    chapterIndex: 0,
    topicColors: [],
};

const SoundscapeContext = createContext<SoundscapeContextValue | null>(null);

export function SoundscapeProvider({ children }: { children: React.ReactNode }) {
    const [state, setState] = useState<SoundscapeState>(defaultState);

    const setPlaying = useCallback((playing: boolean) => {
        setState((prev) => ({
            ...prev,
            isPlaying: playing,
            energy: playing ? 0.6 : 0,
        }));
    }, []);

    const setProgress = useCallback((progress: number) => {
        setState((prev) => ({ ...prev, progress }));
    }, []);

    const setChapter = useCallback((index: number) => {
        setState((prev) => ({ ...prev, chapterIndex: index }));
    }, []);

    const setTopicColors = useCallback((colors: string[]) => {
        setState((prev) => ({ ...prev, topicColors: colors }));
    }, []);

    const value = useMemo(
        () => ({ state, setPlaying, setProgress, setChapter, setTopicColors }),
        [state, setPlaying, setProgress, setChapter, setTopicColors]
    );

    return (
        <SoundscapeContext.Provider value={value}>
            {children}
        </SoundscapeContext.Provider>
    );
}

export function useSoundscape() {
    const ctx = useContext(SoundscapeContext);
    if (!ctx) {
        // Return a no-op version when used outside provider (e.g., non-episode pages)
        return {
            state: defaultState,
            setPlaying: () => { },
            setProgress: () => { },
            setChapter: () => { },
            setTopicColors: () => { },
        };
    }
    return ctx;
}
