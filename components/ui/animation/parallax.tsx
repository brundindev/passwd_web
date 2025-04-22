"use client";

import { useEffect, useState, ReactNode } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface ParallaxProps {
  children: ReactNode;
  speed?: number;
  direction?: "up" | "down" | "left" | "right";
  className?: string;
}

export default function Parallax({
  children,
  speed = 0.5,
  direction = "up",
  className = "",
}: ParallaxProps) {
  const [elementTop, setElementTop] = useState(0);
  const [clientHeight, setClientHeight] = useState(0);
  const [ref, setRef] = useState<HTMLDivElement | null>(null);

  const { scrollY } = useScroll();

  // Configurar el efecto según la dirección
  const getDirectionConfig = () => {
    switch (direction) {
      case "up":
        return {
          y: useTransform(
            scrollY,
            [elementTop - clientHeight, elementTop + clientHeight],
            [`${speed * 20}%`, `${-speed * 20}%`]
          ),
        };
      case "down":
        return {
          y: useTransform(
            scrollY,
            [elementTop - clientHeight, elementTop + clientHeight],
            [`${-speed * 20}%`, `${speed * 20}%`]
          ),
        };
      case "left":
        return {
          x: useTransform(
            scrollY,
            [elementTop - clientHeight, elementTop + clientHeight],
            [`${speed * 20}%`, `${-speed * 20}%`]
          ),
        };
      case "right":
        return {
          x: useTransform(
            scrollY,
            [elementTop - clientHeight, elementTop + clientHeight],
            [`${-speed * 20}%`, `${speed * 20}%`]
          ),
        };
    }
  };

  const motionProps = getDirectionConfig();

  useEffect(() => {
    if (!ref) return;
    
    // Obtener la posición del elemento respecto a la ventana
    const setValues = () => {
      const element = ref;
      if (element) {
        const rect = element.getBoundingClientRect();
        setElementTop(rect.top + window.scrollY);
        setClientHeight(window.innerHeight);
      }
    };

    setValues();
    window.addEventListener("resize", setValues);

    return () => {
      window.removeEventListener("resize", setValues);
    };
  }, [ref]);

  return (
    <div
      ref={setRef}
      className={`overflow-hidden ${className}`}
      style={{ position: "relative", willChange: "transform" }}
    >
      <motion.div style={motionProps} className="w-full h-full">
        {children}
      </motion.div>
    </div>
  );
} 