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