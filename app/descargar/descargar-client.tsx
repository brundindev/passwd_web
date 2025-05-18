"use client";

import Link from "next/link";
import Image from "next/image";
import PageTransition from "@/components/ui/animation/page-transition";
import ScrollAnimation from "@/components/ui/animation/scroll-animation";

export default function DescargarClient() {
  return (
    <PageTransition>
      <section className="relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="pt-20 pb-12 md:pt-24 md:pb-20">
            {/* Encabezado */}
            <ScrollAnimation
              variant="fadeInUp"
              className="max-w-3xl mx-auto text-center pb-10 md:pb-12"
            >
              <h1 className="h1 text-4xl md:text-5xl font-bold font-nacelle animate-[gradient_6s_linear_infinite] bg-[linear-gradient(to_right,var(--color-gray-200),var(--color-indigo-200),var(--color-gray-50),var(--color-indigo-300),var(--color-gray-200))] bg-[length:200%_auto] bg-clip-text text-transparent mb-4">Descarga PASSWD</h1>
              <p className="text-xl text-gray-400">
                Disponible para todas las plataformas. Gestiona tus contraseñas en cualquier dispositivo.
              </p>
            </ScrollAnimation>

            {/* Sección de descargas de escritorio */}
            <ScrollAnimation
              variant="fadeInUp"
              delay={0.2}
              className="mb-16"
            >
              <div className="max-w-3xl mx-auto">
                <h2 className="h3 mb-8 text-center">Versiones de escritorio</h2>

                <div className="grid md:grid-cols-3 gap-8">
                  {/* macOS */}
                  <div className="relative flex flex-col items-center p-6 bg-gray-800 rounded shadow-xl">
                    <div className="relative w-20 h-20 flex items-center justify-center mb-3">
                      <div className="absolute inset-0 rounded-full opacity-20 bg-gradient-to-tr from-purple-500 to-indigo-500 blur-md"></div>
                      <Image
                        src="/images/macos-icon.png"
                        width={64}
                        height={64}
                        alt="macOS"
                        className="drop-shadow-lg"
                      />
                    </div>
                    <h4 className="text-xl font-bold leading-snug tracking-tight mb-1">macOS</h4>
                    <p className="text-gray-400 text-center mb-4">v1.0.0</p>
                    <a href="/passwd%201.0.0.dmg" download className="btn-sm text-white bg-purple-600 hover:bg-purple-700 w-full text-center flex items-center justify-center">
                      Descargar para Mac
                    </a>
                  </div>

                  {/* Windows */}
                  <div className="relative flex flex-col items-center p-6 bg-gray-800 rounded shadow-xl">
                    <div className="relative w-20 h-20 flex items-center justify-center mb-3">
                      <div className="absolute inset-0 rounded-full opacity-20 bg-gradient-to-tr from-blue-500 to-indigo-500 blur-md"></div>
                      <Image
                        src="/images/windows-icon.png"
                        width={64}
                        height={64}
                        alt="Windows"
                        className="drop-shadow-lg"
                      />
                    </div>
                    <h4 className="text-xl font-bold leading-snug tracking-tight mb-1">Windows</h4>
                    <p className="text-gray-400 text-center mb-4">v1.0.0</p>
                    <button 
                      disabled
                      title="Próximamente..."
                      className="btn-sm text-white bg-purple-600/50 w-full text-center cursor-not-allowed opacity-70"
                    >
                      Descargar para Windows
                    </button>
                  </div>

                  {/* Linux */}
                  <div className="relative flex flex-col items-center p-6 bg-gray-800 rounded shadow-xl">
                    <div className="relative w-20 h-20 flex items-center justify-center mb-3">
                      <div className="absolute inset-0 rounded-full opacity-20 bg-gradient-to-tr from-green-500 to-teal-500 blur-md"></div>
                      <Image
                        src="/images/linux-icon.png"
                        width={64}
                        height={64}
                        alt="Linux"
                        className="drop-shadow-lg"
                      />
                    </div>
                    <h4 className="text-xl font-bold leading-snug tracking-tight mb-1">Linux</h4>
                    <p className="text-gray-400 text-center mb-4">v1.0.0</p>
                    <button 
                      disabled
                      title="Próximamente..."
                      className="btn-sm text-white bg-purple-600/50 w-full text-center cursor-not-allowed opacity-70"
                    >
                      Descargar para Linux
                    </button>
                  </div>
                </div>
              </div>
            </ScrollAnimation>

            {/* Sección de aplicaciones móviles */}
            <ScrollAnimation
              variant="fadeInUp"
              delay={0.4}
              className="mb-16"
            >
              <div className="max-w-3xl mx-auto">
                <h2 className="h3 mb-8 text-center">Aplicaciones móviles</h2>

                <div className="grid md:grid-cols-2 gap-8 max-w-xl mx-auto">
                  {/* iOS */}
                  <div className="relative flex flex-col items-center p-6 bg-gray-800 rounded shadow-xl">
                    <div className="relative w-20 h-20 flex items-center justify-center mb-3">
                      <div className="absolute inset-0 rounded-full opacity-20 bg-gradient-to-tr from-gray-200 to-gray-400 blur-md"></div>
                      <Image
                        src="/images/apple-icon.png"
                        width={64}
                        height={64}
                        alt="iOS"
                        className="drop-shadow-lg"
                      />
                    </div>
                    <h4 className="text-xl font-bold leading-snug tracking-tight mb-1">iOS</h4>
                    <p className="text-gray-400 text-center mb-4">iPhone y iPad</p>
                    <button
                      title="Próximamente..."
                      className="btn-sm text-white bg-purple-600/50 w-full text-center cursor-not-allowed opacity-70"
                    >
                      Descargar en App Store
                    </button>
                  </div>

                  {/* Android */}
                  <div className="relative flex flex-col items-center p-6 bg-gray-800 rounded shadow-xl">
                    <div className="relative w-20 h-20 flex items-center justify-center mb-3">
                      <div className="absolute inset-0 rounded-full opacity-20 bg-gradient-to-tr from-green-500 to-teal-500 blur-md"></div>
                      <Image
                        src="/images/android-icon.png"
                        width={64}
                        height={64}
                        alt="Android"
                        className="drop-shadow-lg"
                      />
                    </div>
                    <h4 className="text-xl font-bold leading-snug tracking-tight mb-1">Android</h4>
                    <p className="text-gray-400 text-center mb-4">Teléfonos y tablets</p>
                    <button 
                      disabled
                      title="Próximamente..."
                      className="btn-sm text-white bg-purple-600/50 w-full text-center cursor-not-allowed opacity-70"
                    >
                      Descargar en Google Play
                    </button>
                  </div>
                </div>
              </div>
            </ScrollAnimation>

            {/* Sección de extensiones */}
            <ScrollAnimation
              variant="fadeInUp"
              delay={0.6}
              className="mb-16"
            >
              <div className="max-w-3xl mx-auto">
                <h2 className="h3 mb-8 text-center">Extensiones de navegador</h2>

                <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
                  {/* Chrome */}
                  <div className="relative flex flex-col items-center p-5 bg-gray-800 rounded shadow-sm">
                    <div className="relative w-16 h-16 flex items-center justify-center mb-3">
                      <div className="absolute inset-0 rounded-full opacity-20 bg-gradient-to-tr from-blue-500 to-indigo-500 blur-md"></div>
                      <Image
                        src="/images/chrome-icon.png"
                        width={50}
                        height={50}
                        alt="Chrome"
                        className="drop-shadow-lg"
                      />
                    </div>
                    <h4 className="text-lg font-bold leading-snug tracking-tight mb-1">Chrome</h4>
                    <a href="/extension-passwd.zip" download className="btn-xs text-white bg-purple-600 hover:bg-purple-700 w-full text-center flex items-center justify-center">
                      Instalar
                    </a>
                  </div>
                </div>
              </div>
            </ScrollAnimation>

            {/* Notas de la versión */}
            <ScrollAnimation
              variant="fadeInUp"
              delay={0.8}
              className="mb-8"
            >
              <div className="max-w-3xl mx-auto">
                <h2 className="h3 mb-4 text-center">Notas de la versión</h2>
                <div className="bg-gray-800 p-5 rounded">
                  <h4 className="text-xl font-bold mb-3">Versión 1.0.2-a (Actual)</h4>
                  <ul className="text-gray-400 space-y-2">
                    <li>• Lanzamiento inicial de PASSWD</li>
                    <li>• Implementación del cifrado de extremo a extremo</li>
                    <li>• Soporte para sincronización entre dispositivos</li>
                    <li>• Generador de contraseñas seguras</li>
                    <li>• Autenticación biométrica en dispositivos compatibles <span className="text-red-500 font-semibold">En desarrollo</span></li>
                    <li>• Extensiones de navegador para autocompletado</li>
                  </ul>
                </div>
              </div>
            </ScrollAnimation>

            {/* Call to action */}
            <ScrollAnimation
              variant="fadeInUp"
              delay={1.0}
              className="text-center"
            >
              <h3 className="h3 mb-4">¿Necesitas ayuda para empezar?</h3>
              <p className="text-lg text-gray-400 mb-8">Consulta nuestra documentación para obtener guías detalladas sobre cómo usar PASSWD.</p>
              <div className="max-w-xs mx-auto sm:max-w-none sm:flex sm:justify-center">
                <div>
                  <Link href="#" className="btn text-white bg-purple-600 hover:bg-purple-700 w-full mb-4 sm:w-auto sm:mb-0">
                    Ver Precios
                  </Link>
                </div>
                <div>
                  <Link href="/funciones" className="btn text-white bg-gray-700 hover:bg-gray-800 w-full sm:w-auto sm:ml-4">
                    Ver funcionalidades
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