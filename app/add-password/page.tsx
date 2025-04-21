"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { getFirestore, collection, addDoc, serverTimestamp } from "firebase/firestore";
import { authService } from "@/lib/firebase/firebase";

export default function AddPassword() {
  const [formData, setFormData] = useState({
    website: "",
    url: "",
    username: "",
    password: "",
    category: "",
    notes: ""
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  // Verificar que el usuario está autenticado
  useEffect(() => {
    const checkAuth = async () => {
      const user = authService.auth.currentUser;
      if (!user) {
        router.push("/signin");
      }
    };
    
    checkAuth();
  }, [router]);

  // Manejar cambios en los campos del formulario
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Evaluar fuerza de contraseña cuando cambia el campo password
    if (name === "password") {
      evaluatePasswordStrength(value);
    }
  };

  // Evaluar la fuerza de la contraseña
  const evaluatePasswordStrength = (password: string) => {
    let strength = 0;
    
    if (password.length >= 8) strength += 1;
    if (password.length >= 12) strength += 1;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[a-z]/.test(password)) strength += 1;
    if (/[0-9]/.test(password)) strength += 1;
    if (/[^A-Za-z0-9]/.test(password)) strength += 1;
    
    setPasswordStrength(strength);
  };

  // Generar una contraseña segura
  const generateSecurePassword = () => {
    setIsGenerating(true);
    
    // Definir conjuntos de caracteres
    const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
    const numberChars = "0123456789";
    const specialChars = "!@#$%^&*()_+{}[]|:;<>,.?/~";
    
    // Combinar todos los conjuntos
    const allChars = uppercaseChars + lowercaseChars + numberChars + specialChars;
    
    // Generar contraseña de 16 caracteres
    let generatedPassword = "";
    
    // Asegurar que hay al menos uno de cada tipo
    generatedPassword += uppercaseChars.charAt(Math.floor(Math.random() * uppercaseChars.length));
    generatedPassword += lowercaseChars.charAt(Math.floor(Math.random() * lowercaseChars.length));
    generatedPassword += numberChars.charAt(Math.floor(Math.random() * numberChars.length));
    generatedPassword += specialChars.charAt(Math.floor(Math.random() * specialChars.length));
    
    // Completar el resto de caracteres
    for (let i = 0; i < 12; i++) {
      generatedPassword += allChars.charAt(Math.floor(Math.random() * allChars.length));
    }
    
    // Mezclar los caracteres
    generatedPassword = generatedPassword
      .split('')
      .sort(() => 0.5 - Math.random())
      .join('');
    
    setFormData(prev => ({
      ...prev,
      password: generatedPassword
    }));
    
    evaluatePasswordStrength(generatedPassword);
    setShowPassword(true);
    setIsGenerating(false);
  };

  // Enviar el formulario
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      const user = authService.auth.currentUser;
      if (!user) {
        throw new Error("Debes iniciar sesión para guardar una contraseña");
      }
      
      // Validaciones básicas
      if (!formData.website.trim()) {
        throw new Error("El nombre del sitio web es obligatorio");
      }
      
      if (!formData.username.trim()) {
        throw new Error("El nombre de usuario es obligatorio");
      }
      
      if (!formData.password.trim()) {
        throw new Error("La contraseña es obligatoria");
      }
      
      if (!formData.url.trim().startsWith("http")) {
        // Añadir https:// si no se proporciona
        formData.url = "https://" + formData.url.trim();
      }
      
      // Guardar en Firestore
      const db = getFirestore();
      const passwordsCollection = collection(db, "passwords");
      
      await addDoc(passwordsCollection, {
        userId: user.uid,
        website: formData.website.trim(),
        url: formData.url.trim(),
        username: formData.username.trim(),
        password: formData.password,
        category: formData.category.trim() || "General",
        notes: formData.notes.trim(),
        createdAt: serverTimestamp()
      });
      
      // Redirigir a la lista de contraseñas
      router.push("/passwords");
    } catch (error: any) {
      console.error("Error al guardar la contraseña:", error);
      setError(error.message || "Ocurrió un error al guardar la contraseña");
      setLoading(false);
    }
  };

  // Obtener color según la fuerza de la contraseña
  const getPasswordStrengthColor = () => {
    if (passwordStrength <= 2) return "bg-red-500";
    if (passwordStrength <= 4) return "bg-yellow-500";
    return "bg-green-500";
  };

  return (
    <div className="pt-24 px-4 md:px-6 max-w-3xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Añadir Nueva Contraseña</h1>
        <p className="text-gray-400">Guarda una nueva contraseña de forma segura en tu bóveda</p>
      </div>

      {error && (
        <div className="mb-6 bg-red-500/10 text-red-500 p-4 rounded-lg border border-red-500/30">
          {error}
        </div>
      )}

      <motion.div 
        className="bg-gray-800/50 rounded-lg p-6 border border-gray-700"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <form onSubmit={handleSubmit}>
          <div className="grid gap-6 mb-6 md:grid-cols-2">
            {/* Sitio web */}
            <div>
              <label htmlFor="website" className="block mb-2 text-sm font-medium text-white">
                Sitio web <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="website"
                name="website"
                className="bg-gray-700 border border-gray-600 text-white text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5"
                placeholder="Google"
                required
                value={formData.website}
                onChange={handleChange}
              />
            </div>
            
            {/* URL */}
            <div>
              <label htmlFor="url" className="block mb-2 text-sm font-medium text-white">
                URL <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="url"
                name="url"
                className="bg-gray-700 border border-gray-600 text-white text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5"
                placeholder="google.com"
                required
                value={formData.url}
                onChange={handleChange}
              />
            </div>
          </div>
          
          {/* Usuario */}
          <div className="mb-6">
            <label htmlFor="username" className="block mb-2 text-sm font-medium text-white">
              Usuario / Email <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="username"
              name="username"
              className="bg-gray-700 border border-gray-600 text-white text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5"
              placeholder="ejemplo@gmail.com"
              required
              value={formData.username}
              onChange={handleChange}
            />
          </div>
          
          {/* Contraseña */}
          <div className="mb-6">
            <label htmlFor="password" className="block mb-2 text-sm font-medium text-white">
              Contraseña <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                className="bg-gray-700 border border-gray-600 text-white text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 pr-20"
                required
                value={formData.password}
                onChange={handleChange}
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 gap-2">
                <button
                  type="button"
                  className="text-gray-400 hover:text-indigo-400 focus:outline-none"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d={showPassword 
                        ? "M13.875 18.825A10.05 10.05 0 0112 19c-2.891 0-5.6-1.214-7.5-3.345m15 0A9.51 9.51 0 0121 12c0-2.391-1.314-4.5-3.375-6.345M8.625 4.155A10.05 10.05 0 0112 4c4.418 0 8 3.526 8 8 0 1.374-.36 2.654-.954 3.82L8.625 4.155z M19.542 21.542A17.92 17.92 0 0112 23c-4.418 0-8-3.526-8-8c0-1.374.36-2.654.954-3.82l11.79 11.79a18.12 18.12 0 002.798-1.428z M3 3l18 18" 
                        : "M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      } 
                    />
                  </svg>
                </button>
              </div>
            </div>
            
            {/* Indicador de fuerza */}
            {formData.password && (
              <div className="mt-2">
                <div className="flex items-center gap-2 mb-1">
                  <div className="h-2 flex-1 bg-gray-700 rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${getPasswordStrengthColor()}`} 
                      style={{ width: `${(passwordStrength / 6) * 100}%` }}
                    ></div>
                  </div>
                  <span className="text-xs text-gray-400">
                    {passwordStrength <= 2 ? "Débil" : passwordStrength <= 4 ? "Media" : "Fuerte"}
                  </span>
                </div>
              </div>
            )}
            
            <div className="mt-3">
              <button
                type="button"
                className="text-sm text-indigo-400 hover:text-indigo-300 flex items-center"
                onClick={generateSecurePassword}
                disabled={isGenerating}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                {isGenerating ? "Generando..." : "Generar contraseña segura"}
              </button>
            </div>
          </div>
          
          <div className="grid gap-6 mb-6 md:grid-cols-2">
            {/* Categoría */}
            <div>
              <label htmlFor="category" className="block mb-2 text-sm font-medium text-white">
                Categoría
              </label>
              <select
                id="category"
                name="category"
                className="bg-gray-700 border border-gray-600 text-white text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5"
                value={formData.category}
                onChange={handleChange}
              >
                <option value="General">General</option>
                <option value="Trabajo">Trabajo</option>
                <option value="Personal">Personal</option>
                <option value="Finanzas">Finanzas</option>
                <option value="Redes Sociales">Redes Sociales</option>
                <option value="Entretenimiento">Entretenimiento</option>
                <option value="Educación">Educación</option>
                <option value="Otro">Otro</option>
              </select>
            </div>
          </div>
          
          {/* Notas */}
          <div className="mb-6">
            <label htmlFor="notes" className="block mb-2 text-sm font-medium text-white">
              Notas adicionales
            </label>
            <textarea
              id="notes"
              name="notes"
              rows={3}
              className="bg-gray-700 border border-gray-600 text-white text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5"
              placeholder="Información adicional sobre esta cuenta..."
              value={formData.notes}
              onChange={handleChange}
            ></textarea>
          </div>
          
          <div className="flex justify-end gap-4">
            <button
              type="button"
              className="bg-gray-600 text-white py-2 px-6 rounded-lg hover:bg-gray-700 transition-colors"
              onClick={() => router.push("/passwords")}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="bg-indigo-600 text-white py-2 px-6 rounded-lg hover:bg-indigo-700 transition-colors flex items-center"
              disabled={loading}
            >
              {loading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Guardando...
                </>
              ) : (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Guardar contraseña
                </>
              )}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
} 