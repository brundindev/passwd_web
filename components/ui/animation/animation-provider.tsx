"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";

interface AnimationContextType {
  isLoaded: boolean;
}

const AnimationContext = createContext<AnimationContextType>({
  isLoaded: false,
});

export const useAnimation = () => useContext(AnimationContext);

interface AnimationProviderProps {
  children: ReactNode;
}

export default function AnimationProvider({ children }: AnimationProviderProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Reducimos el tiempo de carga para mostrar el contenido más rápido
    const timeout = setTimeout(() => {
      setIsLoaded(true);
    }, 300);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <AnimationContext.Provider value={{ isLoaded }}>
      <AnimatePresence mode="wait">
        {!isLoaded ? (
          <motion.div
            key="loader"
            className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >
            <motion.div
              className="flex flex-col items-center"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <div className="h-12 w-12 mb-3 relative">
                <motion.div
                  className="absolute inset-0 rounded-full border-t-4 border-indigo-500"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                ></motion.div>
              </div>
              <motion.div 
                className="text-2xl font-bold text-white"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                PASSWD
              </motion.div>
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="w-full"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </AnimationContext.Provider>
  );
} 