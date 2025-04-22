export const metadata = {
  title: "Mis Contraseñas - PASSWD",
  description: "Gestiona todas tus contraseñas guardadas en PASSWD",
};

import PasswordManager from "@/components/password-manager";

export default function Passwords() {
  return (
    <section>
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="py-12 md:py-20">
          {/* Section header */}
          <div className="pb-12 text-center">
            <h1 className="animate-[gradient_6s_linear_infinite] bg-[linear-gradient(to_right,var(--color-gray-200),var(--color-indigo-200),var(--color-gray-50),var(--color-indigo-300),var(--color-gray-200))] bg-[length:200%_auto] bg-clip-text font-nacelle text-3xl font-semibold text-transparent md:text-4xl">
              Mis Contraseñas
            </h1>
            <p className="text-gray-400 mt-4">
              Gestiona todas tus contraseñas almacenadas de forma segura
            </p>
          </div>
          {/* Password manager component */}
          <div className="mx-auto">
            <PasswordManager />
          </div>
        </div>
      </div>
    </section>
  );
} 