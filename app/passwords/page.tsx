"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth/auth-context";
import PageTransition from "@/components/ui/animation/page-transition";
import ScrollAnimation from "@/components/ui/animation/scroll-animation";
import PasswordsClient from "./passwords-client";

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

  return <PasswordsClient />;
} 