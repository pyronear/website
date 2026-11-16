---
title: Com funciona
slug: com-funciona
description: Estacions en punts alts, una IA sòbria i una plataforma d'alertes per als bombers.
images:
  - view.jpg
solution:
  title: "Una solució completa"
station:
  title: "L'estació de detecció"
  parts:
  - icon: camera
    title: "2 càmeres PTZ"
    text: "Cobreixen l'horitzó a 360° des de torres, dipòsits d'aigua i torres de guaita."
  - icon: grid
    title: "IA integrada"
    text: "Un microordinador de la mida d'una targeta de crèdit analitza cada imatge in situ."
  - icon: bolt
    title: "Sòbria"
    text: "Molt poca energia i amplada de banda, amb maquinari estàndard i 4G. Si cal, un panell solar i una bateria la fan autònoma."
  stats:
  - icon: pin
    value: "20 km"
    label: "Detecció fiable. Un rècord a 72 km."
  - icon: clock
    value: "2 h"
    label: "Fins a 2 hores d'avançament sobre les primeres trucades d'emergència."
  - icon: wrench
    value: "< ½ jornada"
    label: "Per instal·lar una estació."
  extra: "Compatible amb càmeres ja instal·lades: la nostra detecció es pot connectar a xarxes de càmeres existents."
  install: "Veure com s'instal·la una estació"
  photos:
  - file: antenna.jpg
    caption: "Torre equipada amb una estació Pyronear al bosc de Fontainebleau"
  - file: cameras.jpg
    caption: "Càmeres instal·lades a dalt de la torre"
  - file: hardware.jpg
    caption: "La caixa de l'estació: microordinador, alimentació i connexió 4G"
alert:
  title: "Alertar i analitzar"
  shot: "Una alerta en curs: imatges de la càmera i localització de l'incendi al mapa"
  intro: "Estar informat ràpid i poder qualificar el risc igual de ràpid."
  items:
  - icon: bell
    title: "Alerta ràpida"
    text: "Tan bon punt es detecta fum, la nostra API difon l'alerta pels canals de notificació triats pels usuaris."
  - icon: pin
    title: "Imatges i ubicació"
    text: "Cada alerta arriba amb la seva seqüència d'imatges i la posició de l'inici d'incendi al mapa."
  - icon: shield
    title: "Confirmació"
    text: "Els operadors prenen el control de l'estació a distància: vista en directe i zoom sobre el fum."
  example:
    value: "20 min"
    text: "L'abril del 2026, una estació va detectar el primer incendi de l'any al bosc de Fontainebleau, vint minuts abans de la primera trucada d'emergència. Un guany de temps que constatem regularment."
---

{{< solution >}}

{{< youtube id="f2z8mvvggI0" title="Minidocumental sobre Pyronear" loading="lazy" >}}

*Un minidocumental sobre Pyronear, realitzat per Fast Forward.*

{{< station >}}

{{< alert >}}

## Prova el model

Prova el nostre model de detecció al navegador: dona-li un vídeo o una seqüència d'imatges de càmera, o si no una sola imatge, i mira com detecta el fum.

{{< compare before="model-input.jpg" beforeCaption="Imatge de la càmera" after="model-output.jpg" afterCaption="Detecció" >}}

{{< hf-space "pyronear/Pyronear-Wildfire-Detection" "https://pyronear-pyronear-wildfire-detection.hf.space" >}}

## Un enfocament obert

Codi, models, dades i maquinari: tot el que construïm és obert. [Descobreix el nostre enfocament obert]({{< relref "/open-approach" >}}).
