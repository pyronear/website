---
title: Cómo funciona
slug: como-funciona
description: Estaciones en puntos altos, una IA sobria y una plataforma de alertas para los bomberos.
images:
  - view.jpg
solution:
  title: "Una solución completa"
station:
  title: "La estación de detección"
  parts:
  - icon: camera
    title: "2 cámaras PTZ"
    text: "Cubren el horizonte a 360° desde torres, depósitos de agua y torres de vigilancia."
  - icon: grid
    title: "IA integrada"
    text: "Un microordenador del tamaño de una tarjeta de crédito analiza cada imagen in situ."
  - icon: bolt
    title: "Sobria"
    text: "Muy poca energía y ancho de banda, con hardware estándar y 4G. Si hace falta, un panel solar y una batería la hacen autónoma."
  stats:
  - icon: pin
    value: "20 km"
    label: "Detección fiable. Un récord a 72 km."
  - icon: clock
    value: "2 h"
    label: "Hasta 2 horas de adelanto sobre las primeras llamadas de emergencia."
  - icon: wrench
    value: "< ½ jornada"
    label: "Para instalar una estación."
  extra: "Compatible con cámaras ya instaladas: nuestra detección puede conectarse a redes de cámaras existentes."
  install: "Ver cómo se instala una estación"
  photos:
  - file: antenna.jpg
    caption: "Torre equipada con una estación Pyronear en el bosque de Fontainebleau"
  - file: cameras.jpg
    caption: "Cámaras instaladas en lo alto de la torre"
  - file: hardware.jpg
    caption: "La caja de la estación: microordenador, alimentación y conexión 4G"
alert:
  title: "Alertar y analizar"
  shot: "Una alerta en curso: imágenes de la cámara y localización del incendio en el mapa"
  intro: "Estar informado rápido y poder evaluar el riesgo igual de rápido."
  items:
  - icon: bell
    title: "Alerta rápida"
    text: "En cuanto se detecta humo, nuestra API difunde la alerta por los canales de notificación elegidos por los usuarios."
  - icon: pin
    title: "Imágenes y ubicación"
    text: "Cada alerta llega con su secuencia de imágenes y la posición del inicio de incendio en el mapa."
  - icon: shield
    title: "Confirmación"
    text: "Los operadores toman el control de la estación a distancia: vista en directo y zoom sobre el humo."
  example:
    value: "20 min"
    text: "En abril de 2026, una estación detectó el primer incendio del año en el bosque de Fontainebleau, veinte minutos antes de la primera llamada de emergencia. Una ventaja de tiempo que constatamos con regularidad."
---

{{< solution >}}

{{< youtube id="f2z8mvvggI0" title="Minidocumental sobre Pyronear" loading="lazy" >}}

*Un minidocumental sobre Pyronear, realizado por Fast Forward.*

{{< station >}}

{{< alert >}}

## Prueba el modelo

Prueba nuestro modelo de detección en tu navegador: dale un vídeo o una secuencia de imágenes de cámara, o en su defecto una sola imagen, y mira cómo detecta el humo.

{{< compare before="model-input.jpg" beforeCaption="Imagen de la cámara" after="model-output.jpg" afterCaption="Detección" >}}

{{< hf-space "pyronear/Pyronear-Wildfire-Detection" "https://pyronear-pyronear-wildfire-detection.hf.space" >}}

## Un enfoque abierto

Código, modelos, datos y hardware: todo lo que construimos es abierto. [Descubre nuestro enfoque abierto]({{< relref "/open-approach" >}}).
