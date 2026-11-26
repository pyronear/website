---
title: Comment ça marche
slug: comment-ca-marche
description: Des stations sur des points hauts, une IA sobre et une plateforme d'alerte pour les pompiers.
images:
  - view.jpg
solution:
  title: "Une solution complète"
station:
  title: "La station de détection"
  parts:
  - icon: camera
    title: "2 caméras PTZ"
    text: "Elles couvrent l'horizon à 360° depuis des pylônes, des châteaux d'eau et des tours de guet."
  - icon: grid
    title: "IA embarquée"
    text: "Un micro-ordinateur de la taille d'une carte de crédit analyse chaque image sur place."
  - icon: bolt
    title: "Sobre"
    text: "Très peu d'énergie et de bande passante, sur du matériel standard en 4G. Au besoin, un panneau solaire et une batterie la rendent autonome."
  stats:
  - icon: pin
    value: "20 km"
    label: "Détection fiable. Un record à 72 km."
  - icon: clock
    value: "2 h"
    label: "Jusqu'à 2 heures d'avance sur les premiers appels au 18."
  - icon: wrench
    value: "< ½ journée"
    label: "Pour installer une station."
  extra: "Compatible avec des caméras déjà en place : notre détection peut se connecter à des réseaux de caméras existants."
  install: "Voir comment s'installe une station"
  photos:
  - file: antenna.jpg
    caption: "Pylône équipé d'une station Pyronear en forêt de Fontainebleau"
  - file: cameras.jpg
    caption: "Caméras installées en haut du pylône"
  - file: hardware.jpg
    caption: "Le boîtier de la station : micro-ordinateur, alimentation et connexion 4G"
alert:
  title: "Alerter et analyser"
  shot: "Une alerte en cours : images de la caméra et localisation du feu sur la carte"
  intro: "Être informé vite, et pouvoir qualifier le risque tout aussi vite."
  items:
  - icon: bell
    title: "Alerte rapide"
    text: "Dès la détection, notre API diffuse l'alerte sur les canaux de notification choisis par les utilisateurs."
  - icon: pin
    title: "Images et localisation"
    text: "Chaque alerte arrive avec sa séquence d'images et la position du départ de feu sur la carte."
  - icon: shield
    title: "Levée de doute"
    text: "Les opérateurs prennent la main sur la station à distance : vue en direct et zoom sur la fumée."
  example:
    value: "20 min"
    text: "En avril 2026, une station a repéré le premier feu de l'année en forêt de Fontainebleau, vingt minutes avant le premier appel au 18. Un gain de temps que nous constatons régulièrement."
---

{{< solution >}}

{{< youtube id="f2z8mvvggI0" title="Mini-documentaire sur Pyronear" loading="lazy" >}}

*Mini-documentaire sur Pyronear, réalisé par Fast Forward.*

{{< station >}}

{{< alert >}}

## Essayer le modèle

Testez notre modèle de détection dans votre navigateur : donnez-lui une vidéo ou une séquence d'images de caméra, ou à défaut une simple image, et regardez-le repérer les fumées.

{{< compare before="model-input.jpg" beforeCaption="Image de la caméra" after="model-output.jpg" afterCaption="Détection" >}}

{{< hf-space "pyronear/Pyronear-Wildfire-Detection" "https://pyronear-pyronear-wildfire-detection.hf.space" >}}

## Une démarche ouverte

Code, modèles, données et matériel : tout ce que nous construisons est ouvert. [Retrouvez notre démarche ouverte]({{< relref "/open-approach" >}}).
