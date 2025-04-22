"use client";

import { ReactNode, useEffect, useRef, useState } from "react";
import { motion, useAnimation, useInView } from "framer-motion";

type AnimationVariant = "fadeIn" | "fadeInUp" | "fadeInLeft" | "fadeInRight" | "zoomIn" | "slideUp";

interface ScrollAnimationProps {
  children: ReactNode;
  variant?: AnimationVariant;
  delay?: number;
  duration?: number;
  className?: string;
  once?: boolean;
  threshold?: number;
}

const variants = {
  hidden: {
    opacity: 0,
    y: 0,
    x: 0,
    scale: 1,
  },
  fadeIn: {
    opacity: 1,
    y: 0,
    x: 0,
    scale: 1,
  },
  fadeInUp: {
    opacity: 1,
    y: 0,
    x: 0,
    scale: 1,
  },
  fadeInLeft: {
    opacity: 1,
    y: 0,
    x: 0,
    scale: 1,
  },
  fadeInRight: {
    opacity: 1,
    y: 0,
    x: 0,
    scale: 1,
  },
  zoomIn: {
    opacity: 1,
    y: 0,
    x: 0,
    scale: 1,
  },
  slideUp: {
    opacity: 1,
    y: 0,
    x: 0,
    scale: 1,
  },
};

const getInitialState = (variant: AnimationVariant) => {
  switch (variant) {
    case "fadeIn":
      return { opacity: 0, y: 0, x: 0, scale: 1 };
    case "fadeInUp":
      return { opacity: 0, y: 50, x: 0, scale: 1 };
    case "fadeInLeft":
      return { opacity: 0, y: 0, x: -50, scale: 1 };
    case "fadeInRight":
      return { opacity: 0, y: 0, x: 50, scale: 1 };
    case "zoomIn":
      return { opacity: 0, y: 0, x: 0, scale: 0.9 };
    case "slideUp":
      return { opacity: 0, y: 100, x: 0, scale: 1 };
    default:
      return { opacity: 0, y: 0, x: 0, scale: 1 };
  }
};

export default function ScrollAnimation({
  children,
  variant = "fadeInUp",
  delay = 0,
  duration = 0.5,
  className = "",
  once = true,
  threshold = 0.2,
}: ScrollAnimationProps) {
  const controls = useAnimation();
  const ref = useRef(null);
  const inView = useInView(ref, { once });
  const [initialState] = useState(getInitialState(variant));

  useEffect(() => {
    if (inView) {
      controls.start(variant);
    } else if (!once) {
      controls.start("hidden");
    }
  }, [controls, inView, variant, once]);

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={controls}
      custom={duration}
      variants={{
        hidden: initialState,
        [variant]: variants[variant],
      }}
      transition={{
        duration,
        delay,
        ease: "easeOut",
      }}
    >
      {children}
    </motion.div>
  );
} 