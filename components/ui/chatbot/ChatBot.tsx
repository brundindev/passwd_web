"use client";

import { useState, useRef, useEffect } from "react";
import ChatButton from "./ChatButton";
import ChatWindow from "./ChatWindow";
import { getBotResponse } from "./responses";

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ sender: "user" | "bot"; text: string; }[]>([
    { sender: "bot", text: "¡Hola! Soy el asistente virtual de PASSWD. ¿En qué puedo ayudarte hoy?" }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Desplazarse al último mensaje cuando se añade uno nuevo
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  // Abrir el chat automáticamente después de 5 segundos en la primera visita
  useEffect(() => {
    const hasOpenedChat = localStorage.getItem('hasOpenedChat');
    
    if (!hasOpenedChat) {
      const timer = setTimeout(() => {
        setIsOpen(true);
        localStorage.setItem('hasOpenedChat', 'true');
      }, 5000);
      
      return () => clearTimeout(timer);
    }
  }, []);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!inputValue.trim()) return;
    
    // Añadir mensaje del usuario
    const userMessage = inputValue.trim();
    setMessages(prev => [...prev, { sender: "user", text: userMessage }]);
    setInputValue("");
    
    // Iniciar animación de "pensando"
    setIsTyping(true);
    
    // Simular tiempo de respuesta
    setTimeout(async () => {
      // Obtener respuesta del bot
      const botResponse = await getBotResponse(userMessage);
      
      // Animación de escritura
      setIsTyping(false);
      
      // Dividir la respuesta en caracteres para simular escritura
      let response = "";
      const fullResponse = botResponse;
      
      // Añadir caracteres uno a uno con un pequeño retraso
      const typeWriter = (i = 0) => {
        if (i < fullResponse.length) {
          response += fullResponse.charAt(i);
          setMessages(prev => {
            const newMessages = [...prev];
            // Si ya existe un mensaje del bot, actualizarlo
            if (newMessages[newMessages.length - 1].sender === "bot") {
              newMessages[newMessages.length - 1].text = response;
            } else {
              // Si no existe, crear uno nuevo
              newMessages.push({ sender: "bot", text: response });
            }
            return newMessages;
          });
          setTimeout(() => typeWriter(i + 1), 20); // velocidad de escritura
        }
      };
      
      // Iniciar la animación de escritura
      typeWriter();
    }, 1000); // Tiempo de "pensando"
  };

  return (
    <>
      <ChatButton isOpen={isOpen} onClick={toggleChat} />
      {isOpen && (
        <ChatWindow 
          messages={messages} 
          inputValue={inputValue} 
          handleInputChange={handleInputChange} 
          handleSubmit={handleSubmit} 
          isTyping={isTyping}
          messagesEndRef={messagesEndRef}
        />
      )}
    </>
  );
} 