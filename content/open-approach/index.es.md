---
title: Enfoque abierto
slug: enfoque-abierto
description: "Nuestro código, modelos, datos y hardware son abiertos: un bien común para detectar incendios."
menus:
  main:
    weight: 6
build:
  publishResources: false
---

## Un común digital

> Un común es un recurso producido colectivamente por una comunidad de actores heterogéneos y gobernado por reglas que garantizan su supervivencia y su carácter abierto y compartido.
>
> — [IGN, enfoque geocommons](https://www.ign.fr/institut/la-demarche-geocommuns) (en francés)

En pocas palabras: un recurso que todos pueden usar y enriquecer, sin depender de un proveedor, como Wikipedia u OpenStreetMap. Pyronear aplica esta idea a la detección temprana de incendios: cada mejora, cada imagen anotada y cada aporte del terreno beneficia a todos los territorios.

## Qué es abierto

- **El código**: el software de las estaciones, la plataforma de alertas y las herramientas se publican con licencia libre (Apache 2.0). Cualquier servicio de bomberos, administración local o investigador puede reutilizarlos. [Ver en GitHub](https://github.com/pyronear)
- **Los modelos de IA**: nuestros modelos de detección están publicados. [Ver en Hugging Face](https://huggingface.co/pyronear)
- **Los datos**: un conjunto de datos de imágenes de cámaras anotadas por la comunidad de colaboradores, compartido como datos abiertos (Apache 2.0) para que las imágenes recopiladas sirvan al mayor número posible de personas. Más de 15 000 descargas. [Ver el conjunto de datos](https://huggingface.co/datasets/pyronear/pyro-sdis)
- **El hardware**: la lista de componentes y la configuración de nuestras estaciones son públicas, para que cualquiera pueda montarlas y desplegarlas. [Ver en GitHub](https://github.com/pyronear)
- **La investigación**: la ciencia abierta y la inteligencia colectiva son el mejor enfoque para resolver un problema complejo. Nuestros trabajos se realizan en colaboración y se publican. [Más información](#investigacion)

## Un marco jurídico favorable

En Francia, el marco jurídico favorece la apertura de los datos. Este marco se identificó con la DINUM, la dirección interministerial de lo digital. Lo aprovechamos: cuando un servicio de bomberos comparte sus imágenes, avanza todo el ecosistema, y la detección temprana se vuelve aún más accesible para todos los territorios.

Nuestra [nota jurídica para los servicios de bomberos (SDIS) que desean compartir sus imágenes](https://pyronear.notion.site/Notes-de-synth-se-FAQ-du-webinaire-open-data-DINUM-SDIS-MSP-18c425b63668806cb5dbc7a35d7452b4) explica cómo hacerlo (en francés).

## Una investigación abierta y colaborativa {#investigacion}

Fomentamos un enfoque de ciencia abierta: la investigación colaborativa es la mejor manera de resolver un problema complejo, gracias a la inteligencia colectiva.

**Ejemplo en Chile.** Trabajamos con el CENIA, el centro nacional de inteligencia artificial chileno: transferencia de conocimientos, luego formación en el montaje de las estaciones y en el despliegue del sistema para que sean autónomos, y publicación conjunta de trabajos de investigación ([leer el artículo](https://www.mdpi.com/2079-9292/15/12/2652)).

La investigación abierta facilita el intercambio de métodos y avances: nuestro socio [EarthToolsMaker](https://www.earthtoolsmaker.org/) cuenta en detalle cómo mejoramos nuestros modelos (en inglés):

- [Smoke Is a Behavior: Inside Pyronear's Temporal Wildfire Detection Model](https://www.earthtoolsmaker.org/posts/smoke-is-a-behavior/)
- [Racing Models, Not Opinions: How We Ran Wildfire ML R&D for Pyronear](https://www.earthtoolsmaker.org/posts/racing-models-not-opinions/)
- [Protecting the Forest: Building an early forest fire detector](https://www.earthtoolsmaker.org/posts/protecting-the-forest-early-forest-fire-detector/)

## Participar

Usar, adaptar, contribuir: todas las formas de unirte a nosotros están en la página [Actúa con nosotros]({{< relref "/support" >}}). ¿Eres un servicio de bomberos y quieres compartir imágenes? [Contáctanos](../#contact-form).
