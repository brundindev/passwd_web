"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // Cerrar el menú cuando cambia la ruta
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <div className="md:hidden">
      {/* Botón de menú */}
      <button
        className="text-gray-300 hover:text-white focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <span className="sr-only">Menú</span>
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          {isOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      {/* Menú desplegable */}
      {isOpen && (
        <div className="absolute left-0 right-0 top-16 z-20 bg-gray-900 border border-gray-800 shadow-lg">
          <nav className="py-2">
            <Link href="/funciones" className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-800 hover:text-white">
              Funciones
            </Link>
            <Link href="/precios" className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-800 hover:text-white">
              Precios
            </Link>
            <Link href="/descargar" className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-800 hover:text-white">
              Descargar
            </Link>
            <Link href="/login" className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-800 hover:text-white">
              Iniciar Sesión
            </Link>
            <Link href="/registro" className="block px-4 py-2 text-sm text-white bg-indigo-500 hover:bg-indigo-600 mx-4 my-2 rounded text-center">
              Registrarse
            </Link>
          </nav>
        </div>
      )}
    </div>
  );
} 