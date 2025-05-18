"use client";

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, collection, addDoc, query, where, getDocs, doc, updateDoc, orderBy } from 'firebase/firestore';
import { AuthService } from '@/lib/firebase/firebase';
import PageTransition from '@/components/ui/animation/page-transition';
import ScrollAnimation from '@/components/ui/animation/scroll-animation';
import TicketItem from './ticket-item';
import { notifyAdminNewTicket, notifyAdminTicketReplied, logTicketActivity } from '@/lib/firebase/notifications';

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

export default function ContactoClient() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [asunto, setAsunto] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [respuesta, setRespuesta] = useState('');
  const [selectedTicket, setSelectedTicket] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  
  const router = useRouter();
  const searchParams = useSearchParams();
  const auth = getAuth();
  const db = getFirestore();
  const authService = new AuthService();

  // Comprobar el estado de autenticación y cargar ticket específico si se proporciona en la URL
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
      
      if (user) {
        cargarTickets(user.uid).then(() => {
          // Verificar si hay un ticket específico en la URL
          const ticketId = searchParams.get('ticket');
          if (ticketId) {
            setSelectedTicket(ticketId);
          }
        });
      }
    });
    
    return () => unsubscribe();
  }, [searchParams]);

  // Cargar los tickets del usuario actual
  const cargarTickets = async (userId: string) => {
    try {
      const q = query(
        collection(db, "tickets"), 
        where("userId", "==", userId),
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
      setError("No se pudieron cargar tus tickets. Inténtalo de nuevo más tarde.");
    }
  };

  // Enviar un nuevo ticket
  const enviarTicket = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      setError("Debes iniciar sesión para enviar un ticket");
      return;
    }
    
    if (!asunto.trim() || !mensaje.trim()) {
      setError("Por favor, completa todos los campos");
      return;
    }
    
    setSubmitting(true);
    setError(null);
    
    try {
      const ticketData = {
        userId: user.uid,
        userEmail: user.email,
        asunto: asunto.trim(),
        mensaje: mensaje.trim(),
        estado: 'abierto',
        createdAt: new Date().toISOString(),
        respuestas: []
      };
      
      await addDoc(collection(db, "tickets"), ticketData);
      
      setAsunto('');
      setMensaje('');
      setSuccess("Tu ticket ha sido enviado correctamente. Nuestro equipo lo revisará en breve.");
      
      // Recargar los tickets
      cargarTickets(user.uid);
    } catch (error) {
      console.error("Error al enviar ticket:", error);
      setError("No se pudo enviar el ticket. Inténtalo de nuevo más tarde.");
    } finally {
      setSubmitting(false);
    }
  };

  // Enviar una respuesta a un ticket
  const enviarRespuesta = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user || !selectedTicket) return;
    
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
        isAdmin: false,
        createdAt: new Date().toISOString()
      };
      
      const respuestasActualizadas = [...ticketActual.respuestas, nuevaRespuesta];
      
      await updateDoc(ticketRef, {
        respuestas: respuestasActualizadas,
        // Si el ticket estaba cerrado, lo reabrimos al recibir una respuesta del usuario
        estado: ticketActual.estado === 'cerrado' ? 'abierto' : ticketActual.estado
      });
      
      setRespuesta('');
      setSuccess("Tu respuesta ha sido enviada");
      
      // Actualizar la lista de tickets
      cargarTickets(user.uid);
    } catch (error) {
      console.error("Error al enviar respuesta:", error);
      setError("No se pudo enviar la respuesta. Inténtalo de nuevo más tarde.");
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
              <h1 className="h1 text-4xl md:text-5xl font-bold mb-4">Contacto y Soporte</h1>
              <p className="text-xl text-gray-400">
                ¿Necesitas ayuda? Envía un ticket y nuestro equipo te responderá lo antes posible.
              </p>
            </ScrollAnimation>

            {/* Verificación de inicio de sesión */}
            {!user ? (
              <ScrollAnimation variant="fadeInUp" delay={0.2} className="max-w-lg mx-auto text-center">
                <div className="bg-gray-800 p-8 rounded-lg">
                  <h2 className="h3 mb-4">Inicia sesión para enviar un ticket</h2>
                  <p className="text-gray-400 mb-6">
                    Para enviar un ticket de soporte, necesitas iniciar sesión en tu cuenta.
                  </p>
                  <button 
                    onClick={() => router.push('/cuenta')}
                    className="btn text-white bg-purple-600 hover:bg-purple-700"
                  >
                    Iniciar sesión
                  </button>
                </div>
              </ScrollAnimation>
            ) : (
              <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12">
                {/* Lista de tickets existentes */}
                <ScrollAnimation variant="fadeInUp" delay={0.2}>
                  <div className="bg-gray-800 p-6 rounded-lg h-full">
                    <h2 className="h3 mb-6">Tus tickets de soporte</h2>
                    
                    {tickets.length === 0 ? (
                      <div className="text-center py-12">
                        <p className="text-gray-400">
                          No tienes tickets de soporte abiertos.
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
                        {tickets.map((ticket) => (
                          <TicketItem 
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

                {/* Formulario de ticket o respuesta */}
                <ScrollAnimation variant="fadeInUp" delay={0.4}>
                  <div className="bg-gray-800 p-6 rounded-lg">
                    {selectedTicket ? (
                      // Responder a ticket existente
                      <div>
                        <h2 className="h3 mb-4">Responder al ticket</h2>
                        <h3 className="font-medium text-lg mb-6">
                          {tickets.find(t => t.id === selectedTicket)?.asunto}
                        </h3>

                        <div className="mb-6 max-h-[300px] overflow-y-auto px-2 py-3 bg-gray-900 rounded">
                          <div className="space-y-4">
                            {/* Mensaje original */}
                            <div className="p-3 bg-gray-800 rounded">
                              <p className="text-sm text-gray-400 mb-1">
                                {new Date(tickets.find(t => t.id === selectedTicket)?.createdAt || '').toLocaleString()}
                              </p>
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
                                    {resp.isAdmin ? 'Soporte' : resp.autor}
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
                              Este ticket ha sido cerrado por el equipo de soporte. Si necesitas ayuda adicional, puedes crear un nuevo ticket.
                            </p>
                          </div>
                        ) : (
                          <form onSubmit={enviarRespuesta}>
                            <div className="mb-4">
                              <label htmlFor="respuesta" className="block text-white mb-2">
                                Tu respuesta
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
                            <div className="flex justify-between">
                              <button
                                type="button"
                                onClick={() => setSelectedTicket(null)}
                                className="btn-sm text-white bg-gray-700 hover:bg-gray-600"
                              >
                                Volver
                              </button>
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
                      // Crear nuevo ticket
                      <div>
                        <h2 className="h3 mb-6">Enviar nuevo ticket</h2>
                        <form onSubmit={enviarTicket}>
                          <div className="mb-4">
                            <label htmlFor="asunto" className="block text-white mb-2">
                              Asunto
                            </label>
                            <input
                              type="text"
                              id="asunto"
                              value={asunto}
                              onChange={(e) => setAsunto(e.target.value)}
                              className="w-full bg-gray-700 text-white px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-purple-600"
                              required
                            />
                          </div>
                          <div className="mb-6">
                            <label htmlFor="mensaje" className="block text-white mb-2">
                              Mensaje
                            </label>
                            <textarea
                              id="mensaje"
                              value={mensaje}
                              onChange={(e) => setMensaje(e.target.value)}
                              className="w-full bg-gray-700 text-white px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-purple-600"
                              rows={6}
                              required
                            ></textarea>
                          </div>
                          <button
                            type="submit"
                            className="btn text-white bg-purple-600 hover:bg-purple-700 w-full"
                            disabled={submitting}
                          >
                            {submitting ? 'Enviando...' : 'Enviar ticket'}
                          </button>
                        </form>
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
            )}
          </div>
        </div>
      </section>
    </PageTransition>
  );
} 