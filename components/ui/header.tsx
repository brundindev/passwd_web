"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "./logo";
import MobileMenu from "./mobile-menu";

export default function Header() {
  const [top, setTop] = useState<boolean>(true);
  const pathname = usePathname();

  // Detectar si el usuario ha hecho scroll
  const scrollHandler = () => {
    window.pageYOffset > 10 ? setTop(false) : setTop(true);
  };

  useEffect(() => {
    scrollHandler();
    window.addEventListener("scroll", scrollHandler);
    return () => window.removeEventListener("scroll", scrollHandler);
  }, []);

  return (
    <header
      className={`fixed w-full z-30 transition duration-300 ease-in-out ${
        !top ? "bg-gray-900/90 backdrop-blur-sm shadow-lg" : ""
      }`}
    >
      <div className="max-w-6xl mx-auto px-5 sm:px-6">
        <div className="flex items-center justify-between h-14 md:h-16">
          {/* Logo */}
          <div className="shrink-0 mr-4">
            <Logo />
          </div>

          {/* Navegación escritorio */}
          <nav className="hidden md:flex md:grow">
            {/* Enlaces del menú */}
            <ul className="flex grow justify-start flex-wrap items-center">
              <li>
                <Link
                  href="/funciones"
                  className={`font-medium text-gray-300 hover:text-white px-5 py-3 flex items-center transition duration-150 ease-in-out ${
                    pathname === "/funciones" ? "text-indigo-400" : ""
                  }`}
                >
                  Funciones
                </Link>
              </li>
              <li>
                <Link
                  href="/precios"
                  className={`font-medium text-gray-300 hover:text-white px-5 py-3 flex items-center transition duration-150 ease-in-out ${
                    pathname === "/precios" ? "text-indigo-400" : ""
                  }`}
                >
                  Precios
                </Link>
              </li>
              <li>
                <Link
                  href="/descargar"
                  className={`font-medium text-gray-300 hover:text-white px-5 py-3 flex items-center transition duration-150 ease-in-out ${
                    pathname === "/descargar" ? "text-indigo-400" : ""
                  }`}
                >
                  Descargar
                </Link>
              </li>
            </ul>

            {/* Enlaces de inicio de sesión */}
            <ul className="flex grow justify-end flex-wrap items-center">
              <li>
                <Link
                  href="/login"
                  className={`font-medium text-gray-300 hover:text-white px-5 py-3 flex items-center transition duration-150 ease-in-out ${
                    pathname === "/login" ? "text-indigo-400" : ""
                  }`}
                >
                  Iniciar Sesión
                </Link>
              </li>
              <li>
                <Link
                  href="/registro"
                  className="ml-3 btn-sm bg-indigo-500 hover:bg-indigo-600 text-white"
                >
                  Registrarse
                </Link>
              </li>
            </ul>
          </nav>

          {/* Menú móvil */}
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
