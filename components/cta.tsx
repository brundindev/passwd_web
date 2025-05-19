import Image from "next/image";
import BlurredShape from "@/public/images/blurred-shape.svg";

export default function Cta() {
  return (
    <section className="cta-section">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="relative border-t py-12 [border-image:linear-gradient(to_right,transparent,--theme(--color-slate-400/.25),transparent)1] md:py-20">
          {/* Background gradient */}
          <div
            className="pointer-events-none absolute inset-0 -z-10 m-auto h-[50rem] max-h-full w-[50rem] max-w-full rounded-full bg-slate-900/50 opacity-20 blur-3xl"
            aria-hidden="true"
          />
          {/* Background glowing dots */}
          <div
            className="animate-pulse pointer-events-none absolute inset-0 -z-10"
            aria-hidden="true"
          >
            <canvas data-particle-animation />
          </div>
          <div className="mx-auto max-w-xl text-center">
            <div className="inline-flex items-center gap-3 pb-2 before:h-px before:w-8 before:bg-linear-to-r before:from-transparent before:to-indigo-200/50 after:h-px after:w-8 after:bg-linear-to-l after:from-transparent after:to-indigo-200/50">
              <span className="inline-flex bg-linear-to-r from-indigo-500 to-indigo-200 bg-clip-text text-transparent">
                El gestor de contraseñas definitivo
              </span>
            </div>
            <h2
              className="animate-[gradient_6s_linear_infinite] bg-[linear-gradient(to_right,var(--color-gray-200),var(--color-indigo-200),var(--color-gray-50),var(--color-indigo-300),var(--color-gray-200))] bg-[length:200%_auto] bg-clip-text pb-3 font-nacelle text-4xl font-semibold text-transparent md:text-5xl"
            >
              ¿Todo listo para comenzar a usar PASSWD?
            </h2>
            <p className="pb-8 text-lg text-indigo-200/65">
              Registra tu cuenta gratuita ahora y comienza a gestionar tus contraseñas de forma segura.
            </p>
            <div>
              <a
                className="btn group bg-linear-to-t from-indigo-600 to-indigo-500 bg-[length:100%_100%] bg-[bottom] text-white shadow-[inset_0px_1px_0px_--theme(--color-white/.16)] hover:bg-[length:100%_150%]"
                href="/registro"
              >
                <span className="relative inline-flex items-center">
                  Crear cuenta gratuita
                  <span className="ml-1 tracking-normal text-white/50 transition-transform group-hover:translate-x-0.5">
                    -&gt;
                  </span>
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
