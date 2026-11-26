---
title: Preguntas frecuentes
slug: preguntas-frecuentes
description: "Detección, alerta, despliegue, coste, apertura: respuestas a las preguntas que nos hacen los servicios de bomberos."
groups:
- title: "La detección"
  items:
  - q: "¿Cómo detecta Pyronear un inicio de incendio?"
    a: "Una estación instalada en un punto alto (torre, depósito de agua, torre de vigilancia) lleva dos cámaras PTZ que cubren el horizonte a 360°. Un microordenador del tamaño de una tarjeta de crédito analiza cada imagen in situ y detecta el humo. El modelo sigue el humo en una secuencia de imágenes, no en una imagen aislada."
    page: /how-it-works
    link: "Ver cómo funciona"
  - q: "¿A qué distancia se detecta el humo?"
    a: "La detección es fiable hasta 20 km, con un récord a 35 km. El alcance real depende del relieve: por eso cada despliegue empieza con un estudio de cobertura que elige los puntos altos."
  - q: "¿Cuánto tiempo se gana?"
    a: "Hasta 2 horas de adelanto sobre las primeras llamadas de emergencia. En abril de 2026, una estación detectó el primer incendio del año en el bosque de Fontainebleau veinte minutos antes de la primera llamada."
  - q: "¿Podemos usar las cámaras que ya tenemos?"
    a: "Sí. Nuestra detección puede conectarse a redes de cámaras existentes. Donde no las hay, instalamos estaciones completas."
  - q: "¿Qué necesita una estación para funcionar?"
    a: "Un punto alto, muy poca energía y una conexión 4G. El hardware es estándar. Donde no hay corriente, un panel solar y una batería hacen la estación autónoma."
- title: "La alerta"
  items:
  - q: "¿Quién recibe la alerta, y cómo?"
    a: "En cuanto se detecta humo, la alerta llega a la central y a los canales elegidos por cada servicio, sin depender de una sola aplicación. La plataforma está pensada para conectarse a nexSIS, el sistema de información de los bomberos franceses."
  - q: "¿Cómo comprobar que se trata realmente de un incendio?"
    a: "Cada alerta llega con su secuencia de imágenes y la posición aproximada del inicio de incendio en el mapa. Los operadores pueden tomar el control de la estación a distancia, en vista directa, y hacer zoom sobre el humo para confirmarlo."
  - q: "¿Y las falsas alertas?"
    a: "Las reducimos de forma continua. El modelo juzga el humo a lo largo del tiempo y no en una sola imagen, lo que descarta gran parte de las falsas alertas. Los comentarios de los operadores y las imágenes anotadas por nuestros voluntarios sirven para entrenarlo, temporada tras temporada."
- title: "El despliegue"
  items:
  - q: "¿Cómo es un despliegue?"
    a: "En tres pasos, con los equipos locales: un estudio de cobertura elige los puntos altos que mejor protegen las zonas de riesgo con el menor número de estaciones; la instalación lleva menos de media jornada por estación; los operadores se forman en la plataforma de alerta."
    page: /deployments
    link: "Ver nuestros despliegues"
  - q: "¿Quién instala las estaciones?"
    a: "Un profesional autorizado, o el propio servicio. En junio de 2026, los bomberos de Essonne (SDIS 91) instalaron por su cuenta dos nuevas estaciones en un día."
  - q: "¿Qué seguimiento hay después de la instalación?"
    a: "Acompañamos a los equipos toda la temporada: formación y respuestas a las preguntas de los operadores, mantenimiento y mejoras del sistema guiadas por sus comentarios. El sistema está diseñado para recuperarse solo, con procedimientos claros cuando hay que intervenir."
  - q: "¿Cuánto cuesta?"
    a: "Depende del número de puntos altos que haya que equipar y de las cámaras ya instaladas. Gracias a una I+D voluntaria y a un modelo sin ánimo de lucro, nuestros precios son muy competitivos. Algunos mecenas también financian estaciones para servicios con pocos medios, como el Crédit Agricole d'Île-de-France para bomberos franceses. Escríbanos para una estimación."
  - q: "¿Dónde está ya desplegado Pyronear?"
    a: "Más de 150 cámaras vigilan en Francia, con 9 servicios de bomberos socios, y en 6 países, entre ellos España, Chile y Argentina."
    page: /deployments
    link: "Ver el mapa"
- title: "Apertura y continuidad"
  items:
  - q: "¿Por qué código abierto, y qué cambia para un servicio?"
    a: "El código de las estaciones y de la plataforma tiene licencia libre (Apache 2.0), sin coste de licencia, igual que nuestros modelos y la lista del hardware. No depende de ningún proveedor: cualquier servicio, entidad local o investigador puede reutilizar, verificar y mejorar la herramienta. Y si Pyronear se detuviera, todo seguiría siendo público."
    page: /open-approach
    link: "Nuestro enfoque abierto"
  - q: "¿Dónde se alojan nuestros datos?"
    a: "La plataforma de alertas y las imágenes se alojan en nubes francesas. También podemos desplegar en la infraestructura de su servicio."
  - q: "¿Las cámaras graban a personas?"
    a: "No. Desde un punto alto, las cámaras miran el bosque a lo lejos: a esa distancia, las imágenes no permiten identificar ni personas ni matrículas."
  - q: "¿Qué pasa con las imágenes de nuestras cámaras?"
    a: "Compartirlas es decisión de cada servicio. Las imágenes compartidas y anotadas se suman a un conjunto de datos abierto que mejora la detección en todos los territorios. El marco jurídico, identificado con la DINUM (la agencia digital del Gobierno francés), se explica en nuestro resumen del webinario de datos abiertos organizado con la DINUM para los bomberos."
    page: /open-approach
    link: "Leer sobre el enfoque abierto"
  - q: "¿Quién está detrás de Pyronear?"
    a: "Una asociación francesa sin ánimo de lucro y de interés general, con sede en París y creada en 2020. Han contribuido más de 150 voluntarios: científicos de datos, desarrolladores, diseñadores y bomberos."
    page: /about
    link: "Sobre nosotros"
cta:
  title: "¿Otra pregunta?"
  text: "Servicios de bomberos, entidades locales, gestores forestales: le respondemos."
---
