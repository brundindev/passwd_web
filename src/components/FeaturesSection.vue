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
  <section class="features-section py-6 py-md-7 position-relative overflow-hidden">
    <!-- Efectos de fondo -->
    <div class="position-absolute start-0 top-0 w-100 h-100 overflow-hidden">
      <div class="position-absolute top-0 end-0 bg-primary effect-blob-1"></div>
      <div class="position-absolute bottom-0 start-0 bg-primary effect-blob-2"></div>
    </div>

    <div class="container position-relative py-3">
      <div class="text-center mb-5 mb-md-7 title-section" :class="{'is-visible': isLoaded}">
        <h2 class="display-5 fw-bold mb-4">
          Características poderosas para mantener<br class="d-none d-md-block" /> tus contraseñas seguras
        </h2>
        <p class="lead text-muted mx-auto" style="max-width: 800px;">
          Passwd no solo guarda tus contraseñas, sino que también las protege con la tecnología más avanzada y te ayuda a mantener tu seguridad en línea.
        </p>
      </div>

      <div class="row g-4">
        <!-- Feature 1 -->
        <div class="col-md-6 col-lg-4">
          <div class="feature-card" style="--delay: 0.1s" :class="{'is-visible': isLoaded}">
            <div class="feature-icon mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" class="text-white" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h3 class="fw-bold mb-3 h5">Encriptación de nivel militar</h3>
            <p class="text-muted">
              Tus datos están protegidos con encriptación AES-256 bits, el mismo estándar utilizado por los gobiernos para proteger información clasificada.
            </p>
          </div>
        </div>

        <!-- Feature 2 -->
        <div class="col-md-6 col-lg-4">
          <div class="feature-card" style="--delay: 0.2s" :class="{'is-visible': isLoaded}">
            <div class="feature-icon mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" class="text-white" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 class="fw-bold mb-3 h5">Generador de contraseñas</h3>
            <p class="text-muted">
              Crea contraseñas fuertes y únicas para cada servicio con nuestro generador avanzado que te permite personalizar la longitud y complejidad.
            </p>
          </div>
        </div>

        <!-- Feature 3 -->
        <div class="col-md-6 col-lg-4">
          <div class="feature-card" style="--delay: 0.3s" :class="{'is-visible': isLoaded}">
            <div class="feature-icon mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" class="text-white" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <h3 class="fw-bold mb-3 h5">Autocompletado inteligente</h3>
            <p class="text-muted">
              Rellena formularios y accede a tus cuentas con un solo clic, sin necesidad de recordar ni copiar y pegar tus credenciales.
            </p>
          </div>
        </div>

        <!-- Feature 4 -->
        <div class="col-md-6 col-lg-4">
          <div class="feature-card" style="--delay: 0.4s" :class="{'is-visible': isLoaded}">
            <div class="feature-icon mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" class="text-white" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 class="fw-bold mb-3 h5">Sincronización multiplataforma</h3>
            <p class="text-muted">
              Accede a tus contraseñas desde cualquier dispositivo con nuestras aplicaciones para iOS, Android, Windows, macOS y Linux.
            </p>
          </div>
        </div>

        <!-- Feature 5 -->
        <div class="col-md-6 col-lg-4">
          <div class="feature-card" style="--delay: 0.5s" :class="{'is-visible': isLoaded}">
            <div class="feature-icon mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" class="text-white" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" />
              </svg>
            </div>
            <h3 class="fw-bold mb-3 h5">Autenticación biométrica</h3>
            <p class="text-muted">
              Desbloquea tu bóveda con tu huella dactilar o reconocimiento facial para mayor seguridad y comodidad en dispositivos compatibles.
            </p>
          </div>
        </div>

        <!-- Feature 6 -->
        <div class="col-md-6 col-lg-4">
          <div class="feature-card" style="--delay: 0.6s" :class="{'is-visible': isLoaded}">
            <div class="feature-icon mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" class="text-white" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m-6-8h6M5 5h14a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2z" />
              </svg>
            </div>
            <h3 class="fw-bold mb-3 h5">Auditoría de seguridad</h3>
            <p class="text-muted">
              Identifica contraseñas débiles, duplicadas o comprometidas y recibe recomendaciones para mejorar tu seguridad en línea.
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.features-section {
  background-color: var(--light-color);
}

.mb-md-7 {
  margin-bottom: 6rem !important;
}

.py-md-7 {
  padding-top: 6rem !important;
  padding-bottom: 6rem !important;
}

.effect-blob-1 {
  width: 600px;
  height: 600px;
  border-radius: 50%;
  filter: blur(100px);
  opacity: 0.03;
  transform: translate(30%, -50%);
}

.effect-blob-2 {
  width: 500px;
  height: 500px;
  border-radius: 50%;
  filter: blur(100px);
  opacity: 0.03;
  transform: translate(-30%, 30%);
}

.title-section {
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1);
}

.feature-card {
  padding: 2rem;
  background-color: white;
  border-radius: 1rem;
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.05), 0 10px 10px -5px rgba(0, 0, 0, 0.02);
  border: 1px solid rgba(229, 231, 235, 0.7);
  transition: all 0.4s ease;
  opacity: 0;
  transform: translateY(30px);
  transition-delay: var(--delay, 0s);
}

.feature-card:hover {
  box-shadow: 0 20px 30px -10px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  transform: translateY(-5px);
  border-color: rgba(23, 93, 220, 0.2);
}

.feature-icon {
  width: 56px;
  height: 56px;
  border-radius: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(to bottom right, var(--primary-color), var(--primary-dark));
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.12);
}

.is-visible {
  opacity: 1;
  transform: translateY(0);
}
</style> 