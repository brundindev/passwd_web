import { getFirestore, collection, addDoc, doc, updateDoc, serverTimestamp, Timestamp } from 'firebase/firestore';

// Interfaz para la estructura de notificaciones
/**
 * @typedef {Object} Notification
 * @property {string} id - ID único de la notificación
 * @property {string} userId - ID del usuario destinatario
 * @property {string} title - Título de la notificación
 * @property {string} message - Mensaje de la notificación
 * @property {boolean} read - Estado de lectura
 * @property {Timestamp} createdAt - Fecha de creación
 * @property {string} [type] - Tipo de notificación
 * @property {string} [reference] - Referencia a otro documento
 * @property {boolean} [adminOnly] - Si es solo para administradores
 */

/**
 * Notifica al administrador sobre un nuevo ticket
 * @param {string} ticketId - ID del nuevo ticket
 * @param {string} asunto - Asunto del ticket
 * @param {string} userEmail - Email del usuario que creó el ticket
 */
export async function notifyAdminNewTicket(ticketId, asunto, userEmail) {
  try {
    const db = getFirestore();
    
    await addDoc(collection(db, "notifications"), {
      userId: "admin", // Destinado al administrador
      title: "Nuevo ticket de soporte",
      message: `${userEmail} ha creado un nuevo ticket: "${asunto}"`,
      read: false,
      createdAt: serverTimestamp(),
      type: "ticket_new",
      reference: ticketId,
      adminOnly: true
    });
    
    console.log("Notificación enviada al administrador sobre el nuevo ticket");
  } catch (error) {
    console.error("Error al enviar notificación al administrador:", error);
    throw error;
  }
}

/**
 * Notifica al administrador que un usuario ha respondido a un ticket
 * @param {string} ticketId - ID del ticket respondido
 * @param {string} asunto - Asunto del ticket
 * @param {string} userEmail - Email del usuario que respondió
 */
export async function notifyAdminTicketReplied(ticketId, asunto, userEmail) {
  try {
    const db = getFirestore();
    
    await addDoc(collection(db, "notifications"), {
      userId: "admin", 
      title: "Respuesta a ticket de soporte",
      message: `${userEmail} ha respondido al ticket: "${asunto}"`,
      read: false,
      createdAt: serverTimestamp(),
      type: "ticket_reply",
      reference: ticketId,
      adminOnly: true
    });
    
    console.log("Notificación enviada al administrador sobre respuesta a ticket");
  } catch (error) {
    console.error("Error al enviar notificación al administrador:", error);
    throw error;
  }
}

/**
 * Notifica al usuario que el administrador ha respondido a su ticket
 * @param {string} userId - ID del usuario destinatario 
 * @param {string} ticketId - ID del ticket respondido
 * @param {string} asunto - Asunto del ticket
 */
export async function notifyUserTicketReplied(userId, ticketId, asunto) {
  try {
    const db = getFirestore();
    
    await addDoc(collection(db, "notifications"), {
      userId: userId,
      title: "Respuesta a tu ticket de soporte",
      message: `El equipo de soporte ha respondido a tu ticket: "${asunto}"`,
      read: false,
      createdAt: serverTimestamp(),
      type: "ticket_reply",
      reference: ticketId
    });
    
    console.log("Notificación enviada al usuario sobre respuesta a su ticket");
  } catch (error) {
    console.error("Error al enviar notificación al usuario:", error);
    throw error;
  }
}

/**
 * Registra actividad relacionada con tickets en el log de actividad
 * @param {string} ticketId - ID del ticket
 * @param {string} asunto - Asunto del ticket
 * @param {string} action - Acción realizada (creado, respondido, cerrado)
 * @param {string} actor - Email o identificador de quien realizó la acción
 */
export async function logTicketActivity(ticketId, asunto, action, actor) {
  try {
    const db = getFirestore();
    
    await addDoc(collection(db, "activity_log"), {
      timestamp: serverTimestamp(),
      type: "ticket",
      action: action,
      reference: ticketId,
      summary: `Ticket "${asunto}" ${action} por ${actor}`,
      actor: actor
    });
    
    console.log(`Actividad registrada: ticket ${action}`);
  } catch (error) {
    console.error("Error al registrar actividad:", error);
    // No lanzamos el error para no interrumpir el flujo principal
  }
}

// Clase para manejar las notificaciones
export class NotificationService {
  constructor() {
    this.db = getFirestore();
  }
  
  /**
   * Crear una nueva notificación
   * @param {Object} data - Datos de la notificación
   * @returns {Promise<Object>} - La notificación creada
   */
  async createNotification(data) {
    try {
      const notificationData = {
        ...data,
        read: false,
        createdAt: serverTimestamp()
      };
      
      const docRef = await addDoc(collection(this.db, "notifications"), notificationData);
      return { id: docRef.id, ...notificationData };
    } catch (error) {
      console.error("Error al crear notificación:", error);
      throw error;
    }
  }
  
  /**
   * Marcar una notificación como leída
   * @param {string} notificationId - ID de la notificación
   * @returns {Promise<void>}
   */
  async markAsRead(notificationId) {
    try {
      const notificationRef = doc(this.db, "notifications", notificationId);
      await updateDoc(notificationRef, {
        read: true
      });
    } catch (error) {
      console.error("Error al marcar notificación como leída:", error);
      throw error;
    }
  }
}
