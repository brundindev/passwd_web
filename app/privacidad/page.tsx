"use client";

import PageTransition from "@/components/ui/animation/page-transition";
import ScrollAnimation from "@/components/ui/animation/scroll-animation";

export default function Privacidad() {
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
                  Política de Privacidad
                </h1>
              </div>
              <p className="text-xl text-gray-400 mb-8">
              Última actualización: 23 de Abril de 2025
              </p>
            </ScrollAnimation>

            {/* Contenido de la política de privacidad */}
            <ScrollAnimation variant="fadeInUp" delay={0.2} className="max-w-4xl mx-auto">
              <div className="bg-gray-800/50 rounded-xl border border-gray-700/30 shadow-lg shadow-indigo-500/5 overflow-hidden p-6 md:p-8 space-y-8">
                
                <div className="prose prose-invert max-w-none prose-h3:text-indigo-400 prose-h3:text-xl prose-h3:font-medium prose-p:text-gray-300 prose-a:text-indigo-400 prose-a:no-underline hover:prose-a:underline prose-strong:text-white">
                  <h3>1. Introducción</h3>
                  <p>
                    En PASSWD, valoramos y respetamos su privacidad. Esta Política de Privacidad describe cómo recopilamos, 
                    utilizamos, almacenamos y compartimos su información cuando utiliza nuestra aplicación web, servicios y 
                    productos (colectivamente, "Servicios").
                  </p>
                  <p>
                    Al utilizar nuestros Servicios, usted acepta las prácticas descritas en esta Política de Privacidad. 
                    Le recomendamos que lea este documento detenidamente. Si no está de acuerdo con alguna parte de esta 
                    política, le recomendamos que deje de utilizar nuestros Servicios.
                  </p>

                  <h3>2. Información que Recopilamos</h3>
                  <p>
                    <strong>Información que usted nos proporciona:</strong> Para crear una cuenta y utilizar nuestros Servicios, 
                    recopilamos información como su dirección de correo electrónico, nombre y contraseña maestra (que está cifrada 
                    y nunca la almacenamos en texto plano).
                  </p>
                  <p>
                    <strong>Información de contraseñas:</strong> La principal función de PASSWD es almacenar sus contraseñas y 
                    credenciales. Esta información está cifrada de extremo a extremo y solo usted puede acceder a ella con su 
                    contraseña maestra.
                  </p>
                  <p>
                    <strong>Información recopilada automáticamente:</strong> Cuando utiliza nuestros Servicios, podemos recopilar 
                    automáticamente cierta información, como su dirección IP, tipo de navegador, páginas visitadas, tiempo de acceso 
                    y páginas de referencia. Esta información se utiliza para mejorar nuestros Servicios y garantizar la seguridad.
                  </p>

                  <h3>3. Cómo Utilizamos su Información</h3>
                  <p>
                    Utilizamos la información que recopilamos para:
                  </p>
                  <ul>
                    <li>Proporcionar, mantener y mejorar nuestros Servicios</li>
                    <li>Autenticar a los usuarios y garantizar la seguridad de las cuentas</li>
                    <li>Responder a sus consultas y proporcionar atención al cliente</li>
                    <li>Enviar notificaciones técnicas, actualizaciones y mensajes de soporte</li>
                    <li>Detectar y prevenir actividades fraudulentas o uso indebido de nuestros Servicios</li>
                  </ul>

                  <h3>4. Seguridad de los Datos</h3>
                  <p>
                    La seguridad de sus datos es fundamental para nosotros. Implementamos rigurosas medidas de seguridad para 
                    proteger su información, incluyendo:
                  </p>
                  <ul>
                    <li>Cifrado de extremo a extremo para sus contraseñas almacenadas</li>
                    <li>Cifrado TLS/SSL para todas las transmisiones de datos</li>
                    <li>Políticas de acceso "zero-knowledge" donde no podemos acceder a sus contraseñas ni información confidencial</li>
                    <li>Monitoreo de seguridad continuo y auditorías regulares</li>
                    <li>Acceso restringido a sus datos por parte de nuestro personal</li>
                  </ul>
                  <p>
                    Tenga en cuenta que ningún método de transmisión o almacenamiento electrónico es 100% seguro. Aunque nos 
                    esforzamos por proteger su información personal, no podemos garantizar su seguridad absoluta.
                  </p>

                  <h3>5. Compartición de Datos</h3>
                  <p>
                    No vendemos, intercambiamos ni transferimos de otra manera su información personal a terceros. 
                    Sin embargo, podemos compartir cierta información en las siguientes circunstancias:
                  </p>
                  <ul>
                    <li>Con proveedores de servicios que nos ayudan a operar nuestros Servicios</li>
                    <li>Para cumplir con obligaciones legales, como responder a una orden judicial o proteger nuestros derechos</li>
                    <li>En caso de fusión, adquisición o venta de activos, donde se mantendrán las mismas políticas de privacidad</li>
                  </ul>

                  <h3>6. Sus Derechos</h3>
                  <p>
                    Dependiendo de su ubicación, puede tener ciertos derechos relacionados con sus datos personales, que incluyen:
                  </p>
                  <ul>
                    <li>Acceder a la información personal que tenemos sobre usted</li>
                    <li>Corregir datos inexactos o incompletos</li>
                    <li>Eliminar sus datos personales</li>
                    <li>Restringir o oponerse al procesamiento de sus datos</li>
                    <li>Solicitar la portabilidad de sus datos</li>
                    <li>Retirar su consentimiento en cualquier momento</li>
                  </ul>
                  <p>
                    Para ejercer estos derechos, por favor contáctenos a través de <strong>privacy@passwd.com</strong>.
                  </p>

                  <h3>7. Conservación de Datos</h3>
                  <p>
                    Conservamos su información personal mientras mantenga una cuenta activa con nosotros o según sea necesario 
                    para proporcionarle nuestros Servicios. Si cierra su cuenta, eliminaremos sus datos personales en un plazo 
                    razonable, a menos que la ley nos exija conservarlos o sean necesarios para nuestros intereses comerciales legítimos.
                  </p>

                  <h3>8. Uso Internacional</h3>
                  <p>
                    Sus datos pueden ser transferidos y mantenidos en computadoras ubicadas fuera de su estado, provincia, país u 
                    otra jurisdicción gubernamental donde las leyes de protección de datos pueden diferir. Si está ubicado fuera de España 
                    y elige proporcionarnos información, tenga en cuenta que transferimos los datos a España y los procesamos allí.
                  </p>

                  <h3>9. Menores</h3>
                  <p>
                    Nuestros Servicios no están dirigidos a personas menores de 16 años. No recopilamos conscientemente información 
                    personal de niños menores de 16 años. Si descubrimos que un menor nos ha proporcionado información personal, 
                    eliminaremos dicha información de nuestros servidores inmediatamente.
                  </p>

                  <h3>10. Cambios a esta Política</h3>
                  <p>
                    Podemos actualizar nuestra Política de Privacidad periódicamente. Le notificaremos cualquier cambio publicando 
                    la nueva Política de Privacidad en esta página y, si los cambios son significativos, le proporcionaremos una 
                    notificación más destacada. Se le aconseja revisar esta Política de Privacidad periódicamente para detectar 
                    cualquier cambio.
                  </p>

                  <h3>11. Contacto</h3>
                  <p>
                    Si tiene alguna pregunta sobre esta Política de Privacidad, por favor contáctenos a través de <strong>privacy@passwd.com</strong>.
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