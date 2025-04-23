"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth/auth-context";
import PageTransition from "@/components/ui/animation/page-transition";
import ScrollAnimation from "@/components/ui/animation/scroll-animation";

export default function Passwords() {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  // Redireccionar si el usuario no está autenticado
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, isLoading, router]);

  // Mostrar un estado de carga mientras se verifica la autenticación
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  // Si no está autenticado, no mostrar nada (la redirección se encargará)
  if (!isAuthenticated) {
    return null;
  }

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
                  Mis Contraseñas
                </h1>
              </div>
              <p className="text-xl text-gray-400 mb-8">
                Aquí podrás gestionar todas tus contraseñas de forma segura
              </p>
            
              {/* Estado vacío */}
              <ScrollAnimation variant="fadeInUp" delay={0.2} className="mt-10">
                <div className="bg-gray-800/50 rounded-lg p-8 max-w-3xl mx-auto text-center border border-gray-700/30 shadow-lg shadow-indigo-500/5">
                  <div className="w-20 h-20 bg-gradient-to-br from-indigo-600/20 to-indigo-800/30 rounded-full flex items-center justify-center mx-auto mb-6 relative">
                    <div className="absolute inset-0 rounded-full animate-pulse bg-indigo-500/10"></div>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-indigo-400 relative z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">No tienes contraseñas guardadas</h3>
                  <p className="text-gray-400 mb-6">
                    Comienza a guardar tus contraseñas de manera segura desde la app y accede a ellas desde cualquier dispositivo y plataforma.
                  </p>
                  <div className="flex justify-center">
                  </div>
                </div>
              </ScrollAnimation>
            </ScrollAnimation>
          </div>
        </div>
      </section>
    </PageTransition>
  );
} 