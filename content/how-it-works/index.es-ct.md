---
title: Com funciona
slug: com-funciona
description: Estacions en punts alts, una IA sòbria i una plataforma d'alertes per als bombers.
menus:
  main:
    weight: 2
---

## Una solució completa

Pyronear és un **solució completa de gestió del risc d'incendi**. Consta d'un **algorisme de detecció precoç d'incendis forestals**, implementat en un microordinador, connectat a **càmeres col·locades en punts alts** amb vistes al bosc. Els nostres detectors es comuniquen **alertes d'incendi** a una base de dades connectada a **plataforma de supervisió** per al cos de bombers.

![Visió general de la solució Pyronear](solution-en.png)

## L'estació de detecció

Les nostres estacions s'instal·len en punts alts (torres elèctriques, dipòsits d'aigua, torres de guaita) amb vista al bosc. Càmeres d'alta resolució cobreixen l'horitzó a 360° i un microordinador de la mida d'una targeta de crèdit analitza les imatges in situ amb el nostre model d'intel·ligència artificial. Molt sòbria en energia, l'estació pot funcionar amb un panell solar i es comunica per 4G.

- Detecció de fum fins a **15 km**
- Fins a **2 hores d'avançament** sobre les primeres trucades d'emergència
- Anàlisi in situ, **consum molt baix**, maquinari estàndard

Les nostres torres de detecció estan formades per 4/5 càmeres d'alta resolució i un micro ordinador. Capturem una imatge per càmera a intervals regulars i després l'analitzem localment mitjançant el nostre model de detecció d'incendis forestals. En cas de detecció, s'activa el mode d'alerta, totes les imatges procedents de la càmera després d'haver detectat l'incendi s'envien a la nostra base de dades a través de la nostra API, el protocol de comunicació que hem desenvolupat.

![Funcionament d'una estació de detecció](model.png)

## La plataforma d'alertes

Quan una estació detecta fum, les imatges s'envien a la nostra plataforma web. Els operadors dels serveis de bombers reben l'alerta en temps real: la confirmen, controlen les càmeres i localitzen l'incendi per triangulació entre diverses estacions.

L'abril del 2026, una estació va detectar el primer incendi de l'any al bosc de Fontainebleau, vint minuts abans de la primera trucada d'emergència.

## Open source

Tota la nostra feina es publica amb llicència lliure (Apache 2.0): el programari de les estacions, els models d'IA i la plataforma. Qualsevol servei de bombers, administració local o investigador la pot reutilitzar sense dependre d'un proveïdor. Trobeu el nostre codi a [GitHub](https://github.com/pyronear).

## Per què un conjunt de dades obertes?

El nostre algorisme de detecció és un **model d'intel·ligència artificial (IA)** entrenat en nombroses **imatges d'inici de foc**. És a dir, l'algorisme ha estat entrenat per reconèixer el fum i les flames. en moltes situacions i en diferents territoris.

Amb aquesta finalitat, estem construint **amb l'ajuda dels nostres socis i voluntaris**, un **conjunt de dades** que compartim en **dades obertes**, en per tal que les imatges recollides i anotades puguin ser utilitzades per tantes persones com sigui possible. Així, posant en comú aquests recursos, augmentem les possibilitats de preservar un altre recurs, boscos i espais naturals

L'octubre del 2025 vam publicar PYRONEAR-2025, el conjunt de dades obert més gran del món sobre detecció d'incendis: 50.000 imatges de 640 incendis en 4 països.

- [Trobeu el conjunt de dades a HuggingFace](https://huggingface.co/datasets/pyronear/pyro-sdis)
- [Nota jurídica per als serveis de bombers que vulguin compartir les seves imatges (en francès)](https://pyronear.notion.site/Notes-de-synth-se-FAQ-du-webinaire-open-data-DINUM-SDIS-MSP-18c425b63668806cb5dbc7a35d7452b4)
