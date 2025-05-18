"use client";

interface Ticket {
  id: string;
  userId: string;
  userEmail: string;
  asunto: string;
  mensaje: string;
  estado: 'abierto' | 'cerrado';
  createdAt: string;
  respuestas: any[];
}

export interface TicketItemProps {
  ticket: Ticket;
  isSelected: boolean;
  onClick: () => void;
}

export default function TicketItem({ ticket, isSelected, onClick }: TicketItemProps) {
  // Formatear la fecha
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  // Contar respuestas sin leer (solo respuestas de admin)
  const unreadResponses = ticket.respuestas.filter(r => r.isAdmin).length;

  return (
    <div 
      className={`p-4 rounded-lg cursor-pointer transition-all 
        ${isSelected 
          ? 'bg-purple-900/30 border border-purple-500/50' 
          : 'bg-gray-700 hover:bg-gray-700/70 border border-transparent'}`}
      onClick={onClick}
    >
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-semibold text-white truncate mr-2">{ticket.asunto}</h3>
        <div className="flex items-center">
          <span 
            className={`text-xs px-2 py-1 rounded-full ${
              ticket.estado === 'abierto' 
                ? 'bg-green-900/30 text-green-400' 
                : 'bg-yellow-900/30 text-yellow-400'
            }`}
          >
            {ticket.estado === 'abierto' ? 'Abierto' : 'Cerrado'}
          </span>
        </div>
      </div>
      <p className="text-gray-400 text-sm mb-2 line-clamp-2">{ticket.mensaje}</p>
      <div className="flex justify-between items-center text-xs text-gray-500">
        <span>{formatDate(ticket.createdAt)}</span>
        <div className="flex items-center">
          {unreadResponses > 0 && (
            <span className="bg-purple-600 text-white px-1.5 py-0.5 rounded-full text-xs mr-2">
              {unreadResponses}
            </span>
          )}
          <span className="text-gray-400">
            {ticket.respuestas.length} {ticket.respuestas.length === 1 ? 'respuesta' : 'respuestas'}
          </span>
        </div>
      </div>
    </div>
  );
} 