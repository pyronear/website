---
title: Cómo funciona
slug: como-funciona
description: Estaciones en puntos altos, una IA sobria y una plataforma de alertas para los bomberos.
images:
  - view.jpg
---

## Una solución completa

Pyronear es una **solución completa de gestión del riesgo de incendio**: **cámaras** instaladas en puntos altos, nuestras propias estaciones o cámaras ya instaladas, **detectan de forma temprana** los inicios de incendio gracias a una IA ligera e integrada. Los servicios de bomberos **reciben rápidamente** una alerta, que **analizan y evalúan** en nuestra plataforma de supervisión.

{{< youtube id="f2z8mvvggI0" title="Minidocumental sobre Pyronear" loading="lazy" >}}

*Un minidocumental sobre Pyronear, realizado por Fast Forward.*

![Visión general de la solución Pyronear](solution-en.png)

## La estación de detección

Nuestras estaciones se instalan en puntos altos (torres eléctricas, depósitos de agua, torres de vigilancia) con vistas a los espacios naturales. Suelen tener 2 cámaras PTZ de detección, que cubren el horizonte a 360°, y un microordenador del tamaño de una tarjeta de crédito. Captura regularmente una imagen por cámara y la analiza in situ con nuestro modelo de inteligencia artificial. Muy sobria en energía, la estación puede funcionar con un panel solar y se comunica por 4G.

- Detección fiable hasta **20 km**. *Un récord a 72 km.*
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

## Un enfoque abierto

Código, modelos, datos y hardware: todo lo que construimos es abierto. [Descubre nuestro enfoque abierto]({{< relref "/open-approach" >}}).
