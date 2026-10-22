---
title: Cómo funciona
slug: como-funciona
description: Estaciones en puntos altos, una IA sobria y una plataforma de alertas para los bomberos.
menus:
  main:
    weight: 2
images:
  - view.jpg
build:
  publishResources: false
---

## Una solución completa

Pyronear es una **solución completa de gestión del riesgo de incendio**: **cámaras** instaladas en puntos altos, nuestras propias estaciones o cámaras ya instaladas, **detectan de forma temprana** los inicios de incendio gracias a una IA ligera e integrada. Los servicios de bomberos **reciben rápidamente** una alerta, que **analizan y evalúan** en nuestra plataforma de supervisión.

{{< youtube id="f2z8mvvggI0" title="Minidocumental sobre Pyronear" loading="lazy" >}}

*Un minidocumental sobre Pyronear, realizado por Fast Forward.*

![Visión general de la solución Pyronear](solution-en.png)

## La estación de detección

Nuestras estaciones se instalan en puntos altos (torres eléctricas, depósitos de agua, torres de vigilancia) con vistas a los espacios naturales. Suelen tener 2 cámaras PTZ de detección, que cubren el horizonte a 360°, y un microordenador del tamaño de una tarjeta de crédito. Captura regularmente una imagen por cámara y la analiza in situ con nuestro modelo de inteligencia artificial. Muy sobria en energía, la estación puede funcionar con un panel solar y se comunica por 4G.

- Detección hasta **25 km**. *Un récord a 72 km.*
- Hasta **2 horas de adelanto** sobre las primeras llamadas de emergencia
- Análisis in situ, **consumo muy bajo**, hardware estándar
- Compatible con **cámaras ya instaladas**: nuestra detección también puede conectarse a redes de cámaras existentes

Una estación se instala en menos de media jornada: [ver cómo]({{< relref "/deployments#installation" >}}).

![Funcionamiento de una estación de detección](model.png)

{{< gallery >}}
![Torre equipada con una estación Pyronear en el bosque de Fontainebleau](antenna.jpg)
![Cámaras instaladas en lo alto de la torre](cameras.jpg)
![La caja de la estación, que contiene el microordenador, la alimentación y la conexión 4G](hardware.jpg)
![El bosque visto desde lo alto de la torre](view.jpg)
{{< /gallery >}}

## Alertar y analizar

Cuando una cámara detecta humo, la estación pasa a modo de alerta: todas las imágenes de la cámara afectada se envían a nuestra base de datos a través de nuestra API. La alerta se notifica a los usuarios por varios canales, según sus necesidades, para que llegue lo antes posible y puedan evaluarla lo mejor posible. En nuestra plataforma, los operadores la confirman, controlan las cámaras a distancia y localizan el incendio por triangulación entre varias cámaras.

![Una alerta en curso: imágenes de la cámara y localización del incendio en el mapa](platform-alert.jpg)

*Por ejemplo, en abril de 2026, una estación detectó el primer incendio del año en el bosque de Fontainebleau, veinte minutos antes de la primera llamada de emergencia.*

## Prueba el modelo

Prueba nuestro modelo de detección en tu navegador: elige una imagen de cámara y mira cómo detecta el humo.

{{< hf-space "pyronear/Pyronear-Wildfire-Detection" "https://pyronear-pyronear-wildfire-detection.hf.space" >}}

## Open source

Todo nuestro trabajo se publica con licencia libre (Apache 2.0): el software de las estaciones, los modelos de IA y la plataforma. Cualquier servicio de bomberos, administración local o investigador puede reutilizarlo sin depender de un proveedor. Encuentra nuestro código en [GitHub](https://github.com/pyronear).

## ¿Por qué una base de datos abierta?

Nuestro algoritmo de detección es un **modelo de inteligencia artificial (IA)** entrenado en un gran número de **imágenes de incendios**. En otras palabras, el algoritmo ha sido entrenado para reconocer el humo y las llamas en numerosas situaciones y en diferentes territorios.

Para ello, **con la ayuda de nuestros socios y voluntarios**, estamos construyendo **un conjunto de datos** que compartimos en **open data**, para que las imágenes recogidas y anotadas puedan ser utilizadas por el mayor número posible de personas. De este modo, al poner en común estos recursos, aumentamos las posibilidades de preservar otro recurso: los bosques y las zonas naturales.

- [Ver el conjunto de datos en HuggingFace](https://huggingface.co/datasets/pyronear/pyro-sdis)
- [Nota jurídica para los servicios de bomberos que quieran compartir sus imágenes (en francés)](https://pyronear.notion.site/Notes-de-synth-se-FAQ-du-webinaire-open-data-DINUM-SDIS-MSP-18c425b63668806cb5dbc7a35d7452b4)

## Para saber más

Nuestro socio [EarthToolsMaker](https://www.earthtoolsmaker.org/) explica en detalle cómo mejoramos nuestros modelos (en inglés):

- [Smoke Is a Behavior: Inside Pyronear's Temporal Wildfire Detection Model](https://www.earthtoolsmaker.org/posts/smoke-is-a-behavior/)
- [Racing Models, Not Opinions: How We Ran Wildfire ML R&D for Pyronear](https://www.earthtoolsmaker.org/posts/racing-models-not-opinions/)
- [Protecting the Forest: Building an early forest fire detector](https://www.earthtoolsmaker.org/posts/protecting-the-forest-early-forest-fire-detector/)
