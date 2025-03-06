<template>
  <div>
    <Navbar />
    <!-- Banner Sobre Nosotros -->
    <section class="about-banner py-5 py-md-6 bg-primary position-relative">
      <div class="banner-overlay"></div>
      <div class="container position-relative">
        <div class="row min-vh-50 align-items-center py-5">
          <div class="col-lg-8 mx-auto text-center text-white">
            <h1 class="display-4 fw-bold mb-4">Sobre Passwd</h1>
            <p class="lead mb-4 opacity-90">Conoce nuestra historia, nuestro equipo y nuestra misión de hacer internet más seguro para todos.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Sección de nuestra historia -->
    <section class="py-5 py-md-6">
      <div class="container">
        <div class="row align-items-center">
          <div class="col-lg-6 mb-4 mb-lg-0">
            <img src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" alt="Nuestra historia" class="img-fluid rounded-4 shadow-sm">
          </div>
          <div class="col-lg-6">
            <h2 class="display-6 fw-bold mb-4">Nuestra Historia</h2>
            <p class="lead text-muted mb-4">Passwd nació en 2025 con una misión clara: hacer que la gestión de contraseñas sea accesible para todos.</p>
            <p class="mb-4">Todo comenzó cuando nuestros fundadores experimentaron de primera mano las consecuencias de un ataque de seguridad. Decididos a evitar que otros pasaran por lo mismo, reunieron a un equipo de expertos en ciberseguridad y diseñadores UX para crear una solución que fuera a la vez segura y fácil de usar.</p>
            <p>Hoy, Passwd es utilizado por más de 500,000 personas en todo el mundo, desde individuos hasta grandes empresas, todos unidos por el deseo de proteger su identidad digital.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Sección de valores -->
    <section class="py-5 py-md-6 bg-light">
      <div class="container">
        <div class="row justify-content-center mb-5">
          <div class="col-lg-8 text-center">
            <h2 class="display-6 fw-bold mb-4">Nuestros Valores</h2>
            <p class="lead text-muted">Estos principios guían todo lo que hacemos, desde el diseño de nuestro producto hasta el servicio al cliente.</p>
          </div>
        </div>

        <div class="row g-4">
          <div class="col-md-4">
            <div class="card h-100 border-0 shadow-sm">
              <div class="card-body p-4 p-lg-5 text-center">
                <div class="value-icon mb-4 mx-auto">
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="text-primary" viewBox="0 0 24 24">
                    <path d="M12 2c-4.97 0-9 4.03-9 9 0 3.63 2.17 6.76 5.28 8.16l.53.29V20H8v2h8v-2h-.81v-.55l.53-.29C18.83 17.76 21 14.63 21 11c0-4.97-4.03-9-9-9zm2 17.5h-4v-1h4v1zm-2-13c-2.48 0-4.5 2.02-4.5 4.5S9.52 15.5 12 15.5s4.5-2.02 4.5-4.5S14.48 6.5 12 6.5zm0 7.5c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3z"/>
                  </svg>
                </div>
                <h3 class="h4 fw-bold mb-3">Seguridad Inquebrantable</h3>
                <p class="text-muted mb-0">No comprometemos la seguridad por conveniencia. Nuestros estándares de encriptación y protección de datos superan las recomendaciones de la industria.</p>
              </div>
            </div>
          </div>
          <div class="col-md-4">
            <div class="card h-100 border-0 shadow-sm">
              <div class="card-body p-4 p-lg-5 text-center">
                <div class="value-icon mb-4 mx-auto">
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="text-primary" viewBox="0 0 24 24">
                    <path d="M18 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM9 4h2v5l-1-1-1 1V4zm9 16H6V4h1v9l3-3 3 3V4h5v16z"/>
                  </svg>
                </div>
                <h3 class="h4 fw-bold mb-3">Simplicidad Radical</h3>
                <p class="text-muted mb-0">La seguridad debe ser accesible para todos. Diseñamos nuestros productos para que sean intuitivos y fáciles de usar, sin importar el nivel técnico del usuario.</p>
              </div>
            </div>
          </div>
          <div class="col-md-4">
            <div class="card h-100 border-0 shadow-sm">
              <div class="card-body p-4 p-lg-5 text-center">
                <div class="value-icon mb-4 mx-auto">
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="text-primary" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM4 12c0-4.42 3.58-8 8-8 1.85 0 3.55.63 4.9 1.69L5.69 16.9C4.63 15.55 4 13.85 4 12zm8 8c-1.85 0-3.55-.63-4.9-1.69L18.31 7.1C19.37 8.45 20 10.15 20 12c0 4.42-3.58 8-8 8z"/>
                  </svg>
                </div>
                <h3 class="h4 fw-bold mb-3">Privacidad Primero</h3>
                <p class="text-muted mb-0">Creemos que los datos son propiedad del usuario. Nunca vendemos información personal y utilizamos un modelo de negocio transparente que no depende de la monetización de datos.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Sección del equipo -->
    <section class="py-5 py-md-6">
      <div class="container">
        <div class="row justify-content-center mb-5">
          <div class="col-lg-8 text-center">
            <h2 class="display-6 fw-bold mb-4">Nuestro Equipo</h2>
            <p class="lead text-muted">El corazón de Passwd son las personas brillantes y apasionadas que trabajan incansablemente para proteger tu identidad digital.</p>
          </div>
        </div>

        <div class="row g-4">
          <!-- Miembro 1 -->
          <div class="col-md-6 col-lg-3">
            <div class="card border-0 shadow-sm team-card h-100">
              <img src="../assets/logo_passwd.JPEG" class="card-img-top team-img" alt="CEO">
              <div class="card-body text-center p-4">
                <h3 class="h5 fw-bold mb-1">Alejandro Jiménez Brundin</h3>
                <p class="text-muted small mb-3">Fundador & CEO</p>
                <p class="small mb-3">Ex-ingeniero de seguridad en Google. 15+ años de experiencia en ciberseguridad.</p>
                <div class="social-links">
                  <a href="#" class="text-muted mx-2"><i class="bi bi-linkedin"></i></a>
                  <a href="#" class="text-muted mx-2"><i class="bi bi-twitter"></i></a>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Miembro 2 -->
          <div class="col-md-6 col-lg-3">
            <div class="card border-0 shadow-sm team-card h-100">
              <img src="../assets/logo_passwd.JPEG" class="card-img-top team-img" alt="CEO">
              <div class="card-body text-center p-4">
                <h3 class="h5 fw-bold mb-1">Alejandro Jiménez Brundin</h3>
                <p class="text-muted small mb-3">CTO</p>
                <p class="small mb-3">Especialista en criptografía con un PhD en Ciencias de la Computación del MIT.</p>
                <div class="social-links">
                  <a href="#" class="text-muted mx-2"><i class="bi bi-linkedin"></i></a>
                  <a href="#" class="text-muted mx-2"><i class="bi bi-github"></i></a>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Miembro 3 -->
          <div class="col-md-6 col-lg-3">
            <div class="card border-0 shadow-sm team-card h-100">
              <img src="../assets/logo_passwd.JPEG" class="card-img-top team-img" alt="CEO">
              <div class="card-body text-center p-4">
                <h3 class="h5 fw-bold mb-1">Alejandro Jiménez Brundin</h3>
                <p class="text-muted small mb-3">Jefe de Producto</p>
                <p class="small mb-3">Visionario de producto con experiencia en empresas de SaaS de rápido crecimiento.</p>
                <div class="social-links">
                  <a href="#" class="text-muted mx-2"><i class="bi bi-linkedin"></i></a>
                  <a href="#" class="text-muted mx-2"><i class="bi bi-medium"></i></a>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Miembro 4 -->
          <div class="col-md-6 col-lg-3">
            <div class="card border-0 shadow-sm team-card h-100">
              <img src="../assets/logo_passwd.JPEG" class="card-img-top team-img" alt="CEO">
              <div class="card-body text-center p-4">
                <h3 class="h5 fw-bold mb-1">Alejandro Jiménez Brundin</h3>
                <p class="text-muted small mb-3">Directora de Diseño</p>
                <p class="small mb-3">Diseñadora de UX centrada en crear experiencias seguras y accesibles para todos.</p>
                <div class="social-links">
                  <a href="#" class="text-muted mx-2"><i class="bi bi-linkedin"></i></a>
                  <a href="#" class="text-muted mx-2"><i class="bi bi-dribbble"></i></a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Sección de unirse al equipo -->
    <section class="py-5 py-md-6 bg-light">
      <div class="container">
        <div class="row align-items-center">
          <div class="col-lg-6 order-lg-2 mb-4 mb-lg-0">
            <img src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" alt="Únete a nuestro equipo" class="img-fluid rounded-4 shadow-sm">
          </div>
          <div class="col-lg-6 order-lg-1">
            <h2 class="display-6 fw-bold mb-4">Únete a Nuestro Equipo</h2>
            <p class="lead text-muted mb-4">Estamos buscando personas talentosas y apasionadas que quieran ayudarnos a construir un internet más seguro.</p>
            <p class="mb-4">En Passwd, creemos en la autonomía, la excelencia y el impacto. Ofrecemos un entorno de trabajo remoto, beneficios competitivos y la oportunidad de trabajar en un producto que protege a millones de personas.</p>
            <a href="#" class="btn btn-primary btn-lg">Ver Posiciones Abiertas</a>
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
.about-banner {
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

.value-icon {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(var(--primary-rgb), 0.1);
}

.team-card {
  transition: all 0.3s ease;
}

.team-card:hover {
  transform: translateY(-5px);
}

.team-img {
  border-top-left-radius: 0.375rem;
  border-top-right-radius: 0.375rem;
  height: 220px;
  object-fit: cover;
}

.social-links a {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  transition: all 0.3s ease;
}

.social-links a:hover {
  background-color: rgba(var(--primary-rgb), 0.1);
  color: var(--primary-color) !important;
}
</style> 