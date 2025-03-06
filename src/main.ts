// Importamos nuestro CSS principal
import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

// Creamos la aplicación
const app = createApp(App)

// Usamos Pinia y Router
app.use(createPinia())
app.use(router)

// Montamos la aplicación
app.mount('#app')
