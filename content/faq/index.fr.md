---
title: Questions fréquentes
slug: questions-frequentes
description: "Détection, alerte, déploiement, coût, ouverture : les réponses aux questions que nous posent les services d'incendie."
groups:
- title: "La détection"
  items:
  - q: "Comment Pyronear détecte-t-il un départ de feu ?"
    a: "Une station installée sur un point haut (pylône, château d'eau, tour de guet) porte deux caméras PTZ qui couvrent l'horizon à 360°. Un micro-ordinateur de la taille d'une carte de crédit analyse chaque image sur place et repère les fumées. Le modèle suit la fumée sur une séquence d'images plutôt que sur une image isolée."
    page: /how-it-works
    link: "Voir comment ça marche"
  - q: "À quelle distance une fumée est-elle détectée ?"
    a: "La détection est fiable jusqu'à 20 km, avec un record à 35 km. La portée réelle dépend du relief : c'est pourquoi chaque déploiement commence par une étude de couverture qui choisit les points hauts."
  - q: "Combien de temps gagne-t-on ?"
    a: "Jusqu'à 2 heures d'avance sur les premiers appels au 18. En avril 2026, une station a repéré le premier feu de l'année en forêt de Fontainebleau vingt minutes avant le premier appel."
  - q: "Peut-on utiliser nos caméras déjà en place ?"
    a: "Oui. Notre détection peut se connecter à des réseaux de caméras existants. Là où il n'y en a pas, nous installons des stations complètes."
  - q: "De quoi une station a-t-elle besoin pour fonctionner ?"
    a: "D'un point haut, de très peu d'énergie et d'une connexion 4G. Le matériel est standard. Là où il n'y a pas de courant, un panneau solaire et une batterie rendent la station autonome."
- title: "L'alerte"
  items:
  - q: "Qui reçoit l'alerte, et comment ?"
    a: "Dès la détection, l'alerte part vers le CODIS et vers les canaux choisis par chaque service, sans dépendre d'une seule application. La plateforme est pensée pour se connecter à nexSIS."
  - q: "Comment vérifier qu'il s'agit bien d'un feu ?"
    a: "Chaque alerte arrive avec sa séquence d'images et la position approximative du départ de feu sur la carte. Les opérateurs peuvent prendre la main sur la station à distance, en vue directe, et zoomer sur la fumée pour lever le doute."
  - q: "Et les fausses alertes ?"
    a: "Nous les réduisons en continu. Le modèle juge une fumée sur la durée plutôt que sur une seule image, ce qui écarte une grande partie des fausses alertes. Les retours des opérateurs et les images annotées par nos bénévoles servent à l'entraîner, saison après saison."
- title: "Le déploiement"
  items:
  - q: "Comment se passe un déploiement ?"
    a: "En trois temps, avec les équipes locales : une étude de couverture retient les points hauts qui protègent le mieux les zones à risque avec le moins de stations ; l'installation prend moins d'une demi-journée par station ; les opérateurs sont formés à la plateforme d'alerte."
    page: /deployments
    link: "Voir nos déploiements"
  - q: "Qui installe les stations ?"
    a: "Un professionnel agréé, ou le service lui-même. En juin 2026, le SDIS 91 a installé seul deux nouvelles stations en une journée."
  - q: "Quel suivi après l'installation ?"
    a: "Nous accompagnons les équipes toute la saison : formation et réponses aux questions des opérateurs, maintenance, et évolutions du système guidées par leurs retours. Le système est conçu pour se rétablir seul, avec des procédures claires quand il faut intervenir."
  - q: "Combien cela coûte-t-il ?"
    a: "Cela dépend du nombre de points hauts à équiper et des caméras déjà en place. Grâce à une R&D bénévole et à un modèle non lucratif, nos prix sont très compétitifs. Des mécènes financent aussi des stations pour les services aux moyens limités, comme le Crédit Agricole d'Île-de-France pour des SDIS. Écrivez-nous pour une estimation."
  - q: "Où Pyronear est-il déjà déployé ?"
    a: "Plus de 150 caméras veillent en France, chez 9 SDIS partenaires, et dans 6 pays, dont l'Espagne, le Chili et l'Argentine."
    page: /deployments
    link: "Voir la carte"
- title: "Ouverture et pérennité"
  items:
  - q: "Pourquoi l'open source, et qu'est-ce que cela change pour un service ?"
    a: "Le code des stations et de la plateforme est sous licence libre (Apache 2.0), sans frais de licence, comme nos modèles et la liste du matériel. Vous ne dépendez d'aucun fournisseur : tout service, collectivité ou chercheur peut réutiliser, vérifier et faire évoluer l'outil. Et si Pyronear s'arrêtait, tout cela resterait public."
    page: /open-approach
    link: "Notre démarche ouverte"
  - q: "Où sont hébergées nos données ?"
    a: "La plateforme d'alerte et les images sont hébergées sur des clouds français. Nous pouvons aussi déployer sur l'infrastructure de votre service."
  - q: "Les caméras filment-elles des personnes ?"
    a: "Non. Depuis un point haut, les caméras regardent la forêt au loin : à cette distance, les images ne permettent d'identifier ni des personnes ni des plaques d'immatriculation."
  - q: "Que deviennent les images de nos caméras ?"
    a: "Les partager est un choix de chaque service. Les images partagées et annotées rejoignent un jeu de données ouvert, qui améliore la détection pour tous les territoires. Le cadre juridique, identifié avec la DINUM, est expliqué dans notre synthèse du webinaire open data organisé avec la DINUM pour les SDIS."
    page: /open-approach
    link: "Lire la démarche ouverte"
  - q: "Qui est derrière Pyronear ?"
    a: "Une association loi 1901 d'intérêt général, basée à Paris, née en 2020. Plus de 150 bénévoles y ont contribué : data scientists, développeurs, designers et sapeurs-pompiers."
    page: /about
    link: "À propos"
cta:
  title: "Une autre question ?"
  text: "Services d'incendie, collectivités, gestionnaires forestiers : nous vous répondons."
---
