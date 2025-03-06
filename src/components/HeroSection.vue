<script setup lang="ts">
import { ref, onMounted } from 'vue';

const isLoaded = ref(false);

onMounted(() => {
  // Agregar una pequeña demora para asegurar que la animación se vea bien
  setTimeout(() => {
    isLoaded.value = true;
  }, 100);
});
</script>

<template>
  <section class="hero-section position-relative text-white overflow-hidden">
    <!-- Efectos visuales de fondo -->
    <div class="position-absolute start-0 top-0 w-100 h-100 overflow-hidden">
      <div class="position-absolute top-0 start-0 bg-primary rounded-circle effect-blur-1"></div>
      <div class="position-absolute bottom-0 end-0 bg-primary rounded-circle effect-blur-2"></div>
      <div class="position-absolute start-0 top-0 w-100 h-100 bg-grid-pattern opacity-5"></div>
    </div>

    <div class="container position-relative py-5 py-md-7" style="z-index: 10;">
      <div class="row align-items-center g-4 g-md-5">
        <div class="col-lg-6">
          <div class="content-block" :class="{'is-visible': isLoaded}">
            <h1 class="display-5 fw-bold mb-4">
              Protege tus contraseñas con Passwd
            </h1>
            <p class="lead mb-4 text-white-75 mb-5">
              Un gestor de contraseñas seguro y fácil de usar que te permite guardar, generar y administrar tus contraseñas desde cualquier dispositivo.
            </p>
            <div class="d-flex flex-wrap gap-3">
              <router-link to="/register" class="btn btn-light px-4 py-2 fw-semibold shadow-sm hover-lift">
                Comenzar Gratis
              </router-link>
              <router-link to="/features" class="btn btn-outline-light px-4 py-2 fw-semibold hover-lift">
                Ver Características
              </router-link>
            </div>
            <div class="mt-5 d-flex flex-wrap gap-3">
              <div class="d-flex align-items-center px-3 py-2 rounded-pill badge-feature">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="text-success me-2" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                </svg>
                <span class="small">Encriptación AES-256 bits</span>
              </div>
              <div class="d-flex align-items-center px-3 py-2 rounded-pill badge-feature">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="text-success me-2" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                </svg>
                <span class="small">Multiplataforma</span>
              </div>
            </div>
          </div>
        </div>
        <div class="col-lg-6">
          <div class="app-preview" :class="{'is-visible': isLoaded}">
            <div class="position-relative">
              <!-- Pantalla principal -->
              <div class="app-screen position-relative bg-white rounded shadow-lg overflow-hidden">
                <div class="p-1 bg-light">
                  <div class="rounded p-2 app-window">
                    <div class="d-flex align-items-center justify-content-between mb-2 px-2">
                      <div class="d-flex gap-1">
                        <div class="window-dot bg-danger"></div>
                        <div class="window-dot bg-warning"></div>
                        <div class="window-dot bg-success"></div>
                      </div>
                      <div class="text-muted small">Passwd</div>
                    </div>
                    <div class="bg-white rounded h-100 overflow-hidden">
                      <div class="bg-primary p-3 d-flex align-items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="me-2" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                        <span class="fw-medium small text-white">Mi bóveda de contraseñas</span>
                      </div>
                      <div class="p-3">
                        <!-- Lista de contraseñas -->
                        <div class="d-flex flex-column gap-2">
                          <div class="password-item p-2 border rounded">
                            <div class="d-flex align-items-center">
                              <div class="service-icon bg-primary-subtle text-primary me-3">G</div>
                              <div>
                                <div class="small fw-medium">Google</div>
                                <div class="x-small text-muted">usuario@gmail.com</div>
                              </div>
                            </div>
                          </div>
                          <div class="password-item p-2 border rounded">
                            <div class="d-flex align-items-center">
                              <div class="service-icon bg-indigo-subtle text-indigo me-3">D</div>
                              <div>
                                <div class="small fw-medium">Dropbox</div>
                                <div class="x-small text-muted">usuario@email.com</div>
                              </div>
                            </div>
                          </div>
                          <div class="password-item p-2 border rounded">
                            <div class="d-flex align-items-center">
                              <div class="service-icon bg-success-subtle text-success me-3">S</div>
                              <div>
                                <div class="small fw-medium">Spotify</div>
                                <div class="x-small text-muted">usuario@email.com</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <!-- Elementos decorativos -->
              <div class="position-absolute decorative-element-1"></div>
              <div class="position-absolute decorative-element-2"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero-section {
  padding-top: 6rem;
  background: linear-gradient(to bottom, var(--dark-color), #1c2741);
  min-height: 100vh;
  display: flex;
  align-items: center;
}

.effect-blur-1 {
  width: 300px;
  height: 300px;
  filter: blur(70px);
  opacity: 0.1;
  transform: translate(-50%, -50%);
}

.effect-blur-2 {
  width: 400px;
  height: 400px;
  filter: blur(80px);
  opacity: 0.1;
  transform: translate(30%, 30%);
}

.bg-grid-pattern {
  background-image: radial-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px);
  background-size: 20px 20px;
}

.badge-feature {
  background-color: rgba(41, 50, 82, 0.8);
  backdrop-filter: blur(4px);
}

.py-md-7 {
  padding-top: 6rem !important;
  padding-bottom: 6rem !important;
}

.text-white-75 {
  color: rgba(255, 255, 255, 0.75) !important;
}

.hover-lift {
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.hover-lift:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1);
}

.content-block {
  opacity: 0;
  transform: translateY(40px);
  transition: all 1s cubic-bezier(0.16, 1, 0.3, 1);
}

.app-preview {
  opacity: 0;
  transform: translateX(40px);
  transition: all 1s cubic-bezier(0.16, 1, 0.3, 1);
  transition-delay: 0.2s;
}

.is-visible {
  opacity: 1;
  transform: translate(0);
}

.app-screen {
  transform: rotate(2deg);
  max-width: 450px;
  margin: 0 auto;
}

.app-window {
  background-color: var(--black-color);
}

.window-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
}

.password-item {
  transition: all 0.2s ease;
  cursor: pointer;
}

.password-item:hover {
  background-color: rgba(0, 0, 0, 0.02);
}

.service-icon {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
}

.decorative-element-1 {
  bottom: -20px;
  left: -30px;
  width: 200px;
  height: 200px;
  background-color: var(--primary-color);
  border-radius: 1rem;
  opacity: 0.2;
  z-index: -1;
  transform: rotate(-10deg);
  filter: blur(20px);
}

.decorative-element-2 {
  top: -40px;
  right: -15px;
  width: 120px;
  height: 120px;
  background-color: var(--secondary-color);
  border-radius: 1rem;
  opacity: 0.2;
  z-index: -1;
  transform: rotate(15deg);
  filter: blur(15px);
}

.bg-indigo-subtle {
  background-color: #e0e7ff;
}

.text-indigo {
  color: #4f46e5;
}

/* Responsive styling */
@media (max-width: 991.98px) {
  .hero-section {
    padding-top: 5rem;
    text-align: center;
  }
  
  .content-block {
    margin-bottom: 3rem;
  }
  
  .d-flex.flex-wrap {
    justify-content: center;
  }
}

.x-small {
  font-size: 0.75rem;
}
</style> 