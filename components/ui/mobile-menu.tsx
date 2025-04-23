"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

interface UserProfile {
  uid: string;
  nombre: string;
  email: string | null;
  emailVerified: boolean;
  photoURL: string | null;
  role?: string;
  registroCompletado?: boolean;
}

interface MobileMenuProps {
  isAuthenticated: boolean;
  userProfile: UserProfile | null;
  onLogout: () => Promise<void>;
}

export default function MobileMenu({ isAuthenticated, userProfile, onLogout }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // Cerrar el menú cuando cambia la ruta
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <div className="md:hidden">
      {/* Botón de menú */}
      <motion.button
        className="text-gray-300 hover:text-white focus:outline-none relative"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        whileTap={{ scale: 0.9 }}
      >
        <span className="sr-only">Menú</span>
        <motion.div
          className="w-6 h-6 flex items-center justify-center"
          initial={false}
          animate={isOpen ? "open" : "closed"}
        >
          <motion.span
            className="block absolute h-0.5 w-5 bg-current transform transition"
            variants={{
              closed: { rotate: 0, translateY: -4 },
              open: { rotate: 45, translateY: 0 }
            }}
          />
          <motion.span
            className="block absolute h-0.5 w-5 bg-current transform transition"
            variants={{
              closed: { opacity: 1 },
              open: { opacity: 0 }
            }}
          />
          <motion.span
            className="block absolute h-0.5 w-5 bg-current transform transition"
            variants={{
              closed: { rotate: 0, translateY: 4 },
              open: { rotate: -45, translateY: 0 }
            }}
          />
        </motion.div>
      </motion.button>

      {/* Menú desplegable */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0, y: -10 }}
            animate={{ opacity: 1, height: "auto", y: 0 }}
            exit={{ opacity: 0, height: 0, y: -10 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed inset-x-4 top-[4.5rem] z-50 rounded-xl backdrop-blur-md bg-gray-900/95 border border-gray-800/60 shadow-xl overflow-hidden max-h-[calc(100vh-5rem)] overflow-y-auto"
            style={{
              boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.3), 0 8px 10px -6px rgba(0, 0, 0, 0.2), 0 0 0 1px rgba(255, 255, 255, 0.05)"
            }}
          >
            {isAuthenticated && userProfile && (
              <div className="px-4 py-3 border-b border-gray-700/50 bg-gradient-to-r from-indigo-900/50 to-indigo-800/30">
                <div className="flex items-center">
                  {userProfile.photoURL ? (
                    <Image 
                      className="h-12 w-12 rounded-full ring-2 ring-indigo-500 mr-3" 
                      src={userProfile.photoURL} 
                      alt={userProfile.nombre || "Foto de perfil"}
                      width={48}
                      height={48}
                    />
                  ) : (
                    <div className="flex h-12 w-12 rounded-full bg-gradient-to-br from-indigo-600 to-indigo-800 items-center justify-center text-white text-xl uppercase ring-2 ring-indigo-500 mr-3">
                      {userProfile.nombre ? userProfile.nombre.charAt(0) : 'U'}
                    </div>
                  )}
                  <div>
                    <p className="text-sm text-indigo-300">Hola,</p>
                    <p className="text-base font-bold text-white truncate">{userProfile.nombre}</p>
                    <div className="flex items-center mt-1 text-xs">
                      <span className="text-gray-400 truncate mr-2">{userProfile.email}</span>
                      {userProfile.emailVerified && (
                        <span className="inline-flex items-center gap-1 text-xs text-green-400">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
            <nav className="py-2 divide-y divide-gray-800/30">
              <div className="py-1">
                <motion.div whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                  <Link 
                    href="/funciones" 
                    className={`flex items-center px-4 py-3 text-sm hover:bg-indigo-600/10 transition-colors duration-150 ${pathname === "/funciones" ? "text-indigo-400 bg-indigo-900/20" : "text-gray-300"}`}
                  >
                    <svg className="w-5 h-5 mr-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5" />
                    </svg>
                    Funciones
                  </Link>
                </motion.div>
                <motion.div whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                  <Link 
                    href="/precios" 
                    className={`flex items-center px-4 py-3 text-sm hover:bg-indigo-600/10 transition-colors duration-150 ${pathname === "/precios" ? "text-indigo-400 bg-indigo-900/20" : "text-gray-300"}`}
                  >
                    <svg className="w-5 h-5 mr-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Precios
                  </Link>
                </motion.div>
                <motion.div whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                  <Link 
                    href="/descargar" 
                    className={`flex items-center px-4 py-3 text-sm hover:bg-indigo-600/10 transition-colors duration-150 ${pathname === "/descargar" ? "text-indigo-400 bg-indigo-900/20" : "text-gray-300"}`}
                  >
                    <svg className="w-5 h-5 mr-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    Descargar
                  </Link>
                </motion.div>
              </div>
              
              {isAuthenticated ? (
                <div className="py-1">
                  <motion.div whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                    <Link 
                      href="/passwords" 
                      className={`flex items-center px-4 py-3 text-sm hover:bg-indigo-600/10 transition-colors duration-150 ${pathname === "/passwords" ? "text-indigo-400 bg-indigo-900/20" : "text-gray-300"}`}
                    >
                      <svg className="w-5 h-5 mr-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                      Mis Contraseñas
                    </Link>
                  </motion.div>
                  <motion.div whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                    <Link 
                      href="/cuenta" 
                      className={`flex items-center px-4 py-3 text-sm hover:bg-indigo-600/10 transition-colors duration-150 ${pathname === "/cuenta" ? "text-indigo-400 bg-indigo-900/20" : "text-gray-300"}`}
                    >
                      <svg className="w-5 h-5 mr-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      Mi Cuenta
                    </Link>
                  </motion.div>
                  <motion.div 
                    whileHover={{ x: 5, color: "#f87171" }} 
                    transition={{ duration: 0.2 }}
                  >
                    <motion.button 
                      onClick={onLogout}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center w-full text-left px-4 py-3 text-sm text-red-300 hover:bg-red-900/20 transition-colors duration-150"
                    >
                      <svg className="w-5 h-5 mr-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                      </svg>
                      Cerrar Sesión
                    </motion.button>
                  </motion.div>
                </div>
              ) : (
                <div className="py-4 px-4 space-y-3">
                  <motion.div 
                    className="bg-gray-800/60 rounded-lg p-0.5 overflow-hidden"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Link 
                      href="/login" 
                      className="flex items-center justify-center w-full py-3 px-4 rounded-md bg-gray-800 hover:bg-gray-700 text-white transition-colors duration-150"
                    >
                      <svg className="w-5 h-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                      </svg>
                      Iniciar Sesión
                    </Link>
                  </motion.div>
                  <motion.div 
                    className="bg-gradient-to-r from-indigo-600 to-indigo-700 rounded-lg p-0.5 overflow-hidden"
                    whileHover={{ scale: 1.02, boxShadow: "0 0 15px rgba(99, 102, 241, 0.5)" }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Link 
                      href="/registro" 
                      className="flex items-center justify-center w-full py-3 px-4 rounded-md bg-gradient-to-r from-indigo-600 to-indigo-700 text-white transition-all duration-150"
                    >
                      <svg className="w-5 h-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                      </svg>
                      Registrarse
                    </Link>
                  </motion.div>
                </div>
              )}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
} 