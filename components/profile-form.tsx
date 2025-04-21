"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { authService, auth } from "@/lib/firebase/firebase";
import { updateProfile } from "firebase/auth";

export default function ProfileForm() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const router = useRouter();

  useEffect(() => {
    // Redireccionar si no hay usuario autenticado
    const unsubscribe = authService.auth.onAuthStateChanged((currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        setDisplayName(currentUser.displayName || currentUser.email?.split('@')[0] || "");
        setEmail(currentUser.email || "");
        setLoading(false);
      } else {
        // No hay usuario autenticado, redirigir a la página de inicio de sesión
        router.push("/signin");
      }
    });

    // Limpiar el evento al desmontar
    return () => unsubscribe();
  }, [router]);

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setIsSaving(true);

    try {
      // Actualizar el perfil del usuario con el nombre de visualización
      if (user) {
        await updateProfile(user, {
          displayName: displayName
        });
        
        // Actualizar datos locales
        setUser({ ...user, displayName });
        setSuccess("¡Perfil actualizado correctamente!");
        setIsEditing(false);
      }
    } catch (err: any) {
      setError(err.message || "Error al actualizar el perfil");
      console.error("Error al actualizar el perfil:", err);
    } finally {
      setIsSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <div className="animate-pulse text-indigo-400">Cargando perfil...</div>
      </div>
    );
  }

  return (
    <div className="bg-gray-800/30 rounded-xl p-6 border border-gray-700">
      <div className="flex flex-col items-center mb-6">
        {/* Avatar del usuario */}
        <div className="mb-4 relative">
          <div className="overflow-hidden rounded-full border-2 border-indigo-500">
            <Image
              src={user?.photoURL || "/images/generic-avatar.png"}
              alt="Foto de perfil"
              width={80}
              height={80}
              className="rounded-full object-cover"
            />
          </div>
        </div>

        {/* Información del usuario */}
        <div className="text-center mb-6">
          <h3 className="text-xl font-semibold text-white mb-1">
            {user?.displayName || user?.email?.split('@')[0] || "Usuario"}
          </h3>
          <p className="text-sm text-gray-400">{user?.email}</p>
          <p className="text-xs text-gray-500 mt-1">
            Miembro desde {user?.metadata?.creationTime 
              ? new Date(user.metadata.creationTime).toLocaleDateString("es-ES", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })
              : "fecha desconocida"}
          </p>
        </div>
      </div>

      {/* Formulario de perfil */}
      <form onSubmit={handleSaveProfile}>
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-indigo-200/65 mb-1" htmlFor="displayName">
              Nombre
            </label>
            <input
              id="displayName"
              name="displayName"
              type="text"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              disabled={!isEditing || isSaving}
              className={`w-full bg-gray-800/30 border border-gray-700 focus:border-indigo-500 focus:ring-indigo-500 placeholder-gray-500 py-3 px-4 rounded-full dark:text-white ${
                !isEditing ? "opacity-70" : ""
              }`}
              placeholder="Tu nombre"
            />
          </div>
          <div>
            <label className="block text-sm text-indigo-200/65 mb-1" htmlFor="email">
              Correo electrónico
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={email}
              disabled
              className="w-full bg-gray-800/30 border border-gray-700 opacity-70 py-3 px-4 rounded-full dark:text-white"
              placeholder="usuario@ejemplo.com"
            />
            <p className="mt-1 text-xs text-gray-500">El correo electrónico no se puede cambiar</p>
          </div>
        </div>

        {/* Mensajes de error y éxito */}
        {error && (
          <div className="mt-4 text-sm text-red-500 bg-red-100/10 p-3 rounded-lg">
            {error}
          </div>
        )}

        {success && (
          <div className="mt-4 text-sm text-green-500 bg-green-100/10 p-3 rounded-lg">
            {success}
          </div>
        )}

        {/* Botones de acción */}
        <div className="mt-6 flex justify-between">
          {isEditing ? (
            <>
              <button
                type="button"
                onClick={() => {
                  setIsEditing(false);
                  setDisplayName(user?.displayName || user?.email?.split('@')[0] || "");
                }}
                disabled={isSaving}
                className="btn-sm bg-gray-700 text-gray-300 hover:bg-gray-600"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={isSaving}
                className="btn-sm bg-linear-to-t from-indigo-600 to-indigo-500 text-white shadow-[inset_0px_1px_0px_--theme(--color-white/.16)] hover:bg-[length:100%_150%]"
              >
                {isSaving ? "Guardando..." : "Guardar cambios"}
              </button>
            </>
          ) : (
            <>
              <button
                type="button"
                onClick={() => router.push("/reset-password")}
                className="btn-sm bg-gray-700 text-gray-300 hover:bg-gray-600"
              >
                Cambiar contraseña
              </button>
              <button
                type="button"
                onClick={() => setIsEditing(true)}
                className="btn-sm bg-linear-to-t from-indigo-600 to-indigo-500 text-white shadow-[inset_0px_1px_0px_--theme(--color-white/.16)] hover:bg-[length:100%_150%]"
              >
                Editar perfil
              </button>
            </>
          )}
        </div>
      </form>
    </div>
  );
} 