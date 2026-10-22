---
title: Com funciona
slug: com-funciona
description: Estacions en punts alts, una IA sòbria i una plataforma d'alertes per als bombers.
menus:
  main:
    weight: 2
images:
  - view.jpg
build:
  publishResources: false
---

## Una solució completa

Pyronear és una **solució completa de gestió del risc d'incendi**: **càmeres** instal·lades en punts alts, les nostres pròpies estacions o càmeres ja instal·lades, **detecten de manera precoç** els inicis d'incendi gràcies a una IA lleugera i integrada. Els serveis de bombers **reben ràpidament** una alerta, que **analitzen i qualifiquen** a la nostra plataforma de supervisió.

{{< youtube id="f2z8mvvggI0" title="Minidocumental sobre Pyronear" loading="lazy" >}}

*Un minidocumental sobre Pyronear, realitzat per Fast Forward.*

![Visió general de la solució Pyronear](solution-en.png)

## L'estació de detecció

Les nostres estacions s'instal·len en punts alts (torres elèctriques, dipòsits d'aigua, torres de guaita) amb vista als espais naturals. Solen tenir 2 càmeres PTZ de detecció, que cobreixen l'horitzó a 360°, i un microordinador de la mida d'una targeta de crèdit. Captura regularment una imatge per càmera i l'analitza in situ amb el nostre model d'intel·ligència artificial. Molt sòbria en energia, l'estació pot funcionar amb un panell solar i es comunica per 4G.

- Detecció fins a **25 km**. *Un rècord a 72 km.*
- Fins a **2 hores d'avançament** sobre les primeres trucades d'emergència
- Anàlisi in situ, **consum molt baix**, maquinari estàndard
- Compatible amb **càmeres ja instal·lades**: la nostra detecció també es pot connectar a xarxes de càmeres existents

Una estació s'instal·la en menys de mitja jornada: [vegeu com]({{< relref "/deployments#installation" >}}).

![Funcionament d'una estació de detecció](model.png)

{{< gallery >}}
![Torre equipada amb una estació Pyronear al bosc de Fontainebleau](antenna.jpg)
![Càmeres instal·lades a dalt de la torre](cameras.jpg)
![La caixa de l'estació, que conté el microordinador, l'alimentació i la connexió 4G](hardware.jpg)
![El bosc vist des de dalt de la torre](view.jpg)
{{< /gallery >}}

## Alertar i analitzar

Quan una càmera detecta fum, l'estació passa a mode d'alerta: totes les imatges de la càmera afectada s'envien a la nostra base de dades a través de la nostra API. L'alerta es notifica als usuaris per diversos canals, segons les seves necessitats, perquè arribi com més aviat millor i la puguin qualificar el millor possible. A la nostra plataforma, els operadors la confirmen, controlen les càmeres a distància i localitzen l'incendi per triangulació entre diverses càmeres.

![Una alerta en curs: imatges de la càmera i localització de l'incendi al mapa](platform-alert.jpg)

*Per exemple, l'abril del 2026, una estació va detectar el primer incendi de l'any al bosc de Fontainebleau, vint minuts abans de la primera trucada d'emergència.*

## Prova el model

Prova el nostre model de detecció al navegador: tria una imatge de càmera i mira com detecta el fum.

{{< hf-space "pyronear/Pyronear-Wildfire-Detection" "https://pyronear-pyronear-wildfire-detection.hf.space" >}}

## Open source

Tota la nostra feina es publica amb llicència lliure (Apache 2.0): el programari de les estacions, els models d'IA i la plataforma. Qualsevol servei de bombers, administració local o investigador la pot reutilitzar sense dependre d'un proveïdor. Trobeu el nostre codi a [GitHub](https://github.com/pyronear).

## Per què un conjunt de dades obertes?

El nostre algorisme de detecció és un **model d'intel·ligència artificial (IA)** entrenat en nombroses **imatges d'inici de foc**. És a dir, l'algorisme ha estat entrenat per reconèixer el fum i les flames. en moltes situacions i en diferents territoris.

Amb aquesta finalitat, estem construint **amb l'ajuda dels nostres socis i voluntaris**, un **conjunt de dades** que compartim en **dades obertes**, en per tal que les imatges recollides i anotades puguin ser utilitzades per tantes persones com sigui possible. Així, posant en comú aquests recursos, augmentem les possibilitats de preservar un altre recurs, boscos i espais naturals

- [Trobeu el conjunt de dades a HuggingFace](https://huggingface.co/datasets/pyronear/pyro-sdis)
- [Nota jurídica per als serveis de bombers que vulguin compartir les seves imatges (en francès)](https://pyronear.notion.site/Notes-de-synth-se-FAQ-du-webinaire-open-data-DINUM-SDIS-MSP-18c425b63668806cb5dbc7a35d7452b4)

## Per saber-ne més

El nostre soci [EarthToolsMaker](https://www.earthtoolsmaker.org/) explica en detall com hem millorat els nostres models (en anglès):

- [Smoke Is a Behavior: Inside Pyronear's Temporal Wildfire Detection Model](https://www.earthtoolsmaker.org/posts/smoke-is-a-behavior/)
- [Racing Models, Not Opinions: How We Ran Wildfire ML R&D for Pyronear](https://www.earthtoolsmaker.org/posts/racing-models-not-opinions/)
- [Protecting the Forest: Building an early forest fire detector](https://www.earthtoolsmaker.org/posts/protecting-the-forest-early-forest-fire-detector/)
