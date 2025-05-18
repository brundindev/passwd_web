import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, GoogleAuthProvider, signInWithPopup, sendPasswordResetEmail, setPersistence, browserLocalPersistence, sendEmailVerification, User } from 'firebase/auth';
import { getFirestore, collection, doc, setDoc, getDoc, getDocs, query, where, enableIndexedDbPersistence, connectFirestoreEmulator } from 'firebase/firestore';

// Configuración de Firebase basada en la existente de tu proyecto Flutter
const firebaseConfig = {
  apiKey: "AIzaSyDYSZWktCMW2u_pzpYBi_A_ZszwQRyk6ac",
  appId: "1:252776703139:web:60db327548b9f10d564b16",
  messagingSenderId: "252776703139",
  projectId: "passwd-brundindev",
  authDomain: "passwd-brundindev.firebaseapp.com",
  storageBucket: "passwd-brundindev.firebasestorage.app",
};

// Inicializar Firebase si no está ya inicializado
// Esto evita errores de múltiples instancias y de "No Firebase App has been created"
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const firestore = getFirestore(app);

// Persistencia de IndexedDB solo en entorno cliente/navegador
if (typeof window !== 'undefined') {
  // Habilitar la persistencia de IndexedDB silenciosamente
  try {
    enableIndexedDbPersistence(firestore)
      .catch((error) => {
        // Solo registrar errores reales, no advertencias de obsolescencia
        if (error.code !== 'failed-precondition' && error.code !== 'unimplemented') {
          console.error("Error al habilitar la persistencia de Firestore:", error);
        }
      });
    
    // Configurar persistencia local para autenticación
    setPersistence(auth, browserLocalPersistence)
      .catch((error) => {
        console.error("Error al configurar la persistencia de autenticación:", error);
      });
  } catch (error) {
    // Capturar cualquier error pero no mostrar advertencias
    console.warn("Error al configurar persistencia:", error);
  }
}

// Clase de servicio de autenticación similar a la de Flutter
export class AuthService {
  // Exportamos auth para acceso directo para onAuthStateChanged
  auth = auth;
  
  // Obtener usuario actual
  getCurrentUser() {
    return auth.currentUser;
  }
  
  // Iniciar sesión con correo y contraseña
  async signInWithEmailAndPassword(email: string, password: string) {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      
      // Verificar si el correo está verificado
      if (!userCredential.user.emailVerified && userCredential.user.providerData[0].providerId === 'password') {
        await signOut(auth);
        throw new Error("Por favor, verifica tu correo electrónico antes de iniciar sesión. Revisa tu bandeja de entrada.");
      }
      
      console.log("Inicio de sesión exitoso:", userCredential.user.uid);
      return userCredential;
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      throw this.handleAuthError(error);
    }
  }

  // Enviar correo de verificación
  async sendEmailVerification(user: User) {
    try {
      await sendEmailVerification(user);
      console.log("Correo de verificación enviado a:", user.email);
      return true;
    } catch (error) {
      console.error("Error al enviar correo de verificación:", error);
      throw this.handleAuthError(error);
    }
  }

  // Registrarse con correo y contraseña
  async createUserWithEmailAndPassword(email: string, password: string, name?: string) {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log("Usuario registrado correctamente:", userCredential.user.uid);
      
      // Enviar correo de verificación
      await this.sendEmailVerification(userCredential.user);
      
      // El usuario se creará en Firestore una vez que verifique su correo
      // No cerramos sesión para que el usuario pueda recibir feedback
      
      return userCredential;
    } catch (error) {
      console.error("Error durante el registro:", error);
      throw this.handleAuthError(error);
    }
  }

  // Iniciar sesión con Google
  async signInWithGoogle() {
    try {
      const provider = new GoogleAuthProvider();
      // Usar signInWithPopup en lugar de redirect para evitar problemas de estado
      const result = await signInWithPopup(auth, provider);
      console.log("Inicio de sesión con Google exitoso:", result.user.uid);
      
      // Verificar si es un nuevo usuario
      const isNewUser = result.user.metadata.creationTime === result.user.metadata.lastSignInTime;
      
      if (isNewUser) {
        console.log("Nuevo usuario detectado, guardando en base de datos");
        
        try {
          // Guardar en Firestore en lugar de Realtime Database
          await setDoc(doc(firestore, "usuarios", result.user.uid), {
            nombre: result.user.displayName || result.user.email?.split('@')[0] || 'Usuario',
            email: result.user.email,
            registroCompletado: true,
            fechaRegistro: new Date().toISOString(),
            metodoRegistro: 'google',
          });
          console.log("Datos del usuario guardados correctamente en Firestore");
        } catch (dbError) {
          console.warn("Error al guardar datos del usuario:", dbError);
        }
      }
      
      return result;
    } catch (error) {
      console.error("Error durante el inicio de sesión con Google:", error);
      throw this.handleAuthError(error);
    }
  }

  // Cerrar sesión
  async signOut() {
    try {
      await signOut(auth);
      console.log("Sesión cerrada correctamente");
      return true;
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
      throw this.handleAuthError(error);
    }
  }

  // Restablecer contraseña
  async sendPasswordResetEmail(email: string) {
    try {
      await sendPasswordResetEmail(auth, email);
      console.log("Correo de restablecimiento enviado a:", email);
      return true;
    } catch (error) {
      console.error("Error al enviar correo de restablecimiento:", error);
      throw this.handleAuthError(error);
    }
  }

  // Verificar si un usuario existe en Firestore
  async checkUserExists(uid: string) {
    try {
      const docRef = doc(firestore, "usuarios", uid);
      const docSnap = await getDoc(docRef);
      return docSnap.exists();
    } catch (error) {
      console.error("Error al verificar si el usuario existe:", error);
      return false;
    }
  }

  // Obtener el perfil de usuario desde Firestore
  async getUserProfile(uid: string) {
    try {
      const docRef = doc(firestore, "usuarios", uid);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        return docSnap.data();
      } else {
        console.log("No se encontró el documento del usuario");
        return null;
      }
    } catch (error) {
      console.error("Error al obtener el perfil del usuario:", error);
      return null;
    }
  }

  // Verificar y reparar la estructura de datos del usuario
  async verifyAndRepairUserData(uid: string) {
    try {
      console.log("Verificando estructura de datos para usuario:", uid);
      
      // Verificar si existe el documento principal del usuario
      const userDocRef = doc(firestore, "usuarios", uid);
      const userDoc = await getDoc(userDocRef);
      
      let needsRepair = false;
      
      if (!userDoc.exists()) {
        console.log("El documento del usuario no existe, se necesita reparación");
        needsRepair = true;
        
        // Obtener información del usuario de Auth
        const user = this.getCurrentUser();
        if (!user) {
          throw new Error("No hay usuario autenticado para reparar datos");
        }
        
        // Crear documento base
        await setDoc(userDocRef, {
          nombre: user.displayName || user.email?.split('@')[0] || 'Usuario',
          email: user.email,
          registroCompletado: true,
          fechaRegistro: new Date().toISOString(),
          metodoRegistro: user.providerData[0]?.providerId || 'unknown',
          reparado: true
        });
        
        console.log("Documento base de usuario creado");
      }
      
      // Verificar la existencia de la subcolección 'pass'
      const passCollectionRef = collection(userDocRef, "pass");
      const passSnap = await getDocs(passCollectionRef);
      
      if (passSnap.empty) {
        console.log("Subcolección 'pass' vacía, verificando estructuras alternativas");
        
        // Buscar en otras estructuras posibles y mover datos si es necesario
        // Estructura 1: Colección directa "passwords"
        const passwordsRef = collection(firestore, "passwords");
        const passwordsQuery = query(passwordsRef, where("userId", "==", uid));
        const passwordsSnap = await getDocs(passwordsQuery);
        
        if (!passwordsSnap.empty) {
          console.log(`Encontrados ${passwordsSnap.size} documentos en estructura alternativa 1, migrando...`);
          
          // Migrar documentos a la estructura correcta
          for (const docSnapshot of passwordsSnap.docs) {
            const data = docSnapshot.data();
            await setDoc(doc(passCollectionRef, docSnapshot.id), {
              ...data,
              migrado: true,
              fechaMigracion: new Date()
            });
            console.log(`Migrado documento ${docSnapshot.id}`);
          }
          
          console.log("Migración completada");
          return true;
        }
        
        // Estructura 2: Colección "users" con subcolección "passwords"
        const usersDocRef = doc(firestore, "users", uid);
        const userPasswordsRef = collection(usersDocRef, "passwords");
        const userPasswordsSnap = await getDocs(userPasswordsRef);
        
        if (!userPasswordsSnap.empty) {
          console.log(`Encontrados ${userPasswordsSnap.size} documentos en estructura alternativa 2, migrando...`);
          
          // Migrar documentos a la estructura correcta
          for (const docSnapshot of userPasswordsSnap.docs) {
            const data = docSnapshot.data();
            await setDoc(doc(passCollectionRef, docSnapshot.id), {
              ...data,
              migrado: true,
              fechaMigracion: new Date()
            });
            console.log(`Migrado documento ${docSnapshot.id}`);
          }
          
          console.log("Migración completada");
          return true;
        }
        
        if (needsRepair) {
          console.log("Se reparó la estructura pero no se encontraron contraseñas para migrar");
          return true;
        } else {
          console.log("No se encontraron contraseñas en ninguna estructura alternativa");
          return false;
        }
      } else {
        console.log(`La subcolección 'pass' ya existe y contiene ${passSnap.size} documentos`);
        return false; // No se necesitaba reparación
      }
      
    } catch (error) {
      console.error("Error al verificar/reparar estructura de datos:", error);
      return false;
    }
  }

  // Crear usuario en Firestore después de la verificación
  async createUserInFirestore(user: User, additionalData = {}) {
    try {
      if (!user) throw new Error("Usuario no válido");
      
      // Comprobar si el usuario ya existe
      const exists = await this.checkUserExists(user.uid);
      if (exists) {
        console.log("El usuario ya existe en Firestore, no se creará de nuevo");
        return false;
      }
      
      // Crear usuario en Firestore
      await setDoc(doc(firestore, "usuarios", user.uid), {
        nombre: user.displayName || user.email?.split('@')[0] || 'Usuario',
        email: user.email,
        registroCompletado: true,
        fechaRegistro: new Date().toISOString(),
        metodoRegistro: 'email',
        ...additionalData
      });
      
      console.log("Usuario creado correctamente en Firestore");
      return true;
    } catch (error) {
      console.error("Error al crear usuario en Firestore:", error);
      throw error;
    }
  }

  handleAuthError(error: any) {
    console.log("Error de autenticación:", error);
    
    // Mapa de códigos de error de Firebase a mensajes amigables
    const errorMessages: Record<string, string> = {
      'auth/user-not-found': "No existe ninguna cuenta asociada a este correo electrónico. Por favor, regístrate primero.",
      'auth/wrong-password': "Contraseña incorrecta. Por favor, inténtalo de nuevo o utiliza la opción de recuperar contraseña.",
      'auth/invalid-email': "El formato del correo electrónico no es válido.",
      'auth/weak-password': "La contraseña debe tener al menos 6 caracteres.",
      'auth/email-already-in-use': "Este correo electrónico ya está registrado. Prueba a iniciar sesión o a recuperar tu contraseña.",
      'auth/operation-not-allowed': "Esta operación no está permitida. Contacta con el administrador.",
      'auth/network-request-failed': "Error de conexión. Comprueba tu conexión a internet e inténtalo de nuevo.",
      'auth/too-many-requests': "Demasiados intentos fallidos. Por favor, espera un momento antes de intentarlo de nuevo.",
      'auth/requires-recent-login': "Esta operación requiere que hayas iniciado sesión recientemente. Por favor, cierra sesión y vuelve a iniciarla.",
      'auth/account-exists-with-different-credential': "Ya existe una cuenta con esta dirección de correo electrónico pero con diferente método de inicio de sesión. Intenta iniciar sesión con otro método.",
      'auth/invalid-credential': "Las credenciales proporcionadas no son válidas o han caducado. Por favor, inténtalo de nuevo.",
      'auth/user-disabled': "Esta cuenta ha sido desactivada. Contacta con el soporte para más información.",
      'auth/invalid-verification-code': "El código de verificación introducido no es válido. Por favor, comprueba e inténtalo de nuevo.",
      'auth/invalid-verification-id': "El ID de verificación no es válido. Reinicia el proceso de verificación.",
      'auth/captcha-check-failed': "La verificación de seguridad ha fallado. Por favor, inténtalo de nuevo.",
      'auth/app-not-authorized': "Esta aplicación no está autorizada para usar Firebase Authentication.",
      'auth/missing-verification-code': "Falta el código de verificación. Por favor, completa todos los campos.",
      'auth/missing-verification-id': "Falta el ID de verificación. Por favor, reinicia el proceso.",
      'auth/quota-exceeded': "Se ha excedido la cuota de operaciones. Por favor, inténtalo más tarde.",
      'auth/email-change-needs-verification': "El cambio de correo electrónico requiere verificación. Revisa tu bandeja de entrada.",
      'auth/popup-closed-by-user': "Has cerrado la ventana de inicio de sesión antes de completar el proceso. Por favor, inténtalo de nuevo.",
      'auth/popup-blocked': "El navegador ha bloqueado la ventana emergente. Permite las ventanas emergentes e inténtalo de nuevo.",
      'auth/unauthorized-domain': "Este dominio no está autorizado para operaciones OAuth. Contacta con el administrador.",
      'auth/timeout': "Se ha agotado el tiempo de espera para la operación. Comprueba tu conexión e inténtalo de nuevo.",
      'auth/missing-initial-state': "Error de estado inicial. Por favor, limpia las cookies del navegador e inténtalo de nuevo. Si estás usando un bloqueador de rastreadores, desactívalo temporalmente para esta web.",
    };
    
    return new Error(
      errorMessages[error.code] || error.message || "Ha ocurrido un error durante la autenticación. Por favor, inténtalo de nuevo."
    );
  }
}

// Exportar una instancia del servicio
export const authService = new AuthService();
export { auth, firestore }; 