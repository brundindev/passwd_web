"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import Logo from "./logo";
import { authService } from "@/lib/firebase/firebase";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export default function Header() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const router = useRouter();

  // Cerrar el dropdown al hacer clic fuera de él
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      // Si el dropdown está abierto y el clic no fue dentro del dropdown o el botón
      if (isDropdownOpen && !target.closest('[data-dropdown]')) {
        setIsDropdownOpen(false);
      }
      
      // Si el menú móvil está abierto y el clic no fue dentro del menú
      if (isMobileMenuOpen && !target.closest('[data-mobile-menu]') && !target.closest('[data-mobile-toggle]')) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDropdownOpen, isMobileMenuOpen]);

  useEffect(() => {
    // Verificar si el usuario está autenticado
    const unsubscribe = authService.auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    // Función para detectar scroll
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    // Añadir event listener para scroll
    window.addEventListener("scroll", handleScroll);
    // Llamar a handleScroll inicialmente para establecer el estado correcto
    handleScroll();

    // Limpiar los eventos al desmontar
    return () => {
      unsubscribe();
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleSignOut = async () => {
    try {
      await authService.signOut();
      setIsDropdownOpen(false);
      setIsMobileMenuOpen(false);
      router.push("/");
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const navItemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: (custom: number) => ({ 
      opacity: 1, 
      y: 0,
      transition: { 
        delay: custom * 0.1 + 0.3,
        duration: 0.5,
        ease: "easeOut"
      }
    })
  };

  return (
    <motion.header 
      className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 ease-in-out ${
        scrolled ? 'py-1' : 'mt-2 md:mt-3'
      }`}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ 
        duration: 0.5, 
        ease: "easeOut",
        delay: 0.2
      }}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <motion.div 
          className={`relative flex h-14 items-center justify-between gap-3 rounded-2xl ${
            scrolled 
              ? 'bg-gray-900/95 shadow-lg backdrop-blur-md' 
              : 'bg-gray-900/80 backdrop-blur-sm'
          } px-3 transition-all duration-300 ease-in-out before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:border before:border-transparent before:[background:linear-gradient(to_right,var(--color-gray-800),var(--color-gray-700),var(--color-gray-800))_border-box] before:[mask-composite:exclude_!important] before:[mask:linear-gradient(white_0_0)_padding-box,_linear-gradient(white_0_0)] after:absolute after:inset-0 after:-z-10 after:backdrop-blur-xs`}
          layout
          transition={{ duration: 0.3 }}
        >
          {/* Marca del sitio */}
          <motion.div 
            className="flex items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <Logo />
          </motion.div>
            
          {/* Enlaces de navegación principal - Centrados */}
          <nav className="hidden md:flex mx-auto space-x-6">
            <motion.div custom={0} variants={navItemVariants} initial="hidden" animate="visible">
              <Link 
                href="/descargar" 
                className="text-sm text-gray-300 hover:text-white transition-colors duration-150"
              >
                Descargar
              </Link>
            </motion.div>
            <motion.div custom={1} variants={navItemVariants} initial="hidden" animate="visible">
              <Link
                href="/funciones" 
                className="text-sm text-gray-300 hover:text-white transition-colors duration-150"
              >
                Funciones
              </Link>
            </motion.div>
            <motion.div custom={2} variants={navItemVariants} initial="hidden" animate="visible">
              <Link
                href="/precios" 
                className="text-sm text-gray-300 hover:text-white transition-colors duration-150"
              >
                Precios
              </Link>
            </motion.div>
          </nav>

          {/* Botón de menú móvil */}
          <motion.div 
            className="md:hidden mr-2 flex-1 flex justify-end" 
            data-mobile-toggle
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.3 }}
          >
            <button 
              onClick={toggleMobileMenu}
              className="text-gray-300 hover:text-white focus:outline-none"
              aria-label="Menú"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                )}
              </svg>
            </button>
          </motion.div>

          {/* Enlaces de navegación dependiendo del estado de autenticación */}
          {!loading && (
            <>
              {user ? (
                <motion.div 
                  className="relative flex items-center" 
                  data-dropdown
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5, duration: 0.3 }}
                >
                  <button 
                    onClick={toggleDropdown}
                    className="flex items-center space-x-2 text-gray-300 hover:text-white rounded-full focus:outline-none transition-colors duration-200"
                    data-dropdown
                  >
                    <div className="flex items-center gap-2">
                      <div className="overflow-hidden rounded-full border-2 border-indigo-500 transition-all duration-200 hover:border-indigo-400">
                        <Image 
                          src={user.photoURL || "/images/generic-avatar.png"} 
                          alt="Perfil" 
                          width={32} 
                          height={32}
                          className="rounded-full object-cover"
                        />
                      </div>
                      <span className="text-sm hidden sm:inline">{user.displayName || user.email?.split('@')[0] || "Usuario"}</span>
                      <motion.svg 
                        className={`h-4 w-4 text-gray-400 ${isDropdownOpen ? 'rotate-180' : ''}`} 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24" 
                        xmlns="http://www.w3.org/2000/svg"
                        animate={{ rotate: isDropdownOpen ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                      </motion.svg>
                    </div>
                  </button>

                  {/* Dropdown menu */}
                  <AnimatePresence>
                    {isDropdownOpen && (
                      <motion.div 
                        className="absolute right-0 top-full mt-2 w-64 rounded-md bg-gray-800 border border-gray-700 shadow-lg z-50 overflow-hidden" 
                        data-dropdown
                        initial={{ opacity: 0, y: -10, height: 0 }}
                        animate={{ opacity: 1, y: 0, height: 'auto' }}
                        exit={{ opacity: 0, y: -10, height: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        {/* Encabezado con información del usuario */}
                        <div className="bg-gray-700/50 p-4 border-b border-gray-700">
                          <div className="flex items-center gap-3">
                            <Image 
                              src={user.photoURL || "/images/generic-avatar.png"} 
                              alt="Perfil" 
                              width={40} 
                              height={40}
                              className="rounded-full object-cover border-2 border-indigo-500"
                            />
                            <div>
                              <p className="text-sm font-medium text-white">{user.displayName || "Usuario"}</p>
                              <p className="text-xs text-gray-400 truncate">{user.email}</p>
                            </div>
                          </div>
                        </div>
                        
                        <div className="py-1">
                          <Link 
                            href="/perfil"
                            className="flex items-center px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 transition-colors duration-150 group"
                            onClick={() => setIsDropdownOpen(false)}
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 text-gray-400 group-hover:text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                            Mi Perfil
                          </Link>
                          
                          <Link 
                            href="/passwords" 
                            className="flex items-center px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 transition-colors duration-150 group"
                            onClick={() => setIsDropdownOpen(false)}
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 text-gray-400 group-hover:text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                            Mis Contraseñas
                          </Link>
                          
                          <Link 
                            href="/reset-password" 
                            className="flex items-center px-4 py-2 text-sm text-orange-300 hover:bg-gray-700 transition-colors duration-150 group"
                            onClick={() => setIsDropdownOpen(false)}
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 text-orange-400 group-hover:text-orange-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                            </svg>
                            Cambiar Contraseña
                          </Link>
                          
                          <div className="border-t border-gray-700 my-1"></div>
                          
                          <button
                            onClick={handleSignOut}
                            className="flex w-full items-center px-4 py-2 text-sm text-red-400 hover:bg-gray-700 transition-colors duration-150 group text-left"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 text-red-500 group-hover:text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                            </svg>
                            Cerrar Sesión
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ) : (
                <motion.div 
                  className="hidden md:flex items-center gap-3"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                >
                  <Link
                    href="/login"
                    className="btn-sm relative bg-linear-to-b from-gray-800 to-gray-800/60 bg-[length:100%_100%] bg-[bottom] py-[5px] text-gray-300 before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:border before:border-transparent before:[background:linear-gradient(to_right,var(--color-gray-800),var(--color-gray-700),var(--color-gray-800))_border-box] before:[mask-composite:exclude_!important] before:[mask:linear-gradient(white_0_0)_padding-box,_linear-gradient(white_0_0)] hover:bg-[length:100%_150%] transition-all duration-200"
                  >
                    Iniciar Sesión
                  </Link>
                  <Link
                    href="/registro"
                    className="btn-sm bg-linear-to-t from-indigo-600 to-indigo-500 bg-[length:100%_100%] bg-[bottom] py-[5px] text-white shadow-[inset_0px_1px_0px_0px_--theme(--color-white/.16)] hover:bg-[length:100%_150%] transition-all duration-200"
                  >
                    Registrarse
                  </Link>
                </motion.div>
              )}
            </>
          )}
        </motion.div>

        {/* Menú móvil desplegable */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div 
              className="md:hidden absolute left-0 right-0 mt-2 mx-4 rounded-lg bg-gray-800/95 backdrop-blur-md border border-gray-700 shadow-lg"
              data-mobile-menu
              initial={{ opacity: 0, height: 0, y: -20 }}
              animate={{ opacity: 1, height: 'auto', y: 0 }}
              exit={{ opacity: 0, height: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <nav className="py-4 px-4">
                <Link 
                  href="/descargar" 
                  className="block py-2 px-4 text-base text-gray-300 hover:bg-gray-700 rounded-md transition-colors duration-150"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Descargar
                </Link>
                <Link 
                  href="/funciones" 
                  className="block py-2 px-4 text-base text-gray-300 hover:bg-gray-700 rounded-md transition-colors duration-150"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Funciones
                </Link>
                <Link 
                  href="/precios" 
                  className="block py-2 px-4 text-base text-gray-300 hover:bg-gray-700 rounded-md transition-colors duration-150"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Precios
                </Link>
                
                {!loading && !user && (
                  <div className="mt-4 pt-4 border-t border-gray-700">
                    <Link
                      href="/login"
                      className="block py-2 px-4 text-base text-gray-300 hover:bg-gray-700 rounded-md transition-colors duration-150"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Iniciar Sesión
                    </Link>
                    <Link
                      href="/registro"
                      className="block py-2 px-4 mt-2 text-base text-white bg-indigo-600 hover:bg-indigo-700 rounded-md transition-colors duration-150"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Registrarse
                    </Link>
                  </div>
                )}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}
