// Respuestas predefinidas para preguntas comunes
const predefinedResponses: Record<string, string> = {
  // Preguntas sobre la aplicación
  "qué es passwd": "PASSWD es un gestor de contraseñas seguro que te permite almacenar, generar y administrar todas tus contraseñas en un solo lugar. Utilizamos cifrado de extremo a extremo para garantizar que solo tú puedas acceder a tu información.",
  "que es passwd": "PASSWD es un gestor de contraseñas seguro que te permite almacenar, generar y administrar todas tus contraseñas en un solo lugar. Utilizamos cifrado de extremo a extremo para garantizar que solo tú puedas acceder a tu información.",
  "cómo funciona passwd": "PASSWD funciona guardando todas tus contraseñas en una bóveda cifrada. Solo necesitas recordar una contraseña maestra para acceder a todas tus demás contraseñas. Además, puedes sincronizar tus contraseñas entre todos tus dispositivos.",
  "como funciona passwd": "PASSWD funciona guardando todas tus contraseñas en una bóveda cifrada. Solo necesitas recordar una contraseña maestra para acceder a todas tus demás contraseñas. Además, puedes sincronizar tus contraseñas entre todos tus dispositivos.",
  "es seguro passwd": "¡Absolutamente! PASSWD utiliza cifrado XChaCha20 y cifrado de conocimiento cero, lo que significa que ni siquiera nosotros podemos ver tus contraseñas. Además, ofrecemos autenticación de dos factores para una capa adicional de seguridad.",
  "seguridad": "PASSWD utiliza cifrado XChaCha20 y cifrado de conocimiento cero, lo que significa que ni siquiera nosotros podemos ver tus contraseñas. Además, implementamos verificación en dos pasos, protección contra phishing y alertas de seguridad en tiempo real.",
  "características": "PASSWD incluye: generador de contraseñas seguras, autorrelleno de formularios, sincronización entre dispositivos, alertas de seguridad, detección de contraseñas débiles o reutilizadas, y almacenamiento seguro de notas y tarjetas de crédito.",
  
  // Nuevas respuestas sobre funcionalidades específicas
  "tickets de soporte": "PASSWD incluye un sistema de tickets de soporte integrado. Puedes crear tickets desde la página de contacto para recibir ayuda personalizada. Los tickets se pueden categorizar, y recibirás notificaciones cuando el equipo responda a tus consultas. Todos los tickets se guardan para futuras referencias.",
  "sistema de tickets": "Nuestro sistema de tickets te permite comunicarte directamente con el equipo de soporte. Puedes crear un ticket, adjuntar información relevante y seguir su estado. Las respuestas se notifican en tiempo real, y puedes responder directamente desde la interfaz para mantener toda la conversación organizada.",
  "enviar ticket": "Para enviar un ticket de soporte, visita la sección 'Contacto' en el menú principal. Allí podrás crear un nuevo ticket describiendo tu consulta o problema. Una vez enviado, recibirás notificaciones de cualquier actualización y podrás responder directamente desde la misma interfaz.",
  
  "filtrado de contraseñas": "PASSWD te permite organizar y filtrar tus contraseñas de múltiples formas. Puedes crear carpetas personalizadas, utilizar etiquetas, y aplicar filtros de búsqueda por sitio web, nombre de usuario o notas. También puedes ordenar tus contraseñas por fecha, uso frecuente o nivel de seguridad.",
  "carpetas de contraseñas": "Puedes organizar tus contraseñas en carpetas personalizadas como 'Personal', 'Trabajo', 'Finanzas', etc. El filtrado por carpetas te permite visualizar solo las contraseñas que pertenecen a una categoría específica, manteniendo tu bóveda organizada incluso con cientos de contraseñas.",
  "buscar contraseñas": "Para buscar entre tus contraseñas, utiliza el campo de búsqueda en la parte superior de la página de contraseñas. Puedes filtrar por sitio, usuario, URL o notas. También puedes filtrar por carpetas seleccionando la categoría deseada en el panel de filtros.",
  
  "notificaciones": "PASSWD incluye un sistema de notificaciones para mantenerte informado sobre actividades importantes. Recibirás avisos cuando se respondan tus tickets de soporte, cuando se detecten contraseñas comprometidas o cuando haya actualizaciones de seguridad importantes.",
  "sistema de notificaciones": "Nuestro sistema de notificaciones te alerta sobre eventos importantes relacionados con tu cuenta y tus contraseñas. Las notificaciones aparecen en el icono de campana en la barra de navegación, donde puedes ver un historial de todos los avisos recientes.",
  "alertas": "PASSWD te envía alertas sobre posibles problemas de seguridad, como contraseñas débiles, reutilizadas o que han aparecido en filtraciones de datos. También recibirás notificaciones sobre actualizaciones en tickets de soporte y otras actividades importantes de la cuenta.",
  
  "autenticación biométrica": "PASSWD soporta autenticación biométrica (huella dactilar o reconocimiento facial) en dispositivos compatibles. Esto te permite acceder a tus contraseñas de forma rápida y segura sin tener que introducir tu contraseña maestra cada vez. Esta característica se encuentra actualmente en desarrollo y estará disponible próximamente.",
  "huella dactilar": "La autenticación por huella dactilar es una característica de seguridad que permite desbloquear tu bóveda de contraseñas utilizando tu huella digital en dispositivos compatibles. Esta funcionalidad está actualmente en desarrollo y estará disponible pronto.",
  "reconocimiento facial": "El reconocimiento facial es una forma segura de acceder a tu cuenta sin introducir tu contraseña maestra. Esta característica utiliza la tecnología biométrica de tu dispositivo y está actualmente en desarrollo, con planes para implementarse próximamente en nuestra aplicación.",
  "biometría": "La autenticación biométrica en PASSWD utiliza las capacidades de seguridad integradas en tu dispositivo para permitir un acceso rápido y seguro a tus contraseñas. Actualmente, esta característica está en desarrollo y aparecerá marcada como 'En desarrollo' en nuestra página de características.",
  
  // Preguntas sobre suscripciones y precios
  "precio": "¡PASSWD es completamente gratuito! No existen planes de pago ni funciones premium. Todas las características están disponibles para todos los usuarios sin ningún tipo de limitación y sin publicidad. Es 100% gratuito para siempre.",
  "cuánto cuesta": "¡PASSWD es 100% gratuito! No tenemos planes de pago ni versiones premium. Todas las funcionalidades están disponibles para todos los usuarios sin ningún costo ni limitación.",
  "cuanto cuesta": "¡PASSWD es 100% gratuito! No tenemos planes de pago ni versiones premium. Todas las funcionalidades están disponibles para todos los usuarios sin ningún costo ni limitación.",
  "plan gratuito": "PASSWD es completamente gratuito. Ofrecemos todas nuestras funciones a todos los usuarios sin restricciones ni limitaciones. No existen planes de pago ni características bloqueadas.",
  "plan premium": "En PASSWD no creemos en planes premium ni en funcionalidades restringidas. Todo es 100% gratuito para todos los usuarios, incluyendo almacenamiento ilimitado, sincronización en todos tus dispositivos, autenticación de dos factores y todas las demás funcionalidades.",
  "diferencia entre gratuito y premium": "PASSWD no tiene ninguna diferencia entre versiones porque todo es 100% gratuito. No existen planes premium ni de pago. Todas las funcionalidades están disponibles para todos los usuarios sin limitaciones.",
  "cómo cancelar suscripción": "PASSWD es completamente gratuito. No hay suscripciones que cancelar porque no cobramos por ningún servicio. Todas las funcionalidades están disponibles sin ningún costo.",
  "como cancelar suscripcion": "PASSWD es completamente gratuito. No hay suscripciones que cancelar porque no cobramos por ningún servicio. Todas las funcionalidades están disponibles sin ningún costo.",
  "hay garantía": "PASSWD es 100% gratuito, por lo que no es necesaria ninguna garantía de devolución. No cobramos por ninguna funcionalidad ni servicio, todo está disponible de forma completamente gratuita para todos los usuarios.",
  
  // Preguntas técnicas
  "olvidé mi contraseña maestra": "Lo sentimos, pero debido a nuestro enfoque en la seguridad, no podemos recuperar tu contraseña maestra. Sin embargo, si configuraste una clave de recuperación, puedes usarla para restablecer tu contraseña maestra. Visita la página de inicio de sesión y selecciona 'Olvidé mi contraseña'.",
  "olvide mi contraseña maestra": "Lo sentimos, pero debido a nuestro enfoque en la seguridad, no podemos recuperar tu contraseña maestra. Sin embargo, si configuraste una clave de recuperación, puedes usarla para restablecer tu contraseña maestra. Visita la página de inicio de sesión y selecciona 'Olvidé mi contraseña'.",
  "cómo sincronizar dispositivos": "Para sincronizar tus dispositivos, simplemente inicia sesión con la misma cuenta en cada dispositivo. Tus contraseñas se sincronizarán automáticamente. Asegúrate de tener una conexión a internet activa para que la sincronización funcione correctamente.",
  "como sincronizar dispositivos": "Para sincronizar tus dispositivos, simplemente inicia sesión con la misma cuenta en cada dispositivo. Tus contraseñas se sincronizarán automáticamente. Asegúrate de tener una conexión a internet activa para que la sincronización funcione correctamente.",
  "problemas de sincronización": "Si experimentas problemas de sincronización, asegúrate de tener una conexión a internet estable. Cierra la aplicación y vuelve a abrirla. Si el problema persiste, verifica que estás usando la misma cuenta en todos los dispositivos.",
  "importar contraseñas": "PASSWD te permite importar contraseñas desde otros gestores como LastPass, 1Password, Dashlane, Chrome, Firefox y muchos más. Ve a Configuración > Importar datos y sigue las instrucciones para importar tus contraseñas existentes.",
  "exportar contraseñas": "Puedes exportar tus contraseñas desde Configuración > Exportar datos. Por razones de seguridad, te recomendamos eliminar el archivo de exportación después de usarlo y asegurarte de que nadie más tenga acceso a él.",
  
  // Preguntas sobre accesibilidad y plataformas
  "dispositivos compatibles": "PASSWD está disponible para Windows, macOS, Linux, iOS, Android y como extensión para los navegadores Chrome, Firefox, Safari y Edge.",
  "en qué dispositivos": "PASSWD está disponible para Windows, macOS, Linux, iOS, Android y como extensión para los navegadores Chrome, Firefox, Safari y Edge.",
  "en que dispositivos": "PASSWD está disponible para Windows, macOS, Linux, iOS, Android y como extensión para los navegadores Chrome, Firefox, Safari y Edge.",
  "cómo instalar la extensión": "Visita la tienda de extensiones de tu navegador (Chrome Web Store, Firefox Add-ons, etc.), busca 'PASSWD' e instala nuestra extensión oficial. Una vez instalada, inicia sesión con tu cuenta para acceder a tus contraseñas mientras navegas.",
  "como instalar la extension": "Visita la tienda de extensiones de tu navegador (Chrome Web Store, Firefox Add-ons, etc.), busca 'PASSWD' e instala nuestra extensión oficial. Una vez instalada, inicia sesión con tu cuenta para acceder a tus contraseñas mientras navegas.",
  "aplicación móvil": "Nuestra aplicación móvil está disponible en App Store para iOS y Google Play para Android. Ofrece todas las funcionalidades completamente gratis, incluyendo autorrelleno, desbloqueo biométrico y alertas de seguridad en tiempo real.",
  "aplicacion movil": "Nuestra aplicación móvil está disponible en App Store para iOS y Google Play para Android. Ofrece todas las funcionalidades completamente gratis, incluyendo autorrelleno, desbloqueo biométrico y alertas de seguridad en tiempo real.",
  
  // Preguntas de soporte
  "contactar soporte": "Puedes contactar con nuestro equipo de soporte a través del correo electrónico help@passwd.app o mediante el formulario de contacto en nuestra página web. Nuestro soporte está disponible para todos los usuarios de forma gratuita.",
  "contactar con soporte": "Puedes contactar con nuestro equipo de soporte a través del correo electrónico help@passwd.app o mediante el formulario de contacto en nuestra página web. Nuestro soporte está disponible para todos los usuarios de forma gratuita.",
  "tiempo de respuesta soporte": "Nuestro tiempo de respuesta habitual es de 24-48 horas. Todo nuestro soporte técnico es completamente gratuito para todos los usuarios.",
  "horario de soporte": "Nuestro equipo de soporte está disponible por correo electrónico 24/7 de forma completamente gratuita para todos los usuarios.",
  
  // Preguntas sobre privacidad y datos
  "política de privacidad": "PASSWD sigue una estricta política de privacidad. No vendemos ni compartimos tus datos con terceros. Solo recopilamos la información mínima necesaria para proporcionar nuestro servicio y mejorar tu experiencia. Puedes leer nuestra política de privacidad completa en nuestra web.",
  "politica de privacidad": "PASSWD sigue una estricta política de privacidad. No vendemos ni compartimos tus datos con terceros. Solo recopilamos la información mínima necesaria para proporcionar nuestro servicio y mejorar tu experiencia. Puedes leer nuestra política de privacidad completa en nuestra web.",
  "recopilan datos": "PASSWD recopila el mínimo de datos necesarios para funcionar: tu correo electrónico para la cuenta y métricas anónimas de uso para mejorar el servicio. Tus contraseñas están cifradas localmente y ni siquiera nuestro equipo puede acceder a ellas.",
  "eliminar cuenta": "Puedes eliminar tu cuenta desde la página 'Mi cuenta' > 'Eliminar cuenta'. Al hacerlo, se eliminarán todos tus datos almacenados en nuestros servidores. Te recomendamos exportar tus contraseñas antes de eliminar tu cuenta.",
  
  // Preguntas sobre funciones avanzadas
  "compartir contraseñas": "Todos los usuarios de PASSWD pueden compartir contraseñas de forma segura con amigos, familiares o compañeros de trabajo. Simplemente selecciona la contraseña, haz clic en 'Compartir' y elige con quién quieres compartirla. Puedes establecer permisos y revocar el acceso en cualquier momento. Esta función, como todas las demás, es completamente gratuita.",
  "generador de contraseñas": "PASSWD incluye un generador de contraseñas que crea contraseñas seguras y aleatorias. Puedes personalizar la longitud, incluir letras mayúsculas/minúsculas, números y símbolos según los requisitos de cada sitio web. Esta función es completamente gratuita, como todo en PASSWD.",
  "comprobador de seguridad": "Nuestra función de análisis de seguridad revisa tus contraseñas para identificar las que son débiles, reutilizadas o han aparecido en filtraciones de datos. Te proporciona recomendaciones específicas para mejorar tu seguridad. Como todo en PASSWD, esta función es 100% gratuita.",
};

// Función para buscar palabras clave en la pregunta del usuario
export async function getBotResponse(userMessage: string): Promise<string> {
  const normalizedMessage = userMessage.toLowerCase();
  
  // Buscar coincidencias en las respuestas predefinidas
  for (const [keyword, response] of Object.entries(predefinedResponses)) {
    if (normalizedMessage.includes(keyword)) {
      return response;
    }
  }
  
  // Respuestas para saludos
  if (normalizedMessage.match(/hola|buenos días|buenas tardes|buenas noches|hey|saludos/)) {
    return "¡Hola! Soy el asistente virtual de PASSWD. ¿En qué puedo ayudarte hoy?";
  }
  
  // Respuestas para agradecimientos
  if (normalizedMessage.match(/gracias|genial|excelente|perfecto|te lo agradezco/)) {
    return "¡De nada! Estoy aquí para ayudarte. ¿Hay algo más en lo que pueda asistirte?";
  }
  
  // Respuestas para despedidas
  if (normalizedMessage.match(/adiós|hasta luego|chao|nos vemos|bye/)) {
    return "¡Hasta pronto! Si tienes más preguntas, no dudes en volver a contactarme.";
  }
  
  // Respuesta para preguntas sobre demo o prueba
  if (normalizedMessage.match(/demo|prueba|probar|trial|versión de prueba/)) {
    return "PASSWD es completamente gratuito, no necesitas ninguna versión de prueba. Todas las funcionalidades están disponibles para todos los usuarios sin ningún costo. ¡Regístrate hoy mismo para comenzar!";
  }
  
  // Respuesta mejorada para preguntas sobre funciones/características
  if (normalizedMessage.match(/función|funciones|característica|características|puede hacer|puedes hacer/)) {
    return "PASSWD incluye: gestión de contraseñas, generación de contraseñas seguras, organización en carpetas, sistema de tickets de soporte, notificaciones, sincronización entre dispositivos, alertas de seguridad, y próximamente autenticación biométrica. Todas estas funciones son 100% gratuitas. ¿Te gustaría saber más sobre alguna función específica?";
  }
  
  // Respuesta por defecto si no hay coincidencias
  return "Lo siento, no tengo una respuesta específica para esa pregunta. ¿Podrías reformularla o preguntar sobre nuestras funcionalidades, seguridad o dispositivos compatibles? Recuerda que PASSWD es completamente gratuito, todas las funciones están disponibles para todos los usuarios sin ningún costo.";
} 