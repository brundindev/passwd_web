"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "./logo";
import MobileMenu from "./mobile-menu";
import { useAuth } from "@/lib/auth/auth-context";
import Image from "next/image";
import { authService } from "@/lib/firebase/firebase";
import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { motion } from "framer-motion";
import NotificationBell from "./notification/notification-bell";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [top, setTop] = useState<boolean>(true);
  const pathname = usePathname();
  const { isAuthenticated, userProfile, isLoading } = useAuth();

  // Detectar si el usuario ha hecho scroll
  const scrollHandler = () => {
    const offset = window.scrollY;
    if (offset > 10) {
      setScrolled(true);
      setTop(false);
    } else {
      setScrolled(false);
      setTop(true);
    }
  };

  useEffect(() => {
    scrollHandler();
    window.addEventListener("scroll", scrollHandler);
    return () => window.removeEventListener("scroll", scrollHandler);
  }, []);

  const handleLogout = async () => {
    try {
      await authService.signOut();
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="fixed w-full z-30 transition-all duration-300 ease-in-out px-4 py-2"
    >
      <div 
        className={`max-w-6xl mx-auto ${
          scrolled ? 'mt-2 mb-0' : 'my-3'
        } rounded-xl transition-all duration-500`}
      >
        <div 
          className={`
            relative flex items-center justify-between h-14 md:h-16 px-4 sm:px-6 
            rounded-xl transition-all duration-500 backdrop-blur-md
            ${scrolled 
              ? 'bg-gray-900/85 shadow-lg shadow-indigo-500/5 border border-gray-800/40' 
              : 'bg-gray-900/70'
            }
          `}
        >
          {/* Animación de fondo */}
          <div className="absolute inset-0 overflow-hidden rounded-xl pointer-events-none">
            <div 
              className={`
                absolute inset-0 bg-gradient-to-r from-indigo-500/10 via-purple-500/5 to-indigo-500/10 rounded-xl
                transition-opacity duration-500 ease-in-out
                ${scrolled ? 'opacity-100' : 'opacity-0'}
              `}
            ></div>
          </div>

          {/* Logo */}
          <motion.div 
            className="shrink-0 mr-4 relative z-10"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Logo />
          </motion.div>

          {/* Navegación escritorio */}
          <nav className="hidden md:flex md:grow relative z-10">
            {/* Enlaces del menú */}
            <ul className="flex grow justify-start flex-wrap items-center">
              <motion.li whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  href="/funciones"
                  className={`font-medium text-gray-300 hover:text-white px-5 py-3 flex items-center transition duration-150 ease-in-out ${
                    pathname === "/funciones" ? "text-indigo-400" : ""
                  }`}
                >
                  <svg className="w-5 h-5 mr-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5" />
                  </svg>
                  Funciones
                </Link>
              </motion.li>
              <motion.li whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  href="/precios"
                  className={`font-medium text-gray-300 hover:text-white px-5 py-3 flex items-center transition duration-150 ease-in-out ${
                    pathname === "/precios" ? "text-indigo-400" : ""
                  }`}
                >
                  <svg className="w-5 h-5 mr-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Precios
                </Link>
              </motion.li>
              <motion.li whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  href="/descargar"
                  className={`font-medium text-gray-300 hover:text-white px-5 py-3 flex items-center transition duration-150 ease-in-out ${
                    pathname === "/descargar" ? "text-indigo-400" : ""
                  }`}
                >
                  <svg className="w-5 h-5 mr-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  Descargar
                </Link>
              </motion.li>
              {isAuthenticated && (
                <motion.li whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    href="/passwords"
                    className={`font-medium text-gray-300 hover:text-white px-5 py-3 flex items-center transition duration-150 ease-in-out ${
                      pathname === "/passwords" ? "text-indigo-400" : ""
                    }`}
                  >
                    <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    Mis Contraseñas
                  </Link>
                </motion.li>
              )}
            </ul>

            {/* Enlaces de inicio de sesión o menú de usuario */}
            <ul className="flex grow justify-end flex-wrap items-center">
              {isLoading ? (
                <li>
                  <div className="w-8 h-8 rounded-full bg-gray-700 animate-pulse"></div>
                </li>
              ) : isAuthenticated && userProfile ? (
                <li className="flex items-center">
                  {/* Campana de notificaciones */}
                  <NotificationBell />
                  
                  {/* Menú de usuario separado */}
                  <Menu as="div" className="relative ml-3">
                    {({ open }) => (
                      <>
                        <Menu.Button className="flex items-center space-x-2 text-gray-200 hover:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300 rounded-lg px-2 py-1">
                          <span className="text-sm font-medium hidden sm:block hover:text-indigo-300 transition-colors">
                            {userProfile.nombre}
                          </span>
                          <motion.div 
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="relative"
                          >
                            {userProfile.photoURL ? (
                              <Image 
                                className="h-8 w-8 rounded-full ring-2 ring-white" 
                                src={userProfile.photoURL} 
                                alt={userProfile.nombre || "Foto de perfil"}
                                width={32}
                                height={32}
                              />
                            ) : (
                              <div className="flex h-8 w-8 rounded-full bg-indigo-600 items-center justify-center text-white uppercase ring-2 ring-white">
                                {userProfile.nombre ? userProfile.nombre.charAt(0) : 'U'}
                              </div>
                            )}
                            <span className={`absolute -right-1 -top-1 h-3 w-3 rounded-full bg-green-400 border-2 border-gray-900 ${open ? 'bg-indigo-400' : 'bg-green-400'}`}></span>
                          </motion.div>
                        </Menu.Button>
                        <Transition
                          as={Fragment}
                          enter="transition ease-out duration-200"
                          enterFrom="transform opacity-0 scale-95"
                          enterTo="transform opacity-100 scale-100"
                          leave="transition ease-in duration-150"
                          leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-95"
                        >
                          <Menu.Items className="absolute right-0 z-10 mt-2 w-64 origin-top-right rounded-xl bg-gray-800/90 backdrop-blur-sm py-2 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none border border-gray-700 divide-y divide-gray-700">
                            <div className="px-4 py-3">
                              <div className="flex items-center space-x-3">
                                {userProfile.photoURL ? (
                                  <Image 
                                    className="h-10 w-10 rounded-full ring-2 ring-indigo-500" 
                                    src={userProfile.photoURL} 
                                    alt={userProfile.nombre || "Foto de perfil"}
                                    width={40}
                                    height={40}
                                  />
                                ) : (
                                  <div className="flex h-10 w-10 rounded-full bg-gradient-to-br from-indigo-600 to-indigo-800 items-center justify-center text-white uppercase ring-2 ring-indigo-500">
                                    {userProfile.nombre ? userProfile.nombre.charAt(0) : 'U'}
                                  </div>
                                )}
                                <div>
                                  <p className="text-sm font-medium text-indigo-300">Hola,</p>
                                  <p className="text-base font-bold text-white truncate">{userProfile.nombre}</p>
                                  <div className="mt-1 text-xs text-gray-400">
                                    <span className="block truncate">{userProfile.email}</span>
                                    {userProfile.emailVerified && (
                                      <span className="inline-flex items-center mt-1 gap-1 text-xs text-green-400">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
                                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                        </svg>
                                        Verificado
                                      </span>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="py-1">
                              <Menu.Item>
                                {({ active }) => (
                                  <Link
                                    href="/cuenta"
                                    className={`${
                                      active ? 'bg-indigo-600/20 text-white' : 'text-gray-300'
                                    } flex items-center px-4 py-2 text-sm transition duration-150 ease-in-out`}
                                  >
                                    <svg className="w-5 h-5 mr-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                    Mi Cuenta
                                    {pathname === "/cuenta" && (
                                      <span className="ml-auto h-2 w-2 rounded-full bg-indigo-400"></span>
                                    )}
                                  </Link>
                                )}
                              </Menu.Item>
                              <Menu.Item>
                                {({ active }) => (
                                  <Link
                                    href="/passwords"
                                    className={`${
                                      active ? 'bg-indigo-600/20 text-white' : 'text-gray-300'
                                    } flex items-center px-4 py-2 text-sm transition duration-150 ease-in-out`}
                                  >
                                    <svg className="w-5 h-5 mr-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                    </svg>
                                    Mis Contraseñas
                                    {pathname === "/passwords" && (
                                      <span className="ml-auto h-2 w-2 rounded-full bg-indigo-400"></span>
                                    )}
                                  </Link>
                                )}
                              </Menu.Item>
                              <Menu.Item>
                                {({ active }) => (
                                  <Link
                                    href="/contacto"
                                    className={`${
                                      active ? 'bg-indigo-600/20 text-white' : 'text-gray-300'
                                    } flex items-center px-4 py-2 text-sm transition duration-150 ease-in-out`}
                                  >
                                    <svg className="w-5 h-5 mr-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                                    </svg>
                                    Contacto
                                    {pathname === "/contacto" && (
                                      <span className="ml-auto h-2 w-2 rounded-full bg-indigo-400"></span>
                                    )}
                                  </Link>
                                )}
                              </Menu.Item>
                              {userProfile?.email === 'brundindev@gmail.com' && (
                                <Menu.Item>
                                  {({ active }) => (
                                    <Link
                                      href="/admin/tickets"
                                      className={`${
                                        active ? 'bg-purple-600/20 text-white' : 'text-gray-300'
                                      } flex items-center px-4 py-2 text-sm transition duration-150 ease-in-out`}
                                    >
                                      <svg className="w-5 h-5 mr-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                      </svg>
                                      Panel de Administrador
                                      {pathname === "/admin/tickets" && (
                                        <span className="ml-auto h-2 w-2 rounded-full bg-purple-400"></span>
                                      )}
                                    </Link>
                                  )}
                                </Menu.Item>
                              )}
                            </div>
                            <div className="py-1">
                              <Menu.Item>
                                {({ active }) => (
                                  <button
                                    onClick={handleLogout}
                                    className={`${
                                      active ? 'bg-red-600/20 text-red-300' : 'text-gray-300'
                                    } flex items-center w-full text-left px-4 py-2 text-sm transition duration-150 ease-in-out`}
                                  >
                                    <svg className="w-5 h-5 mr-3 text-red-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                    </svg>
                                    Cerrar Sesión
                                  </button>
                                )}
                              </Menu.Item>
                            </div>
                          </Menu.Items>
                        </Transition>
                      </>
                    )}
                  </Menu>
                </li>
              ) : (
                <>
                  <motion.li whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Link
                      href="/login"
                      className={`font-medium text-gray-300 hover:text-white px-5 py-3 flex items-center transition duration-150 ease-in-out ${
                        pathname === "/login" ? "text-indigo-400" : ""
                      }`}
                    >
                      <svg className="w-5 h-5 mr-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                      </svg>
                      Iniciar Sesión
                    </Link>
                  </motion.li>
                  <motion.li whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Link
                      href="/registro"
                      className="ml-3 btn-sm bg-indigo-500 hover:bg-indigo-600 text-white flex items-center transition-all duration-300 ease-in-out hover:shadow-lg hover:shadow-indigo-500/30"
                    >
                      <svg className="w-5 h-5 mr-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                      </svg>
                      Registrarse
                    </Link>
                  </motion.li>
                </>
              )}
            </ul>
          </nav>

          {/* Menú móvil */}
          <div className="relative z-10">
            <MobileMenu isAuthenticated={isAuthenticated} userProfile={userProfile} onLogout={handleLogout} />
          </div>
        </div>
      </div>
    </motion.header>
  );
}
