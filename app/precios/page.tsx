import Image from 'next/image'
import Link from 'next/link'
import { FiCheck } from 'react-icons/fi'

export const metadata = {
  title: 'Precios - PASSWD',
  description: 'PASSWD es completamente gratuito. Descubre todas las funcionalidades incluidas sin ningún coste.',
}

export default function Precios() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="grow">
        {/* Encabezado */}
        <section className="relative">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="pt-32 pb-12 md:pt-40 md:pb-20">
              <div className="max-w-3xl mx-auto text-center">
                <h1 className="h1 mb-4" data-aos="fade-up">Siempre Gratuito</h1>
                <p className="text-xl text-gray-400 mb-8" data-aos="fade-up" data-aos-delay="200">
                  PASSWD es y siempre será completamente gratuito para todos los usuarios
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Tarjeta de precios */}
        <section className="bg-gradient-to-b from-gray-900 to-gray-800">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="py-12 md:py-20">
              <div className="max-w-sm mx-auto md:max-w-none" data-aos-id-pricing>
                <div className="flex flex-col md:flex-row md:items-center md:justify-center max-w-xl md:max-w-none mx-auto">
                
                  {/* Plan gratuito */}
                  <div className="w-full max-w-md mx-auto md:mx-0" data-aos="fade-up" data-aos-delay="100" data-aos-anchor="[data-aos-id-pricing]">
                    <div className="relative flex flex-col h-full p-6 bg-gray-800 rounded shadow-xl transform transition duration-300 hover:scale-105">
                      <div className="mb-4">
                        <div className="text-2xl font-bold text-purple-600 mb-4">100% GRATUITO</div>
                        <div className="inline-flex items-baseline mb-2">
                          <span className="text-5xl font-bold">€0</span>
                          <span className="text-xl text-gray-500 ml-1">/siempre</span>
                        </div>
                        <div className="text-lg text-gray-400">Todas las funciones sin límites</div>
                      </div>
                      <div className="flex mb-6">
                        <Link href="/descargar" className="btn text-white bg-purple-600 hover:bg-purple-700 w-full">
                          Descargar Ahora
                        </Link>
                      </div>
                      <div className="text-gray-400 font-medium mb-3">Incluye:</div>
                      <ul className="text-gray-400 -mb-2 flex-grow">
                        <li className="flex items-center mb-2">
                          <FiCheck className="w-4 h-4 text-green-500 mr-3" />
                          <span>Almacenamiento ilimitado de contraseñas</span>
                        </li>
                        <li className="flex items-center mb-2">
                          <FiCheck className="w-4 h-4 text-green-500 mr-3" />
                          <span>Cifrado avanzado de extremo a extremo</span>
                        </li>
                        <li className="flex items-center mb-2">
                          <FiCheck className="w-4 h-4 text-green-500 mr-3" />
                          <span>Sincronización en múltiples dispositivos</span>
                        </li>
                        <li className="flex items-center mb-2">
                          <FiCheck className="w-4 h-4 text-green-500 mr-3" />
                          <span>Generador de contraseñas seguras</span>
                        </li>
                        <li className="flex items-center mb-2">
                          <FiCheck className="w-4 h-4 text-green-500 mr-3" />
                          <span>Autenticación biométrica</span>
                        </li>
                        <li className="flex items-center mb-2">
                          <FiCheck className="w-4 h-4 text-green-500 mr-3" />
                          <span>Autocompletado en navegadores</span>
                        </li>
                        <li className="flex items-center mb-2">
                          <FiCheck className="w-4 h-4 text-green-500 mr-3" />
                          <span>Soporte técnico por correo</span>
                        </li>
                        <li className="flex items-center mb-2">
                          <FiCheck className="w-4 h-4 text-green-500 mr-3" />
                          <span>Actualizaciones automáticas</span>
                        </li>
                      </ul>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section>
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="py-12 md:py-20 border-t border-gray-800">
              <div className="max-w-3xl mx-auto">
                
                <h2 className="h2 mb-6 text-center">Preguntas Frecuentes</h2>
                
                <div className="space-y-6">
                  <div>
                    <h4 className="text-xl font-medium mb-2">¿Cómo puede ser PASSWD gratuito?</h4>
                    <p className="text-gray-400">
                      Creemos que la seguridad digital es un derecho fundamental. Nuestro objetivo es proporcionar una herramienta de gestión de contraseñas accesible para todos, independientemente de su situación económica.
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="text-xl font-medium mb-2">¿Hay algún coste oculto?</h4>
                    <p className="text-gray-400">
                      No, PASSWD es y seguirá siendo completamente gratuito. No hay costes ocultos, cargos adicionales ni funciones premium. Todas las características están disponibles para todos los usuarios.
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="text-xl font-medium mb-2">¿Venderéis mis datos a terceros?</h4>
                    <p className="text-gray-400">
                      No. Nunca vendemos ni compartimos tus datos con terceros. Tu privacidad es nuestra prioridad y tus contraseñas permanecen cifradas de extremo a extremo en todo momento.
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="text-xl font-medium mb-2">¿Cómo se financia PASSWD?</h4>
                    <p className="text-gray-400">
                      PASSWD es un proyecto de código abierto mantenido por una comunidad de desarrolladores apasionados por la seguridad digital. Aceptamos donaciones voluntarias de aquellos que desean apoyar nuestro trabajo.
                    </p>
                  </div>
                </div>
                
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section>
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="pb-12 md:pb-20">
              <div className="bg-purple-600 rounded py-10 px-8 md:py-16 md:px-12 shadow-2xl" data-aos="zoom-y-out">
                <div className="flex flex-col lg:flex-row justify-between items-center">
                  <div className="mb-6 lg:mb-0 lg:mr-16 lg:w-2/3 text-center lg:text-left">
                    <h3 className="h3 text-white mb-2">¿A qué esperas?</h3>
                    <p className="text-purple-200">Descarga PASSWD hoy mismo y comienza a gestionar tus contraseñas de forma segura, sin ningún coste.</p>
                  </div>
                  <div className="flex justify-center">
                    <Link href="/descargar" className="btn text-purple-600 bg-gradient-to-r from-white to-gray-100 hover:from-gray-100 hover:to-white shadow">
                      Descargar Gratis
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
} 