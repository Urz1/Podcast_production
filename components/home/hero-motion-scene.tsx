'use client';

import { motion } from 'framer-motion';
import { FADE_IN_ANIMATION_VARIANTS, FADE_UP_ANIMATION_VARIANTS, STAGGER_CHILDREN_VARIANTS } from '@/lib/motion';

export function HeroMotionScene({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial="hidden"
      animate="show"
      viewport={{ once: true }}
      variants={STAGGER_CHILDREN_VARIANTS}
      className="relative z-10 grid items-center gap-14 lg:grid-cols-[1.1fr_0.9fr]"
    >
      {/* Background ambient lighting for the entire section */}
      <motion.div 
        variants={FADE_IN_ANIMATION_VARIANTS}
        className="pointer-events-none absolute -inset-x-20 top-0 h-[600px] w-[140%] translate-x-[-15%] bg-gradient-radial from-primary/10 via-background/0 to-transparent opacity-80 mix-blend-screen"
      />
      {children}
    </motion.div>
  );
}

export const MotionItem = motion.div;
export const fadeInVariants = FADE_IN_ANIMATION_VARIANTS;
export const fadeUpVariants = FADE_UP_ANIMATION_VARIANTS;