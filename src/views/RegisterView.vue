<template>
  <div>
    <Navbar />
    <!-- Banner de descarga -->
    <section class="download-banner py-5 py-md-6 bg-primary position-relative">
      <div class="banner-overlay"></div>
      <div class="container position-relative">
        <div class="row min-vh-50 align-items-center py-5">
          <div class="col-lg-8 mx-auto text-center text-white">
            <h1 class="display-4 fw-bold mb-4">Conseguir Passwd</h1>
            <p class="lead mb-4 opacity-90">Descarga ahora y mantén todas tus contraseñas protegidas en un solo lugar</p>
            <div class="d-flex flex-wrap justify-content-center gap-3 mt-4">
              <a href="#download" class="btn btn-light btn-lg px-4 py-2 fw-semibold">Descargar ahora</a>
              <a href="#register" class="btn btn-outline-light btn-lg px-4 py-2 fw-semibold">Crear cuenta</a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Sección de plataformas -->
    <section id="download" class="py-5 py-md-6">
      <div class="container">
        <div class="row justify-content-center mb-5">
          <div class="col-lg-8 text-center">
            <h2 class="display-6 fw-bold mb-4">Disponible en todas tus plataformas</h2>
            <p class="lead text-muted">Passwd funciona en todos tus dispositivos para que siempre tengas acceso a tus contraseñas donde sea que estés.</p>
          </div>
        </div>

        <div class="row g-4 justify-content-center">
          <!-- Windows -->
          <div class="col-6 col-md-4 col-lg-3">
            <div class="card h-100 border-0 shadow-sm platform-card text-center">
              <div class="card-body p-4">
                <div class="platform-icon mb-4 mx-auto">
                  <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="currentColor" class="text-primary" viewBox="0 0 16 16">
                    <path d="M6.555 1.375 0 2.237v5.45h6.555V1.375zM0 13.795l6.555.933V8.313H0v5.482zm7.278-5.4.026 6.378L16 16V8.395H7.278zM16 0 7.33 1.244v6.414H16V0z"/>
                  </svg>
                </div>
                <h3 class="h5 fw-bold mb-3">Windows</h3>
                <p class="text-muted small mb-4">Para Windows 10 y 11</p>
                <a href="#" class="btn btn-primary w-100">Descargar</a>
                <small class="d-block text-muted mt-2">Versión 2.5.6</small>
              </div>
            </div>
          </div>

          <!-- macOS -->
          <div class="col-6 col-md-4 col-lg-3">
            <div class="card h-100 border-0 shadow-sm platform-card text-center">
              <div class="card-body p-4">
                <div class="platform-icon mb-4 mx-auto">
                  <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="currentColor" class="text-primary" viewBox="0 0 16 16">
                    <path d="M11.182.008C11.148-.03 9.923.023 8.857 1.18c-1.066 1.156-.902 2.482-.878 2.516.024.034 1.52.087 2.475-1.258.955-1.345.762-2.391.728-2.43Zm3.314 11.733c-.048-.096-2.325-1.234-2.113-3.422.212-2.189 1.675-2.789 1.698-2.854.023-.065-.597-.79-1.254-1.157a3.692 3.692 0 0 0-1.563-.434c-.108-.003-.483-.095-1.254.116-.508.139-1.653.589-1.968.607-.316.018-1.256-.522-2.267-.665-.647-.125-1.333.131-1.824.328-.49.196-1.422.754-2.074 2.237-.652 1.482-.311 3.83-.067 4.56.244.729.625 1.924 1.273 2.796.576.984 1.34 1.667 1.659 1.899.319.232 1.219.386 1.843.067.502-.308 1.408-.485 1.766-.472.357.013 1.061.154 1.782.539.571.197 1.111.115 1.652-.105.541-.221 1.324-1.059 2.238-2.758.347-.79.505-1.217.473-1.282Z"/>
                    <path d="M11.182.008C11.148-.03 9.923.023 8.857 1.18c-1.066 1.156-.902 2.482-.878 2.516.024.034 1.52.087 2.475-1.258.955-1.345.762-2.391.728-2.43Zm3.314 11.733c-.048-.096-2.325-1.234-2.113-3.422.212-2.189 1.675-2.789 1.698-2.854.023-.065-.597-.79-1.254-1.157a3.692 3.692 0 0 0-1.563-.434c-.108-.003-.483-.095-1.254.116-.508.139-1.653.589-1.968.607-.316.018-1.256-.522-2.267-.665-.647-.125-1.333.131-1.824.328-.49.196-1.422.754-2.074 2.237-.652 1.482-.311 3.83-.067 4.56.244.729.625 1.924 1.273 2.796.576.984 1.34 1.667 1.659 1.899.319.232 1.219.386 1.843.067.502-.308 1.408-.485 1.766-.472.357.013 1.061.154 1.782.539.571.197 1.111.115 1.652-.105.541-.221 1.324-1.059 2.238-2.758.347-.79.505-1.217.473-1.282Z"/>
                  </svg>
                </div>
                <h3 class="h5 fw-bold mb-3">macOS</h3>
                <p class="text-muted small mb-4">Para macOS 10.15+</p>
                <a href="#" class="btn btn-primary w-100">Descargar</a>
                <small class="d-block text-muted mt-2">Versión 2.5.6</small>
              </div>
            </div>
          </div>

          <!-- Linux -->
          <div class="col-6 col-md-4 col-lg-3">
            <div class="card h-100 border-0 shadow-sm platform-card text-center">
              <div class="card-body p-4">
                <div class="platform-icon mb-4 mx-auto">
                  <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="currentColor" class="text-primary" viewBox="0 0 16 16">
                    <path d="M3.05 3.05a7 7 0 0 0 0 9.9.5.5 0 0 1-.707.707 8 8 0 0 1 0-11.314.5.5 0 0 1 .707.707zm2.122-2.122a.5.5 0 0 1 .707 0 8 8 0 0 1 0 11.313.5.5 0 0 1-.707-.707 7 7 0 0 0 0-9.9.5.5 0 0 1 0-.707zM10 8a2 2 0 1 1-4 0 2 2 0 0 1 4 0z"/>
                    <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zm0 14A6 6 0 1 1 8 2a6 6 0 0 1 0 12z"/>
                  </svg>
                </div>
                <h3 class="h5 fw-bold mb-3">Linux</h3>
                <p class="text-muted small mb-4">Ubuntu, Debian, Fedora</p>
                <a href="#" class="btn btn-primary w-100">Descargar</a>
                <small class="d-block text-muted mt-2">Versión 2.5.6</small>
              </div>
            </div>
          </div>

          <!-- Mobile -->
          <div class="col-6 col-md-4 col-lg-3">
            <div class="card h-100 border-0 shadow-sm platform-card text-center">
              <div class="card-body p-4">
                <div class="platform-icon mb-4 mx-auto">
                  <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="currentColor" class="text-primary" viewBox="0 0 16 16">
                    <path d="M11 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h6zM5 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H5z"/>
                    <path d="M8 14a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/>
                  </svg>
                </div>
                <h3 class="h5 fw-bold mb-3">Móvil</h3>
                <p class="text-muted small mb-4">iOS y Android</p>
                <div class="d-flex gap-2">
                  <a href="#" class="btn btn-sm btn-primary w-50">App Store</a>
                  <a href="#" class="btn btn-sm btn-primary w-50">Play Store</a>
                </div>
                <small class="d-block text-muted mt-2">Versión 2.5.6</small>
              </div>
            </div>
          </div>

          <!-- Web -->
          <div class="col-6 col-md-4 col-lg-3">
            <div class="card h-100 border-0 shadow-sm platform-card text-center">
              <div class="card-body p-4">
                <div class="platform-icon mb-4 mx-auto">
                  <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="currentColor" class="text-primary" viewBox="0 0 16 16">
                    <path d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm7.5-6.923c-.67.204-1.335.82-1.887 1.855-.143.268-.276.56-.395.872.705.157 1.472.257 2.282.287V1.077zM4.249 3.539c.142-.384.304-.744.481-1.078a6.7 6.7 0 0 1 .597-.933A7.01 7.01 0 0 0 3.051 3.05c.362.184.763.349 1.198.49zM3.509 7.5c.036-1.07.188-2.087.436-3.008a9.124 9.124 0 0 1-1.565-.667A6.964 6.964 0 0 0 1.018 7.5h2.49zm1.4-2.741a12.344 12.344 0 0 0-.4 2.741H7.5V5.091c-.91-.03-1.783-.145-2.591-.332zM8.5 5.09V7.5h2.99a12.342 12.342 0 0 0-.399-2.741c-.808.187-1.681.301-2.591.332zM4.51 8.5c.035.987.176 1.914.399 2.741A13.612 13.612 0 0 1 7.5 10.91V8.5H4.51zm3.99 0v2.409c.91.03 1.783.145 2.591.332.223-.827.364-1.754.4-2.741H8.5zm-3.282 3.696c.12.312.252.604.395.872.552 1.035 1.218 1.65 1.887 1.855V11.91c-.81.03-1.577.13-2.282.287zm.11 2.276a6.696 6.696 0 0 1-.598-.933 8.853 8.853 0 0 1-.481-1.079 8.38 8.38 0 0 0-1.198.49 7.01 7.01 0 0 0 2.276 1.522zm-1.383-2.964A13.36 13.36 0 0 1 3.508 8.5h-2.49a6.963 6.963 0 0 0 1.362 3.675c.47-.258.995-.482 1.565-.667zm6.728 2.964a7.009 7.009 0 0 0 2.275-1.521 8.376 8.376 0 0 0-1.197-.49 8.853 8.853 0 0 1-.481 1.078 6.688 6.688 0 0 1-.597.933zM8.5 11.909v3.014c.67-.204 1.335-.82 1.887-1.855.143-.268.276-.56.395-.872A12.63 12.63 0 0 0 8.5 11.91zm3.555-.401c.57.185 1.095.409 1.565.667A6.963 6.963 0 0 0 14.982 8.5h-2.49a13.36 13.36 0 0 1-.437 3.008zM14.982 7.5a6.963 6.963 0 0 0-1.362-3.675c-.47.258-.995.482-1.565.667.248.92.4 1.938.437 3.008h2.49zM11.27 2.461c.177.334.339.694.482 1.078a8.368 8.368 0 0 0 1.196-.49 7.01 7.01 0 0 0-2.275-1.52c.218.283.418.597.597.932zm-.488 1.343a7.765 7.765 0 0 0-.395-.872C9.835 1.897 9.17 1.282 8.5 1.077V4.09c.81-.03 1.577-.13 2.282-.287z"/>
                  </svg>
                </div>
                <h3 class="h5 fw-bold mb-3">Web</h3>
                <p class="text-muted small mb-4">Accede desde cualquier navegador</p>
                <a href="#" class="btn btn-primary w-100">Iniciar en web</a>
                <small class="d-block text-muted mt-2">No requiere instalación</small>
              </div>
            </div>
          </div>

          <!-- Extensiones -->
          <div class="col-6 col-md-4 col-lg-3">
            <div class="card h-100 border-0 shadow-sm platform-card text-center">
              <div class="card-body p-4">
                <div class="platform-icon mb-4 mx-auto">
                  <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="currentColor" class="text-primary" viewBox="0 0 16 16">
                    <path d="M14 4.5V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h5.5L14 4.5zm-3 0A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V4.5h-2z"/>
                    <path d="M8.646 6.646a.5.5 0 0 1 .708 0l2 2a.5.5 0 0 1 0 .708l-2 2a.5.5 0 0 1-.708-.708L10.293 9 8.646 7.354a.5.5 0 0 1 0-.708zm-1.292 0a.5.5 0 0 0-.708 0l-2 2a.5.5 0 0 0 0 .708l2 2a.5.5 0 0 0 .708-.708L5.707 9l1.647-1.646a.5.5 0 0 0 0-.708z"/>
                  </svg>
                </div>
                <h3 class="h5 fw-bold mb-3">Extensiones</h3>
                <p class="text-muted small mb-4">Para Chrome, Firefox, Safari</p>
                <div class="d-flex gap-2 flex-wrap">
                  <a href="#" class="btn btn-sm btn-primary w-100">Chrome</a>
                  <a href="#" class="btn btn-sm btn-primary w-100">Firefox</a>
                </div>
                <small class="d-block text-muted mt-2">Autocompletado integrado</small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Capturas de pantalla -->
    <section class="py-5 py-md-6 bg-light">
      <div class="container">
        <div class="row justify-content-center mb-5">
          <div class="col-lg-8 text-center">
            <h2 class="display-6 fw-bold mb-4">Un vistazo a Passwd</h2>
            <p class="lead text-muted">Diseñado pensando en ti, con una interfaz intuitiva y fácil de usar.</p>
          </div>
        </div>

        <div class="row align-items-center">
          <div class="col-lg-7 mb-4 mb-lg-0">
            <div class="screenshot-container">
              <img src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" alt="Captura de Passwd" class="img-fluid rounded-4 shadow-lg screenshot-img">
              <!-- Podríamos reemplazar esto con una captura real de la aplicación -->
            </div>
          </div>
          <div class="col-lg-5">
            <div class="features-list">
              <div class="feature-item d-flex mb-4">
                <div class="feature-icon-alt me-3 flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="text-primary" viewBox="0 0 16 16">
                    <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
                    <path d="M10.97 4.97a.75.75 0 0 1 1.071 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.235.235 0 0 1 .02-.022z"/>
                  </svg>
                </div>
                <div>
                  <h3 class="h5 fw-bold mb-2">Diseño intuitivo</h3>
                  <p class="text-muted mb-0">Interfaz limpia y fácil de usar que te permite encontrar tus contraseñas rápidamente.</p>
                </div>
              </div>
              <div class="feature-item d-flex mb-4">
                <div class="feature-icon-alt me-3 flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="text-primary" viewBox="0 0 16 16">
                    <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
                    <path d="M10.97 4.97a.75.75 0 0 1 1.071 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.235.235 0 0 1 .02-.022z"/>
                  </svg>
                </div>
                <div>
                  <h3 class="h5 fw-bold mb-2">Organización por carpetas</h3>
                  <p class="text-muted mb-0">Organiza tus contraseñas por categorías y carpetas personalizadas para mantener todo en orden.</p>
                </div>
              </div>
              <div class="feature-item d-flex mb-4">
                <div class="feature-icon-alt me-3 flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="text-primary" viewBox="0 0 16 16">
                    <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
                    <path d="M10.97 4.97a.75.75 0 0 1 1.071 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.235.235 0 0 1 .02-.022z"/>
                  </svg>
                </div>
                <div>
                  <h3 class="h5 fw-bold mb-2">Búsqueda rápida</h3>
                  <p class="text-muted mb-0">Encuentra cualquier contraseña en segundos con nuestro potente sistema de búsqueda.</p>
                </div>
              </div>
              <div class="feature-item d-flex">
                <div class="feature-icon-alt me-3 flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="text-primary" viewBox="0 0 16 16">
                    <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
                    <path d="M10.97 4.97a.75.75 0 0 1 1.071 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.235.235 0 0 1 .02-.022z"/>
                  </svg>
                </div>
                <div>
                  <h3 class="h5 fw-bold mb-2">Sincronización automática</h3>
                  <p class="text-muted mb-0">Tus contraseñas se sincronizan automáticamente entre todos tus dispositivos.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Formulario de registro -->
    <section id="register" class="py-5 py-md-6">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-lg-8 text-center mb-5">
            <h2 class="display-6 fw-bold mb-4">Comienza gratis hoy mismo</h2>
            <p class="lead text-muted">Crear una cuenta te da acceso a 50 contraseñas y 2 dispositivos sin costo alguno.</p>
          </div>
        </div>

        <div class="row justify-content-center">
          <div class="col-md-8 col-lg-6">
            <div class="card border-0 shadow">
              <div class="card-body p-4 p-md-5">
                <form>
                  <div class="mb-4">
                    <label for="email" class="form-label fw-medium">Correo electrónico</label>
                    <input type="email" class="form-control form-control-lg" id="email" placeholder="tucorreo@ejemplo.com" required>
                  </div>
                  <div class="mb-4">
                    <label for="password" class="form-label fw-medium">Contraseña</label>
                    <input type="password" class="form-control form-control-lg" id="password" placeholder="Crea una contraseña segura" required>
                    <div class="form-text">Debe tener al menos 8 caracteres e incluir letras y números.</div>
                  </div>
                  <div class="mb-4">
                    <label for="confirm-password" class="form-label fw-medium">Confirmar contraseña</label>
                    <input type="password" class="form-control form-control-lg" id="confirm-password" placeholder="Confirma tu contraseña" required>
                  </div>
                  <div class="mb-4 form-check">
                    <input type="checkbox" class="form-check-input" id="terms" required>
                    <label class="form-check-label" for="terms">Acepto los <a href="#">Términos de servicio</a> y la <a href="#">Política de privacidad</a></label>
                  </div>
                  <button type="submit" class="btn btn-primary btn-lg w-100 mb-3">Crear cuenta gratis</button>
                  <p class="text-center text-muted mb-0">¿Ya tienes una cuenta? <a href="/login">Iniciar sesión</a></p>
                </form>
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
</script>

<style scoped>
.download-banner {
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

.platform-card {
  transition: all 0.3s ease;
}

.platform-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1) !important;
}

.platform-icon {
  width: 72px;
  height: 72px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(var(--primary-rgb), 0.1);
}

.feature-icon-alt {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(var(--primary-rgb), 0.1);
}

.screenshot-container {
  position: relative;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  border-radius: 1rem;
  overflow: hidden;
  transition: all 0.3s ease;
}

.screenshot-container:hover {
  transform: translateY(-10px);
  box-shadow: 0 30px 50px rgba(0, 0, 0, 0.15);
}

.screenshot-img {
  display: block;
  width: 100%;
  height: auto;
}

/* Estilos para el formulario */
.form-control:focus {
  border-color: rgba(var(--primary-rgb), 0.3);
  box-shadow: 0 0 0 0.25rem rgba(var(--primary-rgb), 0.15);
}

.form-check-input:checked {
  background-color: var(--primary-color);
  border-color: var(--primary-color);
}
</style> 