'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { FADE_UP_ANIMATION_VARIANTS, STAGGER_CHILDREN_VARIANTS } from '@/lib/motion';

interface Props {
  children: React.ReactNode;
  className?: string;
}

export function RevealContainer({ children, className }: Props) {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      variants={STAGGER_CHILDREN_VARIANTS}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function RevealItem({ children, className }: Props) {
  return (
    <motion.div variants={FADE_UP_ANIMATION_VARIANTS} className={className}>
      {children}
    </motion.div>
  );
}

export function ParallaxSection({ children, className, speed = 0.5 }: Props & { speed?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", `${speed * 100}%`]);

  return (
    <div ref={ref} className={className}>
      <motion.div style={{ y }} className="h-full w-full">
        {children}
      </motion.div>
    </div>
  );
}
