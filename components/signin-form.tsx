"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authService } from "@/lib/firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";

export default function SignInForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Comprobar si el usuario ya está autenticado
  useEffect(() => {
    const checkAuth = () => {
      const user = authService.getCurrentUser();
      if (user && user.emailVerified) {
        // Si el usuario ya está autenticado y verificado, redirigir a la página principal
        router.push("/");
      }
    };
    
    checkAuth();
    
    // Configurar el observer para detectar cambios en el estado de autenticación
    const unsubscribe = onAuthStateChanged(authService.auth, async (user) => {
      if (user) {
        if (user.emailVerified) {
          // Verificar si el usuario existe en Firestore, si no, crearlo
          const exists = await authService.checkUserExists(user.uid);
          if (!exists) {
            try {
              await authService.createUserInFirestore(user);
            } catch (error) {
              console.error("Error al crear usuario en Firestore:", error);
            }
          }
          router.push("/");
        } else if (user.providerData[0].providerId === 'password') {
          // Si el usuario inició sesión con email/password pero no verificó su email
          setError("Por favor, verifica tu correo electrónico antes de iniciar sesión. Revisa tu bandeja de entrada.");
          await authService.signOut();
        }
      }
    });

    // Limpiar posibles errores de estado al montar el componente
    const hasStateError = localStorage.getItem("auth_state_error");
    if (hasStateError) {
      localStorage.removeItem("auth_state_error");
      // Limpiar URL de parámetros que puedan causar problemas
      if (window.location.href.includes('?')) {
        router.replace('/login');
      }
    }
    
    return () => unsubscribe(); // Limpiar observer al desmontar
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      // Validación básica
      if (!email.trim() || !password.trim()) {
        throw new Error("Por favor, completa todos los campos");
      }

      // Iniciar sesión con Firebase
      await authService.signInWithEmailAndPassword(email, password);
      
      // No es necesario establecer éxito o redirigir aquí 
      // ya que el observer de onAuthStateChanged se encargará de eso
      setSuccess("Iniciando sesión...");

    } catch (err: any) {
      setError(err.message || "Error al iniciar sesión");
      console.error("Error de inicio de sesión:", err);
      
      // Si es un error de estado, marcarlo para limpiarlo en la próxima carga
      if (err.code === 'auth/missing-initial-state') {
        localStorage.setItem("auth_state_error", "true");
      }
      
      // Si el error es de verificación de correo, mostrar opción para reenviar
      if (err.message && err.message.includes("verifica tu correo electrónico")) {
        setError(err.message + " ¿No has recibido el correo? Puedes ");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      await authService.signInWithGoogle();
      // No es necesario redirigir aquí, onAuthStateChanged lo hará
    } catch (err: any) {
      setError(err.message || "Error al iniciar sesión con Google");
      console.error("Error de inicio de sesión con Google:", err);
      
      // Si es un error de estado, marcarlo para limpiarlo en la próxima carga
      if (err.code === 'auth/missing-initial-state') {
        localStorage.setItem("auth_state_error", "true");
      }
    } finally {
      setLoading(false);
    }
  };

  // Función para reenviar el correo de verificación
  const handleResendVerification = async () => {
    try {
      setLoading(true);
      setError("");
      
      // Iniciar sesión temporalmente para enviar el correo
      const userCredential = await authService.signInWithEmailAndPassword(email, password);
      
      // Enviar correo de verificación
      await authService.sendEmailVerification(userCredential.user);
      
      // Cerrar sesión nuevamente
      await authService.signOut();
      
      setSuccess("Se ha enviado un nuevo correo de verificación. Por favor, revisa tu bandeja de entrada.");
    } catch (err: any) {
      setError("No se pudo reenviar el correo de verificación: " + (err.message || "Error desconocido"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form className="mt-8" onSubmit={handleSubmit}>
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-indigo-200/65" htmlFor="email">
              Correo electrónico
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-gray-800/30 border border-gray-700 focus:border-indigo-500 focus:ring-indigo-500 placeholder-gray-500 py-3 px-4 rounded-full dark:text-white"
              placeholder="usuario@ejemplo.com"
              required
            />
          </div>
          <div>
            <label className="block text-sm text-indigo-200/65" htmlFor="password">
              Contraseña
            </label>
            <input
              id="password"
              name="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-gray-800/30 border border-gray-700 focus:border-indigo-500 focus:ring-indigo-500 placeholder-gray-500 py-3 px-4 rounded-full dark:text-white"
              placeholder="******"
              required
            />
          </div>
        </div>

        {error && (
          <div className="mt-4 text-sm text-red-500 bg-red-100/10 p-3 rounded-lg">
            {error.includes("verifica tu correo electrónico") ? (
              <>
                Por favor, verifica tu correo electrónico antes de iniciar sesión. Revisa tu bandeja de entrada.
                {email && password ? (
                  <button 
                    type="button"
                    onClick={handleResendVerification}
                    className="ml-1 text-indigo-400 underline"
                  >
                    Reenviar correo de verificación
                  </button>
                ) : (
                  <span> Ingresa tus credenciales para poder reenviar el correo de verificación.</span>
                )}
              </>
            ) : (
              error
            )}
            {error.includes("estado inicial") && (
              <div className="mt-2">
                <button 
                  onClick={() => window.location.reload()} 
                  className="text-indigo-400 underline"
                >
                  Haz clic aquí para recargar la página
                </button>
              </div>
            )}
          </div>
        )}

        {success && (
          <div className="mt-4 text-sm text-green-500 bg-green-100/10 p-3 rounded-lg">
            {success}
          </div>
        )}

        <div className="mt-6">
          <button
            type="submit"
            disabled={loading}
            className="btn group w-full bg-linear-to-t from-indigo-600 to-indigo-500 text-white shadow-[inset_0px_1px_0px_--theme(--color-white/.16)] hover:bg-[length:100%_150%]"
          >
            <span className="relative inline-flex items-center">
              {loading ? "Iniciando sesión..." : "Iniciar sesión"}
            </span>
          </button>
        </div>

        <div className="mt-4 relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-700"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-gray-900 text-indigo-200/65">O inicia sesión con</span>
          </div>
        </div>

        <div className="mt-6">
          <button 
            type="button"
            onClick={handleGoogleSignIn}
            disabled={loading}
            className="btn group w-full border border-gray-700 bg-gray-800/30 hover:bg-gray-800/50 text-white"
          >
            <span className="relative inline-flex items-center">
              {/* Icono de Google */}
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 24 24">
                <path d="M12.545,12.151L12.545,12.151c0,1.054,0.855,1.909,1.909,1.909h3.536c-0.229,1.282-0.818,2.427-1.6,3.3 c-1.35,1.55-3.253,2.487-5.386,2.487c-4.048,0-7.272-3.224-7.272-7.273s3.224-7.273,7.272-7.273c1.604,0,3.018,0.524,4.144,1.425 c0.578,0.462,1.362,0.462,1.94,0c0.578-0.462,0.641-1.326,0.179-1.904c-1.633-2.05-4.113-3.368-6.816-3.368 c-4.997,0-9.09,4.093-9.09,9.09s4.093,9.09,9.09,9.09c4.997,0,9.09-4.093,9.09-9.09c0-0.647-0.074-1.289-0.217-1.909h-5.818 V12.151z" fill="currentColor"></path>
              </svg>
              Google
            </span>
          </button>
        </div>

        <div className="text-center mt-8">
          <div className="text-sm text-indigo-200/65">
            ¿No tienes una cuenta?{" "}
            <Link href="/registro" className="text-indigo-500 hover:text-indigo-400">
              Regístrate
            </Link>
          </div>
          <div className="text-sm text-indigo-200/65 mt-2">
            <Link href="/reset-password" className="text-indigo-500 hover:text-indigo-400">
              ¿Olvidaste tu contraseña?
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
} 