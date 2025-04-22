"use client";

import { useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CursorEffects() {
  const [isVisible, setIsVisible] = useState(false);
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  // Crear valores de spring para suavizar el movimiento
  const springConfig = { damping: 25, stiffness: 300 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);
  
  useEffect(() => {
    // Función para actualizar la posición del cursor
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };
    
    // Mostrar/ocultar cursor personalizado según el dispositivo
    const updateCursorVisibility = () => {
      // Solo mostrar en dispositivos no táctiles
      if (window.matchMedia('(hover: hover)').matches) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    
    // Escuchar eventos
    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('resize', updateCursorVisibility);
    
    // Inicializar visibilidad
    updateCursorVisibility();
    
    // Limpiar eventos
    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('resize', updateCursorVisibility);
    };
  }, [cursorX, cursorY]);
  
  if (!isVisible) return null;
  
  return (
    <>
      {/* Círculo principal que sigue al cursor */}
      <motion.div
        className="fixed top-0 left-0 w-5 h-5 rounded-full bg-indigo-400/20 border border-indigo-500/30 backdrop-blur-sm mix-blend-screen pointer-events-none z-50"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: '-50%',
          translateY: '-50%',
        }}
      />
      
      {/* Círculo secundario con delay para efecto de rastro */}
      <motion.div
        className="fixed top-0 left-0 w-12 h-12 rounded-full bg-indigo-500/5 backdrop-blur-sm pointer-events-none z-40"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: '-50%',
          translateY: '-50%',
          scale: 0.5,
        }}
        transition={{ duration: 0.5 }}
      />
    </>
  );
} 