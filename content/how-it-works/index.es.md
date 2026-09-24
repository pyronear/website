---
title: Cómo funciona
slug: como-funciona
description: Estaciones en puntos altos, una IA sobria y una plataforma de alertas para los bomberos.
menus:
  main:
    weight: 2
---

## Una solución completa

Pironear es un **solución completa de gestión de riesgos de incendio**. consiste en un **early algoritmo de detección de incendios forestales**, implementado en una microcomputadora, conectada a **cámaras colocadas en puntos altos** con vista al bosque. Nuestros detectores se comunican **alertas de incendios** a una base de datos que está conectada a un **plataforma de supervisión** para el cuerpo de bomberos.

![Visión general de la solución Pyronear](/img/solution-en.png)

## La estación de detección

Nuestras estaciones se instalan en puntos altos (torres eléctricas, depósitos de agua, torres de vigilancia) con vistas al bosque. Cámaras de alta resolución cubren el horizonte a 360° y un microordenador del tamaño de una tarjeta de crédito analiza las imágenes in situ con nuestro modelo de inteligencia artificial. Muy sobria en energía, la estación puede funcionar con un panel solar y se comunica por 4G.

- Detección de humo hasta **15 km**
- Hasta **2 horas de adelanto** sobre las primeras llamadas de emergencia
- Análisis in situ, **consumo muy bajo**, hardware estándar

Nuestras torres de detección consisten en 4/5 cámaras de alta resolución y una microcomputadora. Capturamos una imagen por cámara a intervalos regulares y luego la analizamos localmente usando nuestro modelo de detección de incendios forestales. En caso de detección, se activa el modo de alerta, todas las imágenes provenientes de la cámara que detectó el incendio se envían a nuestra base de datos a través de nuestra api, el protocolo de comunicación que hemos desarrollado.

![Funcionamiento de una estación de detección](/img/model.png)

## La plataforma de alertas

Cuando una estación detecta humo, las imágenes se envían a nuestra plataforma web. Los operadores de los servicios de bomberos reciben la alerta en tiempo real: la confirman, controlan las cámaras y localizan el incendio por triangulación entre varias estaciones.

En abril de 2026, una estación detectó el primer incendio del año en el bosque de Fontainebleau, veinte minutos antes de la primera llamada de emergencia.

## Open source

Todo nuestro trabajo se publica con licencia libre (Apache 2.0): el software de las estaciones, los modelos de IA y la plataforma. Cualquier servicio de bomberos, administración local o investigador puede reutilizarlo sin depender de un proveedor. Encuentra nuestro código en [GitHub](https://github.com/pyronear).

## ¿Por qué una base de datos abierta?

Nuestro algoritmo de detección es un **modelo de inteligencia artificial (IA)** entrenado en un gran número de **imágenes de incendios**. En otras palabras, el algoritmo ha sido entrenado para reconocer el humo y las llamas en numerosas situaciones y en diferentes territorios.

Para ello, **con la ayuda de nuestros socios y voluntarios**, estamos construyendo **un conjunto de datos** que compartimos en **open data**, para que las imágenes recogidas y anotadas puedan ser utilizadas por el mayor número posible de personas. De este modo, al poner en común estos recursos, aumentamos las posibilidades de preservar otro recurso: los bosques y las zonas naturales.

En octubre de 2025 publicamos PYRONEAR-2025, el mayor conjunto de datos abierto del mundo sobre detección de incendios: 50 000 imágenes de 640 incendios en 4 países.

- [Ver el conjunto de datos en HuggingFace](https://huggingface.co/datasets/pyronear/pyro-sdis)
- [Nota jurídica para los servicios de bomberos que quieran compartir sus imágenes (en francés)](https://pyronear.notion.site/Notes-de-synth-se-FAQ-du-webinaire-open-data-DINUM-SDIS-MSP-18c425b63668806cb5dbc7a35d7452b4)
