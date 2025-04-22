"use client";

import Link from "next/link";
import Logo from "./logo";
import { motion } from "framer-motion";
import ScrollAnimation from "./animation/scroll-animation";

export default function Footer() {
  return (
    <footer className="mt-8">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="border-t border-gray-800 py-8 md:py-12">
          <ScrollAnimation variant="fadeInUp" delay={0.1} className="w-full">
            <div className="flex flex-col md:flex-row justify-between items-center">
              {/* Logo y derechos de autor */}
              <motion.div 
                className="mb-6 md:mb-0"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex items-center">
                  <Logo />
                  <div className="ml-4 text-sm text-gray-500">
                    © {new Date().getFullYear()} PASSWD. Todos los derechos reservados.
                  </div>
                </div>
              </motion.div>

              {/* Enlaces */}
              <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-8">
                <motion.div whileHover={{ y: -2 }} transition={{ duration: 0.2 }}>
                  <Link href="/terminos" className="text-sm text-gray-400 hover:text-gray-300 transition-colors duration-150">
                    Términos de servicio
                  </Link>
                </motion.div>
                <motion.div whileHover={{ y: -2 }} transition={{ duration: 0.2 }}>
                  <Link href="/privacidad" className="text-sm text-gray-400 hover:text-gray-300 transition-colors duration-150">
                    Política de privacidad
                  </Link>
                </motion.div>
                <motion.div whileHover={{ y: -2 }} transition={{ duration: 0.2 }}>
                  <Link href="/contacto" className="text-sm text-gray-400 hover:text-gray-300 transition-colors duration-150">
                    Contacto
                  </Link>
                </motion.div>
              </div>
            </div>
          </ScrollAnimation>
        </div>
      </div>
    </footer>
  );
}
