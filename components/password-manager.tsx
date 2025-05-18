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
  fechaModificacion?: Date | null;
  categoria?: string | string[];
  notas?: string;
}

// Tipo para las carpetas
interface Folder {
  id: string;
  name: string;
  color?: string;
  description?: string;
}

export default function PasswordManager() {
  const [passwords, setPasswords] = useState<SavedPassword[]>([]);
  const [folders, setFolders] = useState<Folder[]>([]);
  const [folderMap, setFolderMap] = useState<Record<string, Folder>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState<Record<string, boolean>>({});
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [expandedPasswords, setExpandedPasswords] = useState<Record<string, boolean>>({});
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

  // Obtener las contraseñas y carpetas del usuario al cargar la página
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
          // Cargar carpetas primero y luego las contraseñas
          await fetchFolders(currentUser.uid);
          await fetchPasswords(currentUser.uid);
        } catch (error) {
          console.error("Error al verificar/reparar datos:", error);
          // Intentar cargar contraseñas de todos modos
          await fetchFolders(currentUser.uid);
          await fetchPasswords(currentUser.uid);
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
              .then(async repaired => {
                console.log("Resultado de verificación/reparación:", repaired ? "Reparado" : "No necesitaba reparación");
                await fetchFolders(user.uid);
                await fetchPasswords(user.uid);
              })
              .catch(async error => {
                console.error("Error al verificar/reparar datos después del timeout:", error);
                await fetchFolders(user.uid);
                await fetchPasswords(user.uid);
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

  // Función para cargar todas las carpetas
  const fetchFolders = async (userId: string) => {
    try {
      console.log("Cargando carpetas...");
      const db = getFirestore();
      
      // Cargar desde la colección de carpetas
      const foldersQuery = query(collection(db, "folders"));
      const foldersSnapshot = await getDocs(foldersQuery);
      
      const foldersData: Folder[] = [];
      const foldersMapData: Record<string, Folder> = {};
      
      foldersSnapshot.forEach((doc) => {
        const data = doc.data();
        const folder: Folder = {
          id: doc.id,
          name: data.name || "Sin nombre",
          color: data.color,
          description: data.description
        };
        foldersData.push(folder);
        foldersMapData[doc.id] = folder;
        console.log(`Carpeta cargada de Firestore - ID: "${doc.id}", Nombre: "${data.name || 'Sin nombre'}"`);
      });

      // Intentar cargar carpetas específicas de usuario si existen
      try {
        const userFoldersQuery = query(collection(db, "usuarios", userId, "folders"));
        const userFoldersSnapshot = await getDocs(userFoldersQuery);
        
        if (!userFoldersSnapshot.empty) {
          userFoldersSnapshot.forEach((doc) => {
            const data = doc.data();
            const folder: Folder = {
              id: doc.id,
              name: data.name || "Sin nombre",
              color: data.color,
              description: data.description
            };
            foldersData.push(folder);
            foldersMapData[doc.id] = folder;
            console.log(`Carpeta de usuario cargada - ID: "${doc.id}", Nombre: "${data.name || 'Sin nombre'}"`);
          });
        }
      } catch (userFoldersError) {
        console.log("No se encontraron carpetas específicas del usuario:", userFoldersError);
      }

      // Agregar categorías predefinidas si no existen
      const predefinedCategories = {
        "personal": "Personal",
        "Personal": "Personal", 
        "work": "Trabajo",
        "Work": "Trabajo",
        "finance": "Finanzas",
        "Finance": "Finanzas",
        "social": "Redes Sociales",
        "Social": "Redes Sociales",
        "entertainment": "Entretenimiento",
        "Entertainment": "Entretenimiento",
        "education": "Educación",
        "Education": "Educación",
        "shopping": "Compras",
        "Shopping": "Compras",
        "travel": "Viajes",
        "Travel": "Viajes",
        "health": "Salud",
        "Health": "Salud",
        "other": "Otros",
        "Other": "Otros"
      };

      for (const [id, name] of Object.entries(predefinedCategories)) {
        if (!foldersMapData[id]) {
          const folder: Folder = { id, name, color: "#6366f1" };
          foldersData.push(folder);
          foldersMapData[id] = folder;
          console.log(`Añadida categoría predefinida - ID: "${id}", Nombre: "${name}"`);
        }
      }
      
      // Aquí añadimos registros a la consola para depuración
      console.log("Total de carpetas cargadas:", foldersData.length);
      console.log("Mapa de carpetas:", Object.keys(foldersMapData).map(key => `${key}: ${foldersMapData[key].name}`));
      
      setFolders(foldersData);
      setFolderMap(foldersMapData);
    } catch (error) {
      console.error("Error al cargar carpetas:", error);
    }
  };

  // Función para cargar contraseñas
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
              
              // Manejar el caso donde folderIds/categoria es un array o un string único
              let folderIdsArray: string[] = [];
              if (data.folderIds) {
                if (Array.isArray(data.folderIds)) {
                  folderIdsArray = data.folderIds;
                } else if (typeof data.folderIds === 'string') {
                  folderIdsArray = [data.folderIds];
                }
              } else if (data.categoria || data.category) {
                const categoriaData = data.categoria || data.category;
                if (Array.isArray(categoriaData)) {
                  folderIdsArray = categoriaData;
                } else if (typeof categoriaData === 'string') {
                  folderIdsArray = [categoriaData];
                }
              }
              
              // Normalizar las fechas
              let fechaCreacion;
              if (data.fechaCreacion) {
                fechaCreacion = data.fechaCreacion.toDate ? data.fechaCreacion.toDate() : new Date(data.fechaCreacion);
              } else if (data.createdAt) {
                fechaCreacion = data.createdAt.toDate ? data.createdAt.toDate() : new Date(data.createdAt);
              } else {
                fechaCreacion = new Date();
              }
              
              // Normalizar las modificaciones
              let fechaModificacion;
              if (data.fechaModificacion) {
                fechaModificacion = data.fechaModificacion.toDate ? data.fechaModificacion.toDate() : new Date(data.fechaModificacion);
              } else if (data.updatedAt) {
                fechaModificacion = data.updatedAt.toDate ? data.updatedAt.toDate() : new Date(data.updatedAt);
              } else {
                fechaModificacion = null;
              }
              
              passwordsData.push({
                id: doc.id,
                sitio: data.sitio || data.website || data.name || "",
                url: data.url || data.website || "",
                usuario: data.usuario || data.username || data.user || "",
                contrasena: data.contrasena || data.password || data.pass || "",
                fechaCreacion: fechaCreacion,
                fechaModificacion: fechaModificacion,
                categoria: folderIdsArray,
                notas: data.notas || data.notes || data.description || ""
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
              
              // Manejar el caso donde folderIds/categoria es un array o un string único
              let folderIdsArray: string[] = [];
              if (data.folderIds) {
                if (Array.isArray(data.folderIds)) {
                  folderIdsArray = data.folderIds;
                } else if (typeof data.folderIds === 'string') {
                  folderIdsArray = [data.folderIds];
                }
              } else if (data.categoria || data.category) {
                const categoriaData = data.categoria || data.category;
                if (Array.isArray(categoriaData)) {
                  folderIdsArray = categoriaData;
                } else if (typeof categoriaData === 'string') {
                  folderIdsArray = [categoriaData];
                }
              }
              
              // Normalizar las fechas
              let fechaCreacion;
              if (data.fechaCreacion) {
                fechaCreacion = data.fechaCreacion.toDate ? data.fechaCreacion.toDate() : new Date(data.fechaCreacion);
              } else if (data.createdAt) {
                fechaCreacion = data.createdAt.toDate ? data.createdAt.toDate() : new Date(data.createdAt);
              } else {
                fechaCreacion = new Date();
              }
              
              // Normalizar las modificaciones
              let fechaModificacion;
              if (data.fechaModificacion) {
                fechaModificacion = data.fechaModificacion.toDate ? data.fechaModificacion.toDate() : new Date(data.fechaModificacion);
              } else if (data.updatedAt) {
                fechaModificacion = data.updatedAt.toDate ? data.updatedAt.toDate() : new Date(data.updatedAt);
              } else {
                fechaModificacion = null;
              }
              
              passwordsData.push({
                id: doc.id,
                sitio: data.sitio || data.website || data.name || "",
                url: data.url || data.website || "",
                usuario: data.usuario || data.username || data.user || "",
                contrasena: data.contrasena || data.password || data.pass || "",
                fechaCreacion: fechaCreacion,
                fechaModificacion: fechaModificacion,
                categoria: folderIdsArray,
                notas: data.notas || data.notes || data.description || ""
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
        
        // Manejar el caso donde categoria/folderIds es un array o un string único
        let categoriaArray: string[] = [];
        if (data.categoria || data.category || data.folderIds) {
          const catData = data.categoria || data.category || data.folderIds;
          if (Array.isArray(catData)) {
            categoriaArray = catData;
          } else if (typeof catData === 'string') {
            categoriaArray = [catData];
          }
        }
        
        // Normalizar las fechas
        let fechaCreacion;
        if (data.fechaCreacion) {
          fechaCreacion = data.fechaCreacion.toDate ? data.fechaCreacion.toDate() : new Date(data.fechaCreacion);
        } else if (data.createdAt) {
          fechaCreacion = data.createdAt.toDate ? data.createdAt.toDate() : new Date(data.createdAt);
        } else {
          fechaCreacion = new Date();
        }
        
        // Normalizar las modificaciones
        let fechaModificacion;
        if (data.fechaModificacion) {
          fechaModificacion = data.fechaModificacion.toDate ? data.fechaModificacion.toDate() : new Date(data.fechaModificacion);
        } else if (data.updatedAt) {
          fechaModificacion = data.updatedAt.toDate ? data.updatedAt.toDate() : new Date(data.updatedAt);
        } else {
          fechaModificacion = null;
        }
        
        passwordsData.push({
          id: doc.id,
          sitio: data.sitio || data.website || data.name || "",
          url: data.url || data.website || "",
          usuario: data.usuario || data.username || data.user || "",
          contrasena: data.contrasena || data.password || data.pass || "",
          fechaCreacion: fechaCreacion,
          fechaModificacion: fechaModificacion,
          categoria: categoriaArray.length > 0 ? categoriaArray : "",
          notas: data.notas || data.notes || data.description || ""
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

  // Obtener nombre de carpeta por ID
  const getFolderName = (folderId: string): string => {
    // Protección contra undefined o null
    if (!folderId) {
      return "Sin categoría";
    }
    
    // Imprimir información de depuración para entender qué está pasando
    console.log(`Buscando nombre para folderId: "${folderId}"`, {
      tipoFolderId: typeof folderId,
      mapContainsFolderId: folderMap.hasOwnProperty(folderId),
      foldersLength: folders.length,
      folderMapSize: Object.keys(folderMap).length
    });
    
    // Categorías comunes predefinidas (con variaciones de capitalización)
    const commonCategories: Record<string, string> = {
      "personal": "Personal",
      "Personal": "Personal",
      "PERSONAL": "Personal",
      "work": "Trabajo",
      "Work": "Trabajo",
      "WORK": "Trabajo",
      "trabajo": "Trabajo",
      "Trabajo": "Trabajo",
      "finance": "Finanzas",
      "Finance": "Finanzas",
      "finanzas": "Finanzas",
      "Finanzas": "Finanzas",
      "social": "Redes Sociales",
      "Social": "Redes Sociales",
      "redes": "Redes Sociales",
      "Redes": "Redes Sociales",
      "entertainment": "Entretenimiento",
      "Entertainment": "Entretenimiento",
      "entretenimiento": "Entretenimiento",
      "Entretenimiento": "Entretenimiento",
      "education": "Educación",
      "Education": "Educación",
      "educacion": "Educación",
      "Educacion": "Educación",
      "Educación": "Educación",
      "shopping": "Compras",
      "Shopping": "Compras",
      "compras": "Compras",
      "Compras": "Compras",
      "travel": "Viajes",
      "Travel": "Viajes",
      "viajes": "Viajes",
      "Viajes": "Viajes",
      "health": "Salud",
      "Health": "Salud",
      "salud": "Salud",
      "Salud": "Salud",
      "other": "Otros",
      "Other": "Otros",
      "otros": "Otros",
      "Otros": "Otros"
    };
    
    // Verificar si es una categoría común (independiente de mayúsculas/minúsculas)
    if (commonCategories[folderId]) {
      return commonCategories[folderId];
    }
    
    // Verificar si existe en el mapa de carpetas
    if (folderMap[folderId] && folderMap[folderId].name) {
      return folderMap[folderId].name;
    }
    
    // Buscar en el array de carpetas en caso de que el mapa no esté actualizado
    const folder = folders.find(f => f.id === folderId);
    if (folder && folder.name) {
      return folder.name;
    }
    
    // Si no se encuentra pero es un ID válido, mostrar el ID como nombre
    if (folderId.length > 0) {
      // Intentar formatear el ID para que parezca un nombre
      try {
        const formattedName = folderId
          .replace(/-/g, ' ')
          .replace(/_/g, ' ')
          .split(' ')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
          .join(' ');
        
        return formattedName;
      } catch (error) {
        console.error("Error al formatear ID de carpeta:", error);
      }
    }
    
    // Valor por defecto
    return "Sin categoría";
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
  const categoryInfo: Record<string, {id: string, name: string}> = {};
  passwords.forEach(p => {
    if (typeof p.categoria === 'string' && p.categoria) {
      const folderName = getFolderName(p.categoria);
      console.log(`Procesando categoría string: "${p.categoria}" → "${folderName}"`);
      categoryInfo[p.categoria] = {
        id: p.categoria,
        name: folderName
      };
    } else if (Array.isArray(p.categoria)) {
      p.categoria.forEach(cat => {
        if (cat) {
          const folderName = getFolderName(cat);
          console.log(`Procesando categoría array item: "${cat}" → "${folderName}"`);
          categoryInfo[cat] = {
            id: cat,
            name: folderName
          };
        }
      });
    }
  });
  
  console.log("Información de categorías procesada:", categoryInfo);
  
  // Crear lista de categorías para mostrar en la UI
  const categories = [
    { id: "all", name: "Todas" },
    ...Object.values(categoryInfo).sort((a, b) => a.name.localeCompare(b.name))
  ];

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

  // Función para expandir/colapsar detalles de una contraseña
  const togglePasswordDetails = (id: string) => {
    setExpandedPasswords(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  // Formatear fecha para mostrar
  const formatDate = (date: Date | undefined) => {
    if (!date) return "Fecha desconocida";
    
    const options: Intl.DateTimeFormatOptions = {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    };
    
    return new Intl.DateTimeFormat("es-ES", options).format(date);
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
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-3 py-1.5 rounded-lg flex items-center transition-colors ${
                  selectedCategory === category.id 
                    ? 'bg-indigo-600 text-white' 
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  {category.id === "all" ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                  )}
                </svg>
                {category.name}
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
                ? `No hay contraseñas en la carpeta "${categoryInfo[selectedCategory]?.name || selectedCategory}". Puedes añadir contraseñas a esta carpeta desde la opción "Añadir contraseña".`
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
          <span className="text-indigo-300 font-medium">{categoryInfo[selectedCategory]?.name || selectedCategory}</span>
          <span className="text-gray-400 ml-2">({filteredPasswords.length} {filteredPasswords.length === 1 ? 'contraseña' : 'contraseñas'})</span>
        </div>
      )}

      {/* Lista de contraseñas */}
      {filteredPasswords.length > 0 && (
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 gap-4"
        >
          {filteredPasswords.map(password => (
            <motion.div 
              key={password.id}
              variants={itemVariants}
              className="bg-gray-800 rounded-lg overflow-hidden border border-gray-700 hover:border-indigo-500/50 transition-all shadow-lg"
            >
              <div className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center">
                    {password.url ? (
                      <img 
                        src={getFaviconUrl(password.url)} 
                        alt={password.sitio}
                        className="w-10 h-10 rounded mr-3 bg-white p-1"
                        onError={(e) => {
                          e.currentTarget.onerror = null;
                          e.currentTarget.src = `https://ui-avatars.com/api/?name=${password.sitio.substring(0, 2)}&background=random&size=60`;
                        }}
                      />
                    ) : (
                      <div className="w-10 h-10 rounded mr-3 bg-indigo-600 flex items-center justify-center text-white font-bold">
                        {password.sitio.substring(0, 2).toUpperCase()}
                      </div>
                    )}
                    <div>
                      <h3 className="text-lg font-semibold text-white">{password.sitio}</h3>
                      <p className="text-gray-400 text-sm">{password.usuario}</p>
                    </div>
                  </div>
                  
                                    <div className="flex space-x-2">
                {/* Si tiene categoría/carpeta, mostrar etiqueta */}
                {Array.isArray(password.categoria) && password.categoria.length > 0 ? (
                  <div className="flex space-x-1">
                    {password.categoria.slice(0, 2).map((catId) => {
                      console.log("Carpeta ID:", catId, "Nombre:", getFolderName(catId));
                      return (
                        <span 
                          key={catId} 
                          className="text-xs px-2 py-1 bg-indigo-900/30 text-indigo-300 rounded-full cursor-pointer hover:bg-indigo-800/40 transition-colors"
                          onClick={() => setSelectedCategory(catId)}
                        >
                          {getFolderName(catId) || catId}
                        </span>
                      );
                    })}
                    {password.categoria.length > 2 && (
                      <span className="text-xs px-2 py-1 bg-gray-700 text-gray-300 rounded-full">
                        +{password.categoria.length - 2}
                      </span>
                    )}
                  </div>
                ) : (
                  typeof password.categoria === 'string' && password.categoria && (
                    <span 
                      className="text-xs px-2 py-1 bg-indigo-900/30 text-indigo-300 rounded-full cursor-pointer hover:bg-indigo-800/40 transition-colors"
                      onClick={() => setSelectedCategory(password.categoria as string)}
                    >
                      {getFolderName(password.categoria as string) || password.categoria}
                    </span>
                  )
                )}
              </div>
                </div>
                
                {/* URL */}
                {password.url && (
                  <div className="mb-3">
                    <p className="text-gray-400 text-sm mb-1 flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                      </svg>
                      URL:
                    </p>
                    <a 
                      href={password.url.startsWith('http') ? password.url : `https://${password.url}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-indigo-400 hover:text-indigo-300 transition-colors break-all"
                    >
                      {password.url}
                    </a>
                  </div>
                )}
                
                {/* Contraseña */}
                <div className="mb-3">
                  <p className="text-gray-400 text-sm mb-1 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    Contraseña:
                  </p>
                  <div className="flex items-center">
                    <span className="text-white font-mono bg-gray-700 p-2 rounded flex-1 break-all mr-2">
                      {showPassword[password.id] ? password.contrasena : '••••••••••••'}
                    </span>
                    <button 
                      onClick={() => togglePasswordVisibility(password.id)}
                      className="p-2 text-gray-400 hover:text-white transition-colors"
                      aria-label={showPassword[password.id] ? "Ocultar contraseña" : "Mostrar contraseña"}
                    >
                      {showPassword[password.id] ? (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                        </svg>
                      ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      )}
                    </button>
                    <button 
                      onClick={() => copyToClipboard(password.contrasena)}
                      className="p-2 text-gray-400 hover:text-white transition-colors"
                      aria-label="Copiar contraseña"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Botón para mostrar/ocultar detalles adicionales */}
                <div className="mt-4 mb-1">
                  <button 
                    onClick={() => togglePasswordDetails(password.id)} 
                    className="flex items-center text-sm text-indigo-400 hover:text-indigo-300"
                  >
                    {expandedPasswords[password.id] ? (
                      <>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                        </svg>
                        Ocultar detalles
                      </>
                    ) : (
                      <>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                        Ver más detalles
                      </>
                    )}
                  </button>
                </div>

                {/* Detalles expandibles */}
                {expandedPasswords[password.id] && (
                  <div className="mt-3 p-3 bg-gray-900 rounded border border-gray-700">
                                  {/* Fechas */}
              <div className="mb-3">
                <p className="text-gray-300 text-sm font-medium mb-1">Información temporal:</p>
                <div className="flex flex-col space-y-1 text-sm">
                  <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span className="text-gray-400 mr-1">Creada:</span>
                    <span className="text-gray-300">{formatDate(password.fechaCreacion)}</span>
                  </div>
                  <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                    <span className="text-gray-400 mr-1">Última modificación:</span>
                    <span className="text-gray-300">
                      {password.fechaModificacion ? formatDate(password.fechaModificacion) : "No modificada"}
                    </span>
                  </div>
                </div>
              </div>

                    {/* Notas */}
                    {password.notas && (
                      <div className="mb-2">
                        <p className="text-gray-300 text-sm font-medium mb-1">Notas:</p>
                        <div className="bg-gray-800 p-2 rounded whitespace-pre-wrap text-gray-300">
                          {password.notas}
                        </div>
                      </div>
                    )}

                    
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