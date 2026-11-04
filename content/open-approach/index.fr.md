---
title: Démarche ouverte
slug: demarche-ouverte
description: "Notre code, nos modèles, nos données et notre matériel sont ouverts : un bien commun pour détecter les feux."
menus:
  main:
    weight: 6
build:
  publishResources: false
---

## Un commun numérique

> Un commun, c'est une ressource produite collectivement par une communauté d'acteurs hétérogènes et gouvernée par des règles qui assurent sa survie et garantissent son caractère ouvert et partagé.
>
> — [IGN, démarche géocommuns](https://www.ign.fr/institut/la-demarche-geocommuns)

En clair : une ressource que tout le monde peut utiliser et enrichir, sans dépendre d'un fournisseur, comme Wikipédia ou OpenStreetMap. Pyronear applique cette idée à la détection précoce des feux : chaque amélioration, chaque image annotée et chaque retour du terrain profite à tous les territoires.

## Ce qui est ouvert

- **Le code** : le logiciel des stations, la plateforme d'alerte et les outils sont publiés sous licence libre (Apache 2.0). Tout service d'incendie, collectivité ou chercheur peut les réutiliser. [Voir sur GitHub](https://github.com/pyronear)
- **Les modèles d'IA** : nos modèles de détection sont publiés. [Voir sur Hugging Face](https://huggingface.co/pyronear)
- **Les données** : un dataset d'images de caméras annotées par la communauté de contributeurs, partagé en open data (Apache 2.0) pour que les images collectées servent au plus grand nombre. Plus de 15 000 téléchargements. [Voir le dataset](https://huggingface.co/datasets/pyronear/pyro-sdis)
- **Le matériel** : la liste des composants et la configuration de nos stations sont publiques, pour que chacun puisse les assembler et les déployer. [Voir sur GitHub](https://github.com/pyronear)
- **La recherche** : la science ouverte et l'intelligence collective sont la meilleure approche pour résoudre un problème complexe. Nos travaux sont menés en collaboration et publiés. [En savoir plus](#recherche)

## Un cadre juridique favorable

En France, le cadre juridique est favorable à l'ouverture des données. Ce cadre a été identifié avec la DINUM, la direction interministérielle du numérique. Nous nous en saisissons : quand un service d'incendie partage ses images, c'est tout l'écosystème qui progresse, et la détection précoce devient encore plus accessible à tous les territoires.

Notre [note juridique pour les SDIS qui souhaitent partager leurs images](https://pyronear.notion.site/Notes-de-synth-se-FAQ-du-webinaire-open-data-DINUM-SDIS-MSP-18c425b63668806cb5dbc7a35d7452b4) explique comment faire.

## Une recherche ouverte et collaborative {#recherche}

Nous favorisons une démarche de science ouverte : la recherche collaborative est le meilleur moyen de résoudre un problème complexe, grâce à l'intelligence collective.

**Exemple au Chili.** Nous travaillons avec le CENIA, le centre national d'intelligence artificielle chilien : transfert de connaissances, puis formation à l'assemblage des stations et au déploiement du système pour qu'ils soient autonomes, et publication commune de travaux de recherche ([découvrir le papier](https://www.mdpi.com/2079-9292/15/12/2652)).

La recherche ouverte facilite le partage des méthodes et des avancées : notre partenaire [EarthToolsMaker](https://www.earthtoolsmaker.org/) raconte en détail comment nous avons amélioré nos modèles (en anglais) :

- [Smoke Is a Behavior: Inside Pyronear's Temporal Wildfire Detection Model](https://www.earthtoolsmaker.org/posts/smoke-is-a-behavior/)
- [Racing Models, Not Opinions: How We Ran Wildfire ML R&D for Pyronear](https://www.earthtoolsmaker.org/posts/racing-models-not-opinions/)
- [Protecting the Forest: Building an early forest fire detector](https://www.earthtoolsmaker.org/posts/protecting-the-forest-early-forest-fire-detector/)

## Participer

Utiliser, adapter, contribuer : toutes les façons de nous rejoindre sont sur la page [Agir avec nous]({{< relref "/support" >}}). Vous êtes un service d'incendie et vous souhaitez partager des images ? [Contactez-nous](../#contact-form).
