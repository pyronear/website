---
title: Comment ça marche
slug: comment-ca-marche
description: Des stations sur des points hauts, une IA sobre et une plateforme d'alerte pour les pompiers.
images:
  - view.jpg
solution:
  title: "Une solution complète"
  stages:
  - icon: camera
    title: "Station de détection"
    text: "Des caméras sur des points hauts détectent les départs de feu grâce à une IA légère et embarquée."
  - icon: bell
    title: "Alerte"
    text: "Images et alerte parviennent vite aux utilisateurs, par plusieurs canaux."
  - icon: pin
    title: "Plateforme"
    text: "Les services d'incendie analysent et qualifient l'alerte sur notre plateforme de supervision."
video:
  id: f2z8mvvggI0
  title: "Mini-documentaire sur Pyronear"
  caption: "Mini-documentaire sur Pyronear, réalisé par Fast Forward."
station:
  title: "La station de détection"
  parts:
  - icon: camera
    title: "2 caméras PTZ"
    text: "Elles couvrent l'horizon à 360° depuis des pylônes, des châteaux d'eau et des tours de guet."
  - icon: grid
    title: "Un micro-ordinateur"
    text: "De la taille d'une carte de crédit, il analyse chaque image sur place avec notre IA."
  - icon: bolt
    title: "Panneau solaire et 4G"
    text: "Très sobre en énergie, matériel standard."
  stats:
  - value: "20 km"
    label: "Détection fiable. Un record à 72 km."
  - value: "2 h"
    label: "Jusqu'à 2 heures d'avance sur les premiers appels au 18."
  - value: "< ½ jour"
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
  - file: view.jpg
    caption: "La forêt vue depuis le haut du pylône"
model:
  title: "Essayer le modèle"
  text: "Testez notre modèle de détection dans votre navigateur : choisissez une image de caméra et regardez-le repérer les fumées."
  before: "Image de la caméra"
  after: "Détection"
alert:
  title: "Alerter et analyser"
  shot: "Une alerte en cours : images de la caméra et localisation du feu sur la carte"
  items:
  - icon: share
    title: "Images envoyées via notre API"
    text: "Toutes les images de la caméra concernée rejoignent notre base de données."
  - icon: bell
    title: "Plusieurs canaux"
    text: "L'alerte parvient aux utilisateurs par le canal qui leur convient."
  - icon: pin
    title: "Localisation par triangulation"
    text: "Les opérateurs lèvent le doute, pilotent les caméras à distance et localisent le feu entre plusieurs caméras."
  example:
    value: "20 min"
    text: "En avril 2026, une station a repéré le premier feu de l'année en forêt de Fontainebleau, vingt minutes avant le premier appel au 18."
open:
  title: "Une démarche ouverte"
  text: "Code, modèles, données et matériel : tout ce que nous construisons est ouvert."
  link: "Retrouvez notre démarche ouverte"
---

{{< hf-space "pyronear/Pyronear-Wildfire-Detection" "https://pyronear-pyronear-wildfire-detection.hf.space" >}}
