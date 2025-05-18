import VideoThumb from "@/public/images/hero-image-01.png";
import ModalVideo from "@/components/modal-video";
import Image from "next/image";

export default function HeroHome() {
  return (
    <section>
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Contenido del héroe */}
        <div className="pt-2 pb-4 md:pb-6">
          {/* Encabezado de sección */}
          <div className="pb-3 text-center md:pb-4">
            <div className="flex justify-center pb-4 relative">
              <div className="absolute -z-10 w-40 h-40 rounded-full bg-gradient-to-br from-indigo-500/30 to-purple-500/30 blur-xl animate-pulse"></div>
              <div className="absolute -z-10 w-36 h-36 rounded-full bg-gradient-to-tr from-blue-500/20 to-indigo-300/20 blur-md animate-[pulse_3s_ease-in-out_infinite]"></div>
              <Image 
                src="/images/logo_passwd.JPEG" 
                width={130} 
                height={130} 
                alt="Logo Passwd"
                className="rounded-full z-10 shadow-lg" 
              />
            </div>
            <h1
              className="animate-[gradient_6s_linear_infinite] bg-[linear-gradient(to_right,var(--color-gray-200),var(--color-indigo-200),var(--color-gray-50),var(--color-indigo-300),var(--color-gray-200))] bg-[length:200%_auto] bg-clip-text pb-3 font-nacelle text-4xl font-semibold text-transparent md:text-5xl"
            >
              Tu gestor de contraseñas preferido
            </h1>
            <div className="mx-auto max-w-3xl">
              <p
                className="mb-5 text-xl text-indigo-200/65"
              >
                Passwd te permite almacenar tus contraseñas de forma segura y acceder a ellas cuando las necesites, desde cualquier dispositivo.
              </p>
              <div className="mx-auto max-w-xs sm:flex sm:max-w-none sm:justify-center mb-5">
                <div>
                  <a
                    className="btn group mb-4 w-full bg-linear-to-t from-indigo-600 to-indigo-500 bg-[length:100%_100%] bg-[bottom] text-white shadow-[inset_0px_1px_0px_--theme(--color-white/.16)] hover:bg-[length:100%_150%] sm:mb-0 sm:w-auto"
                    href="/descargar"
                  >
                    <span className="relative inline-flex items-center">
                      Comenzar ahora
                      <span className="ml-1 tracking-normal text-white/50 transition-transform group-hover:translate-x-0.5">
                        -&gt;
                      </span>
                    </span>
                  </a>
                </div>
                <div>
                  <a
                    className="btn relative w-full bg-linear-to-b from-gray-800 to-gray-800/60 bg-[length:100%_100%] bg-[bottom] text-gray-300 before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:border before:border-transparent before:[background:linear-gradient(to_right,var(--color-gray-800),var(--color-gray-700),var(--color-gray-800))_border-box] before:[mask-composite:exclude_!important] before:[mask:linear-gradient(white_0_0)_padding-box,_linear-gradient(white_0_0)] hover:bg-[length:100%_150%] sm:ml-4 sm:w-auto"
                    href="/funciones"
                  >
                    Ver funcionalidades
                  </a>
                </div>
              </div>
            </div>
          </div>

          <ModalVideo
            thumb={VideoThumb}
            thumbWidth={1104}
            thumbHeight={576}
            thumbAlt="Modal video thumbnail"
            video="videos//video.mp4"
            videoWidth={1920}
            videoHeight={1080}
          />
        </div>
      </div>
    </section>
  );
}
