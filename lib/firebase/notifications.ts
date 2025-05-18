import { getFirestore, collection, addDoc, query, where, getDocs, updateDoc, doc, orderBy, deleteDoc, Timestamp, onSnapshot } from 'firebase/firestore';
import { AuthService } from './firebase';

// Tipos de notificaciones
export type NotificationType = 
  | 'ticket_created'      // Nuevo ticket creado
  | 'ticket_replied'      // Respuesta en ticket
  | 'ticket_closed'       // Ticket cerrado
  | 'ticket_reopened'     // Ticket reabierto
  | 'ticket_deleted';     // Ticket eliminado

// Interfaz para la notificación
export interface Notification {
  id: string;
  userId: string;          // ID del usuario que debe recibir la notificación
  ticketId: string;        // ID del ticket relacionado
  ticketTitle: string;     // Título/asunto del ticket
  type: NotificationType;  // Tipo de notificación
  message: string;         // Mensaje de la notificación
  createdAt: Timestamp;    // Fecha de creación
  createdBy: string;       // Usuario que generó la notificación (email)
  read: boolean;           // Si ha sido leída
  adminOnly: boolean;      // Si es solo para administradores
}

// Clase para manejar las notificaciones
export class NotificationService {
  private db = getFirestore();
  
  // Crear una nueva notificación
  async createNotification(data: Omit<Notification, 'id' | 'read' | 'createdAt'>) {
    try {
      const notificationData = {
        ...data,
        read: false,
        createdAt: Timestamp.now()
      };
      
      const docRef = await addDoc(collection(this.db, "notifications"), notificationData);
      return { id: docRef.id, ...notificationData };
    } catch (error) {
      console.error("Error al crear notificación:", error);
      throw error;
    }
  }
  
  // Marcar notificación como leída
  async markAsRead(notificationId: string) {
    try {
      const notificationRef = doc(this.db, "notifications", notificationId);
      await updateDoc(notificationRef, { read: true });
    } catch (error) {
      console.error("Error al marcar notificación como leída:", error);
      throw error;
    }
  }
  
  // Marcar todas las notificaciones del usuario como leídas
  async markAllAsRead(userId: string) {
    try {
      const q = query(
        collection(this.db, "notifications"), 
        where("userId", "==", userId),
        where("read", "==", false)
      );
      
      const querySnapshot = await getDocs(q);
      
      // Usar operaciones batch para actualizar varias notificaciones a la vez
      const batch: Promise<void>[] = [];
      querySnapshot.forEach((doc) => {
        batch.push(updateDoc(doc.ref, { read: true }));
      });
      
      await Promise.all(batch);
    } catch (error) {
      console.error("Error al marcar todas las notificaciones como leídas:", error);
      throw error;
    }
  }
  
  // Eliminar una notificación
  async deleteNotification(notificationId: string) {
    try {
      await deleteDoc(doc(this.db, "notifications", notificationId));
    } catch (error) {
      console.error("Error al eliminar notificación:", error);
      throw error;
    }
  }
  
  // Obtener notificaciones del usuario
  async getUserNotifications(userId: string) {
    try {
      const q = query(
        collection(this.db, "notifications"), 
        where("userId", "==", userId),
        orderBy("createdAt", "desc")
      );
      
      const querySnapshot = await getDocs(q);
      const notifications: Notification[] = [];
      
      querySnapshot.forEach((doc) => {
        notifications.push({ id: doc.id, ...doc.data() } as Notification);
      });
      
      return notifications;
    } catch (error) {
      console.error("Error al obtener notificaciones:", error);
      throw error;
    }
  }
  
  // Obtener notificaciones no leídas del usuario
  async getUnreadNotifications(userId: string) {
    try {
      const q = query(
        collection(this.db, "notifications"), 
        where("userId", "==", userId),
        where("read", "==", false),
        orderBy("createdAt", "desc")
      );
      
      const querySnapshot = await getDocs(q);
      const notifications: Notification[] = [];
      
      querySnapshot.forEach((doc) => {
        notifications.push({ id: doc.id, ...doc.data() } as Notification);
      });
      
      return notifications;
    } catch (error) {
      console.error("Error al obtener notificaciones no leídas:", error);
      throw error;
    }
  }
  
  // Suscribirse a notificaciones en tiempo real
  subscribeToNotifications(userId: string, callback: (notifications: Notification[]) => void) {
    try {
      const q = query(
        collection(this.db, "notifications"), 
        where("userId", "==", userId),
        orderBy("createdAt", "desc")
      );
      
      return onSnapshot(q, (querySnapshot) => {
        const notifications: Notification[] = [];
        
        querySnapshot.forEach((doc) => {
          notifications.push({ id: doc.id, ...doc.data() } as Notification);
        });
        
        callback(notifications);
      });
    } catch (error) {
      console.error("Error al suscribirse a notificaciones:", error);
      throw error;
    }
  }
}

// Instancia singleton del servicio
export const notificationService = new NotificationService();

// Funciones de ayuda para crear notificaciones para eventos específicos

// Para usuario: notificación cuando el administrador responde a su ticket
export async function notifyTicketReplied(ticketId: string, ticketTitle: string, userId: string, adminEmail: string) {
  return notificationService.createNotification({
    userId,
    ticketId,
    ticketTitle,
    type: 'ticket_replied',
    message: `El administrador ha respondido a tu ticket "${ticketTitle}"`,
    createdBy: adminEmail,
    adminOnly: false
  });
}

// Para usuario: notificación cuando el administrador cierra su ticket
export async function notifyTicketClosed(ticketId: string, ticketTitle: string, userId: string, adminEmail: string) {
  return notificationService.createNotification({
    userId,
    ticketId,
    ticketTitle,
    type: 'ticket_closed',
    message: `Tu ticket "${ticketTitle}" ha sido cerrado por el administrador`,
    createdBy: adminEmail,
    adminOnly: false
  });
}

// Para usuario: notificación cuando el administrador reabre su ticket
export async function notifyTicketReopened(ticketId: string, ticketTitle: string, userId: string, adminEmail: string) {
  return notificationService.createNotification({
    userId,
    ticketId,
    ticketTitle,
    type: 'ticket_reopened',
    message: `Tu ticket "${ticketTitle}" ha sido reabierto por el administrador`,
    createdBy: adminEmail,
    adminOnly: false
  });
}

// Para administrador: notificación cuando se crea un nuevo ticket
export async function notifyAdminNewTicket(ticketId: string, ticketTitle: string, userEmail: string) {
  try {
    // Obtener el administrador (en este caso por correo)
    const adminEmail = 'brundindev@gmail.com';
    
    // Crear la notificación directamente sin buscar el ID del admin
    // Vamos a crear un ID único basado en el correo del administrador
    const adminId = 'admin_brundindev'; // ID fijo para el administrador
    
    // Usar el servicio de notificaciones
    return await notificationService.createNotification({
      userId: adminId,
      ticketId,
      ticketTitle,
      type: 'ticket_created',
      message: `Nuevo ticket creado por ${userEmail}: "${ticketTitle}"`,
      createdBy: userEmail,
      adminOnly: true
    });
  } catch (error) {
    console.error("Error en notifyAdminNewTicket:", error);
    // No lanzar el error para que no interrumpa el flujo principal
    return null;
  }
}

// Para administrador: notificación cuando un usuario responde a un ticket
export async function notifyAdminTicketReplied(ticketId: string, ticketTitle: string, userEmail: string) {
  try {
    // Usar el ID fijo para el administrador
    const adminId = 'admin_brundindev';
    
    // Usar el servicio de notificaciones
    return await notificationService.createNotification({
      userId: adminId,
      ticketId,
      ticketTitle,
      type: 'ticket_replied',
      message: `El usuario ${userEmail} ha respondido al ticket "${ticketTitle}"`,
      createdBy: userEmail,
      adminOnly: true
    });
  } catch (error) {
    console.error("Error en notifyAdminTicketReplied:", error);
    // No lanzar el error para que no interrumpa el flujo principal
    return null;
  }
}

// Registrar actividad de ticket (para administrador)
export async function logTicketActivity(ticketId: string, ticketTitle: string, action: string, userEmail: string) {
  try {
    // Usar el ID fijo para el administrador
    const adminId = 'admin_brundindev';
    
    // Usar el servicio de notificaciones
    return await notificationService.createNotification({
      userId: adminId,
      ticketId,
      ticketTitle,
      type: 'ticket_created', // Usamos este tipo para mantener consistencia
      message: `[LOG] Ticket "${ticketTitle}" ${action} por ${userEmail}`,
      createdBy: userEmail,
      adminOnly: true
    });
  } catch (error) {
    console.error("Error en logTicketActivity:", error);
    // No lanzar el error para que no interrumpa el flujo principal
    return null;
  }
} 