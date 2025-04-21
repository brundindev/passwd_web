import { motion, AnimatePresence } from "framer-motion";
import { RefObject } from "react";

interface ChatWindowProps {
  messages: { sender: "user" | "bot"; text: string }[];
  inputValue: string;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent) => void;
  isTyping: boolean;
  messagesEndRef: RefObject<HTMLDivElement>;
}

// Preguntas preestablecidas que el usuario puede seleccionar
const suggestedQuestions = [
  "¿Qué es PASSWD?",
  "¿Es seguro PASSWD?",
  "¿Cuánto cuesta PASSWD?",
  "¿En qué dispositivos puedo usar PASSWD?",
  "Olvidé mi contraseña maestra",
  "¿Cómo contactar con soporte?"
];

export default function ChatWindow({
  messages,
  inputValue,
  handleInputChange,
  handleSubmit,
  isTyping,
  messagesEndRef,
}: ChatWindowProps) {
  // Función para manejar cuando el usuario selecciona una pregunta preestablecida
  const handleQuestionClick = (question: string) => {
    // Simular un evento de cambio para establecer el valor del input
    handleInputChange({
      target: { value: question },
    } as React.ChangeEvent<HTMLInputElement>);
    
    // Simular un evento de envío del formulario
    handleSubmit({
      preventDefault: () => {},
    } as React.FormEvent);
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed bottom-24 right-6 z-50 flex h-[500px] w-[350px] flex-col rounded-lg bg-gray-800 shadow-xl border border-gray-700 overflow-hidden"
        initial={{ opacity: 0, y: 20, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.9 }}
        transition={{ duration: 0.3 }}
      >
        {/* Encabezado del chat */}
        <motion.div 
          className="flex items-center justify-between bg-indigo-600 px-4 py-3 text-white"
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
        >
          <div className="flex items-center space-x-2">
            <motion.div 
              className="bg-indigo-500 p-1 rounded-full"
              whileHover={{ rotate: 10 }}
              animate={{ rotate: [0, -5, 5, -5, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
              </svg>
            </motion.div>
            <h3 className="text-lg font-semibold">PasswdAI</h3>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-xs text-green-300">En línea 24/7</span>
            <div className="relative h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500"></span>
            </div>
          </div>
        </motion.div>

        {/* Área de mensajes */}
        <div className="flex-1 overflow-y-auto p-4 bg-gray-900">
          {messages.map((message, index) => (
            <motion.div
              key={index}
              className={`mb-3 flex ${
                message.sender === "user" ? "justify-end" : "justify-start"
              }`}
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              {message.sender === "bot" && (
                <motion.div 
                  className="mr-2 bg-indigo-700 rounded-full p-1 self-end mb-1"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.1, type: "spring" }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                  </svg>
                </motion.div>
              )}
              <motion.div
                className={`max-w-[85%] rounded-lg p-3 ${
                  message.sender === "user"
                    ? "bg-indigo-600 text-white"
                    : "bg-gray-800 text-gray-200 border border-gray-700"
                }`}
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <p className="text-sm">{message.text}</p>
              </motion.div>
            </motion.div>
          ))}

          {/* Indicador de "escribiendo" */}
          {isTyping && (
            <motion.div
              className="mb-3 flex justify-start"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div 
                className="mr-2 bg-indigo-700 rounded-full p-1 self-end mb-1"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                </svg>
              </motion.div>
              <div className="bg-gray-800 rounded-lg p-3 border border-gray-700">
                <div className="flex space-x-1">
                  <motion.div 
                    className="h-2 w-2 rounded-full bg-gray-400"
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 0.5, repeat: Infinity, repeatType: "loop" }}
                  ></motion.div>
                  <motion.div 
                    className="h-2 w-2 rounded-full bg-gray-400"
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 0.5, repeat: Infinity, repeatType: "loop", delay: 0.2 }}
                  ></motion.div>
                  <motion.div 
                    className="h-2 w-2 rounded-full bg-gray-400"
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 0.5, repeat: Infinity, repeatType: "loop", delay: 0.4 }}
                  ></motion.div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Div para scroll automático */}
          <div ref={messagesEndRef} />
        </div>

        {/* Preguntas sugeridas */}
        {messages.length < 3 && (
          <motion.div 
            className="bg-gray-900 p-3 border-t border-gray-800"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.3 }}
          >
            <p className="text-xs text-gray-400 mb-2">Preguntas frecuentes:</p>
            <div className="flex flex-wrap gap-2">
              {suggestedQuestions.map((question, index) => (
                <motion.button
                  key={index}
                  className="bg-gray-800 text-xs text-gray-300 px-2 py-1 rounded-full hover:bg-indigo-600 hover:text-white transition-colors border border-gray-700"
                  onClick={() => handleQuestionClick(question)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {question}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}

        {/* Formulario de entrada */}
        <motion.form 
          onSubmit={handleSubmit} 
          className="border-t border-gray-700 bg-gray-800 p-3"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center">
            <input
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              placeholder="Escribe tu pregunta..."
              className="flex-1 rounded-l-md border-0 bg-gray-700 px-3 py-2 text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
            <motion.button
              type="submit"
              className="rounded-r-md bg-indigo-600 px-3 py-2 text-white hover:bg-indigo-700 focus:outline-none"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                />
              </svg>
            </motion.button>
          </div>
        </motion.form>
      </motion.div>
    </AnimatePresence>
  );
} 