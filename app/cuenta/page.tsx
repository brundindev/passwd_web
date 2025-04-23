"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth/auth-context";
import PageTransition from "@/components/ui/animation/page-transition";
import ScrollAnimation from "@/components/ui/animation/scroll-animation";
import Image from "next/image";
import { authService } from "@/lib/firebase/firebase";

export default function Cuenta() {
  const { isAuthenticated, isLoading, userProfile } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [passwordResetLoading, setPasswordResetLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  // Redireccionar si el usuario no está autenticado
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, isLoading, router]);

  const handleLogout = async () => {
    try {
      setLoading(true);
      await authService.signOut();
      router.push("/");
    } catch (error: any) {
      setError(error.message || "Error al cerrar sesión");
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordReset = async () => {
    if (!userProfile || !userProfile.email) {
      setError("No se pudo obtener el correo electrónico de la cuenta");
      return;
    }

    try {
      setPasswordResetLoading(true);
      setError("");
      setSuccess("");
      
      await authService.sendPasswordResetEmail(userProfile.email);
      
      setSuccess(`Se ha enviado un correo a ${userProfile.email} con instrucciones para cambiar tu contraseña. Por favor, revisa tu bandeja de entrada.`);
    } catch (error: any) {
      setError(error.message || "Error al enviar el correo para cambiar la contraseña");
    } finally {
      setPasswordResetLoading(false);
    }
  };

  // Mostrar un estado de carga mientras se verifica la autenticación
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  // Si no está autenticado, no mostrar nada (la redirección se encargará)
  if (!isAuthenticated || !userProfile) {
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
                  Mi Cuenta
                </h1>
              </div>
              <p className="text-xl text-gray-400 mb-8">
                Administra tus datos personales y configuración
              </p>
            
              {/* Contenido de la cuenta */}
              <ScrollAnimation variant="fadeInUp" delay={0.2} className="mt-10">
                <div className="max-w-3xl mx-auto bg-gray-800/50 rounded-xl border border-gray-700/30 shadow-lg shadow-indigo-500/5 overflow-hidden">
                  <div className="bg-gradient-to-r from-indigo-800 to-indigo-600 py-8 px-6 relative">
                    <div className="absolute -z-10 inset-0 bg-[url('/images/noise.png')] opacity-5 mix-blend-overlay"></div>
                    <div className="flex items-center space-x-4">
                      {userProfile.photoURL ? (
                        <div className="relative group">
                          <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full blur opacity-80 group-hover:opacity-100 transition duration-300"></div>
                          <Image 
                            src={userProfile.photoURL}
                            alt={userProfile.nombre || "Foto de perfil"}
                            width={80}
                            height={80}
                            className="rounded-full border-4 border-white relative"
                          />
                        </div>
                      ) : (
                        <div className="relative group">
                          <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full blur opacity-80 group-hover:opacity-100 transition duration-300"></div>
                          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-indigo-600 to-indigo-900 flex items-center justify-center text-white text-2xl font-bold border-4 border-white relative">
                            {userProfile.nombre ? userProfile.nombre.charAt(0).toUpperCase() : "U"}
                          </div>
                        </div>
                      )}
                      <div>
                        <h2 className="text-2xl font-semibold text-white">{userProfile.nombre}</h2>
                        <p className="text-indigo-200 flex items-center">
                          {userProfile.email}
                          {userProfile.emailVerified && (
                            <span className="inline-flex items-center gap-1 ml-2 text-xs text-green-300">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                              </svg>
                              Verificado
                            </span>
                          )}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="p-6">
                    {success && (
                      <div className="mb-6 p-4 bg-green-500/10 border border-green-500/30 rounded-lg text-green-400 flex items-start">
                        <svg className="w-5 h-5 mr-2 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span>{success}</span>
                      </div>
                    )}

                    {error && (
                      <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 flex items-start">
                        <svg className="w-5 h-5 mr-2 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                        </svg>
                        <span>{error}</span>
                      </div>
                    )}

                    <div className="space-y-8">
                      <div className="bg-gray-800/30 rounded-lg p-5 border border-gray-700/20">
                        <h3 className="text-lg font-medium mb-4 flex items-center text-indigo-300">
                          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                          Información de la cuenta
                        </h3>
                        <div className="space-y-4">
                          <div className="flex flex-col md:flex-row md:items-start justify-between p-3 bg-gray-700/20 rounded-lg transition-colors hover:bg-gray-700/30">
                            <div>
                              <p className="text-sm text-gray-400 mb-0.5 text-left">Nombre</p>
                              <p className="font-medium">{userProfile.nombre}</p>
                            </div>
                            <button 
                              className="btn-sm bg-gray-700/50 text-gray-400 mt-2 md:mt-0 transition-all duration-200 cursor-not-allowed opacity-60 relative group"
                              disabled
                            >
                              <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 whitespace-nowrap transition-opacity duration-200 pointer-events-none">
                                No disponible
                              </span>
                              Editar
                            </button>
                          </div>
                          <div className="flex flex-col md:flex-row md:items-start justify-between p-3 bg-gray-700/20 rounded-lg transition-colors hover:bg-gray-700/30">
                            <div>
                              <p className="text-sm text-gray-400 mb-0.5 text-left">Email</p>
                              <div className="flex flex-wrap items-center gap-2">
                                <p className="font-medium">{userProfile.email}</p>
                                {userProfile.emailVerified && (
                                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-900/30 text-green-400 border border-green-500/30">
                                    Verificado
                                  </span>
                                )}
                                {!userProfile.emailVerified && (
                                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-yellow-900/30 text-yellow-400 border border-yellow-500/30">
                                    No verificado
                                  </span>
                                )}
                              </div>
                            </div>
                            <button 
                              className="btn-sm bg-gray-700/50 text-gray-400 mt-2 md:mt-0 transition-all duration-200 cursor-not-allowed opacity-60 relative group"
                              disabled
                            >
                              <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 whitespace-nowrap transition-opacity duration-200 pointer-events-none">
                                No disponible
                              </span>
                              Cambiar email
                            </button>
                          </div>
                        </div>
                      </div>

                      <div className="bg-gray-800/30 rounded-lg p-5 border border-gray-700/20">
                        <h3 className="text-lg font-medium mb-4 flex items-center text-indigo-300">
                          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                          </svg>
                          Seguridad
                        </h3>
                        <div className="space-y-4">
                          <div className="flex flex-col md:flex-row md:items-start justify-between p-3 bg-gray-700/20 rounded-lg transition-colors hover:bg-gray-700/30">
                            <div>
                              <p className="text-sm text-gray-400 mb-0.5 text-left">Contraseña</p>
                              <p className="font-medium">••••••••</p>
                            </div>
                            <button 
                              className="btn-sm bg-gray-700 hover:bg-gray-600 text-white mt-2 md:mt-0 transition-all duration-200 hover:shadow-md hover:shadow-gray-900/50 flex items-center"
                              onClick={handlePasswordReset}
                              disabled={passwordResetLoading}
                            >
                              {passwordResetLoading ? (
                                <>
                                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                  </svg>
                                  Enviando...
                                </>
                              ) : (
                                'Cambiar contraseña'
                              )}
                            </button>
                          </div>
                        </div>
                      </div>

                      <div className="pt-4">
                        <button 
                          onClick={handleLogout}
                          disabled={loading}
                          className="w-full py-3 px-4 bg-gradient-to-r from-red-600 to-red-700 text-white font-medium rounded-lg hover:from-red-700 hover:to-red-800 transition-all duration-200 flex items-center justify-center hover:shadow-lg hover:shadow-red-600/20 disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                          </svg>
                          {loading ? "Cerrando sesión..." : "Cerrar sesión"}
                        </button>
                      </div>
                    </div>
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