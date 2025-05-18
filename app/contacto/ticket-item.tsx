"use client";

import { useState } from 'react';

// Definición de la interfaz para los tickets - exportada para uso en otros componentes
export interface Ticket {
  id: string;
  userId: string;
  userEmail: string;
  asunto: string;
  mensaje: string;
  estado: 'abierto' | 'cerrado';
  createdAt: string;
  respuestas: Respuesta[];
}

export interface Respuesta {
  id: string;
  mensaje: string;
  autor: string;
  isAdmin: boolean;
  createdAt: string;
}

interface TicketItemProps {
  ticket: Ticket;
  isSelected: boolean;
  onClick: () => void;
}

export default function TicketItem({ ticket, isSelected, onClick }: TicketItemProps) {
  const [isHovered, setIsHovered] = useState(false);
  
  // Formatear fecha para mostrar en formato local
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleString();
    } catch (error) {
      return "Fecha desconocida";
    }
  };
  
  // Obtener la última actividad (ya sea una respuesta o la creación del ticket)
  const getLastActivity = () => {
    if (ticket.respuestas && ticket.respuestas.length > 0) {
      // Ordenar respuestas por fecha, más reciente primero
      const sortedRespuestas = [...ticket.respuestas].sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
      return {
        date: formatDate(sortedRespuestas[0].createdAt),
        isAdmin: sortedRespuestas[0].isAdmin
      };
    }
    return {
      date: formatDate(ticket.createdAt),
      isAdmin: false
    };
  };
  
  const lastActivity = getLastActivity();
  
  // Contar respuestas no leídas (para futura implementación)
  const unreadCount = ticket.respuestas.filter(r => r.isAdmin).length;
  
  return (
    <div 
      className={`rounded-lg overflow-hidden border transition-all cursor-pointer
        ${isSelected 
          ? 'bg-purple-900/30 border-purple-500' 
          : isHovered 
            ? 'bg-gray-700 border-gray-600' 
            : 'bg-gray-800 border-gray-700'
        }`}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <div className="flex-1">
            <h3 className={`font-medium ${isSelected ? 'text-purple-200' : 'text-white'}`}>
              {ticket.asunto}
              {/* Badge para tickets no leídos (futura implementación) */}
              {unreadCount > 0 && !isSelected && (
                <span className="ml-2 px-1.5 py-0.5 text-xs bg-purple-600 text-white rounded-full">
                  {unreadCount}
                </span>
              )}
            </h3>
            <p className="text-sm text-gray-400 line-clamp-1 mt-1">
              {ticket.respuestas.length > 0 
                ? ticket.respuestas[ticket.respuestas.length - 1].mensaje 
                : ticket.mensaje}
            </p>
          </div>
          
          {/* Estado del ticket */}
          <div className="ml-4">
            <span 
              className={`text-xs px-2 py-1 rounded-full 
                ${ticket.estado === 'abierto' 
                  ? 'bg-green-900/30 text-green-300' 
                  : 'bg-yellow-900/30 text-yellow-300'
                }`}
            >
              {ticket.estado === 'abierto' ? 'Abierto' : 'Cerrado'}
            </span>
          </div>
        </div>
        
        <div className="flex justify-between text-xs text-gray-500 mt-3">
          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
            <span>{ticket.respuestas.length} respuesta{ticket.respuestas.length !== 1 ? 's' : ''}</span>
          </div>
          
          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{lastActivity.date}</span>
            {lastActivity.isAdmin && (
              <span className="ml-1 text-purple-400">(Soporte)</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 