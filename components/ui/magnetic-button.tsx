'use client';

import { motion } from 'framer-motion';
import { useRef, useState } from 'react';
import { MAGNETIC_VARIANTS } from '@/lib/motion';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import React from 'react';

interface MagneticButtonProps extends React.ComponentPropsWithoutRef<typeof Button> {
  strength?: number;
}

export const MagneticButton = React.forwardRef<HTMLButtonElement, MagneticButtonProps>(
  ({ children, strength = 20, className, ...props }, ref) => {
    const defaultRef = useRef<HTMLButtonElement>(null);
    const innerRef = (ref as React.RefObject<HTMLButtonElement>) || defaultRef;

    const [position, setPosition] = useState({ x: 0, y: 0 });

    const handleMouse = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (!innerRef.current) return;
      const { clientX, clientY } = e;
      const { height, width, left, top } = innerRef.current.getBoundingClientRect();
      const middleX = clientX - (left + width / 2);
      const middleY = clientY - (top + height / 2);
      setPosition({ x: middleX * (strength / 100), y: middleY * (strength / 100) });
    };

    const reset = () => {
      setPosition({ x: 0, y: 0 });
    };

    return (
      <motion.div
        variants={MAGNETIC_VARIANTS}
        whileHover="hover"
        whileTap="tap"
        animate={{ x: position.x, y: position.y }}
        transition={{ type: 'spring', stiffness: 300, damping: 15, mass: 0.1 }}
      >
        <Button
          ref={innerRef}
          onMouseMove={handleMouse}
          onMouseLeave={reset}
          className={cn(className, "transition-none")}
          {...props}
        >
          {children}
        </Button>
      </motion.div>
    );
  }
);
MagneticButton.displayName = 'MagneticButton';