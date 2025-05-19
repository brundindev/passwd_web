"use client";

import { useEffect, useState } from 'react';
import { driver } from "driver.js";
import "driver.js/dist/driver.css";

export default function Tutorial() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Esperamos a que el DOM esté completamente cargado
    setIsReady(true);
  }, []);

  useEffect(() => {
    if (!isReady) return;

    // Inicializamos el tour con driver.js
    const driverObj = driver({
      showProgress: true,
      smoothScroll: true,
      animate: true,
      allowClose: true,
      stagePadding: 20,
      overlayOpacity: 0.35,
      popoverClass: 'passwd-tutorial-theme',
      prevBtnText: 'Volver',
      nextBtnText: 'Siguiente',
      steps: [
        {
          element: '#hero-title',
          popover: {
            title: '¡Bienvenido a PASSWD!',
            description: 'Descubre el gestor de contraseñas que te permitirá almacenar y acceder a tus credenciales de forma segura desde cualquier dispositivo.',
            side: "bottom",
            align: "center"
          }
        },
        {
          element: 'a[href="/descargar"]',
          popover: {
            title: 'Descarga la Aplicación',
            description: 'Aquí puedes descargar PASSWD para diferentes plataformas, incluyendo Windows, macOS, iOS y Android, para tener tus contraseñas siempre a mano.',
            side: "bottom",
            align: "start"
          }
        },
        {
          element: 'a[href="/funciones"]',
          popover: {
            title: 'Todas las Funcionalidades',
            description: 'Explora todas las características que PASSWD ofrece, desde organización por carpetas hasta el generador de contraseñas seguras.',
            side: "bottom",
            align: "start"
          }
        },
        {
          element: 'article:nth-of-type(1)',
          popover: {
            title: 'Cifrado de Alto Nivel',
            description: 'Todas tus contraseñas están protegidas con cifrado XChaCha20 y de conocimiento cero, para que solo tú puedas acceder a ellas.',
            side: "right",
            align: "start"
          }
        },
        {
          element: 'article:nth-of-type(3)',
          popover: {
            title: 'Generador de Contraseñas',
            description: 'Crea contraseñas únicas y seguras con nuestro generador, sin necesidad de inventarlas tú mismo.',
            side: "top",
            align: "start"
          }
        },
        {
          element: 'article:nth-of-type(4)',
          popover: {
            title: 'Autenticación Biométrica',
            description: 'Próximamente podrás desbloquear tu bóveda de contraseñas usando tu huella digital o reconocimiento facial en dispositivos compatibles.',
            side: "left",
            align: "start"
          }
        },
        {
          element: 'article:nth-of-type(6)',
          popover: {
            title: 'Alertas de Seguridad',
            description: 'Recibe notificaciones cuando tus contraseñas estén comprometidas o cuando haya actualizaciones importantes en tus tickets de soporte.',
            side: "left",
            align: "start"
          }
        },
        {
          element: '.cta-section',
          popover: {
            title: '¡Comienza Ahora!',
            description: 'Regístrate para comenzar a gestionar tus contraseñas de forma segura. ¡Es completamente gratuito!',
            side: "top",
            align: "center"
          }
        }
      ]
    });

    // Solo mostramos el tour en la página principal
    if (window.location.pathname === '/' || window.location.pathname === '/home') {
      // Verificamos si es la primera visita (usando localStorage)
      const hasSeenTutorial = localStorage.getItem('passwd_tutorial_seen');
      
      if (!hasSeenTutorial) {
        // Si no ha visto el tutorial, lo mostramos después de 1.5 segundos
        setTimeout(() => {
          driverObj.drive();
          // Marcamos que ya ha visto el tutorial
          localStorage.setItem('passwd_tutorial_seen', 'true');
        }, 1500);
      }
    }

    // Añadimos un botón para iniciar el tutorial manualmente
    const tutorialButton = document.createElement('button');
    tutorialButton.textContent = '?';
    tutorialButton.title = 'Iniciar Tutorial';
    tutorialButton.className = 'fixed bottom-28 right-5 z-40 bg-indigo-600 text-white w-10 h-10 rounded-full flex items-center justify-center shadow-lg hover:bg-indigo-700 transition-colors';
    tutorialButton.onclick = () => driverObj.drive();
    document.body.appendChild(tutorialButton);

    // Limpieza al desmontar el componente
    return () => {
      driverObj.destroy();
      if (tutorialButton.parentNode) {
        document.body.removeChild(tutorialButton);
      }
    };
  }, [isReady]);

  // Añadimos estilos personalizados para el tutorial
  useEffect(() => {
    if (!isReady) return;

    const style = document.createElement('style');
    style.textContent = `
      /* Estilos modernos para las tarjetas del tutorial */
      .driver-popover.passwd-tutorial-theme {
        background: linear-gradient(145deg, rgba(30, 42, 74, 0.95), rgba(17, 24, 39, 0.95));
        color: #fff;
        border: none;
        border-radius: 16px;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(90, 103, 216, 0.2);
        padding: 20px;
        max-width: 400px;
        backdrop-filter: blur(12px);
        -webkit-backdrop-filter: blur(12px);
        animation: fadeIn 0.3s ease-out;
      }
      
      @keyframes fadeIn {
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
      }
      
      .driver-popover.passwd-tutorial-theme .driver-popover-title {
        font-size: 20px;
        font-weight: 700;
        color: #F7FAFC;
        padding-bottom: 12px;
        margin-bottom: 14px;
        border-bottom: 1px solid rgba(90, 103, 216, 0.3);
        background: linear-gradient(90deg, #fff, #A5B4FC);
        -webkit-background-clip: text;
        background-clip: text;
        color: transparent;
      }
      
      .driver-popover.passwd-tutorial-theme .driver-popover-description {
        color: #E2E8F0;
        font-size: 15px;
        line-height: 1.6;
        margin-bottom: 16px;
      }
      
      .driver-popover.passwd-tutorial-theme .driver-popover-progress-text {
        color: #A5B4FC;
        font-size: 13px;
        font-weight: 500;
      }
      
      .driver-popover.passwd-tutorial-theme button {
        background: linear-gradient(135deg, #6366F1, #4F46E5);
        color: #ffffff;
        border: none;
        padding: 10px 18px;
        border-radius: 8px;
        font-size: 15px;
        font-weight: 600;
        transition: all 0.3s;
        cursor: pointer;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      }
      
      .driver-popover.passwd-tutorial-theme button:hover {
        transform: translateY(-2px);
        box-shadow: 0 6px 10px rgba(0, 0, 0, 0.2);
        filter: brightness(1.05);
      }
      
      /* Acercar más los botones de navegación y mejorar su apariencia */
      .driver-popover.passwd-tutorial-theme .driver-popover-navigation-btns {
        justify-content: center;
        gap: 15px;
        padding-top: 14px;
        border-top: 1px solid rgba(90, 103, 216, 0.3);
        margin-top: 8px;
      }
      
      .driver-popover.passwd-tutorial-theme .driver-popover-close-btn {
        color: #A5B4FC;
        width: 28px;
        height: 28px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.3s;
        top: 10px;
        right: 10px;
        background-color: rgba(79, 70, 229, 0.1);
      }
      
      .driver-popover.passwd-tutorial-theme .driver-popover-close-btn:hover {
        color: #F7FAFC;
        background-color: rgba(79, 70, 229, 0.3);
        transform: rotate(90deg);
      }
      
      .driver-popover.passwd-tutorial-theme .driver-popover-arrow-side-left.driver-popover-arrow {
        border-left-color: rgba(30, 42, 74, 0.95) !important;
      }
      
      .driver-popover.passwd-tutorial-theme .driver-popover-arrow-side-right.driver-popover-arrow {
        border-right-color: rgba(30, 42, 74, 0.95) !important;
      }
      
      .driver-popover.passwd-tutorial-theme .driver-popover-arrow-side-top.driver-popover-arrow {
        border-top-color: rgba(30, 42, 74, 0.95) !important;
      }
      
      .driver-popover.passwd-tutorial-theme .driver-popover-arrow-side-bottom.driver-popover-arrow {
        border-bottom-color: rgba(30, 42, 74, 0.95) !important;
      }
      
      /* Overlay semi-transparente general */
      .driver-overlay {
        background-color: rgba(0, 0, 0, 0.35) !important;
        z-index: 1000 !important;
      }
      
      .driver-overlay-animated {
        background-color: rgba(0, 0, 0, 0.35) !important;
      }

      /* Quitar completamente el fondo oscuro para los enlaces en los pasos 2 y 3 */
      a[href*="descargar"],
      a[href*="funciones"] {
        position: relative !important;
      }

      /* Enlaces en los pasos 2 y 3 con más brillo */
      a[href*="descargar"].driver-active-element,
      a[href*="funciones"].driver-active-element {
        filter: brightness(2.5) contrast(1.4) !important;
        box-shadow: 0 0 40px 20px rgba(102, 126, 234, 0.95) !important;
        z-index: 9999 !important;
        transform: scale(1.15) !important;
        animation: super-highlight 1.5s infinite alternate !important;
      }

      @keyframes super-highlight {
        0% {
          box-shadow: 0 0 25px 15px rgba(102, 126, 234, 0.9);
        }
        100% {
          box-shadow: 0 0 45px 25px rgba(102, 126, 234, 1);
        }
      }

      /* Forzar máxima visibilidad a nivel global para todos los elementos activos */
      .driver-active-element,
      a.driver-active-element,
      .driver-highlighted-element {
        background-color: transparent !important;
        filter: brightness(1.8) !important;
        z-index: 9999 !important;
        position: relative !important;
      }

      /* Expandir el área visible para los elementos de los pasos 4-7 */
      article.driver-active-element {
        padding: 20px !important;
        margin: -20px !important;
        box-sizing: content-box !important;
        overflow: visible !important;
      }

      /* Eliminar todos los overlay de fondo negro */
      .driver-active-element:before,
      .driver-active-element:after,
      .driver-highlighted-element:before,
      .driver-highlighted-element:after,
      a[href*="descargar"]:before,
      a[href*="descargar"]:after,
      a[href*="funciones"]:before,
      a[href*="funciones"]:after,
      a[href*="descargar"].driver-active-element:before,
      a[href*="descargar"].driver-active-element:after,
      a[href*="funciones"].driver-active-element:before,
      a[href*="funciones"].driver-active-element:after {
        display: none !important;
        opacity: 0 !important;
        visibility: hidden !important;
        background-color: transparent !important;
      }
      
      /* Mejoras para garantizar transparencia total del fondo */
      .driver-active-element {
        isolation: isolate !important;
        mix-blend-mode: normal !important;
        z-index: 10000 !important;
      }
      
      /* Garantizar visibilidad especial para elementos específicos */
      article.driver-active-element,
      .cta-section.driver-active-element {
        outline: 2px solid rgba(102, 126, 234, 0.7) !important;
        outline-offset: 20px !important;
        animation: article-glow 2s infinite alternate !important;
      }
      
      @keyframes article-glow {
        0% {
          box-shadow: 0 0 20px 5px rgba(102, 126, 234, 0.6);
          outline-color: rgba(102, 126, 234, 0.5);
        }
        100% {
          box-shadow: 0 0 35px 15px rgba(102, 126, 234, 0.8);
          outline-color: rgba(102, 126, 234, 0.9);
        }
      }
      
      /* Estilos adicionales para los enlaces en los pasos 2-3 */
      body.driver-active a[href*="descargar"],
      body.driver-active a[href*="funciones"] {
        visibility: visible !important;
        z-index: 10001 !important;
      }
      
      /* Eliminar cualquier posible fondo oscuro en elementos activos */
      .driver-active-element *,
      .driver-highlighted-element * {
        background-color: transparent !important;
        opacity: 1 !important;
        visibility: visible !important;
      }
      
      /* Asegurar que el fondo del elemento activo sea completamente transparente */
      .driver-active-element::before,
      .driver-active-element::after {
        display: none !important;
        opacity: 0 !important;
        background: transparent !important;
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, [isReady]);

  // Este componente no renderiza nada visible directamente
  return null;
} 