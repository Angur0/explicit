// Centralized Framer Motion variants and settings
// Use these variants across the app for consistent animations

import type { Variants, Transition } from "framer-motion";

// Viewport behavior for scroll-triggered animations
export const viewportDefault = { once: true, amount: 0.2 } as const;

// Common transitions
export const transitionFast: Transition = { duration: 0.3, ease: "easeOut" };
export const transitionDefault: Transition = { duration: 0.5, ease: "easeOut" };
export const transitionSlow: Transition = { duration: 0.8, ease: "easeOut" };

// Springy transitions for smoother UI feel
export const transitionSpringSoft: Transition = {
  type: "spring",
  stiffness: 120,
  damping: 20,
  mass: 0.6,
};

export const transitionSpringSnappy: Transition = {
  type: "spring",
  stiffness: 180,
  damping: 18,
  mass: 0.5,
};

// Variants
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: transitionDefault },
};

export const fadeInUp = (
  distance = 24,
  t: Transition = transitionDefault
): Variants => ({
  hidden: { opacity: 0, y: distance },
  visible: { opacity: 1, y: 0, transition: t },
});

export const slideInLeft = (
  distance = 40,
  t: Transition = transitionDefault
): Variants => ({
  hidden: { opacity: 0, x: -distance },
  visible: { opacity: 1, x: 0, transition: t },
});

export const slideInRight = (
  distance = 40,
  t: Transition = transitionDefault
): Variants => ({
  hidden: { opacity: 0, x: distance },
  visible: { opacity: 1, x: 0, transition: t },
});

export const zoomIn = (
  scaleFrom = 0.95,
  t: Transition = transitionDefault
): Variants => ({
  hidden: { opacity: 0, scale: scaleFrom },
  visible: { opacity: 1, scale: 1, transition: t },
});

export const staggerContainer = (
  stagger = 0.15,
  delayChildren = 0
): Variants => ({
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: stagger, delayChildren },
  },
});

export type VariantName =
  | "fadeIn"
  | "fadeInUp"
  | "slideInLeft"
  | "slideInRight"
  | "zoomIn"
  | "stagger";

export function getVariant(
  name: VariantName,
  opts?: {
    distance?: number;
    scaleFrom?: number;
    transition?: Transition;
    stagger?: number;
    delayChildren?: number;
  }
): Variants {
  const t = opts?.transition ?? transitionDefault;
  switch (name) {
    case "fadeIn":
      return fadeIn;
    case "fadeInUp":
      return fadeInUp(opts?.distance ?? 24, t);
    case "slideInLeft":
      return slideInLeft(opts?.distance ?? 40, t);
    case "slideInRight":
      return slideInRight(opts?.distance ?? 40, t);
    case "zoomIn":
      return zoomIn(opts?.scaleFrom ?? 0.95, t);
    case "stagger":
      return staggerContainer(opts?.stagger ?? 0.15, opts?.delayChildren ?? 0);
    default:
      return fadeIn;
  }
}
