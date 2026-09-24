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

Pironear es un **solución completa de gestión de riesgos de incendio**. consiste en un **early algoritmo de detección de incendios forestales**, implementado en una microcomputadora, conectada a **cámaras colocadas en puntos altos** con vista al bosque. Nuestros detectores se comunican **alertas de incendios** a una base de datos que está conectada a un **plataforma de supervisión** para el cuerpo de bomberos.

{{< youtube id="f2z8mvvggI0" title="Minidocumental sobre Pyronear" loading="lazy" >}}

*Un minidocumental sobre Pyronear, realizado por Fast Forward.*

![Visión general de la solución Pyronear](solution-en.png)

## La estación de detección

Nuestras estaciones se instalan en puntos altos (torres eléctricas, depósitos de agua, torres de vigilancia) con vistas al bosque. Cámaras de alta resolución cubren el horizonte a 360° y un microordenador del tamaño de una tarjeta de crédito analiza las imágenes in situ con nuestro modelo de inteligencia artificial. Muy sobria en energía, la estación puede funcionar con un panel solar y se comunica por 4G.

- Detección de humo hasta **15 km**
- Hasta **2 horas de adelanto** sobre las primeras llamadas de emergencia
- Análisis in situ, **consumo muy bajo**, hardware estándar
- Récord: un inicio de incendio detectado a **42 km**

Una estación se instala en menos de media jornada: [ver cómo]({{< relref "/deployments#installation" >}}).

Nuestras torres de detección consisten en 4/5 cámaras de alta resolución y una microcomputadora. Capturamos una imagen por cámara a intervalos regulares y luego la analizamos localmente usando nuestro modelo de detección de incendios forestales. En caso de detección, se activa el modo de alerta, todas las imágenes provenientes de la cámara que detectó el incendio se envían a nuestra base de datos a través de nuestra api, el protocolo de comunicación que hemos desarrollado.

![Funcionamiento de una estación de detección](model.png)

{{< gallery >}}
![Torre equipada con una estación Pyronear en el bosque de Fontainebleau](antenna.jpg)
![Cámaras instaladas en lo alto de la torre](cameras.jpg)
![La caja de la estación: un microordenador, la alimentación y la conexión 4G](hardware.jpg)
![El bosque visto desde lo alto de la torre](view.jpg)
{{< /gallery >}}

## Menos falsas alarmas

Un humo incipiente puede parecerse a una nube, a niebla o a polvo. Para no alertar a los bomberos en vano, cada detección pasa por dos etapas:

1. **Detectar**: en cada imagen, nuestro modelo señala todo lo que parece humo.
2. **Confirmar**: el sistema sigue ese humo en varias imágenes. Un humo real se queda en el mismo sitio, crece y se desplaza lentamente, a diferencia de una nube.

Resultado: **4 veces menos falsas alarmas**, sin perder los incendios reales.

## La plataforma de alertas

Cuando una estación detecta humo, las imágenes se envían a nuestra plataforma web. Los operadores de los servicios de bomberos reciben la alerta en tiempo real: la confirman, controlan las cámaras y localizan el incendio por triangulación entre varias estaciones.

En abril de 2026, una estación detectó el primer incendio del año en el bosque de Fontainebleau, veinte minutos antes de la primera llamada de emergencia.

Lo que permite la plataforma:

- **Alertas en directo**: las alertas del día, con sus secuencias de imágenes para reproducir y ampliar.
- **Localización del incendio**: cuando varias cámaras ven el mismo humo, su posición aparece en el mapa.
- **Verificación remota**: tomar el control de una cámara a distancia (orientación, zoom, clic para centrar) para confirmar o descartar una alerta.
- **Etiquetado**: clasificar cada alerta como inicio de incendio, humo no relevante u otro falso positivo.
- **Máscaras**: ignorar un humo recurrente, como la chimenea de una fábrica.
- **Seguimiento de las cámaras**: el estado y la última imagen de cada cámara, con un aviso si una se desconecta.
- **Compartir e historial**: enviar una alerta a un compañero, encontrar alertas pasadas y exportarlas en CSV.

{{< gallery "screens" >}}
![Una alerta en curso: imágenes de la cámara y localización del incendio en el mapa](platform-alert.jpg)
![Etiquetado de una alerta](platform-annotation.jpg)
![Añadir una máscara para ignorar un humo recurrente](platform-masks.jpg)
![Vista de las cámaras con su última imagen](platform-cameras.jpg)
{{< /gallery >}}

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
