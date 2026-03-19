'use client';

import Image from 'next/image';
import { useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { motion, useMotionValue, useSpring, useTransform, useAnimationFrame } from 'framer-motion';

interface DepthHeroVisualProps {
  imageUrl: string;
  title: string;
  episodeNumber: number;
  className?: string;
}

export function DepthHeroVisual({
  imageUrl,
  title,
  episodeNumber,
  className,
}: DepthHeroVisualProps) {
  const ref = useRef<HTMLDivElement>(null);

  // Mouse tracking values
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  // Smooth springs for rotation
  const springX = useSpring(mouseX, { stiffness: 150, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 150, damping: 20 });
  
  // Transform to 3D rotation
  const rotateX = useTransform(springY, [0, 1], [15, -15]);
  const rotateY = useTransform(springX, [0, 1], [-15, 15]);

  // Ambient float
  const floatY = useMotionValue(0);
  const floatSpring = useSpring(floatY, { stiffness: 20, damping: 10 });
  
  useAnimationFrame((time) => {
    // Subtle breathing/floating effect (sin wave)
    floatY.set(Math.sin(time / 2000) * 8);
  });

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const px = Math.max(0, Math.min(1, (event.clientX - rect.left) / rect.width));
    const py = Math.max(0, Math.min(1, (event.clientY - rect.top) / rect.height));

    mouseX.set(px);
    mouseY.set(py);
  };

  const handleMouseLeave = () => {
    mouseX.set(0.5);
    mouseY.set(0.5);
  };

  return (
    <div className={cn('relative mx-auto w-full max-w-md perspective-1000', className)}>
      {/* Ambient background glows */}
      <motion.div 
        animate={{ 
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.5, 0.3],
          rotate: [0, 90, 0]
        }}
        transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
        className="absolute -inset-10 rounded-full bg-primary/20 blur-[80px]" 
        aria-hidden="true" 
      />
      <motion.div 
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.3, 0.1],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -right-8 -top-8 h-40 w-40 rounded-full bg-accent/20 blur-[60px]" 
        aria-hidden="true" 
      />
      
      {/* Main interactive 3D card */}
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ 
          rotateX, 
          rotateY, 
          y: floatSpring,
          transformStyle: "preserve-3d"
        }}
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
        className="hero-depth-card group relative overflow-hidden rounded-2xl border border-border/50 bg-card shadow-2xl shadow-primary/10"
      >
        <div className="hero-sheen" aria-hidden="true" />
        <div className="relative aspect-[4/5] w-full overflow-hidden">
          <motion.div 
            style={{ translateZ: "50px", scale: 1.05 }}
            className="absolute inset-0 z-0"
          >
            <Image
              src={imageUrl}
              alt=""
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 1024px) 80vw, 420px"
              priority
            />
          </motion.div>
          {/* Glassmorphic overlay gradinet */}
          <div className="absolute inset-0 z-10 bg-gradient-to-t from-background/90 via-background/20 to-transparent mix-blend-multiply" />
          <div className="absolute inset-x-0 bottom-0 z-20 h-2/3 bg-gradient-to-t from-background to-transparent" />
        </div>

        <motion.div 
          style={{ translateZ: "80px" }}
          className="absolute inset-x-0 bottom-0 z-30 p-8 flex flex-col items-center text-center"
        >
          {/* Audio bar simulator using motion properties */}
          <div className="mb-4 flex gap-1 h-3 items-end opacity-70">
            {[...Array(4)].map((_, i) => (
              <motion.div
                key={i}
                animate={{ height: ['4px', '12px', '4px'] }}
                transition={{
                  duration: 0.8 + Math.random() * 0.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.1
                }}
                className="w-[3px] rounded-full bg-primary"
              />
            ))}
          </div>
          
          <p className="text-xs font-bold uppercase tracking-widest text-primary/80 mb-2">Episode {episodeNumber}</p>
          <h3 className="line-clamp-3 font-serif text-2xl md:text-3xl font-medium tracking-tight text-foreground leading-[1.1]">
            {title}
          </h3>
        </motion.div>
      </motion.div>
    </div>
  );
}
