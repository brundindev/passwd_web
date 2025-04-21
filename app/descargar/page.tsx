export const metadata = {
  title: "Descargar PASSWD - Disponible para todas las plataformas",
  description: "Descarga PASSWD para macOS, Windows, Linux, iOS, Android y como extensión para Chrome",
};

import Link from "next/link";
import Image from "next/image";

export default function Download() {
  return (
    <>
      {/* Sección de héroe */}
      <section className="relative">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="pt-12 md:pt-20">
            {/* Encabezado de la sección */}
            <div className="max-w-4xl mx-auto pb-12 text-center md:pb-20">
              <h1 className="font-nacelle text-4xl font-semibold md:text-5xl mb-4 animate-[gradient_6s_linear_infinite] bg-[linear-gradient(to_right,var(--color-gray-200),var(--color-indigo-200),var(--color-gray-50),var(--color-indigo-300),var(--color-gray-200))] bg-[length:200%_auto] bg-clip-text text-transparent">
                Descarga PASSWD en cualquier dispositivo
              </h1>
              <p className="text-gray-400 text-center">
                Lleva tus contraseñas contigo a cualquier lugar. PASSWD está disponible para todas las plataformas.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Sección de descargas */}
      <section>
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="pb-12 md:pb-20">
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              
              {/* macOS */}
              <div className="bg-gray-800/30 rounded-xl p-6 border border-gray-700 transition-transform duration-300 hover:scale-[1.02] hover:shadow-xl">
                <div className="mb-4 flex justify-center">
                  <div className="h-16 w-16 flex items-center justify-center rounded-full bg-indigo-900/50">
                    <svg className="h-8 w-8 text-indigo-400" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                    </svg>
                  </div>
                </div>
                <h3 className="mb-2 text-center text-xl font-semibold text-white">macOS</h3>
                <p className="text-sm text-gray-400 text-center mb-4">Optimizado para Apple Silicon y Intel</p>
                <div className="flex justify-center space-x-4">
                  <a 
                    href="#" 
                    className="btn-sm bg-linear-to-t from-indigo-600 to-indigo-500 text-white shadow-[inset_0px_1px_0px_--theme(--color-white/.16)] hover:bg-[length:100%_150%]"
                  >
                    Descargar dmg
                  </a>
                  <a 
                    href="#" 
                    className="btn-sm bg-gray-700 text-gray-300 hover:bg-gray-600"
                  >
                    App Store
                  </a>
                </div>
              </div>

              {/* Windows */}
              <div className="bg-gray-800/30 rounded-xl p-6 border border-gray-700 transition-transform duration-300 hover:scale-[1.02] hover:shadow-xl">
                <div className="mb-4 flex justify-center">
                  <div className="h-16 w-16 flex items-center justify-center rounded-full bg-indigo-900/50">
                    <svg className="h-8 w-8 text-indigo-400" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M3 12V6.75l6-1.32v6.48L3 12m17-9v8.75l-10 .15V5.21L20 3M3 13l6 .09v6.81l-6-1.15V13m17 .25V22l-10-1.91V13.1l10 .15z"/>
                    </svg>
                  </div>
                </div>
                <h3 className="mb-2 text-center text-xl font-semibold text-white">Windows</h3>
                <p className="text-sm text-gray-400 text-center mb-4">Compatible con Windows 10/11</p>
                <div className="flex justify-center space-x-4">
                  <a 
                    href="#" 
                    className="btn-sm bg-linear-to-t from-indigo-600 to-indigo-500 text-white shadow-[inset_0px_1px_0px_--theme(--color-white/.16)] hover:bg-[length:100%_150%]"
                  >
                    Descargar exe
                  </a>
                  <a 
                    href="#" 
                    className="btn-sm bg-gray-700 text-gray-300 hover:bg-gray-600"
                  >
                    Microsoft Store
                  </a>
                </div>
              </div>

              {/* Linux */}
              <div className="bg-gray-800/30 rounded-xl p-6 border border-gray-700 transition-transform duration-300 hover:scale-[1.02] hover:shadow-xl">
                <div className="mb-4 flex justify-center">
                  <div className="h-16 w-16 flex items-center justify-center rounded-full bg-indigo-900/50">
                    <svg className="h-8 w-8 text-indigo-400" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M14.62 8.35c-.42.28-1.08 1.48-1.23 2.03-.05.2-.1.45-.11.67 0 .28-.04.59-.12.86-.32 1.13-1.05 1.9-2.76 1.9h-.18c-1.46 0-2.35-.7-2.72-1.88-.08-.34-.13-.67-.15-.98 0-.2-.03-.37-.07-.54-.2-.73-1.17-2.04-1.54-2.19-.42-.18-.85-.32-1.23-.5-.38-.17-.79-.38-1.07-.6-.28-.22-.52-.5-.65-.85a2 2 0 0 1-.11-.71c0-.26.03-.54.11-.8.08-.28.21-.54.38-.8.16-.28.39-.54.62-.8.22-.28.5-.5.79-.74.29-.24.58-.5.9-.71.3-.22.6-.48.9-.7.3-.24.58-.47.85-.73.29-.26.54-.54.76-.84.23-.34.42-.65.57-1.05.16-.4.26-.83.29-1.27 0-.2.06-.4.13-.6a2.1 2.1 0 0 1 .4-.59c.16-.16.38-.31.6-.42.23-.1.48-.16.73-.16.31 0 .6.08.85.21.25.13.46.33.67.56.18.22.37.48.54.75.17.26.32.57.45.86.13.3.25.59.34.86.09.29.15.59.21.85a7.61 7.61 0 0 1 1.15-.86c.3-.18.6-.37.94-.5.34-.11.68-.22 1.04-.24.36-.04.71 0 1.05.08.33.09.67.22.93.44.27.21.48.5.6.82.1.33.14.68.12 1.03-.02.34-.11.67-.22.98-.12.3-.3.6-.5.86-.19.27-.4.53-.63.76-.24.22-.49.44-.75.63-.2.14-.37.31-.57.45-.2.13-.4.24-.6.37a16.1 16.1 0 0 0-1.19.94c-.37.3-.7.67-1.05.97M12 2a10 10 0 0 1 10 10 10 10 0 0 1-10 10A10 10 0 0 1 2 12 10 10 0 0 1 12 2m0 2a8 8 0 0 0-8 8 8 8 0 0 0 8 8 8 8 0 0 0 8-8 8 8 0 0 0-8-8Z"/>
                    </svg>
                  </div>
                </div>
                <h3 className="mb-2 text-center text-xl font-semibold text-white">Linux</h3>
                <p className="text-sm text-gray-400 text-center mb-4">Para Ubuntu, Debian, Fedora, y más</p>
                <div className="flex justify-center space-x-4">
                  <a 
                    href="#" 
                    className="btn-sm bg-linear-to-t from-indigo-600 to-indigo-500 text-white shadow-[inset_0px_1px_0px_--theme(--color-white/.16)] hover:bg-[length:100%_150%]"
                  >
                    Descargar .deb
                  </a>
                  <a 
                    href="#" 
                    className="btn-sm bg-gray-700 text-gray-300 hover:bg-gray-600"
                  >
                    .rpm
                  </a>
                </div>
              </div>

              {/* iOS */}
              <div className="bg-gray-800/30 rounded-xl p-6 border border-gray-700 transition-transform duration-300 hover:scale-[1.02] hover:shadow-xl">
                <div className="mb-4 flex justify-center">
                  <div className="h-16 w-16 flex items-center justify-center rounded-full bg-indigo-900/50">
                    <svg className="h-8 w-8 text-indigo-400" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.25 18H6.75V4h10.5M14 21h-4v-1h4m2-19H8a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2z"/>
                    </svg>
                  </div>
                </div>
                <h3 className="mb-2 text-center text-xl font-semibold text-white">iOS</h3>
                <p className="text-sm text-gray-400 text-center mb-4">Para iPhone y iPad</p>
                <div className="flex justify-center">
                  <a 
                    href="#" 
                    className="btn-sm bg-linear-to-t from-indigo-600 to-indigo-500 text-white shadow-[inset_0px_1px_0px_--theme(--color-white/.16)] hover:bg-[length:100%_150%]"
                  >
                    App Store
                  </a>
                </div>
              </div>

              {/* Android */}
              <div className="bg-gray-800/30 rounded-xl p-6 border border-gray-700 transition-transform duration-300 hover:scale-[1.02] hover:shadow-xl">
                <div className="mb-4 flex justify-center">
                  <div className="h-16 w-16 flex items-center justify-center rounded-full bg-indigo-900/50">
                    <svg className="h-8 w-8 text-indigo-400" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M7.2 16.8h9.6v-9.6H7.2m12 2.4a1.2 1.2 0 0 1 1.2 1.2v2.4a1.2 1.2 0 0 1-1.2 1.2v3.6c0 .67-.53 1.2-1.2 1.2-.67 0-1.2-.53-1.2-1.2V18h-9.6v3.6c0 .67-.53 1.2-1.2 1.2-.67 0-1.2-.53-1.2-1.2V18a1.2 1.2 0 0 1-1.2-1.2v-2.4a1.2 1.2 0 0 1 1.2-1.2V6.68c0-1.82 1.5-3.27 3.33-3.27l1.27.01 1-1a1.51 1.51 0 0 1 2.13 0l1 1 1.27-.01c1.82 0 3.33 1.46 3.33 3.27V12M10.8 6c-.33 0-.6.27-.6.6s.27.6.6.6.6-.27.6-.6-.27-.6-.6-.6m2.4 0c-.33 0-.6.27-.6.6s.27.6.6.6.6-.27.6-.6-.27-.6-.6-.6z"/>
                    </svg>
                  </div>
                </div>
                <h3 className="mb-2 text-center text-xl font-semibold text-white">Android</h3>
                <p className="text-sm text-gray-400 text-center mb-4">Smartphones y tablets</p>
                <div className="flex justify-center space-x-4">
                  <a 
                    href="#" 
                    className="btn-sm bg-linear-to-t from-indigo-600 to-indigo-500 text-white shadow-[inset_0px_1px_0px_--theme(--color-white/.16)] hover:bg-[length:100%_150%]"
                  >
                    Google Play
                  </a>
                  <a 
                    href="#" 
                    className="btn-sm bg-gray-700 text-gray-300 hover:bg-gray-600"
                  >
                    APK Directo
                  </a>
                </div>
              </div>

              {/* Extensión Chrome */}
              <div className="bg-gray-800/30 rounded-xl p-6 border border-gray-700 transition-transform duration-300 hover:scale-[1.02] hover:shadow-xl">
                <div className="mb-4 flex justify-center">
                  <div className="h-16 w-16 flex items-center justify-center rounded-full bg-indigo-900/50">
                    <svg className="h-8 w-8 text-indigo-400" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 20.8a8.8 8.8 0 0 1-8.8-8.8 8.8 8.8 0 0 1 8.8-8.8 8.8 8.8 0 0 1 8.8 8.8 8.8 8.8 0 0 1-8.8 8.8m0-19.6C6.04 1.2 1.2 6.04 1.2 12c0 5.96 4.84 10.8 10.8 10.8 5.96 0 10.8-4.84 10.8-10.8 0-5.96-4.84-10.8-10.8-10.8m-5.04 6c-.44 0-.79.79-.24 1.16L9.2 12l-2.48 3.64c-.55.37-.2 1.16.24 1.16h10.08c.44 0 .79-.79.24-1.16L14.8 12l2.48-3.64c.55-.37.2-1.16-.24-1.16H6.96z"/>
                    </svg>
                  </div>
                </div>
                <h3 className="mb-2 text-center text-xl font-semibold text-white">Chrome</h3>
                <p className="text-sm text-gray-400 text-center mb-4">Extensión para tu navegador</p>
                <div className="flex justify-center">
                  <a 
                    href="#" 
                    className="btn-sm bg-linear-to-t from-indigo-600 to-indigo-500 text-white shadow-[inset_0px_1px_0px_--theme(--color-white/.16)] hover:bg-[length:100%_150%]"
                  >
                    Chrome Web Store
                  </a>
                </div>
              </div>
              
            </div>
          </div>
        </div>
      </section>

      {/* Sección de características en todas las plataformas */}
      <section className="relative">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="py-12 md:pb-20 md:pt-16">
            <div className="md:flex md:items-center md:justify-between">
              <div className="md:w-1/2 md:pr-10">
                <h2 className="font-nacelle text-3xl font-semibold mb-4 text-gray-100">
                  Sincronización perfecta entre dispositivos
                </h2>
                <p className="text-gray-400 mb-6">
                  PASSWD sincroniza automáticamente tus contraseñas en todos tus dispositivos. Accede a tus cuentas desde cualquier plataforma, en cualquier momento.
                </p>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <svg className="h-6 w-6 text-indigo-500 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
                    </svg>
                    <span className="text-gray-300">Sincronización en tiempo real</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-6 w-6 text-indigo-500 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
                    </svg>
                    <span className="text-gray-300">Cifrado de extremo a extremo</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-6 w-6 text-indigo-500 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
                    </svg>
                    <span className="text-gray-300">Interfaz consistente en todas las plataformas</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-6 w-6 text-indigo-500 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
                    </svg>
                    <span className="text-gray-300">Autocompletado de formularios en todos los dispositivos</span>
                  </li>
                </ul>
              </div>
              <div className="md:w-1/2 mt-8 md:mt-0">
                <div className="relative bg-gray-800/30 rounded-xl overflow-hidden border border-gray-700">
                  <div className="aspect-[4/3] relative">
                    <Image 
                      src="/images/features.png" 
                      alt="Sincronización entre dispositivos" 
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sección de CTA */}
      <section className="relative">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="py-12 md:py-20">
            <div className="rounded-2xl bg-linear-to-b from-gray-800 to-gray-800/60 p-8 md:p-10 lg:p-12 shadow-[inset_0px_1px_0px_0px_--theme(--color-gray-800)]">
              <div className="max-w-3xl mx-auto text-center">
                <h2 className="font-nacelle text-3xl font-semibold mb-4 text-white">
                  Comienza a proteger tus contraseñas hoy
                </h2>
                <p className="text-gray-300 mb-8">
                  Descarga PASSWD para todas tus plataformas y disfruta de una experiencia de seguridad sin complicaciones.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <Link
                    href="/signup"
                    className="btn bg-linear-to-t from-indigo-600 to-indigo-500 text-white shadow-[inset_0px_1px_0px_0px_--theme(--color-white/.16)] hover:bg-[length:100%_150%]"
                  >
                    Registrarse gratis
                  </Link>
                  <Link
                    href="/"
                    className="btn bg-gray-700 text-gray-300 hover:bg-gray-600"
                  >
                    Conocer más
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
} 