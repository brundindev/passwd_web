import Image from 'next/image'
import Link from 'next/link'

import { FiLock, FiShield, FiSmartphone, FiDatabase, FiRefreshCw, FiClipboard } from 'react-icons/fi'

export const metadata = {
  title: 'Funciones - PASSWD',
  description: 'Descubre todas las funcionalidades que PASSWD ofrece para gestionar tus contraseñas de forma segura.',
}

export default function Funciones() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="grow">
        {/* Encabezado */}
        <section className="relative">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="pt-32 pb-12 md:pt-40 md:pb-20">
              <div className="max-w-3xl mx-auto text-center">
                <h1 className="h1 mb-4" data-aos="fade-up">Funciones de PASSWD</h1>
                <p className="text-xl text-gray-400 mb-8" data-aos="fade-up" data-aos-delay="200">
                  Gestiona tus contraseñas con total seguridad y facilidad
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Funcionalidades */}
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
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 md:gap-12 lg:gap-16" data-aos-id-features>
                
                {/* Tarjeta 1 */}
                <div className="relative flex flex-col items-center" data-aos="fade-up" data-aos-anchor="[data-aos-id-features]">
                  <div className="w-16 h-16 mb-4 rounded-full bg-purple-600 flex items-center justify-center">
                    <FiLock className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="h4 mb-2">Almacenamiento Seguro</h4>
                  <p className="text-lg text-gray-400 text-center">
                    Guarda todas tus contraseñas con cifrado de extremo a extremo, asegurando que solo tú puedas acceder a ellas.
                  </p>
                </div>

                {/* Tarjeta 2 */}
                <div className="relative flex flex-col items-center" data-aos="fade-up" data-aos-delay="100" data-aos-anchor="[data-aos-id-features]">
                  <div className="w-16 h-16 mb-4 rounded-full bg-blue-500 flex items-center justify-center">
                    <FiShield className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="h4 mb-2">Autenticación Biométrica</h4>
                  <p className="text-lg text-gray-400 text-center">
                    Accede rápidamente a tus contraseñas utilizando tu huella digital o reconocimiento facial.
                  </p>
                </div>

                {/* Tarjeta 3 */}
                <div className="relative flex flex-col items-center" data-aos="fade-up" data-aos-delay="200" data-aos-anchor="[data-aos-id-features]">
                  <div className="w-16 h-16 mb-4 rounded-full bg-green-500 flex items-center justify-center">
                    <FiSmartphone className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="h4 mb-2">Sincronización Multiplataforma</h4>
                  <p className="text-lg text-gray-400 text-center">
                    Accede a tus contraseñas desde cualquier dispositivo, siempre sincronizadas y actualizadas.
                  </p>
                </div>

                {/* Tarjeta 4 */}
                <div className="relative flex flex-col items-center" data-aos="fade-up" data-aos-delay="300" data-aos-anchor="[data-aos-id-features]">
                  <div className="w-16 h-16 mb-4 rounded-full bg-yellow-500 flex items-center justify-center">
                    <FiDatabase className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="h4 mb-2">Categorización Inteligente</h4>
                  <p className="text-lg text-gray-400 text-center">
                    Organiza tus contraseñas por categorías para encontrarlas rápidamente cuando las necesites.
                  </p>
                </div>

                {/* Tarjeta 5 */}
                <div className="relative flex flex-col items-center" data-aos="fade-up" data-aos-delay="400" data-aos-anchor="[data-aos-id-features]">
                  <div className="w-16 h-16 mb-4 rounded-full bg-red-500 flex items-center justify-center">
                    <FiRefreshCw className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="h4 mb-2">Generador de Contraseñas</h4>
                  <p className="text-lg text-gray-400 text-center">
                    Crea contraseñas seguras y únicas con nuestro generador avanzado, personalizando longitud y complejidad.
                  </p>
                </div>

                {/* Tarjeta 6 */}
                <div className="relative flex flex-col items-center" data-aos="fade-up" data-aos-delay="500" data-aos-anchor="[data-aos-id-features]">
                  <div className="w-16 h-16 mb-4 rounded-full bg-indigo-500 flex items-center justify-center">
                    <FiClipboard className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="h4 mb-2">Autocompletado Seguro</h4>
                  <p className="text-lg text-gray-400 text-center">
                    Rellena automáticamente tus credenciales en tus sitios web favoritos con total seguridad.
                  </p>
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
      </main>
    </div>
  )
} 