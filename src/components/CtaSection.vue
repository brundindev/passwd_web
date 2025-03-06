<script setup lang="ts">
import { ref, onMounted } from 'vue';

const isLoaded = ref(false);

onMounted(() => {
  // Agregar una pequeña demora para asegurar que la animación se vea bien
  setTimeout(() => {
    isLoaded.value = true;
  }, 200);
});
</script>

<template>
  <section class="cta-section position-relative py-5 py-md-7 overflow-hidden">
    <!-- Fondo con gradiente y elementos decorativos -->
    <div class="position-absolute start-0 top-0 w-100 h-100 cta-bg overflow-hidden">
      <!-- Elementos decorativos de fondo -->
      <div class="position-absolute top-0 end-0 cta-blob-1"></div>
      <div class="position-absolute bottom-0 start-0 cta-blob-2"></div>
      <!-- Patrón de fondo -->
      <div class="position-absolute start-0 top-0 w-100 h-100 bg-grid-pattern opacity-15"></div>
    </div>

    <div class="container position-relative py-4">
      <div class="row justify-content-center">
        <div class="col-lg-9">
          <div class="text-center cta-content" :class="{'is-visible': isLoaded}">
            <h2 class="display-5 fw-bold mb-4 text-white">
              Protege tus contraseñas hoy mismo
            </h2>
            <p class="lead mb-5 text-white-90 mx-auto" style="max-width: 800px;">
              Únete a miles de personas que ya confían en Passwd para proteger su información más valiosa. Comienza gratis y mejora tu seguridad en línea.
            </p>
            <div class="d-flex flex-wrap justify-content-center gap-3 mb-5">
              <router-link to="/register" class="btn btn-light px-4 py-2 fw-semibold shadow-sm hover-lift">
                Comenzar Gratis
              </router-link>
              <router-link to="/pricing" class="btn btn-outline-light px-4 py-2 fw-semibold hover-lift">
                Ver Planes
              </router-link>
            </div>
            <div class="d-inline-flex align-items-center justify-content-center rounded-pill px-4 py-2 badge-feature">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="text-success me-2" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
              </svg>
              <span class="small text-white">Sin tarjeta de crédito requerida</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.cta-section {
  min-height: 60vh;
  display: flex;
  align-items: center;
}

.cta-bg {
  background: linear-gradient(to right, #173a7e, #175ddc);
  z-index: -10;
}

.cta-blob-1 {
  width: 600px;
  height: 600px;
  border-radius: 50%;
  background-color: white;
  opacity: 0.1;
  transform: translate(30%, -50%);
  filter: blur(70px);
}

.cta-blob-2 {
  width: 400px;
  height: 400px;
  border-radius: 50%;
  background-color: white;
  opacity: 0.1;
  transform: translate(-30%, 50%);
  filter: blur(70px);
}

.py-md-7 {
  padding-top: 6rem !important;
  padding-bottom: 6rem !important;
}

.text-white-90 {
  color: rgba(255, 255, 255, 0.9) !important;
}

.opacity-15 {
  opacity: 0.15;
}

.bg-grid-pattern {
  background-image: radial-gradient(rgba(255, 255, 255, 0.5) 1px, transparent 1px);
  background-size: 20px 20px;
}

.badge-feature {
  background-color: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(4px);
}

.hover-lift {
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.hover-lift:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1);
}

.cta-content {
  opacity: 0;
  transform: translateY(30px);
  transition: all 1s cubic-bezier(0.16, 1, 0.3, 1);
}

.is-visible {
  opacity: 1;
  transform: translateY(0);
}
</style> 