import { Variants } from "framer-motion";

export const FADE_UP_ANIMATION_VARIANTS: Variants = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 200, damping: 20 } },
};

export const FADE_IN_ANIMATION_VARIANTS: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { type: "spring", stiffness: 100, damping: 15 } },
};

export const STAGGER_CHILDREN_VARIANTS: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export const ZOOM_IN_VARIANTS: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  show: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 200, damping: 20 } },
};

export const SLIDE_IN_RIGHT_VARIANTS: Variants = {
  hidden: { opacity: 0, x: 20 },
  show: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 200, damping: 20 } },
};

export const MAGNETIC_VARIANTS: Variants = {
  hover: { scale: 1.05, transition: { type: "spring", stiffness: 400, damping: 10 } },
  tap: { scale: 0.95, transition: { type: "spring", stiffness: 400, damping: 10 } },
};