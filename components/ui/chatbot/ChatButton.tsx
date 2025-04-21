import { motion } from "framer-motion";

interface ChatButtonProps {
  isOpen: boolean;
  onClick: () => void;
}

export default function ChatButton({ isOpen, onClick }: ChatButtonProps) {
  // Variantes para animaciones
  const buttonVariants = {
    initial: { 
      opacity: 0, 
      y: 20, 
      scale: 0.8,
      boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.1)"
    },
    animate: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      boxShadow: "0px 10px 25px rgba(79, 70, 229, 0.4)",
      transition: { 
        duration: 0.4,
        type: "spring",
        stiffness: 260,
        damping: 20 
      }
    },
    hover: { 
      scale: 1.1,
      boxShadow: "0px 15px 30px rgba(79, 70, 229, 0.6)",
      transition: { 
        type: "spring", 
        stiffness: 400, 
        damping: 10 
      }
    },
    tap: { 
      scale: 0.9,
      boxShadow: "0px 5px 10px rgba(79, 70, 229, 0.4)",
      transition: { 
        type: "spring", 
        stiffness: 400, 
        damping: 15 
      }
    }
  };

  const svgVariants = {
    initial: { rotate: 0 },
    animate: { rotate: 0 },
    hover: { rotate: 15, transition: { yoyo: Infinity, duration: 0.5 } }
  };

  return (
    <motion.button
      className="fixed bottom-6 right-6 z-50 flex h-16 w-16 items-center justify-center rounded-full bg-indigo-600 text-white shadow-lg hover:bg-indigo-700 focus:outline-none"
      onClick={onClick}
      variants={buttonVariants}
      initial="initial"
      animate="animate"
      whileHover="hover"
      whileTap="tap"
      aria-label={isOpen ? "Cerrar chat" : "Abrir chat"}
    >
      {isOpen ? (
        <motion.svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          initial={{ rotate: 45 }}
          animate={{ rotate: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </motion.svg>
      ) : (
        <motion.svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          variants={svgVariants}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
          />
        </motion.svg>
      )}
      <motion.span
        className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-green-500 text-xs font-bold text-white"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1, type: "spring" }}
      >
        1
      </motion.span>
    </motion.button>
  );
} 