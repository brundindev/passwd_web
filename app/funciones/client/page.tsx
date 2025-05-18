"use client";

import Image from 'next/image'
import Link from 'next/link'
import { FiLock, FiShield, FiSmartphone, FiDatabase, FiRefreshCw, FiClipboard } from 'react-icons/fi'
import PageTransition from "@/components/ui/animation/page-transition";
import ScrollAnimation from "@/components/ui/animation/scroll-animation";

export default function FuncionesClient() {
  return (
    <PageTransition>
      <div className="flex flex-col min-h-screen">
        <main className="grow">
          {/* Encabezado */}
          <section className="relative">
            <div className="max-w-6xl mx-auto px-4 sm:px-6">
              <div className="pt-32 pb-12 md:pt-40 md:pb-20">
                <div className="max-w-3xl mx-auto text-center">
                  <ScrollAnimation variant="fadeInUp">
                    <h1 className="h1 mb-4">Funciones de PASSWD</h1>
                    <p className="text-xl text-gray-400 mb-8">
                      Gestiona tus contraseñas con total seguridad y facilidad
                    </p>
                  </ScrollAnimation>
                </div>
              </div>
            </div>
          </section>

          {/* Funcionalidades */}
          <ScrollAnimation variant="fadeInUp" delay={0.2}>
            <section>
              <div className="max-w-6xl mx-auto px-4 sm:px-6">
                <div className="py-12 md:py-20">
                  <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
                    <h2 className="h2 mb-4">Todo lo que necesitas para tu seguridad digital</h2>
                    <p className="text-xl text-gray-400">
                      PASSWD ofrece funciones avanzadas para proteger toda tu información sensible
                    </p>
                  </div>

                  {/* Tarjetas de funcionalidades */}
                  <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 md:gap-12 lg:gap-16">
                    
                    {/* Tarjeta 1 */}
                    <ScrollAnimation variant="fadeInUp" delay={0.1}>
                      <div className="relative flex flex-col items-center">
                        <div className="w-16 h-16 mb-4 rounded-full bg-purple-600 flex items-center justify-center">
                          <FiLock className="w-6 h-6 text-white" />
                        </div>
                        <h4 className="h4 mb-2">Almacenamiento Seguro</h4>
                        <p className="text-lg text-gray-400 text-center">
                          Guarda todas tus contraseñas con cifrado de extremo a extremo, asegurando que solo tú puedas acceder a ellas.
                        </p>
                      </div>
                    </ScrollAnimation>

                    {/* Tarjeta 2 */}
                    <ScrollAnimation variant="fadeInUp" delay={0.2}>
                      <div className="relative flex flex-col items-center">
                        <div className="w-16 h-16 mb-4 rounded-full bg-blue-500 flex items-center justify-center">
                          <FiShield className="w-6 h-6 text-white" />
                        </div>
                        <h4 className="h4 mb-2">Autenticación Biométrica <span className="text-red-500 font-semibold">En desarrollo</span></h4>
                        <p className="text-lg text-gray-400 text-center">
                          Accede rápidamente a tus contraseñas utilizando tu huella digital o reconocimiento facial.
                        </p>
                      </div>
                    </ScrollAnimation>

                    {/* Tarjeta 3 */}
                    <ScrollAnimation variant="fadeInUp" delay={0.3}>
                      <div className="relative flex flex-col items-center">
                        <div className="w-16 h-16 mb-4 rounded-full bg-green-500 flex items-center justify-center">
                          <FiSmartphone className="w-6 h-6 text-white" />
                        </div>
                        <h4 className="h4 mb-2">Sincronización Multiplataforma</h4>
                        <p className="text-lg text-gray-400 text-center">
                          Accede a tus contraseñas desde cualquier dispositivo, siempre sincronizadas y actualizadas.
                        </p>
                      </div>
                    </ScrollAnimation>

                    {/* Tarjeta 4 */}
                    <ScrollAnimation variant="fadeInUp" delay={0.4}>
                      <div className="relative flex flex-col items-center">
                        <div className="w-16 h-16 mb-4 rounded-full bg-yellow-500 flex items-center justify-center">
                          <FiDatabase className="w-6 h-6 text-white" />
                        </div>
                        <h4 className="h4 mb-2">Categorización Inteligente</h4>
                        <p className="text-lg text-gray-400 text-center">
                          Organiza tus contraseñas por categorías para encontrarlas rápidamente cuando las necesites.
                        </p>
                      </div>
                    </ScrollAnimation>

                    {/* Tarjeta 5 */}
                    <ScrollAnimation variant="fadeInUp" delay={0.5}>
                      <div className="relative flex flex-col items-center">
                        <div className="w-16 h-16 mb-4 rounded-full bg-red-500 flex items-center justify-center">
                          <FiRefreshCw className="w-6 h-6 text-white" />
                        </div>
                        <h4 className="h4 mb-2">Generador de Contraseñas</h4>
                        <p className="text-lg text-gray-400 text-center">
                          Crea contraseñas seguras y únicas con nuestro generador avanzado, personalizando longitud y complejidad.
                        </p>
                      </div>
                    </ScrollAnimation>

                    {/* Tarjeta 6 */}
                    <ScrollAnimation variant="fadeInUp" delay={0.6}>
                      <div className="relative flex flex-col items-center">
                        <div className="w-16 h-16 mb-4 rounded-full bg-indigo-500 flex items-center justify-center">
                          <FiClipboard className="w-6 h-6 text-white" />
                        </div>
                        <h4 className="h4 mb-2">Autocompletado Seguro</h4>
                        <p className="text-lg text-gray-400 text-center">
                          Rellena automáticamente tus credenciales en tus sitios web favoritos con total seguridad.
                        </p>
                      </div>
                    </ScrollAnimation>

                  </div>

                </div>
              </div>
            </section>
          </ScrollAnimation>

          {/* CTA */}
          <ScrollAnimation variant="zoomIn" delay={0.7}>
            <section>
              <div className="max-w-6xl mx-auto px-4 sm:px-6">
                <div className="pb-12 md:pb-20">
                  <div className="bg-purple-600 rounded py-10 px-8 md:py-16 md:px-12 shadow-2xl">
                    <div className="flex flex-col lg:flex-row justify-between items-center">
                      <div className="mb-6 lg:mb-0 lg:mr-16 lg:w-2/3 text-center lg:text-left">
                        <h3 className="h3 text-white mb-2">¿Listo para proteger tus contraseñas?</h3>
                        <p className="text-purple-200">Comienza a utilizar PASSWD hoy mismo, ¡es completamente gratuito!</p>
                      </div>
                      <div className="flex justify-center">
                        <Link href="/descargar" className="btn text-purple-600 bg-gradient-to-r from-white to-gray-100 hover:from-gray-100 hover:to-white shadow">
                          Descargar Ahora
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </ScrollAnimation>
        </main>
      </div>
    </PageTransition>
  )
} 