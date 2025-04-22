"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface PageTransitionProps {
  children: ReactNode;
  className?: string;
}

export default function PageTransition({ children, className = "" }: PageTransitionProps) {
  const variants = {
    hidden: { opacity: 0, y: 10 },
    enter: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 },
  };

  return (
    <motion.div
      className={`${className}`}
      initial="hidden"
      animate="enter"
      exit="exit"
      variants={variants}
      transition={{
        type: "spring",
        stiffness: 100,
        damping: 15,
        duration: 0.2,
      }}
    >
      {children}
    </motion.div>
  );
} 