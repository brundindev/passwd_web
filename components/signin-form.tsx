"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authService } from "@/lib/firebase/firebase";

export default function SignInForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Comprobar si el usuario ya está autenticado
  useEffect(() => {
    const checkAuth = () => {
      const user = authService.getCurrentUser();
      if (user) {
        // Si el usuario ya está autenticado, redirigir a la página principal
        router.push("/");
      }
    };
    
    checkAuth();
    
    // Limpiar posibles errores de estado al montar el componente
    const hasStateError = localStorage.getItem("auth_state_error");
    if (hasStateError) {
      localStorage.removeItem("auth_state_error");
      // Limpiar URL de parámetros que puedan causar problemas
      if (window.location.href.includes('?')) {
        router.replace('/signin');
      }
    }
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Validación básica
      if (!email.trim() || !password.trim()) {
        throw new Error("Por favor, completa todos los campos");
      }

      // Iniciar sesión con Firebase
      await authService.signInWithEmailAndPassword(email, password);
      router.push("/"); // Redirigir a la página principal después del inicio de sesión exitoso

    } catch (err: any) {
      setError(err.message || "Error al iniciar sesión");
      console.error("Error de inicio de sesión:", err);
      
      // Si es un error de estado, marcarlo para limpiarlo en la próxima carga
      if (err.code === 'auth/missing-initial-state') {
        localStorage.setItem("auth_state_error", "true");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setError("");
    setLoading(true);

    try {
      await authService.signInWithGoogle();
      router.push("/"); // Redirigir a la página principal después del inicio de sesión exitoso
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

        <div className="text-center mt-6">
          <div className="text-sm text-indigo-200/65 mb-4">o iniciar sesión con</div>
          <button
            type="button"
            onClick={handleGoogleSignIn}
            disabled={loading}
            className="btn relative w-full bg-linear-to-b from-gray-800 to-gray-800/60 text-gray-300 before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:border before:border-transparent before:[background:linear-gradient(to_right,var(--color-gray-800),var(--color-gray-700),var(--color-gray-800))_border-box] before:[mask-composite:exclude_!important] before:[mask:linear-gradient(white_0_0)_padding-box,_linear-gradient(white_0_0)] hover:bg-[length:100%_150%]"
          >
            <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
            Google
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