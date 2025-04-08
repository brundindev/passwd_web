"use client";

import { useState } from "react";
import Image from "next/image";
import ClientImg01 from "@/public/images/client-logo-01.svg";
import ClientImg02 from "@/public/images/client-logo-02.svg";
import ClientImg03 from "@/public/images/client-logo-03.svg";
import ClientImg04 from "@/public/images/client-logo-04.svg";
import ClientImg05 from "@/public/images/client-logo-05.svg";
import ClientImg06 from "@/public/images/client-logo-06.svg";
import useMasonry from "@/utils/useMasonry";

const testimonials = [
  {
    clientImg: ClientImg01,
    name: "MaKayla P.",
    company: "Disney",
    content: "Como creadora de contenido, siempre estuve buscando una herramienta que me ayudara a mantenerme al día con la demanda. PASSWD. ha cambiado las reglas del juego. Me permite gestionar mis contraseñas de forma segura y rápida.",
    categories: [1, 3, 5],
  },
  {
    clientImg: ClientImg02,
    name: "Andrew K.",
    company: "Samsung",
    content: "He probado varios gestores de contraseñas, pero PASSWD. es sin duda el mejor. Entiende mis necesidades de seguridad y me permite acceder a mis contraseñas desde cualquier dispositivo sin preocupaciones.",
    categories: [1, 2, 4],
  },
  {
    clientImg: ClientImg03,
    name: "Lucy D.",
    company: "Rio",
    content: "La gestión de contraseñas solía ser un cuello de botella en nuestro flujo de trabajo, pero ya no. PASSWD. es intuitivo y proporciona seguridad de primer nivel en todo momento. ¡Es como tener un miembro adicional del equipo que nunca duerme!",
    categories: [1, 2, 5],
  },
  {
    clientImg: ClientImg04,
    name: "Pavel M.",
    company: "Canon",
    content: "La calidad del cifrado proporcionado por PASSWD. es excepcional. Ha llevado nuestra seguridad a nuevas alturas, permitiéndonos gestionar múltiples contraseñas sin comprometer la seguridad. Muy recomendable para cualquiera.",
    categories: [1, 4],
  },
  {
    clientImg: ClientImg05,
    name: "Miriam E.",
    company: "Cadbury",
    content: "PASSWD. ha sido un salvavidas para mi agencia. Ahora podemos gestionar contraseñas para múltiples clientes de forma rápida y eficiente. Es un activo invaluable para nuestro equipo.",
    categories: [1, 3, 5],
  },
  {
    clientImg: ClientImg06,
    name: "Eloise V.",
    company: "Maffell",
    content: "Estoy asombrada por lo bien que funciona PASSWD. Es increíblemente versátil y puede generar contraseñas seguras para diversas plataformas sin esfuerzo. ¡Es fantástico!",
    categories: [1, 3],
  },
];

export default function Testimonials() {
  const masonryContainer = useMasonry();
  const [category, setCategory] = useState<number>(1);

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6">
      <div className="border-t py-12 [border-image:linear-gradient(to_right,transparent,--theme(--color-slate-400/.25),transparent)1] md:py-20">
        {/* Encabezado de sección */}
        <div className="mx-auto max-w-3xl pb-12 text-center">
          <h2 className="animate-[gradient_6s_linear_infinite] bg-[linear-gradient(to_right,var(--color-gray-200),var(--color-indigo-200),var(--color-gray-50),var(--color-indigo-300),var(--color-gray-200))] bg-[length:200%_auto] bg-clip-text pb-4 font-nacelle text-3xl font-semibold text-transparent md:text-4xl">
            No tomes solo nuestra palabra
          </h2>
          <p className="text-lg text-indigo-200/65">
            Ofrecemos soluciones tecnológicas que permiten a los usuarios 
            gestionar sus contraseñas de forma segura desde cualquier lugar del mundo.
          </p>
        </div>

        <div>
          {/* Botones */}
          <div className="flex justify-center pb-12 max-md:hidden md:pb-16">
            <div className="relative inline-flex flex-wrap justify-center rounded-[1.25rem] bg-gray-800/40 p-1">
              {/* Botón #1 */}
              <button
                className={`flex h-8 flex-1 items-center gap-2.5 whitespace-nowrap rounded-full px-3 text-sm font-medium transition-colors focus-visible:outline-hidden focus-visible:ring-3 focus-visible:ring-indigo-200 ${category === 1 ? "relative bg-linear-to-b from-gray-900 via-gray-800/60 to-gray-900 before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:border before:border-transparent before:[background:linear-gradient(to_bottom,--theme(--color-indigo-500/0),--theme(--color-indigo-500/.5))_border-box] before:[mask-composite:exclude_!important] before:[mask:linear-gradient(white_0_0)_padding-box,_linear-gradient(white_0_0)]" : "opacity-65 transition-opacity hover:opacity-90"}`}
                aria-pressed={category === 1}
                onClick={() => setCategory(1)}
              >
                <span>Ver Todos</span>
              </button>
              {/* Botón #2 */}
              <button
                className={`flex h-8 flex-1 items-center gap-2.5 whitespace-nowrap rounded-full px-3 text-sm font-medium transition-colors focus-visible:outline-hidden focus-visible:ring-3 focus-visible:ring-indigo-200 ${category === 2 ? "relative bg-linear-to-b from-gray-900 via-gray-800/60 to-gray-900 before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:border before:border-transparent before:[background:linear-gradient(to_bottom,--theme(--color-indigo-500/0),--theme(--color-indigo-500/.5))_border-box] before:[mask-composite:exclude_!important] before:[mask:linear-gradient(white_0_0)_padding-box,_linear-gradient(white_0_0)]" : "opacity-65 transition-opacity hover:opacity-90"}`}
                aria-pressed={category === 2}
                onClick={() => setCategory(2)}
              >
                <span>Aplicaciones Web</span>
              </button>
              {/* Botón #3 */}
              <button
                className={`flex h-8 flex-1 items-center gap-2.5 whitespace-nowrap rounded-full px-3 text-sm font-medium transition-colors focus-visible:outline-hidden focus-visible:ring-3 focus-visible:ring-indigo-200 ${category === 3 ? "relative bg-linear-to-b from-gray-900 via-gray-800/60 to-gray-900 before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:border before:border-transparent before:[background:linear-gradient(to_bottom,--theme(--color-indigo-500/0),--theme(--color-indigo-500/.5))_border-box] before:[mask-composite:exclude_!important] before:[mask:linear-gradient(white_0_0)_padding-box,_linear-gradient(white_0_0)]" : "opacity-65 transition-opacity hover:opacity-90"}`}
                aria-pressed={category === 3}
                onClick={() => setCategory(3)}
              >
                <span>Móvil</span>
              </button>
              {/* Botón #4 */}
              <button
                className={`flex h-8 flex-1 items-center gap-2.5 whitespace-nowrap rounded-full px-3 text-sm font-medium transition-colors focus-visible:outline-hidden focus-visible:ring-3 focus-visible:ring-indigo-200 ${category === 4 ? "relative bg-linear-to-b from-gray-900 via-gray-800/60 to-gray-900 before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:border before:border-transparent before:[background:linear-gradient(to_bottom,--theme(--color-indigo-500/0),--theme(--color-indigo-500/.5))_border-box] before:[mask-composite:exclude_!important] before:[mask:linear-gradient(white_0_0)_padding-box,_linear-gradient(white_0_0)]" : "opacity-65 transition-opacity hover:opacity-90"}`}
                aria-pressed={category === 4}
                onClick={() => setCategory(4)}
              >
                <span>Empresas</span>
              </button>
              {/* Botón #5 */}
              <button
                className={`flex h-8 flex-1 items-center gap-2.5 whitespace-nowrap rounded-full px-3 text-sm font-medium transition-colors focus-visible:outline-hidden focus-visible:ring-3 focus-visible:ring-indigo-200 ${category === 5 ? "relative bg-linear-to-b from-gray-900 via-gray-800/60 to-gray-900 before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:border before:border-transparent before:[background:linear-gradient(to_bottom,--theme(--color-indigo-500/0),--theme(--color-indigo-500/.5))_border-box] before:[mask-composite:exclude_!important] before:[mask:linear-gradient(white_0_0)_padding-box,_linear-gradient(white_0_0)]" : "opacity-65 transition-opacity hover:opacity-90"}`}
                aria-pressed={category === 5}
                onClick={() => setCategory(5)}
              >
                <span>Consumidores</span>
              </button>
            </div>
          </div>

          <div
            className="mx-auto grid max-w-sm items-start gap-6 sm:max-w-none sm:grid-cols-2 lg:grid-cols-3"
            ref={masonryContainer}
          >
            {testimonials.map((testimonial, index) => (
              <div key={index} className="group">
                {testimonial.categories.includes(category) && (
                  <div
                    className="relative rounded-2xl bg-linear-to-br from-gray-900/50 via-gray-800/25 to-gray-900/50 p-5 backdrop-blur-xs transition-opacity before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:border before:border-transparent before:[background:linear-gradient(to_right,var(--color-gray-800),var(--color-gray-700),var(--color-gray-800))_border-box] before:[mask-composite:exclude_!important] before:[mask:linear-gradient(white_0_0)_padding-box,_linear-gradient(white_0_0)]"
                  >
                    <div className="flex flex-col gap-4">
                      <div>
                        <Image src={testimonial.clientImg} height={36} alt="Logo del cliente" />
                      </div>
                      <p className="text-indigo-200/65">
                        "{testimonial.content}"
                      </p>
                      <div className="flex items-center gap-3">
                        <div className="text-sm font-medium text-gray-200">
                          <span>{testimonial.name}</span>
                          <span className="text-gray-700"> - </span>
                          <a
                            className="text-indigo-200/65 transition-colors hover:text-indigo-500"
                            href="#0"
                          >
                            {testimonial.company}
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
