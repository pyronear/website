---
title: Comment ça marche
slug: comment-ca-marche
description: Des stations sur des points hauts, une IA sobre et une plateforme d'alerte pour les pompiers.
menus:
  main:
    weight: 2
---

## Une solution complète

Pyronear est une **solution complète de gestion du risque incendie**. Elle est constituée d’un **algorithme de détection** précoce des départs de feu, implémenté sur un micro ordinateur, connecté à des **caméras positionnées sur des points hauts** avec vue sur la forêt. Nos détecteurs communiquent les **alertes de détection de départ de feu** à une base de données elle-même connectée à une **plateforme de supervision** à destination des pompiers.

![Vue d'ensemble de la solution Pyronear](/img/solution.png)

## La station de détection

Nos stations sont installées sur des points hauts (pylônes, châteaux d'eau, tours de guet) avec vue sur la forêt. Des caméras haute résolution couvrent l'horizon à 360° et un micro-ordinateur, de la taille d'une carte de crédit, analyse les images sur place avec notre modèle d'intelligence artificielle. Très sobre en énergie, la station peut fonctionner sur panneau solaire et communique en 4G.

- Détection des fumées jusqu'à **15 km**
- Jusqu'à **2 heures d'avance** sur les premiers appels au 18
- Analyse sur place, **très faible consommation**, matériel standard

Nos tours de détection se composent de 4/5 caméras haute résolution et d’un micro ordinateur qui capture une image par caméra à intervalles réguliers puis l’analyse localement à l’aide de notre modèle de détection de feux de forêt. En cas de détection, le mode alerte est activé, toutes les images provenant de la caméra ayant détecté le feu sont alors envoyées à notre base de données via notre api, le protocole de communication que nous avons développé.

![Fonctionnement d'une station de détection](/img/model.png)

## La plateforme d'alerte

Quand une station détecte une fumée, les images sont envoyées à notre plateforme web. Les opérateurs des SDIS y reçoivent l'alerte en temps réel : ils lèvent le doute, pilotent les caméras et localisent le départ de feu par triangulation entre plusieurs stations.

En avril 2026, une station a ainsi repéré le premier feu de l'année en forêt de Fontainebleau, vingt minutes avant le premier appel au 18.

## Open source

Tout notre travail est publié sous licence libre (Apache 2.0) : le logiciel des stations, les modèles d'IA et la plateforme. Tout service d'incendie, collectivité ou chercheur peut le réutiliser, sans dépendre d'un fournisseur. Retrouvez notre code sur [GitHub](https://github.com/pyronear).

## Pourquoi un dataset open data ?

Notre algorithme de détection est un **modèle d’intelligence artificielle (IA)** entrainé sur de nombreuses **images de départ de feux**. C’est à dire que l’algorithme a été entrainé à reconnaître des fumées et flammes dans de nombreuses situations et sur différents territoires.

A cette fin, nous construisons **à l’aide de nos partenaires et bénévoles**, un **dataset** que nous partageons en **open data**, afin que les images collectées et annotées puissent servir au plus grande nombre. Ainsi, en mettant en commun ces ressources, nous augmentons les chances de préserver une autre ressource, les forêts et espaces naturels.

En octobre 2025, nous avons publié PYRONEAR-2025, le plus grand jeu de données ouvert au monde sur la détection de feux : 50 000 images de 640 incendies dans 4 pays.

- [Retrouvez le dataset sur HuggingFace](https://huggingface.co/datasets/pyronear/pyro-sdis)
- [Note juridique pour les SDIS qui souhaitent partager leurs images](https://pyronear.notion.site/Notes-de-synth-se-FAQ-du-webinaire-open-data-DINUM-SDIS-MSP-18c425b63668806cb5dbc7a35d7452b4)
