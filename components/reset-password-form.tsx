"use client";

import { useState } from "react";
import Link from "next/link";
import { authService } from "@/lib/firebase/firebase";

export default function ResetPasswordForm() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");
    setLoading(true);

    try {
      // Validación básica
      if (!email.trim()) {
        throw new Error("Por favor, introduce tu correo electrónico");
      }

      // Enviar correo de restablecimiento
      await authService.sendPasswordResetEmail(email);
      setSuccessMessage("Se ha enviado un correo para restablecer tu contraseña. Por favor, revisa tu bandeja de entrada.");

    } catch (err: any) {
      setError(err.message || "Error al enviar el correo de restablecimiento");
      console.error("Error al restablecer contraseña:", err);
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
        </div>

        {error && (
          <div className="mt-4 text-sm text-red-500 bg-red-100/10 p-3 rounded-lg">
            {error}
          </div>
        )}

        {successMessage && (
          <div className="mt-4 text-sm text-green-500 bg-green-100/10 p-3 rounded-lg">
            {successMessage}
          </div>
        )}

        <div className="mt-6">
          <button
            type="submit"
            disabled={loading}
            className="btn group w-full bg-linear-to-t from-indigo-600 to-indigo-500 text-white shadow-[inset_0px_1px_0px_--theme(--color-white/.16)] hover:bg-[length:100%_150%]"
          >
            <span className="relative inline-flex items-center">
              {loading ? "Enviando..." : "Restablecer contraseña"}
            </span>
          </button>
        </div>

        <div className="text-center mt-8">
          <div className="text-sm text-indigo-200/65">
            <Link href="/signin" className="text-indigo-500 hover:text-indigo-400">
              Volver a iniciar sesión
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
} 