<template>
  <div>
    <Navbar />
    <!-- Banner del Blog -->
    <section class="blog-banner py-5 py-md-6 bg-primary position-relative">
      <div class="banner-overlay"></div>
      <div class="container position-relative">
        <div class="row min-vh-50 align-items-center py-5">
          <div class="col-lg-8 mx-auto text-center text-white">
            <h1 class="display-4 fw-bold mb-4">Blog de Seguridad</h1>
            <p class="lead mb-4 opacity-90">Consejos, noticias y guías para mantener tu información segura en el mundo digital.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Sección de blog -->
    <section class="py-5 py-md-6">
      <div class="container">
        <div class="row">
          <!-- Columna principal: artículos -->
          <div class="col-lg-8">
            <!-- Artículo destacado -->
            <div class="card border-0 shadow-sm overflow-hidden mb-5 featured-post">
              <div class="ratio ratio-16x9">
                <img src="https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" class="card-img-top" alt="Imagen del artículo destacado">
              </div>
              <div class="card-body p-4 p-lg-5">
                <div class="d-flex align-items-center mb-3">
                  <span class="badge bg-primary-subtle text-primary me-2">Seguridad</span>
                  <small class="text-muted">3 Mayo, 2025</small>
                </div>
                <h2 class="card-title h3 fw-bold mb-3">
                  <a href="#" class="text-decoration-none text-dark stretched-link">
                    Cómo protegerte contra los ataques de phishing más sofisticados de 2023
                  </a>
                </h2>
                <p class="card-text text-muted mb-3">Los ataques de phishing han evolucionado significativamente en el último año. Aprende a identificar las nuevas técnicas y a protegerte contra ellas con estos consejos prácticos de nuestros expertos en seguridad.</p>
                <div class="d-flex align-items-center">
                  <img src="../assets/logo_passwd.JPEG" alt="Autor" class="rounded-circle me-3" width="40" height="40">
                  <div>
                    <h6 class="fw-semibold mb-0">Alejandro Jiménez Brundin</h6>
                    <small class="text-muted">CEO de Passwd</small>
                  </div>
                </div>
              </div>
            </div>

            <!-- Lista de artículos -->
            <div class="row g-4">
              <!-- Artículo 1 -->
              <div class="col-md-6">
                <div class="card h-100 border-0 shadow-sm blog-card">
                  <img src="https://images.unsplash.com/photo-1573164713988-8665fc963095?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" class="card-img-top" alt="Imagen del artículo">
                  <div class="card-body p-4">
                    <div class="d-flex align-items-center mb-3">
                      <span class="badge bg-primary-subtle text-primary me-2">Guías</span>
                      <small class="text-muted">28 Abril, 2025</small>
                    </div>
                    <h3 class="card-title h5 fw-bold mb-3">
                      <a href="#" class="text-decoration-none text-dark stretched-link">
                        5 pasos para crear contraseñas seguras que puedas recordar
                      </a>
                    </h3>
                    <p class="card-text text-muted small">Aprende a crear contraseñas robustas sin depender de frases imposibles de recordar con este método práctico para el día a día.</p>
                  </div>
                  <div class="card-footer bg-white border-0 pt-0">
                    <div class="d-flex align-items-center">
                      <img src="../assets/logo_passwd.JPEG" alt="Autor" class="rounded-circle me-2" width="30" height="30">
                      <small class="text-muted">Alejandro Jiménez Brundin</small>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Artículo 2 -->
              <div class="col-md-6">
                <div class="card h-100 border-0 shadow-sm blog-card">
                  <img src="https://images.unsplash.com/photo-1496096265110-f83ad7f96608?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" class="card-img-top" alt="Imagen del artículo">
                  <div class="card-body p-4">
                    <div class="d-flex align-items-center mb-3">
                      <span class="badge bg-danger-subtle text-danger me-2">Alertas</span>
                      <small class="text-muted">21 Abril, 2025</small>
                    </div>
                    <h3 class="card-title h5 fw-bold mb-3">
                      <a href="#" class="text-decoration-none text-dark stretched-link">
                        Nueva filtración de datos afecta a millones de usuarios
                      </a>
                    </h3>
                    <p class="card-text text-muted small">Una reciente brecha de seguridad ha expuesto información sensible. Te explicamos cómo verificar si has sido afectado y qué hacer al respecto.</p>
                  </div>
                  <div class="card-footer bg-white border-0 pt-0">
                    <div class="d-flex align-items-center">
                      <img src="../assets/logo_passwd.JPEG" alt="Autor" class="rounded-circle me-2" width="30" height="30">
                      <small class="text-muted">Alejandro Jiménez Brundin</small>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Artículo 3 -->
              <div class="col-md-6">
                <div class="card h-100 border-0 shadow-sm blog-card">
                  <img src="https://images.unsplash.com/photo-1603899122634-f086ca5f5ddd?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" class="card-img-top" alt="Imagen del artículo">
                  <div class="card-body p-4">
                    <div class="d-flex align-items-center mb-3">
                      <span class="badge bg-success-subtle text-success me-2">Consejos</span>
                      <small class="text-muted">15 Abril, 2025</small>
                    </div>
                    <h3 class="card-title h5 fw-bold mb-3">
                      <a href="#" class="text-decoration-none text-dark stretched-link">
                        Por qué deberías activar la autenticación de dos factores hoy mismo
                      </a>
                    </h3>
                    <p class="card-text text-muted small">La autenticación de dos factores puede reducir drásticamente el riesgo de accesos no autorizados. Aquí te explicamos por qué es esencial.</p>
                  </div>
                  <div class="card-footer bg-white border-0 pt-0">
                    <div class="d-flex align-items-center">
                      <img src="../assets/logo_passwd.JPEG" alt="Autor" class="rounded-circle me-2" width="30" height="30">
                      <small class="text-muted">Alejandro Jiménez Brundin</small>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Artículo 4 -->
              <div class="col-md-6">
                <div class="card h-100 border-0 shadow-sm blog-card">
                  <img src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" class="card-img-top" alt="Imagen del artículo">
                  <div class="card-body p-4">
                    <div class="d-flex align-items-center mb-3">
                      <span class="badge bg-info-subtle text-info me-2">Tutoriales</span>
                      <small class="text-muted">8 Abril, 2025</small>
                    </div>
                    <h3 class="card-title h5 fw-bold mb-3">
                      <a href="#" class="text-decoration-none text-dark stretched-link">
                        Cómo configurar Passwd para sincronizar tus contraseñas en todos tus dispositivos
                      </a>
                    </h3>
                    <p class="card-text text-muted small">Guía paso a paso para configurar la sincronización segura entre tu teléfono, tablet y computadora utilizando Passwd.</p>
                  </div>
                  <div class="card-footer bg-white border-0 pt-0">
                    <div class="d-flex align-items-center">
                      <img src="../assets/logo_passwd.JPEG" alt="Autor" class="rounded-circle me-2" width="30" height="30">
                      <small class="text-muted">Alejandro Jiménez Brundin</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Paginación -->
            <div class="d-flex justify-content-center mt-5">
              <nav aria-label="Navegación de páginas del blog">
                <ul class="pagination">
                  <li class="page-item disabled">
                    <a class="page-link" href="#" aria-label="Anterior">
                      <span aria-hidden="true">&laquo;</span>
                    </a>
                  </li>
                  <li class="page-item active"><a class="page-link" href="#">1</a></li>
                  <li class="page-item"><a class="page-link" href="#">2</a></li>
                  <li class="page-item"><a class="page-link" href="#">3</a></li>
                  <li class="page-item">
                    <a class="page-link" href="#" aria-label="Siguiente">
                      <span aria-hidden="true">&raquo;</span>
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>

          <!-- Barra lateral -->
          <div class="col-lg-4 mt-5 mt-lg-0">
            <!-- Buscar -->
            <div class="card border-0 shadow-sm mb-4">
              <div class="card-body p-4">
                <h4 class="fw-bold mb-3">Buscar</h4>
                <div class="input-group">
                  <input type="text" class="form-control" placeholder="Buscar artículos...">
                  <button class="btn btn-primary" type="button">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            <!-- Categorías -->
            <div class="card border-0 shadow-sm mb-4">
              <div class="card-body p-4">
                <h4 class="fw-bold mb-3">Categorías</h4>
                <ul class="list-group list-group-flush">
                  <li class="list-group-item d-flex justify-content-between align-items-center px-0">
                    <a href="#" class="text-decoration-none text-dark">Seguridad</a>
                    <span class="badge bg-primary rounded-pill">14</span>
                  </li>
                  <li class="list-group-item d-flex justify-content-between align-items-center px-0">
                    <a href="#" class="text-decoration-none text-dark">Guías</a>
                    <span class="badge bg-primary rounded-pill">8</span>
                  </li>
                  <li class="list-group-item d-flex justify-content-between align-items-center px-0">
                    <a href="#" class="text-decoration-none text-dark">Alertas</a>
                    <span class="badge bg-primary rounded-pill">5</span>
                  </li>
                  <li class="list-group-item d-flex justify-content-between align-items-center px-0">
                    <a href="#" class="text-decoration-none text-dark">Consejos</a>
                    <span class="badge bg-primary rounded-pill">12</span>
                  </li>
                  <li class="list-group-item d-flex justify-content-between align-items-center px-0">
                    <a href="#" class="text-decoration-none text-dark">Tutoriales</a>
                    <span class="badge bg-primary rounded-pill">7</span>
                  </li>
                </ul>
              </div>
            </div>

            <!-- Artículos populares -->
            <div class="card border-0 shadow-sm mb-4">
              <div class="card-body p-4">
                <h4 class="fw-bold mb-3">Artículos Populares</h4>
                <!-- Artículo popular 1 -->
                <div class="d-flex mb-3">
                  <img src="https://images.unsplash.com/photo-1573164713988-8665fc963095?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80" alt="Artículo popular" class="rounded" width="70" height="70" style="object-fit: cover;">
                  <div class="ms-3">
                    <h6 class="mb-1"><a href="#" class="text-decoration-none text-dark">5 pasos para crear contraseñas seguras</a></h6>
                    <small class="text-muted">28 Abril, 2025</small>
                  </div>
                </div>
                <!-- Artículo popular 2 -->
                <div class="d-flex mb-3">
                  <img src="https://images.unsplash.com/photo-1496096265110-f83ad7f96608?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80" alt="Artículo popular" class="rounded" width="70" height="70" style="object-fit: cover;">
                  <div class="ms-3">
                    <h6 class="mb-1"><a href="#" class="text-decoration-none text-dark">Nueva filtración de datos</a></h6>
                    <small class="text-muted">21 Abril, 2025</small>
                  </div>
                </div>
                <!-- Artículo popular 3 -->
                <div class="d-flex">
                  <img src="https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80" alt="Artículo popular" class="rounded" width="70" height="70" style="object-fit: cover;">
                  <div class="ms-3">
                    <h6 class="mb-1"><a href="#" class="text-decoration-none text-dark">Protección contra phishing</a></h6>
                    <small class="text-muted">3 Mayo, 2025</small>
                  </div>
                </div>
              </div>
            </div>

            <!-- Suscripción -->
            <div class="card border-0 shadow-sm bg-primary text-white">
              <div class="card-body p-4">
                <h4 class="fw-bold mb-3">Suscríbete al Newsletter</h4>
                <p class="mb-3">Recibe consejos de seguridad, tutoriales y alertas directamente en tu correo.</p>
                <div class="input-group mb-3">
                  <input type="email" class="form-control" placeholder="Tu correo electrónico">
                  <button class="btn btn-light" type="button">Suscribirse</button>
                </div>
                <small class="opacity-75">No enviamos spam. Puedes darte de baja en cualquier momento.</small>
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
.blog-banner {
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

.featured-post {
  transition: transform 0.3s ease;
}

.featured-post:hover {
  transform: translateY(-5px);
}

.blog-card {
  transition: transform 0.3s ease;
}

.blog-card:hover {
  transform: translateY(-5px);
}

.page-link {
  color: var(--primary-color);
  border-color: #dee2e6;
}

.page-item.active .page-link {
  background-color: var(--primary-color);
  border-color: var(--primary-color);
}

.page-link:focus {
  box-shadow: 0 0 0 0.25rem rgba(var(--primary-rgb), 0.25);
}

/* Backgrounds para categorías */
.bg-primary-subtle {
  background-color: rgba(var(--primary-rgb), 0.1);
}

.bg-danger-subtle {
  background-color: rgba(220, 53, 69, 0.1);
}

.bg-success-subtle {
  background-color: rgba(25, 135, 84, 0.1);
}

.bg-info-subtle {
  background-color: rgba(13, 202, 240, 0.1);
}

/* Colores de texto para categorías */
.text-primary {
  color: var(--primary-color) !important;
}

.text-danger {
  color: #dc3545 !important;
}

.text-success {
  color: #198754 !important;
}

.text-info {
  color: #0dcaf0 !important;
}
</style> 