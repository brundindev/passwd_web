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

export default function Passwords() {
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
            router.push("/signin");
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
  // Modificamos para evitar el error de Set con ES5
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
      <div className="pt-24 px-4 md:px-6 max-w-6xl mx-auto min-h-screen">
        <div className="flex flex-col items-center justify-center h-64">
          <div className="w-12 h-12 border-t-4 border-indigo-500 border-solid rounded-full animate-spin"></div>
          <p className="mt-4 text-gray-400">Cargando tus contraseñas...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="pt-24 px-4 md:px-6 max-w-6xl mx-auto min-h-screen">
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
      </div>
    );
  }

  return (
    <div className="pt-24 px-4 md:px-6 max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Mis Contraseñas</h1>
        <p className="text-gray-400">Administra tus contraseñas guardadas de forma segura</p>
      </div>

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
          className="grid gap-4 md:grid-cols-2"
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
                            ? "M13.875 18.825A10.05 10.05 0 0112 19c-2.891 0-5.6-1.214-7.5-3.345m15 0A9.51 9.51 0 0121 12c0-2.391-1.314-4.5-3.375-6.345M8.625 4.155A10.05 10.05 0 0112 4c4.418 0 8 3.526 8 8 0 1.374-.36 2.654-.954 3.82L8.625 4.155z M19.542 21.542A17.92 17.92 0 0112 23c-4.418 0-8-3.526-8-8c0-1.374.36-2.654.954-3.82l11.79 11.79a18.12 18.12 0 002.798-1.428z M3 3l18 18" 
                            : "M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
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