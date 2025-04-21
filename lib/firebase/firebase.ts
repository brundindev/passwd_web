import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, GoogleAuthProvider, signInWithPopup, sendPasswordResetEmail, setPersistence, browserLocalPersistence } from 'firebase/auth';
import { getDatabase, ref, set } from 'firebase/database';

// Configuración de Firebase basada en la existente de tu proyecto Flutter
const firebaseConfig = {
  apiKey: "AIzaSyDYSZWktCMW2u_pzpYBi_A_ZszwQRyk6ac",
  appId: "1:252776703139:web:60db327548b9f10d564b16",
  messagingSenderId: "252776703139",
  projectId: "passwd-brundindev",
  authDomain: "passwd-brundindev.firebaseapp.com",
  storageBucket: "passwd-brundindev.firebasestorage.app",
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Configurar persistencia local para evitar problemas de sessionStorage
setPersistence(auth, browserLocalPersistence)
  .catch((error) => {
    console.error("Error al configurar la persistencia de autenticación:", error);
  });

const database = getDatabase(app);

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
      console.log("Inicio de sesión exitoso:", userCredential.user.uid);
      return userCredential;
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      throw this.handleAuthError(error);
    }
  }

  // Registrarse con correo y contraseña
  async registerWithEmailAndPassword(email: string, password: string) {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log("Usuario registrado correctamente:", userCredential.user.uid);
      
      // Guardar usuario en la base de datos
      try {
        await set(ref(database, `usuarios/${userCredential.user.uid}`), {
          nombre: email.split('@')[0], // Nombre de usuario del correo
          pass: '', // Campo vacío por seguridad
          registroCompletado: true,
          fechaRegistro: new Date().toISOString(),
        });
        console.log("Información del usuario guardada en la base de datos");
      } catch (dbError) {
        console.warn("No se guardó información adicional en la base de datos:", dbError);
      }
      
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
          await set(ref(database, `usuarios/${result.user.uid}`), {
            nombre: result.user.displayName || result.user.email?.split('@')[0] || 'Usuario',
            pass: '',
            registroCompletado: true,
            fechaRegistro: new Date().toISOString(),
            metodoRegistro: 'google',
          });
          console.log("Datos del usuario guardados correctamente en la base de datos");
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
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
      throw error;
    }
  }

  // Enviar correo de restablecimiento de contraseña
  async sendPasswordResetEmail(email: string) {
    try {
      await sendPasswordResetEmail(auth, email);
      console.log("Correo de restablecimiento enviado correctamente");
    } catch (error) {
      console.error("Error al enviar correo de restablecimiento:", error);
      throw this.handleAuthError(error);
    }
  }

  // Manejo de errores de autenticación
  handleAuthError(error: any) {
    console.log("Error de autenticación:", error);
    
    const errorCode = error.code;
    
    const errorMessages: Record<string, string> = {
      'auth/user-not-found': "No existe ninguna cuenta asociada a este correo electrónico. Por favor, regístrate primero.",
      'auth/wrong-password': "La contraseña introducida es incorrecta. Por favor, inténtalo de nuevo.",
      'auth/email-already-in-use': "Este correo electrónico ya está registrado. Intenta iniciar sesión o utiliza otro correo.",
      'auth/weak-password': "La contraseña es demasiado débil. Utiliza al menos 6 caracteres combinando letras, números y símbolos.",
      'auth/invalid-email': "El formato del correo electrónico no es válido. Comprueba que has escrito correctamente tu dirección.",
      'auth/network-request-failed': "Error de conexión a Internet. Comprueba tu conexión y vuelve a intentarlo.",
      'auth/internal-error': "Error interno en el servidor. Por favor, inténtalo de nuevo más tarde.",
      'auth/operation-not-allowed': "Esta operación no está permitida. Contacta con el administrador del sistema.",
      'auth/too-many-requests': "Has realizado demasiados intentos fallidos. Por favor, espera unos minutos e inténtalo de nuevo.",
      'auth/requires-recent-login': "Esta operación requiere que hayas iniciado sesión recientemente. Por favor, cierra sesión y vuelve a iniciarla.",
      'auth/expired-action-code': "El código de acción ha caducado. Por favor, solicita un nuevo código.",
      'auth/invalid-action-code': "El código de acción no es válido. Es posible que ya haya sido utilizado o esté mal formateado.",
      'auth/account-exists-with-different-credential': "Ya existe una cuenta con este correo electrónico pero con otro método de inicio de sesión. Prueba con otro método.",
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
      'auth/missing-initial-state': "Error de estado inicial. Por favor, limpia las cookies del navegador e inténtalo de nuevo. Si estás usando un bloqueador de rastreadores, desactívalo temporalmente para esta web."
    };
    
    return new Error(errorMessages[errorCode] || `Error de autenticación: ${error.message || error}. Por favor, inténtalo de nuevo.`);
  }
}

// Exportar una instancia del servicio
export const authService = new AuthService();
export { auth, database }; 