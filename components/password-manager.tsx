"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { getFirestore, collection, getDocs, query, where, doc, getDoc } from "firebase/firestore";
import { authService } from "@/lib/firebase/firebase";

// Tipo para las contraseñas guardadas
interface SavedPassword {
  id: string;
  sitio: string;
  url: string;
  usuario: string;
  contrasena: string;
  fechaCreacion: Date;
  categoria?: string | string[];
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
    console.log("Iniciando efecto para cargar contraseñas");
    
    const unsubscribe = authService.auth.onAuthStateChanged(async (currentUser) => {
      console.log("Estado de autenticación actualizado:", currentUser ? "Usuario autenticado" : "Sin usuario");
      if (currentUser) {
        // Usuario autenticado, verificar y reparar estructura de datos si es necesario
        console.log("UID del usuario:", currentUser.uid);
        
        try {
          console.log("Verificando estructura de datos del usuario...");
          const repaired = await authService.verifyAndRepairUserData(currentUser.uid);
          if (repaired) {
            console.log("Se ha reparado la estructura de datos del usuario. Cargando contraseñas...");
          }
          // Intentar cargar contraseñas después de verificar/reparar
          fetchPasswords(currentUser.uid);
        } catch (error) {
          console.error("Error al verificar/reparar datos:", error);
          // Intentar cargar contraseñas de todos modos
          fetchPasswords(currentUser.uid);
        }
      } else {
        // Esperar un poco antes de redirigir por si es solo que está cargando
        authCheckTimeout = setTimeout(() => {
          // Verificar de nuevo si hay usuario
          const user = authService.auth.currentUser;
          console.log("Recomprobando usuario después del timeout:", user ? "Usuario encontrado" : "Sin usuario");
          if (!user) {
            router.push("/login");
          } else {
            // Usuario autenticado después del timeout, verificar y reparar
            authService.verifyAndRepairUserData(user.uid)
              .then(repaired => {
                console.log("Resultado de verificación/reparación:", repaired ? "Reparado" : "No necesitaba reparación");
                fetchPasswords(user.uid);
              })
              .catch(error => {
                console.error("Error al verificar/reparar datos después del timeout:", error);
                fetchPasswords(user.uid);
              });
          }
        }, 1500); // Esperar 1.5 segundos
      }
    });
    
    return () => {
      console.log("Limpiando efecto");
      unsubscribe();
      if (authCheckTimeout) clearTimeout(authCheckTimeout);
    };
  }, [router]);

  // Función para cargar contraseñas - Movida fuera del useEffect para poder reutilizarla
  const fetchPasswords = async (userId: string) => {
    try {
      console.log("Iniciando carga de contraseñas para usuario:", userId);
      setLoading(true);
      setError(null);
      const db = getFirestore();
      
      // Depuración: imprimir datos del usuario para confirmar autenticación
      const user = authService.auth.currentUser;
      console.log("Info del usuario actual:", {
        uid: user?.uid,
        email: user?.email,
        emailVerified: user?.emailVerified,
        isAnonymous: user?.isAnonymous,
        providerData: user?.providerData
      });
      
      // Intentar obtener el perfil del usuario para verificar que existe
      const userProfile = await authService.getUserProfile(userId);
      console.log("Perfil del usuario:", userProfile);
      
      // Acceder a la subcolección "pass" dentro del documento del usuario
      const userDocRef = doc(db, "usuarios", userId);
      const passwordsCollectionRef = collection(userDocRef, "pass");
      
      console.log("Obteniendo documentos de la colección 'pass'");
      const querySnapshot = await getDocs(passwordsCollectionRef);
      
      console.log("Documentos recuperados:", querySnapshot.size);
      
      // Si no hay documentos en la subcolección 'pass', intentar buscar en otras colecciones posibles
      if (querySnapshot.size === 0) {
        console.log("No se encontraron contraseñas en la ruta principal. Intentando rutas alternativas...");
        
        // Probar ruta alternativa 1: colección "passwords" directamente
        try {
          console.log("Intentando ruta alternativa 1: colección 'passwords'");
          const altPasswordsRef = collection(db, "passwords");
          const altQuery = query(altPasswordsRef, where("userId", "==", userId));
          const altSnapshot = await getDocs(altQuery);
          
          console.log("Documentos encontrados en ruta alternativa 1:", altSnapshot.size);
          if (altSnapshot.size > 0) {
            const passwordsData: SavedPassword[] = [];
            altSnapshot.forEach((doc) => {
              const data = doc.data();
              console.log("Documento encontrado en ruta alternativa:", doc.id);
              passwordsData.push({
                id: doc.id,
                sitio: data.sitio || data.website || "",
                url: data.url || "",
                usuario: data.usuario || data.username || "",
                contrasena: data.contrasena || data.password || "",
                fechaCreacion: data.fechaCreacion?.toDate() || new Date(),
                categoria: data.categoria || data.category || data.folderIds || "",
                notas: data.notas || data.notes || ""
              });
            });
            
            passwordsData.sort((a, b) => b.fechaCreacion.getTime() - a.fechaCreacion.getTime());
            console.log("Total de contraseñas cargadas (ruta alternativa 1):", passwordsData.length);
            setPasswords(passwordsData);
            setLoading(false);
            return;
          }
        } catch (altError) {
          console.error("Error al intentar ruta alternativa 1:", altError);
        }
        
        // Probar ruta alternativa 2: colección "users" con subcolección "passwords"
        try {
          console.log("Intentando ruta alternativa 2: colección 'users' con subcolección 'passwords'");
          const usersDocRef = doc(db, "users", userId);
          const passwordsRef = collection(usersDocRef, "passwords");
          const alt2Snapshot = await getDocs(passwordsRef);
          
          console.log("Documentos encontrados en ruta alternativa 2:", alt2Snapshot.size);
          if (alt2Snapshot.size > 0) {
            const passwordsData: SavedPassword[] = [];
            alt2Snapshot.forEach((doc) => {
              const data = doc.data();
              console.log("Documento encontrado en ruta alternativa 2:", doc.id);
              passwordsData.push({
                id: doc.id,
                sitio: data.sitio || data.website || "",
                url: data.url || "",
                usuario: data.usuario || data.username || "",
                contrasena: data.contrasena || data.password || "",
                fechaCreacion: data.fechaCreacion?.toDate() || new Date(),
                categoria: data.categoria || data.category || data.folderIds || "",
                notas: data.notas || data.notes || ""
              });
            });
            
            passwordsData.sort((a, b) => b.fechaCreacion.getTime() - a.fechaCreacion.getTime());
            console.log("Total de contraseñas cargadas (ruta alternativa 2):", passwordsData.length);
            setPasswords(passwordsData);
            setLoading(false);
            return;
          }
        } catch (alt2Error) {
          console.error("Error al intentar ruta alternativa 2:", alt2Error);
        }
        
        // Si llegamos aquí, no se encontraron contraseñas en ninguna ruta
        console.log("No se encontraron contraseñas en ninguna ruta. Posible problema con la estructura de datos o permisos.");
      }
      
      const passwordsData: SavedPassword[] = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        console.log("Documento encontrado:", doc.id, data);
        passwordsData.push({
          id: doc.id,
          sitio: data.sitio || data.website || "",
          url: data.url || "",
          usuario: data.usuario || data.username || "",
          contrasena: data.contrasena || data.password || "",
          fechaCreacion: data.fechaCreacion?.toDate() || new Date(),
          categoria: data.categoria || data.category || data.folderIds || "",
          notas: data.notas || data.notes || ""
        });
      });
      
      // Ordenar por fecha de creación, más reciente primero
      passwordsData.sort((a, b) => b.fechaCreacion.getTime() - a.fechaCreacion.getTime());
      
      console.log("Total de contraseñas cargadas (ruta principal):", passwordsData.length);
      setPasswords(passwordsData);
      setLoading(false);
    } catch (error) {
      console.error("Error al cargar contraseñas:", error);
      
      // Detallar más el error para diagnóstico
      if (error instanceof Error) {
        console.error("Detalles del error:", {
          mensaje: error.message,
          nombre: error.name,
          stack: error.stack
        });
      }
      
      setError("No se pudieron cargar tus contraseñas. Por favor, inténtalo de nuevo más tarde.");
      setLoading(false);
    }
  };

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

  // Filtrar contraseñas basadas en la búsqueda y categoría/carpeta
  const filteredPasswords = passwords.filter(password => {
    const matchesSearch = 
      password.sitio.toLowerCase().includes(searchTerm.toLowerCase()) ||
      password.usuario.toLowerCase().includes(searchTerm.toLowerCase()) ||
      password.url.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (password.notas?.toLowerCase().includes(searchTerm.toLowerCase()));
    
    // Si selectedCategory es "all", o si la categoría coincide con selectedCategory
    // Para manejar tanto string como array de folderIds
    const matchesCategory = selectedCategory === "all" || 
      password.categoria === selectedCategory ||
      (Array.isArray(password.categoria) && password.categoria.includes(selectedCategory));
    
    return matchesSearch && matchesCategory;
  });

  // Obtener categorías/carpetas únicas de las contraseñas
  const categoriesSet = new Set<string>();
  passwords.forEach(p => {
    if (typeof p.categoria === 'string' && p.categoria) {
      categoriesSet.add(p.categoria);
    } else if (Array.isArray(p.categoria)) {
      p.categoria.forEach(cat => {
        if (cat) categoriesSet.add(cat);
      });
    }
  });
  const categories = ["all", ...Array.from(categoriesSet).sort()];

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
            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors mt-4"
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
      <div className="flex flex-col gap-4 mb-6">
        {/* Barra de búsqueda */}
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
        
        {/* Selector de carpetas/categorías */}
        <div className="mb-2">
          <h3 className="text-gray-300 mb-2 font-semibold">Carpetas</h3>
          <div className="flex flex-wrap gap-2 overflow-x-auto pb-2">
            <button
              onClick={() => setSelectedCategory("all")}
              className={`px-3 py-1.5 rounded-lg flex items-center transition-colors ${
                selectedCategory === "all" 
                  ? 'bg-indigo-600 text-white' 
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
              </svg>
              Todas
            </button>
            
            {categories.filter(cat => cat !== "all").map((category, index) => (
              <button
                key={index}
                onClick={() => setSelectedCategory(category)}
                className={`px-3 py-1.5 rounded-lg flex items-center transition-colors ${
                  selectedCategory === category 
                    ? 'bg-indigo-600 text-white' 
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                </svg>
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>
      
      {/* Mensaje cuando no hay contraseñas */}
      {filteredPasswords.length === 0 && (
        <div className="bg-gray-800/50 rounded-lg p-8 text-center border border-gray-700">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 className="text-xl font-semibold text-gray-200 mb-2">No se encontraron contraseñas</h3>
          <p className="text-gray-400 mb-6">
            {searchTerm 
              ? "No hay resultados que coincidan con tu búsqueda. Intenta con otros términos."
              : selectedCategory !== "all"
                ? `No hay contraseñas en la carpeta "${selectedCategory}". Puedes añadir contraseñas a esta carpeta desde la opción "Añadir contraseña".`
                : "Aún no tienes contraseñas guardadas. Las contraseñas que guardes en la app aparecerán aquí."}
          </p>
        </div>
      )}
      
      {/* Título para resultados filtrados */}
      {filteredPasswords.length > 0 && selectedCategory !== "all" && (
        <div className="mb-4 bg-gray-800/50 rounded-lg p-3 border border-gray-700 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
          </svg>
          <span className="text-indigo-300 font-medium">{selectedCategory}</span>
          <span className="text-gray-400 ml-2">({filteredPasswords.length} {filteredPasswords.length === 1 ? 'contraseña' : 'contraseñas'})</span>
        </div>
      )}

      {/* Lista de contraseñas */}
      {filteredPasswords.length > 0 && (
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
                  <span className="text-gray-400 text-sm w-20">URL:</span>
                  <a 
                    href={password.url.startsWith('http') ? password.url : `https://${password.url}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-indigo-400 text-sm truncate hover:text-indigo-300 flex-1"
                  >
                    {password.url}
                  </a>
                </div>
                
                {/* Usuario */}
                <div className="flex items-center group relative">
                  <span className="text-gray-400 text-sm w-20">Usuario:</span>
                  <span className="text-white text-sm truncate flex-1">{password.usuario}</span>
                  <button
                    className="ml-2 text-gray-500 hover:text-indigo-400 transition-colors opacity-0 group-hover:opacity-100"
                    onClick={() => copyToClipboard(password.usuario)}
                    title="Copiar usuario"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                    </svg>
                  </button>
                </div>
                
                {/* Contraseña */}
                <div className="flex items-center group relative">
                  <span className="text-gray-400 text-sm w-20">Contraseña:</span>
                  <span className="text-white text-sm truncate flex-1 font-mono">
                    {showPassword[password.id] ? password.contrasena : '••••••••••••'}
                  </span>
                  <div className="ml-2 flex opacity-0 group-hover:opacity-100">
                    <button
                      className="text-gray-500 hover:text-indigo-400 transition-colors mr-1"
                      onClick={() => togglePasswordVisibility(password.id)}
                      title={showPassword[password.id] ? "Ocultar contraseña" : "Mostrar contraseña"}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        {showPassword[password.id] ? (
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                        ) : (
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        )}
                      </svg>
                    </button>
                    <button
                      className="text-gray-500 hover:text-indigo-400 transition-colors"
                      onClick={() => copyToClipboard(password.contrasena)}
                      title="Copiar contraseña"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                      </svg>
                    </button>
                  </div>
                </div>
                
                {/* Categoría/Carpeta */}
                {password.categoria && (
                  <div className="flex items-center">
                    <span className="text-gray-400 text-sm w-20">Carpeta:</span>
                    <button 
                      onClick={() => {
                        const categoryValue = Array.isArray(password.categoria) 
                          ? password.categoria[0] 
                          : password.categoria;
                        
                        if (categoryValue) {
                          setSelectedCategory(categoryValue);
                        }
                      }}
                      className="text-sm bg-gray-700 hover:bg-indigo-600/30 text-gray-300 hover:text-indigo-300 px-2 py-0.5 rounded-full flex items-center transition-colors"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                      </svg>
                      {Array.isArray(password.categoria) ? password.categoria[0] : password.categoria}
                    </button>
                  </div>
                )}
                
                {/* Notas */}
                {password.notas && (
                  <div className="mt-2">
                    <span className="text-gray-400 text-sm block mb-1">Notas:</span>
                    <p className="text-gray-300 text-sm bg-gray-800/70 p-2 rounded">
                      {password.notas}
                    </p>
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