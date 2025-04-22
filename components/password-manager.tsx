"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { getFirestore, collection, getDocs, query, where, doc } from "firebase/firestore";
import { authService } from "@/lib/firebase/firebase";

// Tipo para las contraseñas guardadas
interface SavedPassword {
  id: string;
  sitio: string;
  url: string;
  usuario: string;
  contrasena: string;
  fechaCreacion: Date;
  categoria?: string;
  notas?: string;
}

export default function PasswordManager() {
  const [passwords, setPasswords] = useState<SavedPassword[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState<Record<string, boolean>>({});
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const router = useRouter();

  // Constantes para obtener logos de sitios web
  const getFaviconUrl = (url: string) => {
    try {
      const domain = new URL(url).hostname;
      return `https://www.google.com/s2/favicons?domain=${domain}&sz=64`;
    } catch (error) {
      return `https://ui-avatars.com/api/?name=${url.substring(0, 2)}&background=random`;
    }
  };

  // Obtener las contraseñas del usuario al cargar la página
  useEffect(() => {
    let authCheckTimeout: NodeJS.Timeout;
    const unsubscribe = authService.auth.onAuthStateChanged((currentUser) => {
      if (currentUser) {
        // Usuario autenticado, cargar contraseñas
        fetchPasswords(currentUser.uid);
      } else {
        // Esperar un poco antes de redirigir por si es solo que está cargando
        authCheckTimeout = setTimeout(() => {
          // Verificar de nuevo si hay usuario
          const user = authService.auth.currentUser;
          if (!user) {
            router.push("/login");
          } else {
            fetchPasswords(user.uid);
          }
        }, 1500); // Esperar 1.5 segundos
      }
    });
    
    // Función para cargar contraseñas
    const fetchPasswords = async (userId: string) => {
      try {
        setLoading(true);
        const db = getFirestore();
        // Acceder a la subcolección "pass" dentro del documento del usuario
        const userDocRef = doc(db, "usuarios", userId);
        const passwordsCollectionRef = collection(userDocRef, "pass");
        
        const querySnapshot = await getDocs(passwordsCollectionRef);
        
        const passwordsData: SavedPassword[] = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          passwordsData.push({
            id: doc.id,
            sitio: data.sitio || data.website || "",
            url: data.url || "",
            usuario: data.usuario || data.username || "",
            contrasena: data.contrasena || data.password || "",
            fechaCreacion: data.fechaCreacion?.toDate() || new Date(),
            categoria: data.categoria || data.category || "",
            notas: data.notas || data.notes || ""
          });
        });
        
        // Ordenar por fecha de creación, más reciente primero
        passwordsData.sort((a, b) => b.fechaCreacion.getTime() - a.fechaCreacion.getTime());
        
        setPasswords(passwordsData);
        setLoading(false);
      } catch (error) {
        console.error("Error al cargar contraseñas:", error);
        setError("No se pudieron cargar tus contraseñas. Por favor, inténtalo de nuevo más tarde.");
        setLoading(false);
      }
    };
    
    return () => {
      unsubscribe();
      if (authCheckTimeout) clearTimeout(authCheckTimeout);
    };
  }, [router]);

  // Toggle para mostrar/ocultar contraseña
  const togglePasswordVisibility = (id: string) => {
    setShowPassword(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  // Copiar al portapapeles
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // Aquí podrías añadir una notificación de que se ha copiado
  };

  // Filtrar contraseñas basadas en la búsqueda y categoría
  const filteredPasswords = passwords.filter(password => {
    const matchesSearch = 
      password.sitio.toLowerCase().includes(searchTerm.toLowerCase()) ||
      password.usuario.toLowerCase().includes(searchTerm.toLowerCase()) ||
      password.url.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (password.notas?.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = selectedCategory === "all" || password.categoria === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  // Obtener categorías únicas de las contraseñas
  const categoriesSet = new Set<string>();
  passwords.forEach(p => {
    if (p.categoria) categoriesSet.add(p.categoria);
  });
  const categories = ["all", ...Array.from(categoriesSet)];

  // Variantes para animaciones
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: { 
        type: "spring", 
        stiffness: 200, 
        damping: 20 
      }
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <div className="w-12 h-12 border-t-4 border-indigo-500 border-solid rounded-full animate-spin"></div>
        <p className="mt-4 text-gray-400">Cargando tus contraseñas...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <div className="bg-red-500/10 rounded-lg p-4 border border-red-500/30 text-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-red-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <p className="text-red-500">{error}</p>
          <button 
            className="mt-4 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors"
            onClick={() => window.location.reload()}
          >
            Intentar de nuevo
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Barra de búsqueda y filtros */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="text"
            className="bg-gray-800 text-white w-full pl-10 pr-4 py-2 rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Buscar contraseñas..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <select
          className="bg-gray-800 text-white py-2 px-4 rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="all">Todas las categorías</option>
          {categories.filter(cat => cat !== "all").map((category, index) => (
            <option key={index} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      {/* Lista de contraseñas */}
      {filteredPasswords.length === 0 ? (
        <div className="bg-gray-800/50 rounded-lg p-8 text-center border border-gray-700">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 className="text-xl font-semibold text-gray-200 mb-2">No se encontraron contraseñas</h3>
          <p className="text-gray-400 mb-6">
            {searchTerm || selectedCategory !== "all" 
              ? "No hay resultados que coincidan con tu búsqueda. Intenta con otros términos."
              : "Aún no tienes contraseñas guardadas."}
          </p>
        </div>
      ) : (
        <motion.div 
          className="grid gap-4 md:grid-cols-2 lg:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          {filteredPasswords.map((password) => (
            <motion.div 
              key={password.id} 
              className="bg-gray-800/50 rounded-lg p-4 border border-gray-700 transition-all hover:border-indigo-500/50 hover:bg-gray-800 group"
              variants={itemVariants}
            >
              <div className="flex items-center mb-3">
                <div className="h-10 w-10 flex-shrink-0 rounded-full bg-gray-700 overflow-hidden">
                  <img 
                    src={getFaviconUrl(password.url)}
                    alt={password.sitio}
                    className="h-full w-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = `https://ui-avatars.com/api/?name=${password.sitio.substring(0, 2)}&background=random`;
                    }}
                  />
                </div>
                <div className="ml-3 flex-1 min-w-0">
                  <h3 className="text-lg font-semibold text-white truncate">{password.sitio}</h3>
                  <p className="text-sm text-gray-400 truncate">{password.usuario}</p>
                </div>
              </div>
              
              <div className="mt-4 space-y-3">
                {/* URL */}
                <div className="flex items-center">
                  <span className="text-gray-500 mr-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                    </svg>
                  </span>
                  <span className="text-sm text-gray-400 truncate">{password.url}</span>
                  <button
                    className="ml-auto text-gray-500 hover:text-indigo-400 transition-colors"
                    onClick={() => copyToClipboard(password.url)}
                    title="Copiar URL"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  </button>
                </div>
                
                {/* Usuario */}
                <div className="flex items-center">
                  <span className="text-gray-500 mr-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </span>
                  <span className="text-sm text-gray-400 truncate">{password.usuario}</span>
                  <button
                    className="ml-auto text-gray-500 hover:text-indigo-400 transition-colors"
                    onClick={() => copyToClipboard(password.usuario)}
                    title="Copiar usuario"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  </button>
                </div>
                
                {/* Contraseña */}
                <div className="flex items-center">
                  <span className="text-gray-500 mr-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </span>
                  <span className="text-sm text-gray-400 truncate font-mono">
                    {showPassword[password.id] ? password.contrasena : '••••••••••'}
                  </span>
                  <div className="ml-auto flex">
                    <button
                      className="text-gray-500 hover:text-indigo-400 transition-colors mr-2"
                      onClick={() => togglePasswordVisibility(password.id)}
                      title={showPassword[password.id] ? "Ocultar" : "Mostrar"}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          strokeWidth={2} 
                          d={showPassword[password.id] 
                            ? "M3 3l18 18M10.94 6.08A6.93 6.93 0 0112 6c3.18 0 6.17 2.29 7.91 6a15.23 15.23 0 01-.9 1.64m-5.7-5.7a6.93 6.93 0 00-.94 3.49c0 1.57.53 3.01 1.41 4.17m2.24.21a6.95 6.95 0 01-3.06.75c-3.18 0-6.17-2.29-7.91-6 1.5-3.2 4.09-5.37 6.92-5.91"
                            : "M12 4.5a7.5 7.5 0 00-7.5 7.5c0 1.21.23 2.35.64 3.4.4 1.03 1 1.97 1.74 2.78.73.82 1.61 1.47 2.57 1.91a7.47 7.47 0 005.1 0c.95-.44 1.84-1.09 2.57-1.91.74-.81 1.34-1.75 1.74-2.78.4-1.05.64-2.19.64-3.4 0-4.14-3.36-7.5-7.5-7.5zM12 9a3 3 0 110 6 3 3 0 010-6z"
                          } 
                        />
                      </svg>
                    </button>
                    <button
                      className="text-gray-500 hover:text-indigo-400 transition-colors"
                      onClick={() => copyToClipboard(password.contrasena)}
                      title="Copiar contraseña"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                    </button>
                  </div>
                </div>
                
                {/* Categoría */}
                {password.categoria && (
                  <div className="mt-2">
                    <span className="inline-block bg-gray-700 text-gray-300 text-xs rounded-full px-3 py-1">
                      {password.categoria}
                    </span>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
} 