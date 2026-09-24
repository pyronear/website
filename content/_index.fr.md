---
title: Pyronear
description: Détection précoce de feux de forêt
hero:
  title: Détection précoce des départs de feux
  subtitle: Pyronear est un projet open-source au service du bien commun
about:
  title: Qui sommes-nous ?
  intro: <b>Pyronear</b> est une association à but non lucratif loi 1901 dont l’objectif est de démocratiser des solutions technologiques sobres et ouvertes de lutte contre les incendies de forêts, au service des écosystèmes et des citoyens. Pour cela, nous co-construisons une solution open source de détection détection précoce, performante, automatique, énergiquement sobre, économique et modulable des départs de feux dans les espaces naturels.
  cards:
  - icon: /img/cards_icons/opensource.svg
    title: Open source
    text: Tout notre code est disponible en accès libre et co-développé par nos bénévoles. Nous pensons que l'intelligence collective est la meilleure façon de résoudre un problème complexe.
  - icon: /img/cards_icons/radar-2.svg
    title: Détection précoce
    text: Pour lutter efficacement contre les feux de forêt il est important de les détecter de façon précoce pour permettre une intervention rapide des services d’incendies et secours et ainsi limiter leur impact.
  - icon: /img/cards_icons/share.svg
    title: Open data
    text: Nous construisons à l’aide de nos partenaires et bénévoles, un dataset que nous partageons en open data, afin que les images collectées et annotées puissent servir au plus grand nombre.
  - icon: /img/cards_icons/savings-solid.svg
    title: Économique
    text: Notre R&D est faite par des bénévoles, notre dispositif est sobre et l’objet non-lucratif de notre association, ce qui nous permet de proposer des prix très compétitifs afin de faciliter un déploiement sur le territoire.
  - icon: /img/cards_icons/eco.svg
    title: Enérgétiquement sobre
    text: Nous sommes dans une démarche dite low-tech, nous avons construit un dispositif peu consommateur permettant un déploiement plus facile et une utilisation plus raisonnée de nos précieuses ressources.
  - icon: /img/cards_icons/rocket.svg
    title: Performance
    text: Nos experts en intelligence artificielle suivent activement l’actualité de ce domaine en plein ébullition afin de faire bénéficier Pyronear de ses dernières avancées.
  - icon: /img/cards_icons/auto-awesome.svg
    title: Automatique
    text: Nous proposons une solution complètement automatisée afin de libérer du temps aux pompiers.
  - icon: /img/cards_icons/grid-view-solid.svg
    title: Modulable
    text: Nous proposons un système de détection complet mais notre dispositif a été pensé pour fonctionner avec le matériel existant (utilisation de caméras déjà en place, connexion avec nexSIS …)
steps:
  title: Comment ça marche ?
  text1: Pyronear est une <b>solution complète de gestion du risque incendie</b>. Elle est constituée d’un <b>algorithme de détection</b> précoce des départs de feu, implémenté sur un micro ordinateur, connecté à des <b>caméras positionnées sur des points hauts</b> avec vue sur la forêt. Nos détecteurs communiquent les <b>alertes de détection de départ de feu</b> à une base de données elle-même connectée à une <b>plateforme de supervision</b> à destination des pompiers.
  image1: /img/solution.png
  text2: Nos tours de détection se composent de 4/5 caméras haute résolution et d’un micro ordinateur qui capture une image par caméra à intervalles réguliers puis l’analyse localement à l’aide de notre modèle de détection de feux de forêt. En cas de détection, le mode alerte est activé, toutes les images provenant de la caméra ayant détecté le feu sont alors envoyées à notre base de données via notre api, le protocole de communication que nous avons développé.
  image2: /img/model.png
opendata:
  title: Pourquoi un dataset open data ?
  text1: Notre algorithme de détection est un <b>modèle d’intelligence artificielle (IA)</b> entrainé sur de nombreuses <b>images de départ de feux</b>. C’est à dire que l’algorithme a été entrainé à reconnaître des fumées et flammes dans de nombreuses situations et sur différents territoires.
  text2: A cette fin, nous construisons <b>à l’aide de nos partenaires et bénévoles</b>, un <b>dataset</b> que nous partageons en <b>open data</b>, afin que les images collectées et annotées puissent servir au plus grande nombre. Ainsi, en mettant en commun ces ressources, nous augmentons les chances de préserver une autre ressource, les forêts et espaces naturels.
  links:
  - title: Dataset
    text: Retrouvez le dataset sur HuggingFace
    image: /img/huggingface-logo.svg
    url: https://huggingface.co/datasets/pyronear/pyro-sdis
  - title: Note Juridique
    text: Vous êtes en SDIS et souhaitez partagez vos images de détections précoces ? Cette note juridique devrait vous intéresser !
    image: /img/document.svg
    url: https://pyronear.notion.site/Notes-de-synth-se-FAQ-du-webinaire-open-data-DINUM-SDIS-MSP-18c425b63668806cb5dbc7a35d7452b4
cta:
  title: Comment le mettre en place ?
  text: Pour en savoir plus envoyez-nous un mail ou contactez-nous sur les réseaux sociaux. Nous vous répondrons le plus rapidement possible.
partners:
  eyebrow: Collaboration & Innovation
  title: Nos Partenaires
sponsors:
  eyebrow: Soutien & Engagement
  title: Nos Soutiens
media:
  eyebrow: Actualités & Perspectives
  title: En vedette
contactForm:
  title: Protégeons nos forêts
follow:
  title: Suivez l'aventure Pyronear
  text: Pour se tenir informé de l'avancement du projet ou rejoindre l'aventure, retrouvez-nous sur les réseaux sociaux !
---
