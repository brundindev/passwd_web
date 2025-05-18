"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { authService } from '@/lib/firebase/firebase';

// Definir el tipo para el contexto
interface AuthContextType {
  currentUser: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  userProfile: UserProfile | null;
}

// Tipo para el perfil de usuario
interface UserProfile {
  uid: string;
  nombre: string;
  email: string | null;
  emailVerified: boolean;
  photoURL: string | null;
  role?: string;
  registroCompletado?: boolean;
}

// Crear el contexto con valores por defecto
const AuthContext = createContext<AuthContextType>({
  currentUser: null,
  isAuthenticated: false,
  isLoading: true,
  userProfile: null,
});

// Hook personalizado para acceder al contexto
export const useAuth = () => useContext(AuthContext);

// Props para el proveedor
interface AuthProviderProps {
  children: ReactNode;
}

// Componente proveedor
export default function AuthProvider({ children }: AuthProviderProps) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    // Escuchar cambios en el estado de autenticación
    const unsubscribe = onAuthStateChanged(authService.auth, async (user) => {
      setCurrentUser(user);
      
      if (user) {
        try {
          // Verificar si existe el perfil en Firestore
          const exists = await authService.checkUserExists(user.uid);
          
          if (exists) {
            // Obtener datos del perfil de usuario desde Firestore
            const userDoc = await authService.getUserProfile(user.uid);
            if (userDoc) {
              setUserProfile({
                uid: user.uid,
                nombre: userDoc.nombre || user.displayName || user.email?.split('@')[0] || 'Usuario',
                email: user.email,
                emailVerified: user.emailVerified,
                photoURL: user.photoURL,
                role: userDoc.role,
                registroCompletado: userDoc.registroCompletado,
              });
            }
          } else if (user.emailVerified) {
            // Si el usuario está verificado pero no existe en Firestore, crearlo
            await authService.createUserInFirestore(user);
            
            setUserProfile({
              uid: user.uid,
              nombre: user.displayName || user.email?.split('@')[0] || 'Usuario',
              email: user.email,
              emailVerified: user.emailVerified,
              photoURL: user.photoURL,
            });
          }
        } catch (error) {
          console.error("Error al obtener datos del usuario:", error);
        }
      } else {
        // Usuario no autenticado
        setUserProfile(null);
      }
      
      setIsLoading(false);
    });

    // Limpiar el listener cuando el componente se desmonte
    return () => unsubscribe();
  }, []);

  // Valores que se proporcionarán a través del contexto
  const value = {
    currentUser,
    isAuthenticated: !!currentUser && currentUser.emailVerified,
    isLoading,
    userProfile,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
} 