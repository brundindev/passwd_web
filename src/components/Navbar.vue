<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

const isMobileMenuOpen = ref(false);
const isScrolled = ref(false);

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
};

const checkScroll = () => {
  isScrolled.value = window.scrollY > 10;
};

onMounted(() => {
  window.addEventListener('scroll', checkScroll);
  checkScroll(); // Check initial state
});

onUnmounted(() => {
  window.removeEventListener('scroll', checkScroll);
});
</script>

<template>
  <header :class="['fixed-top', 'transition', isScrolled ? 'bg-white shadow-sm border-bottom' : 'bg-transparent']">
    <div class="container">
      <nav class="navbar navbar-expand-lg py-2">
        <div class="container-fluid px-0">
          <!-- Logo -->
          <router-link class="navbar-brand d-flex align-items-center" to="/">
            <div class="d-flex align-items-center justify-content-center rounded me-2 logo-container">
              <img src="../assets/logo_passwd.JPEG" alt="Logo" class="img-fluid" style="width: 100%; height: 100%; object-fit: cover;">
            </div>
            <span class="fw-bold" :class="isScrolled ? 'text-dark' : 'text-white'">Passwd.</span>
          </router-link>

          <!-- Botón de hamburguesa para móvil -->
          <button 
            class="navbar-toggler border-0" 
            type="button" 
            @click="toggleMobileMenu"
            :class="isScrolled ? 'text-dark' : 'text-white'"
          >
            <span v-if="!isMobileMenuOpen">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </span>
            <span v-else>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </span>
          </button>

          <!-- Menú de navegación -->
          <div class="collapse navbar-collapse" :class="{ 'show': isMobileMenuOpen }">
            <ul class="navbar-nav ms-auto mb-2 mb-lg-0 align-items-center">
              <li class="nav-item mx-lg-2">
                <router-link 
                  to="/features" 
                  class="nav-link position-relative fw-medium" 
                  :class="isScrolled ? 'text-dark' : 'text-white opacity-75'"
                >
                  Características
                </router-link>
              </li>
              <li class="nav-item mx-lg-2">
                <router-link 
                  to="/pricing" 
                  class="nav-link position-relative fw-medium" 
                  :class="isScrolled ? 'text-dark' : 'text-white opacity-75'"
                >
                  Precios
                </router-link>
              </li>
              <li class="nav-item mx-lg-2">
                <router-link 
                  to="/about" 
                  class="nav-link position-relative fw-medium" 
                  :class="isScrolled ? 'text-dark' : 'text-white opacity-75'"
                >
                  Nosotros
                </router-link>
              </li>
              <li class="nav-item mx-lg-2">
                <router-link 
                  to="/blog" 
                  class="nav-link position-relative fw-medium" 
                  :class="isScrolled ? 'text-dark' : 'text-white opacity-75'"
                >
                  Blog
                </router-link>
              </li>
              <li class="nav-item ms-lg-2">
                <router-link 
                  to="/register" 
                  class="btn btn-sm rounded-3 px-4 py-2 fw-semibold shadow-sm"
                  :class="isScrolled ? 'btn-primary text-white' : 'btn-outline-light'"
                >
                  Conseguir Passwd
                </router-link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  </header>
</template>

<style scoped>
.transition {
  transition: all 0.3s ease-in-out;
}

.logo-container {
  width: 36px;
  height: 36px;
  background: linear-gradient(to bottom right, var(--primary-color), var(--primary-dark));
}

/* Personalización de enlaces de navegación */
.nav-link {
  font-weight: 500;
  font-size: 0.875rem;
  transition: all 0.3s;
  padding-bottom: 2px;
}

.nav-link::after {
  content: '';
  position: absolute;
  width: 0;
  height: 2px;
  bottom: -4px;
  left: 0;
  background-color: var(--primary-color);
  transition: width 0.3s ease;
}

.nav-link:hover::after {
  width: 100%;
}

.nav-link:hover {
  color: var(--primary-color) !important;
}

/* Animación del menú móvil */
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
}

.navbar-collapse.show {
  animation: fadeIn 0.3s ease-out forwards;
}

@media (max-width: 991.98px) {
  .navbar-collapse {
    background-color: white;
    padding: 1rem;
    margin-top: 1rem;
    border-radius: 0.5rem;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  }
  
  .navbar-nav .nav-link {
    color: var(--black-color) !important;
    padding: 0.75rem 1rem;
    border-left: 2px solid transparent;
  }
  
  .navbar-nav .nav-link:hover {
    border-left: 2px solid var(--primary-color);
    padding-left: 1.25rem;
  }
  
  .navbar-nav .nav-item:last-child {
    margin-top: 1rem;
    padding-top: 1rem;
    border-top: 1px solid #eee;
  }
  
  .navbar-nav .btn {
    display: block;
    width: 100%;
  }
}
</style> 