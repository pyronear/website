---
title: Cómo funciona
slug: como-funciona
description: Estaciones en puntos altos, una IA sobria y una plataforma de alertas para los bomberos.
# The opening's camera feed: step 3 (the operator takes the camera by hand) and step 4 (the engines leave)
feed:
  manual: "Control manual"
  dispatch:
    title: "Incendio confirmado"
    time: "07:47"
    label: "Medios movilizados"
    units: ["Autobomba 1", "Autobomba 2"]
    status: "En camino"
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
    label: "Detección fiable. Un récord a 35 km."
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
    text: "En cuanto se detecta humo, la alerta llega a la central y a los canales elegidos por cada servicio, sin depender de una sola aplicación. La plataforma está pensada para conectarse a nexSIS, el sistema de información de los bomberos franceses."
  - icon: pin
    title: "Imágenes y ubicación"
    text: "Cada alerta llega con su secuencia de imágenes y la posición aproximada del inicio de incendio en el mapa."
  - icon: shield
    title: "Confirmación"
    text: "Los operadores toman el control de la estación a distancia: vista en directo y zoom sobre el humo."
  example:
    value: "20 min"
    text: "En abril de 2026, una estación detectó el primer incendio del año en el bosque de Fontainebleau, veinte minutos antes de la primera llamada de emergencia. Una ventaja de tiempo que constatamos con regularidad."
---

{{< youtube id="f2z8mvvggI0" title="Minidocumental sobre Pyronear" loading="lazy" >}}

*Un minidocumental sobre Pyronear, realizado por Fast Forward.*

{{< station >}}

{{< alert >}}

## Prueba el modelo

Prueba nuestro modelo de detección en tu navegador: dale un vídeo o una secuencia de imágenes de cámara, o en su defecto una sola imagen, y mira cómo detecta el humo.

{{< hf-space space="pyronear/Pyronear-Wildfire-Detection" src="https://pyronear-pyronear-wildfire-detection.hf.space" image="model-input.jpg" label="Humo" box="22.8 69.3 11.8 16.7" caption="Imagen real de una cámara Pyronear en los Alpes Marítimos: el modelo detecta un hilo de humo apenas visible." >}}

## Un enfoque abierto

Código, modelos, datos y hardware: todo lo que construimos es abierto. [Descubre nuestro enfoque abierto]({{< relref "/open-approach" >}}).
