"use client";

import PasswordManager from "@/components/password-manager";
import PageTransition from "@/components/ui/animation/page-transition";
import ScrollAnimation from "@/components/ui/animation/scroll-animation";

export default function PasswordsClient() {
  return (
    <PageTransition>
      <section>
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="py-12 md:py-20">
            {/* Section header */}
            <ScrollAnimation variant="fadeInUp">
              <div className="pb-12 text-center">
                <h1 className="animate-[gradient_6s_linear_infinite] bg-[linear-gradient(to_right,var(--color-gray-200),var(--color-indigo-200),var(--color-gray-50),var(--color-indigo-300),var(--color-gray-200))] bg-[length:200%_auto] bg-clip-text font-nacelle text-3xl font-semibold text-transparent md:text-4xl">
                  Mis Contraseñas
                </h1>
                <p className="text-gray-400 mt-4">
                  Gestiona todas tus contraseñas almacenadas de forma segura
                </p>
              </div>
            </ScrollAnimation>
            {/* Password manager component */}
            <ScrollAnimation variant="fadeInUp" delay={0.2}>
              <div className="mx-auto">
                <PasswordManager />
              </div>
            </ScrollAnimation>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
