<script setup lang="ts">
import { ref, onMounted } from 'vue';
import testimonial1 from '../assets/testimonial-1.png';
import testimonial2 from '../assets/testimonial-2.png';
import testimonial3 from '../assets/testimonial-3.png';

// Función para manejar errores de carga de imágenes
const handleImageError = (event) => {
  // Establecer una imagen genérica cuando falla la carga
  event.target.src = 'https://ui-avatars.com/api/?name=' + encodeURIComponent(testimonials[activeSlide.value].author) + '&background=175ddc&color=fff';
};

const isLoaded = ref(false);
const activeSlide = ref(0);
const testimonials = [
  {
    id: 1,
    quote: "Passwd ha simplificado totalmente la forma en que gestiono mis contraseñas. Ya no necesito recordar docenas de contraseñas diferentes ni preocuparme por la seguridad.",
    author: "María González",
    role: "Diseñadora Gráfica",
    avatar: testimonial1
  },
  {
    id: 2,
    quote: "Como profesional de TI, valoro la seguridad que ofrece Passwd. La encriptación de nivel militar y la autenticación de dos factores me dan tranquilidad total al almacenar información sensible.",
    author: "Carlos Rodríguez",
    role: "Ingeniero de Sistemas",
    avatar: testimonial2
  },
  {
    id: 3,
    quote: "Nuestra empresa implementó Passwd para todo el equipo y ha sido una excelente decisión. La gestión centralizada y las políticas de seguridad nos han ahorrado tiempo y evitado problemas.",
    author: "Laura Martínez",
    role: "Directora de Operaciones",
    avatar: testimonial3
  }
];

const nextSlide = () => {
  activeSlide.value = (activeSlide.value + 1) % testimonials.length;
};

const prevSlide = () => {
  activeSlide.value = (activeSlide.value - 1 + testimonials.length) % testimonials.length;
};

const goToSlide = (index: number) => {
  activeSlide.value = index;
};

onMounted(() => {
  // Agregar una pequeña demora para asegurar que la animación se vea bien
  setTimeout(() => {
    isLoaded.value = true;
  }, 300);
});
</script>

<template>
  <section class="testimonials-section py-1 py-md-6 position-relative overflow-hidden mt-0 mb-5">
    <!-- Efectos visuales de fondo -->
    <div class="position-absolute start-0 top-0 w-100 h-100 overflow-hidden">
      <div class="position-absolute top-0 start-0 w-100 h-100 bg-light-pattern"></div>
      <div class="position-absolute top-50 start-0 bg-primary testimonial-blob-1"></div>
      <div class="position-absolute bottom-0 end-0 bg-primary testimonial-blob-2"></div>
    </div>
    
    <div class="container position-relative">
      <div class="text-center mb-1" :class="{'is-visible': isLoaded}">
        <h2 class="display-5 fw-bold mb-4">Lo que dicen nuestros usuarios</h2>
        <p class="lead text-muted mx-auto mb-5" style="max-width: 700px;">
          Miles de personas y organizaciones confían en Passwd para proteger sus datos más importantes.
        </p>
      </div>
      
      <div class="testimonial-carousel" :class="{'is-visible': isLoaded}">
        <div class="carousel-inner position-relative">
          <div class="row justify-content-center">
            <div class="col-lg-8">
              <!-- Controles izquierda/derecha -->
              <div class="carousel-controls d-none d-md-block">
                <button class="carousel-control carousel-control-prev" @click="prevSlide" aria-label="Anterior">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
                  </svg>
                </button>
                <button class="carousel-control carousel-control-next" @click="nextSlide" aria-label="Siguiente">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
                  </svg>
                </button>
              </div>
              
              <div class="testimonial-card">
                <div class="testimonial-quote">
                  <svg class="quote-mark" width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9.33333 21.3333C7.86667 21.3333 6.66667 20.8 5.73333 19.7333C4.8 18.6667 4.33333 17.3333 4.33333 15.7333C4.33333 14.2667 4.66667 12.9333 5.33333 11.7333C6 10.5333 6.93333 9.53333 8.13333 8.73333C9.33333 7.93333 10.6667 7.46667 12.1333 7.33333L13.2 10.4C12 10.6667 11 11.2 10.2 12C9.4 12.8 9 13.6667 9 14.6L9.2 14.8C9.46667 14.7333 9.73333 14.7333 10 14.8C10.2667 14.8667 10.5333 14.9333 10.8 15.0667C11.4667 15.3333 12 15.8 12.4 16.4667C12.8 17.1333 13 17.8 13 18.4667C13 19.4 12.6667 20.2 12 20.8667C11.3333 21.1333 10.4 21.3333 9.33333 21.3333ZM22 21.3333C20.5333 21.3333 19.3333 20.8 18.4 19.7333C17.4667 18.6667 17 17.3333 17 15.7333C17 14.2667 17.3333 12.9333 18 11.7333C18.6667 10.5333 19.6 9.53333 20.8 8.73333C22 7.93333 23.3333 7.46667 24.8 7.33333L25.8667 10.4C24.6667 10.6667 23.6667 11.2 22.8667 12C22.0667 12.8 21.6667 13.6667 21.6667 14.6L21.8667 14.8C22.1333 14.7333 22.4 14.7333 22.6667 14.8C22.9333 14.8667 23.2 14.9333 23.4667 15.0667C24.1333 15.3333 24.6667 15.8 25.0667 16.4667C25.4667 17.1333 25.6667 17.8 25.6667 18.4667C25.6667 19.4 25.3333 20.2 24.6667 20.8667C24 21.1333 23.0667 21.3333 22 21.3333Z" fill="currentColor"/>
                  </svg>
                  <p class="testimonial-text mb-4">{{ testimonials[activeSlide].quote }}</p>
                </div>
                
                <div class="testimonial-author d-flex align-items-center">
                  <div class="author-avatar">
                    <img :src="testimonials[activeSlide].avatar" alt="Avatar" class="rounded-circle" width="70" height="70" @error="handleImageError" />
                  </div>
                  <div class="ms-3">
                    <h5 class="fw-bold mb-1">{{ testimonials[activeSlide].author }}</h5>
                    <p class="text-muted small mb-0">{{ testimonials[activeSlide].role }}</p>
                  </div>
                </div>
              </div>
              
              <!-- Indicadores de slide móviles -->
              <div class="carousel-indicators mt-4 d-flex justify-content-center">
                <button 
                  v-for="(testimonial, index) in testimonials" 
                  :key="testimonial.id"
                  @click="goToSlide(index)"
                  :class="['carousel-indicator', { active: index === activeSlide }]" 
                  :aria-label="`Testimonio ${index + 1}`">
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.testimonials-section {
  background-color: #f9fafb;
  min-height: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  z-index: 1;
  padding-bottom: 60px;
}

.bg-light-pattern {
  background-color: #f9fafb;
  background-image: radial-gradient(rgba(0, 0, 0, 0.05) 1px, transparent 1px);
  background-size: 20px 20px;
  z-index: -1;
}

.testimonial-blob-1 {
  width: 600px;
  height: 600px;
  border-radius: 50%;
  filter: blur(120px);
  opacity: 0.03;
  transform: translateX(-60%);
}

.testimonial-blob-2 {
  width: 500px;
  height: 500px;
  border-radius: 50%;
  filter: blur(100px);
  opacity: 0.03;
  transform: translate(40%, 30%);
}

.is-visible {
  opacity: 1;
  transform: translateY(0);
}

.text-center {
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1);
}

.testimonial-carousel {
  opacity: 1;
  transform: translateY(0);
  transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1);
  transition-delay: 0.2s;
}

.testimonial-card {
  background-color: white;
  border-radius: 1rem;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  margin-bottom: 0.5rem;
  position: relative;
  border: 1px solid rgba(229, 231, 235, 0.9);
  transition: all 0.5s ease;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
}

.testimonial-card:hover {
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.08);
  transform: translateY(-5px);
}

.quote-mark {
  color: var(--primary-color);
  opacity: 0.3;
  margin-bottom: 1.5rem;
  height: 40px;
  width: 40px;
}

.testimonial-text {
  font-size: 1.25rem;
  line-height: 1.7;
  color: #333;
  font-weight: 400;
}

.author-avatar img {
  width: 70px;
  height: 70px;
  object-fit: cover;
  border: 3px solid white;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.carousel-controls {
  position: absolute;
  width: 100%;
  top: 50%;
  transform: translateY(-50%);
  z-index: 5;
  left: 0;
}

.carousel-control {
  position: absolute;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background-color: white;
  border: 1px solid rgba(229, 231, 235, 0.7);
  color: var(--gray-color);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.carousel-control:hover {
  color: var(--primary-color);
  box-shadow: 0 12px 20px rgba(0, 0, 0, 0.15);
  transform: translateY(-2px);
}

.carousel-control-prev {
  left: -80px;
}

.carousel-control-next {
  right: -80px;
}

.carousel-indicator {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: #e5e7eb;
  margin: 0 6px;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
}

.carousel-indicator.active {
  background-color: var(--primary-color);
  transform: scale(1.2);
}

@media (max-width: 991.98px) {
  .testimonial-card {
    padding: 1.5rem;
  }
  
  .carousel-control {
    display: none;
  }
  
  .testimonials-section {
    padding: 40px 0 30px 0;
  }
}
</style> 