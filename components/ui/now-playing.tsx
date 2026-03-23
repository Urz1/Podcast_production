'use client';

import { motion } from 'framer-motion';
import { Play, Pause, SkipForward, Clock } from 'lucide-react';
import { useState, useEffect } from 'react';
import Image from 'next/image';

interface NowPlayingProps {
  title?: string;
  episodeNumber?: number;
  coverImage?: string;
}

export function NowPlaying({
  title = "Building Foundations That Last",
  episodeNumber = 42,
  coverImage = "/images/podcast-cover.jpg",
}: NowPlayingProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Fade in player slightly after initial load to look deliberate
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 200, damping: 25 }}
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-[500px]"
    >
      <div className="relative overflow-hidden rounded-full border border-white/10 bg-background/60 shadow-2xl backdrop-blur-2xl">
        {/* Glow effect behind player */}
        <div className="absolute inset-0 z-0 bg-gradient-to-r from-primary/10 via-transparent to-accent/5" />
        
        <div className="relative z-10 flex items-center justify-between p-2 pr-6">
          <div className="flex items-center gap-3">
            {/* Spinning/Pulsing CD Cover */}
            <motion.div 
              animate={{ rotate: isPlaying ? 360 : 0 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              className="relative h-12 w-12 overflow-hidden rounded-full border border-white/5 bg-muted shadow-inner"
            >
              <Image 
                src={coverImage} 
                alt="Now Playing" 
                fill 
                className="object-cover"
                sizes="48px"
              />
              <div className="absolute inset-0 rounded-full border shadow-inner pointer-events-none border-white/10" />
              {/* Record inner hole */}
              <div className="absolute top-1/2 left-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/20 bg-background/80" />
            </motion.div>

            {/* Track Info */}
            <div className="flex flex-col min-w-0">
              <span className="text-[10px] font-bold uppercase tracking-widest text-primary">
                Ep. {episodeNumber}
              </span>
              <p className="truncate text-sm font-medium text-foreground w-[150px] sm:w-[200px]">
                {title}
              </p>
            </div>
          </div>

          {/* Controls & Equalizer */}
          <div className="flex items-center gap-5">
            {/* Equalizer Bars */}
            <div className="hidden sm:flex items-end gap-[2px] h-4">
              {[...Array(4)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={{ 
                    height: isPlaying 
                      ? ['4px', `${Math.random() * 12 + 4}px`, '4px'] 
                      : '4px' 
                  }}
                  transition={{
                    duration: 0.5 + Math.random() * 0.5,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="w-[3px] rounded-full bg-accent/80"
                />
              ))}
            </div>

            <button 
              onClick={() => setIsPlaying(!isPlaying)}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-foreground text-background transition-transform hover:scale-105 active:scale-95"
            >
              {isPlaying ? (
                <Pause className="h-4 w-4 fill-current" />
              ) : (
                <Play className="h-4 w-4 translate-x-0.5 fill-current" />
              )}
            </button>
          </div>
        </div>

        {/* Progress Bar overlay */}
        <div className="absolute bottom-0 left-0 h-[2px] w-full bg-white/5">
          <motion.div 
            animate={{ width: isPlaying ? '100%' : '5%' }}
            transition={{ duration: 60 * 30, ease: "linear" }} // 30 minutes fake progress
            className="h-full bg-primary"
          />
        </div>
      </div>
    </motion.div>
  );
}