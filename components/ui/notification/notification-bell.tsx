"use client";

import React, { useState, useEffect, Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { notificationService, Notification } from "@/lib/firebase/notifications";
import { useAuth } from "@/lib/auth/auth-context";

export default function NotificationBell() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const { isAuthenticated, userProfile } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated || !userProfile) {
      setNotifications([]);
      setUnreadCount(0);
      setLoading(false);
      return;
    }

    // Suscribirse a las notificaciones en tiempo real
    const unsubscribe = notificationService.subscribeToNotifications(
      userProfile.uid,
      (newNotifications) => {
        setNotifications(newNotifications);
        // Contar notificaciones no leídas
        const unread = newNotifications.filter((n) => !n.read).length;
        setUnreadCount(unread);
        setLoading(false);
      }
    );

    return () => {
      unsubscribe && unsubscribe();
    };
  }, [isAuthenticated, userProfile]);

  const handleMarkAsRead = async (notificationId: string) => {
    try {
      await notificationService.markAsRead(notificationId);
      // La UI se actualizará automáticamente debido a la suscripción
    } catch (error) {
      console.error("Error al marcar como leída:", error);
    }
  };

  const handleMarkAllAsRead = async () => {
    if (!userProfile) return;
    
    try {
      await notificationService.markAllAsRead(userProfile.uid);
      // La UI se actualizará automáticamente debido a la suscripción
    } catch (error) {
      console.error("Error al marcar todas como leídas:", error);
    }
  };

  const handleDeleteNotification = async (notificationId: string) => {
    try {
      await notificationService.deleteNotification(notificationId);
      // La UI se actualizará automáticamente debido a la suscripción
    } catch (error) {
      console.error("Error al eliminar notificación:", error);
    }
  };

  const navigateToTicket = (notif: Notification) => {
    // Si es admin y es una notificación para admin, ir al panel admin
    const isAdmin = userProfile?.email === 'brundindev@gmail.com';
    
    if (isAdmin && notif.adminOnly) {
      router.push(`/admin/tickets?ticket=${notif.ticketId}`);
    } else {
      // Para usuarios normales o notificaciones normales
      router.push(`/contacto?ticket=${notif.ticketId}`);
    }
    
    // Marcar como leída
    handleMarkAsRead(notif.id);
  };

  // No mostrar el componente si el usuario no está autenticado
  if (!isAuthenticated) {
    return null;
  }

  return (
    <Menu as="div" className="relative ml-3">
      {({ open }) => (
        <>
          <Menu.Button 
            className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300"
          >
            <span className="sr-only">Ver notificaciones</span>
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-6 w-6" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" 
              />
            </svg>
            
            {/* Badge para notificaciones no leídas */}
            <AnimatePresence>
              {unreadCount > 0 && (
                <motion.span 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center"
                >
                  {unreadCount > 9 ? '9+' : unreadCount}
                </motion.span>
              )}
            </AnimatePresence>
          </Menu.Button>
          
          <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-150"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute right-0 z-10 mt-2 w-80 origin-top-right rounded-xl bg-gray-800/90 backdrop-blur-sm py-2 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none border border-gray-700 divide-y divide-gray-700">
              <div className="px-4 py-3 flex justify-between items-center">
                <h3 className="text-lg font-semibold text-white">Notificaciones</h3>
                {unreadCount > 0 && (
                  <button 
                    onClick={handleMarkAllAsRead}
                    className="text-xs text-indigo-400 hover:text-indigo-300 transition-colors bg-indigo-500/10 px-2 py-1 rounded"
                  >
                    Marcar todo como leído
                  </button>
                )}
              </div>
              
              <div className="max-h-80 overflow-y-auto">
                {loading ? (
                  <div className="flex justify-center py-4">
                    <div className="w-6 h-6 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
                  </div>
                ) : notifications.length === 0 ? (
                  <div className="text-center py-6">
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      className="h-12 w-12 mx-auto text-gray-500 mb-2" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" 
                      />
                    </svg>
                    <p className="text-gray-400">No tienes notificaciones</p>
                  </div>
                ) : (
                  <div className="divide-y divide-gray-700">
                    {notifications.map((notification) => (
                      <div 
                        key={notification.id} 
                        className={`px-4 py-3 hover:bg-gray-700/50 transition-colors cursor-pointer relative ${
                          !notification.read ? 'bg-gray-700/30' : ''
                        }`}
                      >
                        <div className="flex justify-between">
                          <div 
                            className="flex-1 pr-10"
                            onClick={() => navigateToTicket(notification)}
                          >
                            {/* Icono basado en el tipo de notificación */}
                            <div className="flex items-start mb-1">
                              <div className={`rounded-full p-1.5 mr-2 ${getNotificationTypeClass(notification.type)}`}>
                                {getNotificationIcon(notification.type)}
                              </div>
                              <div>
                                <p className="text-sm font-medium text-white line-clamp-2">
                                  {notification.message}
                                </p>
                                <p className="text-xs text-gray-400 mt-1">
                                  {formatDate(notification.createdAt.toDate())}
                                </p>
                              </div>
                            </div>
                          </div>
                          
                          <button
                            onClick={() => handleDeleteNotification(notification.id)}
                            className="absolute top-2 right-2 text-gray-500 hover:text-red-400 transition-colors"
                            title="Eliminar notificación"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </div>
                        
                        {!notification.read && (
                          <div className="absolute bottom-0 left-0 h-1 bg-indigo-500 rounded-full" style={{ width: '30%' }}></div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </Menu.Items>
          </Transition>
        </>
      )}
    </Menu>
  );
}

// Función para formatear la fecha
function formatDate(date: Date): string {
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  
  // Menos de 1 minuto
  if (diff < 60 * 1000) {
    return 'Hace unos segundos';
  }
  
  // Menos de 1 hora
  if (diff < 60 * 60 * 1000) {
    const minutes = Math.floor(diff / (60 * 1000));
    return `Hace ${minutes} ${minutes === 1 ? 'minuto' : 'minutos'}`;
  }
  
  // Menos de 1 día
  if (diff < 24 * 60 * 60 * 1000) {
    const hours = Math.floor(diff / (60 * 60 * 1000));
    return `Hace ${hours} ${hours === 1 ? 'hora' : 'horas'}`;
  }
  
  // Menos de 7 días
  if (diff < 7 * 24 * 60 * 60 * 1000) {
    const days = Math.floor(diff / (24 * 60 * 60 * 1000));
    return `Hace ${days} ${days === 1 ? 'día' : 'días'}`;
  }
  
  // Formato fecha completa para más de 7 días
  return date.toLocaleDateString('es-ES', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}

// Función para obtener la clase CSS según el tipo de notificación
function getNotificationTypeClass(type: string): string {
  switch (type) {
    case 'ticket_created':
      return 'bg-blue-500/20 text-blue-400';
    case 'ticket_replied':
      return 'bg-green-500/20 text-green-400';
    case 'ticket_closed':
      return 'bg-yellow-500/20 text-yellow-400';
    case 'ticket_reopened':
      return 'bg-purple-500/20 text-purple-400';
    case 'ticket_deleted':
      return 'bg-red-500/20 text-red-400';
    default:
      return 'bg-gray-500/20 text-gray-400';
  }
}

// Función para obtener el icono según el tipo de notificación
function getNotificationIcon(type: string): React.ReactNode {
  switch (type) {
    case 'ticket_created':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      );
    case 'ticket_replied':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
        </svg>
      );
    case 'ticket_closed':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      );
    case 'ticket_reopened':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
      );
    case 'ticket_deleted':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
      );
    default:
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      );
  }
} 