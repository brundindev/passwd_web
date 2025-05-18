"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, collection, query, getDocs, doc, updateDoc, deleteDoc, orderBy, where } from 'firebase/firestore';
import PageTransition from '@/components/ui/animation/page-transition';
import ScrollAnimation from '@/components/ui/animation/scroll-animation';

// Definición de la interfaz para los tickets
interface Ticket {
  id: string;
  userId: string;
  userEmail: string;
  asunto: string;
  mensaje: string;
  estado: 'abierto' | 'cerrado';
  createdAt: string;
  respuestas: Respuesta[];
}

interface Respuesta {
  id: string;
  mensaje: string;
  autor: string;
  isAdmin: boolean;
  createdAt: string;
}

// Componente para mostrar cada ticket en el panel de administración
function AdminTicketItem({ ticket, onClick, isSelected }: { 
  ticket: Ticket, 
  onClick: () => void,
  isSelected: boolean 
}) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('es-ES');
  };

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
      <div className="flex items-center mb-2">
        <span className="text-gray-400 text-sm">
          De: <span className="text-purple-400">{ticket.userEmail}</span>
        </span>
      </div>
      <p className="text-gray-400 text-sm mb-2 line-clamp-2">{ticket.mensaje}</p>
      <div className="flex justify-between items-center text-xs text-gray-500">
        <span>{formatDate(ticket.createdAt)}</span>
        <span className="text-gray-400">
          {ticket.respuestas.length} {ticket.respuestas.length === 1 ? 'respuesta' : 'respuestas'}
        </span>
      </div>
    </div>
  );
}

export default function TicketsAdminClient() {
  const [user, setUser] = useState<any>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [filteredTickets, setFilteredTickets] = useState<Ticket[]>([]);
  const [selectedTicket, setSelectedTicket] = useState<string | null>(null);
  const [respuesta, setRespuesta] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [filter, setFilter] = useState<'todos' | 'abiertos' | 'cerrados'>('todos');
  
  const router = useRouter();
  const auth = getAuth();
  const db = getFirestore();

  // Comprobar el estado de autenticación y si es administrador
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      
      if (user) {
        // Verificar si el usuario es administrador (email específico)
        const isAdminUser = user.email === 'brundindev@gmail.com';
        setIsAdmin(isAdminUser);
        
        if (isAdminUser) {
          await cargarTickets();
        } else {
          // Si no es admin, redirigir
          router.push('/');
        }
      } else {
        // Si no hay usuario, redirigir al login
        router.push('/cuenta');
      }
      
      setLoading(false);
    });
    
    return () => unsubscribe();
  }, []);

  // Aplicar filtros a los tickets
  useEffect(() => {
    if (filter === 'todos') {
      setFilteredTickets(tickets);
    } else {
      setFilteredTickets(tickets.filter(ticket => 
        filter === 'abiertos' ? ticket.estado === 'abierto' : ticket.estado === 'cerrado'
      ));
    }
  }, [tickets, filter]);

  // Cargar todos los tickets para el administrador
  const cargarTickets = async () => {
    try {
      const q = query(
        collection(db, "tickets"),
        orderBy("createdAt", "desc")
      );
      
      const querySnapshot = await getDocs(q);
      const ticketsData: Ticket[] = [];
      
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        ticketsData.push({
          id: doc.id,
          userId: data.userId,
          userEmail: data.userEmail,
          asunto: data.asunto,
          mensaje: data.mensaje,
          estado: data.estado,
          createdAt: data.createdAt,
          respuestas: data.respuestas || []
        });
      });
      
      setTickets(ticketsData);
    } catch (error) {
      console.error("Error al cargar tickets:", error);
      setError("No se pudieron cargar los tickets. Inténtalo de nuevo más tarde.");
    }
  };

  // Enviar una respuesta como administrador
  const enviarRespuesta = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user || !selectedTicket || !isAdmin) return;
    
    if (!respuesta.trim()) {
      setError("Por favor, escribe un mensaje");
      return;
    }
    
    setSubmitting(true);
    setError(null);
    
    try {
      const ticketRef = doc(db, "tickets", selectedTicket);
      const ticketActual = tickets.find(t => t.id === selectedTicket);
      
      if (!ticketActual) {
        throw new Error("Ticket no encontrado");
      }
      
      const nuevaRespuesta = {
        id: Date.now().toString(),
        mensaje: respuesta.trim(),
        autor: user.email,
        isAdmin: true,
        createdAt: new Date().toISOString()
      };
      
      const respuestasActualizadas = [...ticketActual.respuestas, nuevaRespuesta];
      
      await updateDoc(ticketRef, {
        respuestas: respuestasActualizadas
      });
      
      setRespuesta('');
      setSuccess("Tu respuesta ha sido enviada");
      
      // Actualizar la lista de tickets
      await cargarTickets();
    } catch (error) {
      console.error("Error al enviar respuesta:", error);
      setError("No se pudo enviar la respuesta. Inténtalo de nuevo más tarde.");
    } finally {
      setSubmitting(false);
    }
  };

  // Cerrar un ticket
  const cerrarTicket = async () => {
    if (!selectedTicket || !isAdmin) return;
    
    setSubmitting(true);
    setError(null);
    
    try {
      const ticketRef = doc(db, "tickets", selectedTicket);
      
      await updateDoc(ticketRef, {
        estado: 'cerrado'
      });
      
      setSuccess("Ticket cerrado correctamente");
      
      // Actualizar la lista de tickets
      await cargarTickets();
    } catch (error) {
      console.error("Error al cerrar ticket:", error);
      setError("No se pudo cerrar el ticket. Inténtalo de nuevo más tarde.");
    } finally {
      setSubmitting(false);
    }
  };

  // Reabrir un ticket
  const reabrirTicket = async () => {
    if (!selectedTicket || !isAdmin) return;
    
    setSubmitting(true);
    setError(null);
    
    try {
      const ticketRef = doc(db, "tickets", selectedTicket);
      
      await updateDoc(ticketRef, {
        estado: 'abierto'
      });
      
      setSuccess("Ticket reabierto correctamente");
      
      // Actualizar la lista de tickets
      await cargarTickets();
    } catch (error) {
      console.error("Error al reabrir ticket:", error);
      setError("No se pudo reabrir el ticket. Inténtalo de nuevo más tarde.");
    } finally {
      setSubmitting(false);
    }
  };

  // Eliminar un ticket
  const eliminarTicket = async () => {
    if (!selectedTicket || !isAdmin) return;
    
    if (!confirm("¿Estás seguro de que deseas eliminar este ticket? Esta acción no se puede deshacer.")) {
      return;
    }
    
    setSubmitting(true);
    setError(null);
    
    try {
      await deleteDoc(doc(db, "tickets", selectedTicket));
      
      setSuccess("Ticket eliminado correctamente");
      setSelectedTicket(null);
      
      // Actualizar la lista de tickets
      await cargarTickets();
    } catch (error) {
      console.error("Error al eliminar ticket:", error);
      setError("No se pudo eliminar el ticket. Inténtalo de nuevo más tarde.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <PageTransition>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-24">
          <div className="flex justify-center">
            <div className="w-6 h-6 border-2 border-purple-600 rounded-full animate-spin border-t-transparent"></div>
          </div>
        </div>
      </PageTransition>
    );
  }

  if (!isAdmin) {
    return (
      <PageTransition>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-24">
          <div className="text-center">
            <h1 className="h1 mb-4">Acceso restringido</h1>
            <p className="text-gray-400 mb-6">No tienes permisos para acceder a esta sección.</p>
            <button
              onClick={() => router.push('/')}
              className="btn text-white bg-purple-600 hover:bg-purple-700"
            >
              Volver al inicio
            </button>
          </div>
        </div>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <section className="relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="pt-20 pb-12 md:pt-24 md:pb-20">
            {/* Encabezado */}
            <ScrollAnimation
              variant="fadeInUp"
              className="max-w-3xl mx-auto text-center pb-10 md:pb-12"
            >
              <h1 className="h1 text-4xl md:text-5xl font-bold mb-4">Administración de Tickets</h1>
              <p className="text-xl text-gray-400">
                Gestiona todos los tickets de soporte enviados por los usuarios.
              </p>
            </ScrollAnimation>

            {/* Filtros */}
            <ScrollAnimation
              variant="fadeInUp"
              delay={0.2}
              className="max-w-6xl mx-auto mb-8"
            >
              <div className="flex justify-center space-x-4">
                <button
                  onClick={() => setFilter('todos')}
                  className={`px-4 py-2 rounded-lg ${
                    filter === 'todos' 
                      ? 'bg-purple-600 text-white' 
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  Todos
                </button>
                <button
                  onClick={() => setFilter('abiertos')}
                  className={`px-4 py-2 rounded-lg ${
                    filter === 'abiertos' 
                      ? 'bg-purple-600 text-white' 
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  Abiertos
                </button>
                <button
                  onClick={() => setFilter('cerrados')}
                  className={`px-4 py-2 rounded-lg ${
                    filter === 'cerrados' 
                      ? 'bg-purple-600 text-white' 
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  Cerrados
                </button>
              </div>
            </ScrollAnimation>

            {/* Panel principal */}
            <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12">
              {/* Lista de tickets */}
              <ScrollAnimation
                variant="fadeInUp"
                delay={0.3}
              >
                <div className="bg-gray-800 p-6 rounded-lg h-full">
                  <h2 className="h3 mb-6">
                    Tickets
                    {filter !== 'todos' && ` ${filter}`}
                    {' '}({filteredTickets.length})
                  </h2>
                  
                  {filteredTickets.length === 0 ? (
                    <div className="text-center py-12">
                      <p className="text-gray-400">
                        No hay tickets {filter !== 'todos' && filter} para mostrar.
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
                      {filteredTickets.map((ticket) => (
                        <AdminTicketItem 
                          key={ticket.id}
                          ticket={ticket}
                          isSelected={selectedTicket === ticket.id}
                          onClick={() => setSelectedTicket(ticket.id === selectedTicket ? null : ticket.id)}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </ScrollAnimation>

              {/* Detalle y respuesta */}
              <ScrollAnimation
                variant="fadeInUp"
                delay={0.4}
              >
                <div className="bg-gray-800 p-6 rounded-lg">
                  {selectedTicket ? (
                    <div>
                      <div className="flex justify-between items-center mb-4">
                        <h2 className="h3">Detalle del ticket</h2>
                        <div className="flex space-x-2">
                          {tickets.find(t => t.id === selectedTicket)?.estado === 'abierto' ? (
                            <button
                              onClick={cerrarTicket}
                              className="btn-sm bg-yellow-600 hover:bg-yellow-700 text-white"
                              disabled={submitting}
                            >
                              Cerrar ticket
                            </button>
                          ) : (
                            <button
                              onClick={reabrirTicket}
                              className="btn-sm bg-green-600 hover:bg-green-700 text-white"
                              disabled={submitting}
                            >
                              Reabrir ticket
                            </button>
                          )}
                          <button
                            onClick={eliminarTicket}
                            className="btn-sm bg-red-600 hover:bg-red-700 text-white"
                            disabled={submitting}
                          >
                            Eliminar
                          </button>
                        </div>
                      </div>

                      <div className="mb-6">
                        <h3 className="font-medium text-lg mb-2">
                          {tickets.find(t => t.id === selectedTicket)?.asunto}
                        </h3>
                        <div className="flex items-center mb-4">
                          <span className="text-gray-400 text-sm">
                            De: <span className="text-purple-400">{tickets.find(t => t.id === selectedTicket)?.userEmail}</span>
                          </span>
                          <span className="mx-2 text-gray-500">•</span>
                          <span className="text-gray-400 text-sm">
                            {new Date(tickets.find(t => t.id === selectedTicket)?.createdAt || '').toLocaleString()}
                          </span>
                        </div>
                      </div>

                      <div className="mb-6 max-h-[300px] overflow-y-auto p-4 bg-gray-900 rounded">
                        <div className="space-y-4">
                          {/* Mensaje original */}
                          <div className="p-3 bg-gray-800 rounded">
                            <p className="text-white">
                              {tickets.find(t => t.id === selectedTicket)?.mensaje}
                            </p>
                          </div>
                          
                          {/* Respuestas al ticket */}
                          {tickets.find(t => t.id === selectedTicket)?.respuestas.map((resp) => (
                            <div 
                              key={resp.id} 
                              className={`p-3 rounded ${resp.isAdmin ? 'bg-purple-900/30' : 'bg-gray-800'}`}
                            >
                              <div className="flex justify-between mb-1">
                                <p className="text-sm font-medium">
                                  {resp.isAdmin ? `Soporte (${resp.autor})` : `Usuario (${resp.autor})`}
                                </p>
                                <p className="text-sm text-gray-400">
                                  {new Date(resp.createdAt).toLocaleString()}
                                </p>
                              </div>
                              <p className="text-white">{resp.mensaje}</p>
                            </div>
                          ))}
                        </div>
                      </div>

                      {tickets.find(t => t.id === selectedTicket)?.estado === 'cerrado' ? (
                        <div className="bg-yellow-900/30 p-4 rounded mb-4">
                          <p className="text-yellow-300">
                            Este ticket está cerrado. Puedes reabrirlo si necesitas responder.
                          </p>
                        </div>
                      ) : (
                        <form onSubmit={enviarRespuesta}>
                          <div className="mb-4">
                            <label htmlFor="respuesta" className="block text-white mb-2">
                              Responder como soporte
                            </label>
                            <textarea
                              id="respuesta"
                              value={respuesta}
                              onChange={(e) => setRespuesta(e.target.value)}
                              className="w-full bg-gray-700 text-white px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-purple-600"
                              rows={4}
                              required
                            ></textarea>
                          </div>
                          <div className="flex justify-end">
                            <button
                              type="submit"
                              className="btn-sm text-white bg-purple-600 hover:bg-purple-700"
                              disabled={submitting}
                            >
                              {submitting ? 'Enviando...' : 'Enviar respuesta'}
                            </button>
                          </div>
                        </form>
                      )}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <p className="text-gray-400">
                        Selecciona un ticket para ver los detalles y responder.
                      </p>
                    </div>
                  )}

                  {/* Mensajes de error y éxito */}
                  {error && (
                    <div className="mt-4 p-3 bg-red-900/30 text-red-300 rounded">
                      {error}
                    </div>
                  )}
                  {success && (
                    <div className="mt-4 p-3 bg-green-900/30 text-green-300 rounded">
                      {success}
                    </div>
                  )}
                </div>
              </ScrollAnimation>
            </div>
          </div>
        </div>
      </section>
    </PageTransition>
  );
} 