<template>
  <div>
    <Navbar />
    <!-- Banner de precios -->
    <section class="pricing-banner py-5 py-md-6 bg-primary position-relative">
      <div class="banner-overlay"></div>
      <div class="container position-relative">
        <div class="row min-vh-50 align-items-center py-5">
          <div class="col-lg-8 mx-auto text-center text-white">
            <h1 class="display-4 fw-bold mb-4">Planes y Precios</h1>
            <p class="lead mb-4 opacity-90">Elige el plan que mejor se adapte a tus necesidades. Todos los planes incluyen nuestras funciones de seguridad básicas.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Sección de planes -->
    <section class="py-5 py-md-6 bg-light">
      <div class="container">
        <div class="row g-4 justify-content-center">
          <!-- Plan Gratuito -->
          <div class="col-md-6 col-lg-4">
            <div class="card h-100 border-0 shadow-sm pricing-card">
              <div class="card-body p-4 p-lg-5">
                <h6 class="text-uppercase text-muted fw-semibold">Gratis</h6>
                <h2 class="display-6 fw-bold my-3">€0<small class="fs-6 text-muted fw-normal">/mes</small></h2>
                <p class="text-muted mb-4">Para usuarios individuales que buscan una solución básica de gestión de contraseñas</p>
                <ul class="pricing-features mb-4">
                  <li>Almacenamiento de hasta 50 contraseñas</li>
                  <li>Acceso desde 2 dispositivos</li>
                  <li>Generador de contraseñas</li>
                  <li>Encriptación AES-256</li>
                  <li class="text-muted">Sincronización automática</li>
                  <li class="text-muted">Autenticación biométrica</li>
                  <li class="text-muted">Compartir seguro</li>
                </ul>
                <a href="#" class="btn btn-outline-primary w-100 py-3 fw-medium">Comenzar Gratis</a>
              </div>
            </div>
          </div>

          <!-- Plan Premium -->
          <div class="col-md-6 col-lg-4">
            <div class="card h-100 border-0 shadow pricing-card popular">
              <div class="popular-badge">Más Popular</div>
              <div class="card-body p-4 p-lg-5">
                <h6 class="text-uppercase text-primary fw-semibold">Premium</h6>
                <h2 class="display-6 fw-bold my-3">€2.99<small class="fs-6 text-muted fw-normal">/mes</small></h2>
                <p class="text-muted mb-4">Para usuarios que necesitan funciones avanzadas y mayor capacidad</p>
                <ul class="pricing-features mb-4">
                  <li>Almacenamiento ilimitado de contraseñas</li>
                  <li>Acceso desde todos tus dispositivos</li>
                  <li>Generador de contraseñas avanzado</li>
                  <li>Encriptación AES-256</li>
                  <li>Sincronización automática</li>
                  <li>Autenticación biométrica</li>
                  <li>Compartir con 5 personas</li>
                </ul>
                <a href="#" class="btn btn-primary w-100 py-3 fw-medium">Obtener Premium</a>
              </div>
            </div>
          </div>

          <!-- Plan Familiar -->
          <div class="col-md-6 col-lg-4">
            <div class="card h-100 border-0 shadow-sm pricing-card">
              <div class="card-body p-4 p-lg-5">
                <h6 class="text-uppercase text-muted fw-semibold">Familiar</h6>
                <h2 class="display-6 fw-bold my-3">€4.99<small class="fs-6 text-muted fw-normal">/mes</small></h2>
                <p class="text-muted mb-4">Para familias que quieren proteger todas sus cuentas digitales</p>
                <ul class="pricing-features mb-4">
                  <li>Hasta 6 cuentas Premium</li>
                  <li>Panel de administración familiar</li>
                  <li>Todas las funciones Premium</li>
                  <li>Recuperación de cuenta familiar</li>
                  <li>Compartir ilimitado entre familiares</li>
                  <li>Protección de datos mejorada</li>
                  <li>Soporte prioritario</li>
                </ul>
                <a href="#" class="btn btn-outline-primary w-100 py-3 fw-medium">Elegir Familiar</a>
              </div>
            </div>
          </div>
        </div>

        <!-- Descuentos anuales -->
        <div class="row mt-5">
          <div class="col-lg-8 mx-auto">
            <div class="bg-white p-4 p-md-5 rounded-4 border text-center">
              <h3 class="h4 fw-bold mb-3">¿Buscas ahorrar?</h3>
              <p class="mb-4">Obtén un <span class="fw-semibold text-primary">20% de descuento</span> al elegir facturación anual en cualquiera de nuestros planes de pago.</p>
              <a href="#" class="btn btn-sm btn-primary">Ver precios anuales</a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Preguntas frecuentes -->
    <section class="py-5 py-md-6">
      <div class="container">
        <div class="row justify-content-center mb-5">
          <div class="col-lg-8 text-center">
            <h2 class="display-6 fw-bold mb-4">Preguntas Frecuentes</h2>
            <p class="lead text-muted">Respuestas a las preguntas más comunes sobre nuestros planes y precios.</p>
          </div>
        </div>

        <div class="row justify-content-center">
          <div class="col-lg-8">
            <div class="accordion" id="pricingFAQ">
              <!-- Pregunta 1 -->
              <div class="accordion-item border mb-3 rounded-3 shadow-sm">
                <h3 class="accordion-header">
                  <button class="accordion-button fw-semibold collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq1">
                    ¿Puedo cambiar de plan en cualquier momento?
                  </button>
                </h3>
                <div id="faq1" class="accordion-collapse collapse" data-bs-parent="#pricingFAQ">
                  <div class="accordion-body">
                    Sí, puedes actualizar, degradar o cancelar tu plan en cualquier momento. Si actualizas, el cambio se aplicará inmediatamente. Si eliges un plan inferior o cancelas, el cambio se aplicará al final de tu ciclo de facturación actual.
                  </div>
                </div>
              </div>
              
              <!-- Pregunta 2 -->
              <div class="accordion-item border mb-3 rounded-3 shadow-sm">
                <h3 class="accordion-header">
                  <button class="accordion-button fw-semibold collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq2">
                    ¿Qué métodos de pago aceptan?
                  </button>
                </h3>
                <div id="faq2" class="accordion-collapse collapse" data-bs-parent="#pricingFAQ">
                  <div class="accordion-body">
                    Aceptamos tarjetas de crédito/débito (Visa, Mastercard, American Express), PayPal, y en algunos países, Apple Pay y Google Pay. Todas las transacciones están encriptadas y son procesadas de manera segura.
                  </div>
                </div>
              </div>
              
              <!-- Pregunta 3 -->
              <div class="accordion-item border mb-3 rounded-3 shadow-sm">
                <h3 class="accordion-header">
                  <button class="accordion-button fw-semibold collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq3">
                    ¿Ofrecen una garantía de devolución de dinero?
                  </button>
                </h3>
                <div id="faq3" class="accordion-collapse collapse" data-bs-parent="#pricingFAQ">
                  <div class="accordion-body">
                    Sí, ofrecemos una garantía de devolución de dinero de 30 días en todos nuestros planes de pago. Si no estás satisfecho por cualquier motivo, puedes solicitar un reembolso completo dentro de los primeros 30 días de tu suscripción.
                  </div>
                </div>
              </div>
              
              <!-- Pregunta 4 -->
              <div class="accordion-item border mb-3 rounded-3 shadow-sm">
                <h3 class="accordion-header">
                  <button class="accordion-button fw-semibold collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq4">
                    ¿El plan Familiar permite compartir contraseñas?
                  </button>
                </h3>
                <div id="faq4" class="accordion-collapse collapse" data-bs-parent="#pricingFAQ">
                  <div class="accordion-body">
                    Sí, el plan Familiar permite compartir contraseñas de forma segura entre los miembros de la familia. Cada miembro tiene su propia bóveda privada, pero también existe la posibilidad de crear bóvedas compartidas para elementos como cuentas de streaming, Wi-Fi, y otras credenciales familiares.
                  </div>
                </div>
              </div>
              
              <!-- Pregunta 5 -->
              <div class="accordion-item border mb-3 rounded-3 shadow-sm">
                <h3 class="accordion-header">
                  <button class="accordion-button fw-semibold collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq5">
                    ¿Qué pasa con mis datos si cancelo mi suscripción?
                  </button>
                </h3>
                <div id="faq5" class="accordion-collapse collapse" data-bs-parent="#pricingFAQ">
                  <div class="accordion-body">
                    Si cancelas una suscripción Premium o Familiar, tu cuenta se convertirá en una cuenta gratuita y mantendrás acceso a tus datos, pero con las limitaciones del plan gratuito. Si deseas eliminar completamente tu cuenta y datos, puedes solicitar la eliminación desde la configuración de tu cuenta.
                  </div>
                </div>
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
.pricing-banner {
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

.pricing-card {
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.pricing-card:hover {
  transform: translateY(-5px);
}

.pricing-card.popular {
  transform: scale(1.05);
  z-index: 1;
  border: 1px solid rgba(var(--primary-rgb), 0.2);
}

.pricing-card.popular:hover {
  transform: scale(1.05) translateY(-5px);
}

.popular-badge {
  position: absolute;
  top: 10px;
  right: -30px;
  background-color: var(--primary-color);
  color: white;
  font-size: 0.75rem;
  font-weight: 500;
  padding: 5px 30px;
  transform: rotate(45deg);
}

.pricing-features {
  list-style: none;
  padding: 0;
}

.pricing-features li {
  position: relative;
  padding-left: 30px;
  margin-bottom: 12px;
}

.pricing-features li::before {
  content: '✓';
  position: absolute;
  left: 0;
  color: var(--primary-color);
  font-weight: bold;
}

.pricing-features li.text-muted::before {
  content: '✗';
  color: #dee2e6;
}

.accordion-button:focus {
  box-shadow: none;
  border-color: rgba(var(--primary-rgb), 0.2);
}

.accordion-button:not(.collapsed) {
  background-color: rgba(var(--primary-rgb), 0.05);
  color: var(--primary-color);
}

@media (max-width: 991.98px) {
  .pricing-card.popular {
    transform: scale(1);
  }
  
  .pricing-card.popular:hover {
    transform: translateY(-5px);
  }
}
</style> 