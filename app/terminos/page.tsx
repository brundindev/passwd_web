"use client";

import PageTransition from "@/components/ui/animation/page-transition";
import ScrollAnimation from "@/components/ui/animation/scroll-animation";

export default function Terminos() {
  return (
    <PageTransition>
      <section className="relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="pt-32 pb-12 md:pt-40 md:pb-20">
            {/* Sección del encabezado */}
            <ScrollAnimation
              variant="fadeInUp"
              className="max-w-3xl mx-auto text-center pb-10 md:pb-16"
            >
              <div className="relative mb-6">
                <div className="absolute -z-10 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 rounded-full bg-gradient-to-br from-indigo-500/20 to-purple-500/20 blur-xl"></div>
                <h1 className="h1 text-4xl md:text-5xl font-bold font-nacelle animate-[gradient_6s_linear_infinite] bg-[linear-gradient(to_right,var(--color-gray-200),var(--color-indigo-200),var(--color-gray-50),var(--color-indigo-300),var(--color-gray-200))] bg-[length:200%_auto] bg-clip-text text-transparent">
                  Términos y Condiciones
                </h1>
              </div>
              <p className="text-xl text-gray-400 mb-8">
                Última actualización: 23 de Abril de 2025
              </p>
            </ScrollAnimation>

            {/* Contenido de los términos */}
            <ScrollAnimation variant="fadeInUp" delay={0.2} className="max-w-4xl mx-auto">
              <div className="bg-gray-800/50 rounded-xl border border-gray-700/30 shadow-lg shadow-indigo-500/5 overflow-hidden p-6 md:p-8 space-y-8">
                
                <div className="prose prose-invert max-w-none prose-h3:text-indigo-400 prose-h3:text-xl prose-h3:font-medium prose-p:text-gray-300 prose-a:text-indigo-400 prose-a:no-underline hover:prose-a:underline prose-strong:text-white">
                  <h3>1. Introducción</h3>
                  <p>
                    Bienvenido a PASSWD. Estos Términos y Condiciones rigen el uso de nuestra aplicación web, servicios y 
                    productos (colectivamente, "Servicios") ofrecidos por PASSWD ("nosotros", "nuestro" o "la aplicación").
                  </p>
                  <p>
                    Al acceder o utilizar nuestros Servicios, usted acepta estar sujeto a estos Términos y Condiciones. 
                    Si no está de acuerdo con alguna parte de estos términos, no podrá acceder a nuestros Servicios.
                  </p>

                  <h3>2. Descripción del Servicio</h3>
                  <p>
                    PASSWD es un gestor de contraseñas que le permite almacenar, organizar y acceder de forma segura a sus credenciales 
                    digitales. Nuestros Servicios están diseñados para ayudarle a mantener sus contraseñas y otra información confidencial 
                    de forma protegida y accesible cuando la necesite.
                  </p>

                  <h3>3. Cuenta de Usuario</h3>
                  <p>
                    Para utilizar nuestros Servicios, debe crear una cuenta proporcionando información precisa y completa. Usted es 
                    responsable de mantener la confidencialidad de su contraseña maestra y de todas las actividades que ocurran bajo su cuenta.
                  </p>
                  <p>
                    Se compromete a notificarnos inmediatamente cualquier uso no autorizado de su cuenta o cualquier otra violación de 
                    seguridad. No seremos responsables por ninguna pérdida o daño derivado de su incumplimiento con esta disposición.
                  </p>

                  <h3>4. Privacidad y Seguridad</h3>
                  <p>
                    Su privacidad es fundamental para nosotros. Por favor, consulte nuestra <a href="/privacidad">Política de Privacidad</a> para 
                    entender cómo recopilamos, usamos y protegemos su información personal.
                  </p>
                  <p>
                    Implementamos medidas de seguridad diseñadas para proteger sus datos, incluyendo el cifrado de extremo a extremo. 
                    Sin embargo, ningún método de transmisión o almacenamiento electrónico es 100% seguro, y no podemos garantizar su 
                    seguridad absoluta.
                  </p>

                  <h3>5. Licencia y Restricciones</h3>
                  <p>
                    Sujeto a estos Términos, le otorgamos una licencia limitada, no exclusiva, no transferible y revocable para utilizar 
                    nuestros Servicios para su uso personal o comercial interno.
                  </p>
                  <p>
                    Usted no puede: (a) licenciar, sublicenciar, vender, revender, transferir, asignar, distribuir o explotar comercialmente 
                    de otro modo los Servicios; (b) modificar o crear trabajos derivados de los Servicios; (c) crear "enlaces" a Internet 
                    a los Servicios o "enmarcar" o "reflejar" cualquier contenido en cualquier otro servidor o dispositivo inalámbrico o 
                    basado en Internet; (d) realizar ingeniería inversa o acceder a los Servicios para construir un producto o servicio competitivo, 
                    o (e) utilizar los Servicios de cualquier manera que viole las leyes o regulaciones aplicables.
                  </p>

                  <h3>6. Limitación de Responsabilidad</h3>
                  <p>
                    En ningún caso seremos responsables por daños indirectos, incidentales, especiales, consecuentes o punitivos, incluyendo sin 
                    limitación, pérdida de beneficios, datos, uso, buena voluntad, u otras pérdidas intangibles, resultantes de: (a) su acceso 
                    o uso o incapacidad para acceder o usar los Servicios; (b) cualquier conducta o contenido de terceros en los Servicios; 
                    (c) cualquier contenido obtenido de los Servicios; y (d) acceso no autorizado, uso o alteración de sus transmisiones o contenido.
                  </p>

                  <h3>7. Modificaciones de los Términos</h3>
                  <p>
                    Nos reservamos el derecho, a nuestra sola discreción, de modificar estos Términos en cualquier momento. Le notificaremos 
                    sobre cualquier cambio publicando los nuevos Términos en esta ubicación. Los cambios serán efectivos inmediatamente después 
                    de su publicación. Su uso continuado de los Servicios después de la publicación de los Términos modificados constituye su 
                    aceptación de dichos cambios.
                  </p>

                  <h3>8. Terminación</h3>
                  <p>
                    Podemos terminar o suspender su cuenta y el acceso a los Servicios inmediatamente, sin previo aviso ni responsabilidad, 
                    por cualquier motivo, incluido, entre otros, si incumple estos Términos. Al momento de la terminación, 
                    su derecho a utilizar los Servicios cesará inmediatamente.
                  </p>

                  <h3>9. Ley Aplicable</h3>
                  <p>
                    Estos Términos se regirán e interpretarán de acuerdo con las leyes de España, sin tener en cuenta sus disposiciones 
                    sobre conflictos de leyes.
                  </p>

                  <h3>10. Contacto</h3>
                  <p>
                    Si tiene alguna pregunta sobre estos Términos, por favor contáctenos a través de <strong>support@passwd.com</strong>.
                  </p>
                </div>

              </div>
            </ScrollAnimation>
          </div>
        </div>
      </section>
    </PageTransition>
  );
} 