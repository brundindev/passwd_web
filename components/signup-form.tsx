"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authService } from "@/lib/firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";

export default function SignUpForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
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
    
    // Escuchar cambios en el estado de autenticación para detectar verificación de email
    const unsubscribe = onAuthStateChanged(authService.auth, async (user) => {
      if (user) {
        // Si el usuario acaba de verificar su email y vuelve a la app
        if (user.emailVerified) {
          try {
            // Crear el usuario en Firestore después de verificar email
            await authService.createUserInFirestore(user, {
              nombre: name || user.email?.split('@')[0] || 'Usuario',
            });
            router.push("/");
          } catch (error) {
            console.error("Error al crear usuario en Firestore:", error);
          }
        }
      }
    });
    
    // Limpiar posibles errores de estado al montar el componente
    const hasStateError = localStorage.getItem("auth_state_error");
    if (hasStateError) {
      localStorage.removeItem("auth_state_error");
      // Limpiar URL de parámetros que puedan causar problemas
      if (window.location.href.includes('?')) {
        router.replace('/registro');
      }
    }
    
    return () => unsubscribe(); // Limpiar al desmontar
  }, [router, name]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      // Validación básica
      if (!email.trim() || !password.trim() || !confirmPassword.trim()) {
        throw new Error("Por favor, completa todos los campos");
      }

      if (password !== confirmPassword) {
        throw new Error("Las contraseñas no coinciden");
      }

      if (password.length < 6) {
        throw new Error("La contraseña debe tener al menos 6 caracteres");
      }

      // Registrar usuario en Firebase
      await authService.createUserWithEmailAndPassword(email, password, name);
      
      // Mostrar mensaje de éxito y no redirigir automáticamente
      setSuccess("¡Registro exitoso! Se ha enviado un correo de verificación a tu dirección de email. Por favor, verifica tu correo electrónico para poder iniciar sesión.");
      
      // Limpiar formulario
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setName("");
      
      // Cerrar sesión para forzar la verificación de email
      setTimeout(async () => {
        await authService.signOut();
      }, 2000);
      
      // Redirigir después de unos segundos
      setTimeout(() => {
        router.push("/login");
      }, 5000);

    } catch (err: any) {
      setError(err.message || "Error al registrarse");
      console.error("Error de registro:", err);
      
      // Si es un error de estado, marcarlo para limpiarlo en la próxima carga
      if (err.code === 'auth/missing-initial-state') {
        localStorage.setItem("auth_state_error", "true");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignUp = async () => {
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      await authService.signInWithGoogle();
      router.push("/"); // Redirigir a la página principal después del registro exitoso con Google
    } catch (err: any) {
      setError(err.message || "Error al registrarse con Google");
      console.error("Error de registro con Google:", err);
      
      // Si es un error de estado, marcarlo para limpiarlo en la próxima carga
      if (err.code === 'auth/missing-initial-state') {
        localStorage.setItem("auth_state_error", "true");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form className="mt-8" onSubmit={handleSubmit}>
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-indigo-200/65" htmlFor="name">
              Nombre (opcional)
            </label>
            <input
              id="name"
              name="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-gray-800/30 border border-gray-700 focus:border-indigo-500 focus:ring-indigo-500 placeholder-gray-500 py-3 px-4 rounded-full dark:text-white"
              placeholder="Tu nombre"
            />
          </div>
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
          <div>
            <label className="block text-sm text-indigo-200/65" htmlFor="confirm-password">
              Confirmar contraseña
            </label>
            <input
              id="confirm-password"
              name="confirm-password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full bg-gray-800/30 border border-gray-700 focus:border-indigo-500 focus:ring-indigo-500 placeholder-gray-500 py-3 px-4 rounded-full dark:text-white"
              placeholder="******"
              required
            />
          </div>
        </div>

        {error && (
          <div className="mt-4 text-sm text-red-500 bg-red-100/10 p-3 rounded-lg">
            {error}
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
              {loading ? "Registrando..." : "Registrarse"}
            </span>
          </button>
        </div>

        <div className="mt-4 relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-700"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-gray-900 text-indigo-200/65">O regístrate con</span>
          </div>
        </div>

        <div className="mt-6">
          <button 
            type="button"
            onClick={handleGoogleSignUp}
            disabled={loading}
            className="btn group w-full border border-gray-700 bg-white hover:bg-gray-100 text-gray-800"
          >
            <span className="relative inline-flex items-center">
              {/* Icono de Google con colores oficiales */}
              <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <g transform="matrix(1, 0, 0, 1, 27.009001, -39.238998)">
                  <path fill="#4285F4" d="M -3.264 51.509 C -3.264 50.719 -3.334 49.969 -3.454 49.239 L -14.754 49.239 L -14.754 53.749 L -8.284 53.749 C -8.574 55.229 -9.424 56.479 -10.684 57.329 L -10.684 60.329 L -6.824 60.329 C -4.564 58.239 -3.264 55.159 -3.264 51.509 Z"/>
                  <path fill="#34A853" d="M -14.754 63.239 C -11.514 63.239 -8.804 62.159 -6.824 60.329 L -10.684 57.329 C -11.764 58.049 -13.134 58.489 -14.754 58.489 C -17.884 58.489 -20.534 56.379 -21.484 53.529 L -25.464 53.529 L -25.464 56.619 C -23.494 60.539 -19.444 63.239 -14.754 63.239 Z"/>
                  <path fill="#FBBC05" d="M -21.484 53.529 C -21.734 52.809 -21.864 52.039 -21.864 51.239 C -21.864 50.439 -21.724 49.669 -21.484 48.949 L -21.484 45.859 L -25.464 45.859 C -26.284 47.479 -26.754 49.299 -26.754 51.239 C -26.754 53.179 -26.284 54.999 -25.464 56.619 L -21.484 53.529 Z"/>
                  <path fill="#EA4335" d="M -14.754 43.989 C -12.984 43.989 -11.404 44.599 -10.154 45.789 L -6.734 42.369 C -8.804 40.429 -11.514 39.239 -14.754 39.239 C -19.444 39.239 -23.494 41.939 -25.464 45.859 L -21.484 48.949 C -20.534 46.099 -17.884 43.989 -14.754 43.989 Z"/>
                </g>
              </svg>
              Google
            </span>
          </button>
        </div>

        <div className="text-center mt-8">
          <div className="text-sm text-indigo-200/65">
            ¿Ya tienes una cuenta?{" "}
            <Link href="/login" className="text-indigo-500 hover:text-indigo-400">
              Inicia sesión
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
} 