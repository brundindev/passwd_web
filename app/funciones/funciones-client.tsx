"use client";

import Link from "next/link";
import Image from "next/image";
import PageTransition from "@/components/ui/animation/page-transition";
import ScrollAnimation from "@/components/ui/animation/scroll-animation";

export default function FuncionesClient() {
  return (
    <PageTransition>
      <section className="relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="pt-20 pb-12 md:pt-24 md:pb-20">
            {/* Sección del encabezado */}
            <ScrollAnimation
              variant="fadeInUp"
              className="max-w-3xl mx-auto text-center pb-10 md:pb-16"
            >
              <h1 className="h1 text-4xl md:text-5xl font-bold font-nacelle animate-[gradient_6s_linear_infinite] bg-[linear-gradient(to_right,var(--color-gray-200),var(--color-indigo-200),var(--color-gray-50),var(--color-indigo-300),var(--color-gray-200))] bg-[length:200%_auto] bg-clip-text text-transparent mb-4">Funcionalidades de PASSWD</h1>
              <p className="text-xl text-gray-400">
                Descubre todas las funciones que PASSWD ofrece para mantener tus contraseñas seguras
              </p>
            </ScrollAnimation>

            {/* Sección de funcionalidades */}
            <div className="max-w-sm mx-auto grid gap-8 md:grid-cols-2 lg:grid-cols-3 lg:gap-16 items-start md:max-w-2xl lg:max-w-none">
              
              {/* 1. Almacenamiento seguro */}
              <ScrollAnimation variant="fadeInUp" delay={0.1}>
                <div className="relative flex flex-col items-center">
                  <div aria-hidden="true" className="absolute h-1 border-t border-dashed border-gray-700 hidden md:block" style={{ width: '100%', top: '2.5rem', left: '50%' }}></div>
                  <div className="relative w-16 h-16 mb-4">
                    <div className="absolute inset-0 rounded-full opacity-30 bg-gradient-to-tr from-purple-500 to-purple-400 blur-md"></div>
                    <div className="relative flex items-center justify-center w-full h-full rounded-full bg-purple-600">
                      <svg className="w-8 h-8" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                        <path className="fill-current text-purple-100" d="M16 0C7.163 0 0 7.163 0 16s7.163 16 16 16 16-7.163 16-16S24.837 0 16 0zm0 28C9.373 28 4 22.627 4 16S9.373 4 16 4s12 5.373 12 12-5.373 12-12 12z" />
                        <path className="fill-current text-purple-100" d="M21 12h-3V9a2 2 0 00-2-2h-2a2 2 0 00-2 2v3H9a2 2 0 00-2 2v6a2 2 0 002 2h12a2 2 0 002-2v-6a2 2 0 00-2-2zm-5 6a1 1 0 11-2 0 1 1 0 012 0zm2-6h-6V9h6v3z" />
                      </svg>
                    </div>
                  </div>
                  <h4 className="h4 mb-2">Almacenamiento seguro</h4>
                  <p className="text-center text-lg text-gray-400">
                    Guarda todas tus contraseñas con cifrado de extremo a extremo para máxima seguridad.
                  </p>
                </div>
              </ScrollAnimation>

              {/* 2. Autenticación biométrica */}
              <ScrollAnimation variant="fadeInUp" delay={0.2}>
                <div className="relative flex flex-col items-center">
                  <div aria-hidden="true" className="absolute h-1 border-t border-dashed border-gray-700 hidden md:block" style={{ width: '100%', top: '2.5rem', left: '50%' }}></div>
                  <div className="relative w-16 h-16 mb-4">
                    <div className="absolute inset-0 rounded-full opacity-30 bg-gradient-to-tr from-blue-500 to-blue-400 blur-md"></div>
                    <div className="relative flex items-center justify-center w-full h-full rounded-full bg-blue-600">
                      <svg className="w-8 h-8" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                        <path className="fill-current text-blue-100" d="M16 0C7.163 0 0 7.163 0 16s7.163 16 16 16 16-7.163 16-16S24.837 0 16 0zm0 28C9.373 28 4 22.627 4 16S9.373 4 16 4s12 5.373 12 12-5.373 12-12 12z" />
                        <path className="fill-current text-blue-100" d="M16 10a6 6 0 00-6 6c0 3.314 2.686 6 6 6s6-2.686 6-6-2.686-6-6-6zm0 10c-2.206 0-4-1.794-4-4s1.794-4 4-4 4 1.794 4 4-1.794 4-4 4z" />
                        <path className="fill-current text-blue-100" d="M16 12a4 4 0 100 8 4 4 0 000-8zm0 6a2 2 0 110-4 2 2 0 010 4z" />
                      </svg>
                    </div>
                  </div>
                  <h4 className="h4 mb-2">Autenticación biométrica <span className="text-red-500 font-semibold">En desarrollo</span></h4>
                  <p className="text-center text-lg text-gray-400">
                    Accede a tus contraseñas con tu huella digital o reconocimiento facial para mayor comodidad.
                  </p>
                </div>
              </ScrollAnimation>

              {/* 3. Sincronización multiplataforma */}
              <ScrollAnimation variant="fadeInUp" delay={0.3}>
                <div className="relative flex flex-col items-center">
                  <div className="relative w-16 h-16 mb-4">
                    <div className="absolute inset-0 rounded-full opacity-30 bg-gradient-to-tr from-teal-500 to-teal-400 blur-md"></div>
                    <div className="relative flex items-center justify-center w-full h-full rounded-full bg-teal-600">
                      <svg className="w-8 h-8" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                        <path className="fill-current text-teal-100" d="M16 0C7.163 0 0 7.163 0 16s7.163 16 16 16 16-7.163 16-16S24.837 0 16 0zm0 28C9.373 28 4 22.627 4 16S9.373 4 16 4s12 5.373 12 12-5.373 12-12 12z" />
                        <path className="fill-current text-teal-100" d="M24 12h-2v-2a6 6 0 10-12 0v2H8a2 2 0 00-2 2v10a2 2 0 002 2h16a2 2 0 002-2V14a2 2 0 00-2-2zm-8 9a2 2 0 11-2-2 2 2 0 012 2zm4-9h-8v-2a4 4 0 118 0v2z" />
                      </svg>
                    </div>
                  </div>
                  <h4 className="h4 mb-2">Sincronización multiplataforma</h4>
                  <p className="text-center text-lg text-gray-400">
                    Accede a tus contraseñas desde cualquier dispositivo, con sincronización automática.
                  </p>
                </div>
              </ScrollAnimation>

              {/* 4. Categorización inteligente */}
              <ScrollAnimation variant="fadeInUp" delay={0.4}>
                <div className="relative flex flex-col items-center">
                  <div aria-hidden="true" className="absolute h-1 border-t border-dashed border-gray-700 hidden md:block" style={{ width: '100%', top: '2.5rem', left: '50%' }}></div>
                  <div className="relative w-16 h-16 mb-4">
                    <div className="absolute inset-0 rounded-full opacity-30 bg-gradient-to-tr from-pink-500 to-pink-400 blur-md"></div>
                    <div className="relative flex items-center justify-center w-full h-full rounded-full bg-pink-600">
                      <svg className="w-8 h-8" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                        <path className="fill-current text-pink-100" d="M16 0C7.163 0 0 7.163 0 16s7.163 16 16 16 16-7.163 16-16S24.837 0 16 0zm0 28C9.373 28 4 22.627 4 16S9.373 4 16 4s12 5.373 12 12-5.373 12-12 12z" />
                        <path className="fill-current text-pink-100" d="M22 14h-4v-4a2 2 0 00-2-2h-2a2 2 0 00-2 2v4H8a2 2 0 00-2 2v2a2 2 0 002 2h4v4a2 2 0 002 2h2a2 2 0 002-2v-4h4a2 2 0 002-2v-2a2 2 0 00-2-2z" />
                      </svg>
                    </div>
                  </div>
                  <h4 className="h4 mb-2">Categorización inteligente</h4>
                  <p className="text-center text-lg text-gray-400">
                    Organiza automáticamente tus contraseñas por categorías para un acceso más rápido.
                  </p>
                </div>
              </ScrollAnimation>

              {/* 5. Generador de contraseñas */}
              <ScrollAnimation variant="fadeInUp" delay={0.5}>
                <div className="relative flex flex-col items-center">
                  <div aria-hidden="true" className="absolute h-1 border-t border-dashed border-gray-700 hidden md:block" style={{ width: '100%', top: '2.5rem', left: '50%' }}></div>
                  <div className="relative w-16 h-16 mb-4">
                    <div className="absolute inset-0 rounded-full opacity-30 bg-gradient-to-tr from-yellow-500 to-yellow-400 blur-md"></div>
                    <div className="relative flex items-center justify-center w-full h-full rounded-full bg-yellow-600">
                      <svg className="w-8 h-8" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                        <path className="fill-current text-yellow-100" d="M16 0C7.163 0 0 7.163 0 16s7.163 16 16 16 16-7.163 16-16S24.837 0 16 0zm0 28C9.373 28 4 22.627 4 16S9.373 4 16 4s12 5.373 12 12-5.373 12-12 12z" />
                        <path className="fill-current text-yellow-100" d="M20 10h-1.4l-2.584 2.584-3.4-3.4a1.98 1.98 0 00-2.8 0l-4.2 4.2a1.98 1.98 0 000 2.8l7.8 7.8a1.98 1.98 0 002.8 0l7.784-7.784V14a2 2 0 00-2-2h-2zm-4 14l-8-8 4-4 3.6 3.6.4.4L20 12h2v2l-6 6.4V24z" />
                      </svg>
                    </div>
                  </div>
                  <h4 className="h4 mb-2">Generador de contraseñas</h4>
                  <p className="text-center text-lg text-gray-400">
                    Crea contraseñas seguras y únicas con nuestro generador integrado.
                  </p>
                </div>
              </ScrollAnimation>

              {/* 6. Autocompletado seguro */}
              <ScrollAnimation variant="fadeInUp" delay={0.6}>
                <div className="relative flex flex-col items-center">
                  <div className="relative w-16 h-16 mb-4">
                    <div className="absolute inset-0 rounded-full opacity-30 bg-gradient-to-tr from-indigo-500 to-indigo-400 blur-md"></div>
                    <div className="relative flex items-center justify-center w-full h-full rounded-full bg-indigo-600">
                      <svg className="w-8 h-8" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                        <path className="fill-current text-indigo-100" d="M16 0C7.163 0 0 7.163 0 16s7.163 16 16 16 16-7.163 16-16S24.837 0 16 0zm0 28C9.373 28 4 22.627 4 16S9.373 4 16 4s12 5.373 12 12-5.373 12-12 12z" />
                        <path className="fill-current text-indigo-100" d="M16 10a6 6 0 00-6 6v8h12v-8a6 6 0 00-6-6zm4 12h-8v-6a4 4 0 118 0v6z" />
                        <path className="fill-current text-indigo-100" d="M16 18a2 2 0 100 4 2 2 0 000-4z" />
                      </svg>
                    </div>
                  </div>
                  <h4 className="h4 mb-2">Autocompletado seguro</h4>
                  <p className="text-center text-lg text-gray-400">
                    Rellena automáticamente tus credenciales con un solo clic, de forma segura y rápida.
                  </p>
                </div>
              </ScrollAnimation>
            </div>

            {/* CTA */}
            <ScrollAnimation variant="fadeInUp" delay={0.7} className="text-center mt-12">
              <div className="max-w-xs mx-auto sm:max-w-none sm:flex sm:justify-center">
                <div>
                  <Link href="/descargar" className="btn text-white bg-purple-600 hover:bg-purple-700 w-full mb-4 sm:w-auto sm:mb-0">
                    Probar PASSWD ahora
                  </Link>
                </div>
                <div>
                  <Link href="/precios" className="btn text-white bg-gray-700 hover:bg-gray-800 w-full sm:w-auto sm:ml-4">
                    Ver precios
                  </Link>
                </div>
              </div>
            </ScrollAnimation>
          </div>
        </div>
      </section>
    </PageTransition>
  );
} 