import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAppStore = defineStore('app', () => {
  // Estado
  const isDarkMode = ref(false)
  const isLoggedIn = ref(false)
  const user = ref(null)
  
  // Acciones
  function toggleDarkMode() {
    isDarkMode.value = !isDarkMode.value
  }
  
  function login(userData: any) {
    isLoggedIn.value = true
    user.value = userData
  }
  
  function logout() {
    isLoggedIn.value = false
    user.value = null
  }
  
  return {
    // Estado
    isDarkMode,
    isLoggedIn,
    user,
    
    // Acciones
    toggleDarkMode,
    login,
    logout
  }
}) 