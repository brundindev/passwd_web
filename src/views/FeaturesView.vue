<template>
  <div>
    <Navbar />
    <!-- Banner principal -->
    <section class="features-banner py-5 py-md-6 bg-primary position-relative">
      <div class="banner-overlay"></div>
      <div class="container position-relative">
        <div class="row min-vh-50 align-items-center py-5">
          <div class="col-lg-8 mx-auto text-center text-white">
            <h1 class="display-4 fw-bold mb-4">Características Avanzadas</h1>
            <p class="lead mb-4 opacity-90">Descubre todas las herramientas que Passwd ofrece para mantener tus contraseñas seguras y tu identidad protegida.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Sección de características -->
    <FeaturesSection />

    <!-- Sección de características adicionales -->
    <section class="py-5 py-md-6 bg-light">
      <div class="container">
        <div class="row justify-content-center mb-5">
          <div class="col-lg-8 text-center">
            <h2 class="display-6 fw-bold mb-4">Más allá de la gestión de contraseñas</h2>
            <p class="lead text-muted">Passwd no solo guarda tus contraseñas, sino que también proporciona herramientas avanzadas para tu seguridad digital.</p>
          </div>
        </div>

        <div class="row g-4">
          <div class="col-md-6">
            <div class="card h-100 border-0 shadow-sm">
              <div class="card-body p-4 p-lg-5">
                <div class="feature-icon-alt mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="text-primary" viewBox="0 0 24 24">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                  </svg>
                </div>
                <h3 class="h4 fw-bold mb-3">Análisis de Violaciones de Datos</h3>
                <p class="text-muted mb-0">Recibe alertas instantáneas si tus datos personales aparecen en filtraciones de seguridad y toma medidas inmediatas para proteger tus cuentas.</p>
              </div>
            </div>
          </div>
          <div class="col-md-6">
            <div class="card h-100 border-0 shadow-sm">
              <div class="card-body p-4 p-lg-5">
                <div class="feature-icon-alt mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="text-primary" viewBox="0 0 24 24">
                    <path d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0 2c-4.411 0-8 3.589-8 8s3.589 8 8 8 8-3.589 8-8-3.589-8-8-8zm.5 3v5.5h3.5v2h-5.5v-7.5z"/>
                  </svg>
                </div>
                <h3 class="h4 fw-bold mb-3">Recordatorios de Cambio de Contraseña</h3>
                <p class="text-muted mb-0">Configura recordatorios para actualizar regularmente tus contraseñas críticas, manteniendo tus cuentas protegidas con credenciales frescas.</p>
              </div>
            </div>
          </div>
          <div class="col-md-6 mt-4">
            <div class="card h-100 border-0 shadow-sm">
              <div class="card-body p-4 p-lg-5">
                <div class="feature-icon-alt mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="text-primary" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM6.5 9L10 5.5 13.5 9H11v4H9V9H6.5zm11 6L14 18.5 10.5 15H13v-4h2v4h2.5z"/>
                  </svg>
                </div>
                <h3 class="h4 fw-bold mb-3">Compartir Contraseñas de Forma Segura</h3>
                <p class="text-muted mb-0">Comparte credenciales con familiares o miembros del equipo sin comprometer la seguridad, con opciones de permisos personalizables y caducidad automática.</p>
              </div>
            </div>
          </div>
          <div class="col-md-6 mt-4">
            <div class="card h-100 border-0 shadow-sm">
              <div class="card-body p-4 p-lg-5">
                <div class="feature-icon-alt mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="text-primary" viewBox="0 0 24 24">
                    <path d="M12 22c5.421 0 10-4.579 10-10h-2c0 4.337-3.663 8-8 8s-8-3.663-8-8c0-4.336 3.663-8 8-8V2C6.579 2 2 6.58 2 12c0 5.421 4.579 10 10 10z"/>
                  </svg>
                </div>
                <h3 class="h4 fw-bold mb-3">Copias de Seguridad Automáticas</h3>
                <p class="text-muted mb-0">Nunca pierdas tus contraseñas con nuestro sistema de copias de seguridad automáticas encriptadas, que mantiene tus datos seguros incluso si pierdes tu dispositivo.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <FooterSection />
  </div>
</template>

<script setup lang="ts">
import Navbar from '@/components/Navbar.vue';
import FooterSection from '@/components/FooterSection.vue';
import FeaturesSection from '@/components/FeaturesSection.vue';
</script>

<style scoped>
.features-banner {
  background: linear-gradient(135deg, var(--primary-color), var(--primary-dark));
  position: relative;
  overflow: hidden;
}

.banner-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url("data:image/svg+xml,%3Csvg width='20' height='20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h20v20H0z' fill='%23ffffff' fill-opacity='0.05'/%3E%3C/svg%3E");
  opacity: 0.1;
}

.min-vh-50 {
  min-height: 50vh;
}

.opacity-90 {
  opacity: 0.9;
}

.feature-icon-alt {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(var(--primary-rgb), 0.1);
}

/* Estilo para el hover de las tarjetas */
.card {
  transition: all 0.3s ease;
}

.card:hover {
  transform: translateY(-5px);
}
</style> 