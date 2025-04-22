"use client";

import Link from "next/link";
import Image from "next/image";
import { FiCheck } from "react-icons/fi";
import PageTransition from "@/components/ui/animation/page-transition";
import ScrollAnimation from "@/components/ui/animation/scroll-animation";

export default function PreciosClient() {
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
              <h1 className="h1 text-4xl md:text-5xl font-bold font-nacelle animate-[gradient_6s_linear_infinite] bg-[linear-gradient(to_right,var(--color-gray-200),var(--color-indigo-200),var(--color-gray-50),var(--color-indigo-300),var(--color-gray-200))] bg-[length:200%_auto] bg-clip-text text-transparent mb-4">Siempre Gratuito</h1>
              <p className="text-xl text-gray-400">
                PASSWD siempre será gratuito para todos los usuarios. Sin costos ocultos, sin suscripciones, sin limitaciones.
              </p>
            </ScrollAnimation>

            {/* Tarjeta de precios */}
            <ScrollAnimation
              variant="fadeInUp"
              delay={0.2}
              className="max-w-sm mx-auto mb-10"
            >
              <div className="flex flex-col h-full p-6 bg-gray-800 rounded-lg border-2 border-purple-600 hover:border-purple-500 transition-colors duration-200 ease-in-out shadow-xl">
                <div className="flex-grow">
                  <div className="flex justify-between items-center mb-1">
                    <div className="text-xl font-bold text-purple-500 tracking-tight">100% GRATUITO</div>
                    <div className="inline-flex px-3 py-1 text-xs font-medium text-white bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full">Recomendado</div>
                  </div>
                  <div className="font-bold text-gray-100 mb-4">
                    <span className="text-5xl">€0</span>
                    <span className="text-xl text-gray-400 font-normal"> /siempre</span>
                  </div>
                  <div className="text-gray-400 mb-6">Todas las funciones disponibles sin ningún costo.</div>
                  <div className="flex items-center mb-3">
                    <FiCheck className="w-5 h-5 text-green-500 mr-2" />
                    <span className="text-gray-300">Almacenamiento ilimitado</span>
                  </div>
                  <div className="flex items-center mb-3">
                    <FiCheck className="w-5 h-5 text-green-500 mr-2" />
                    <span className="text-gray-300">Cifrado avanzado</span>
                  </div>
                  <div className="flex items-center mb-3">
                    <FiCheck className="w-5 h-5 text-green-500 mr-2" />
                    <span className="text-gray-300">Sincronización multi-dispositivo</span>
                  </div>
                  <div className="flex items-center mb-3">
                    <FiCheck className="w-5 h-5 text-green-500 mr-2" />
                    <span className="text-gray-300">Generador de contraseñas</span>
                  </div>
                  <div className="flex items-center mb-3">
                    <FiCheck className="w-5 h-5 text-green-500 mr-2" />
                    <span className="text-gray-300">Autocompletado seguro</span>
                  </div>
                  <div className="flex items-center mb-3">
                    <FiCheck className="w-5 h-5 text-green-500 mr-2" />
                    <span className="text-gray-300">Autenticación biométrica</span>
                  </div>
                  <div className="flex items-center mb-6">
                    <FiCheck className="w-5 h-5 text-green-500 mr-2" />
                    <span className="text-gray-300">Soporte comunitario</span>
                  </div>
                </div>
                <div className="mt-auto">
                  <Link href="/registro" className="btn-sm text-white bg-purple-600 hover:bg-purple-700 w-full mb-4">
                    Empezar gratis
                  </Link>
                  <div className="text-sm text-gray-400 text-center">No requiere tarjeta de crédito</div>
                </div>
              </div>
            </ScrollAnimation>

            {/* FAQs */}
            <ScrollAnimation
              variant="fadeInUp"
              delay={0.4}
              className="max-w-3xl mx-auto mt-20"
            >
              <h2 className="h3 mb-6 text-center">Preguntas frecuentes</h2>

              <div className="space-y-6">
                <div className="bg-gray-800 p-5 rounded-lg shadow-sm">
                  <h4 className="text-xl font-bold text-gray-100 mb-2">¿PASSWD es realmente gratuito?</h4>
                  <p className="text-gray-400">
                    Sí, PASSWD es completamente gratuito para todos los usuarios, sin ningún costo oculto. No hay planes de suscripción ni pagos necesarios para usar todas las funcionalidades.
                  </p>
                </div>

                <div className="bg-gray-800 p-5 rounded-lg shadow-sm">
                  <h4 className="text-xl font-bold text-gray-100 mb-2">¿No hay costos ocultos?</h4>
                  <p className="text-gray-400">
                    No, todas las funciones están disponibles sin ningún tipo de pago. Nuestra misión es proporcionar seguridad para todos, independientemente de su situación económica.
                  </p>
                </div>

                <div className="bg-gray-800 p-5 rounded-lg shadow-sm">
                  <h4 className="text-xl font-bold text-gray-100 mb-2">¿Qué pasa con mis datos?</h4>
                  <p className="text-gray-400">
                    Tu privacidad es primordial. No vendemos ni compartimos tus datos con terceros. Todos tus datos están cifrados y solo tú tienes la clave para acceder a ellos.
                  </p>
                </div>

                <div className="bg-gray-800 p-5 rounded-lg shadow-sm">
                  <h4 className="text-xl font-bold text-gray-100 mb-2">¿Cómo se financia PASSWD?</h4>
                  <p className="text-gray-400">
                    PASSWD se financia a través de donaciones voluntarias de usuarios que desean apoyar el proyecto. Si te gusta nuestro servicio y puedes contribuir, tus donaciones son bienvenidas, pero nunca obligatorias.
                  </p>
                </div>
              </div>
            </ScrollAnimation>

            {/* Call to action */}
            <ScrollAnimation
              variant="fadeInUp"
              delay={0.6}
              className="text-center mt-12"
            >
              <h3 className="h3 mb-4">¿Listo para obtener PASSWD?</h3>
              <p className="text-lg text-gray-400 mb-8">Descarga PASSWD gratis y comienza a gestionar tus contraseñas de manera segura.</p>
              <div className="max-w-xs mx-auto sm:max-w-none sm:flex sm:justify-center">
                <div>
                  <Link href="/descargar" className="btn text-white bg-purple-600 hover:bg-purple-700 w-full mb-4 sm:w-auto sm:mb-0">
                    Descargar gratis
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