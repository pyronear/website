---
title: Frequently asked questions
slug: faq
description: "Detection, alerts, deployment, cost, openness: answers to the questions fire services ask us."
groups:
- title: "Detection"
  items:
  - q: "How does Pyronear detect a fire start?"
    a: "A station on a high point (pylon, water tower, lookout) carries two PTZ cameras that cover the horizon at 360°. A credit-card-sized micro-computer analyses each image on site and spots smoke. The model follows the smoke over a sequence of images rather than a single one."
    page: /how-it-works
    link: "See how it works"
  - q: "How far away can smoke be detected?"
    a: "Detection is reliable up to 20 km, with a record at 35 km. The actual range depends on the terrain, which is why every deployment starts with a coverage study that chooses the high points."
  - q: "How much time does it save?"
    a: "Up to 2 hours ahead of the first emergency calls. In April 2026, a station spotted the first fire of the year in the Fontainebleau forest twenty minutes before the first call."
  - q: "Can we use the cameras we already have?"
    a: "Yes. Our detection can connect to existing camera networks. Where there are none, we install complete stations."
  - q: "What does a station need to run?"
    a: "A high point, very little energy and a 4G connection. The hardware is standard. Where there is no power, a solar panel and a battery make the station self-sufficient."
- title: "Alerts"
  items:
  - q: "Who receives the alert, and how?"
    a: "As soon as smoke is detected, the alert goes to the dispatch centre and to the channels each service has chosen, without depending on a single app. The platform is designed to connect to nexSIS, the French fire services' information system."
  - q: "How do we check that it is really a fire?"
    a: "Each alert comes with its image sequence and the approximate position of the fire start on the map. Operators can take control of the station remotely, with a live view, and zoom in on the smoke to confirm."
  - q: "What about false alerts?"
    a: "We reduce them continuously. The model judges smoke over time rather than on a single image, which rules out a large share of false alerts. Operators' feedback and images annotated by our volunteers are used to train it, season after season."
- title: "Deployment"
  items:
  - q: "How does a deployment work?"
    a: "In three steps, with the local teams: a coverage study picks the high points that best protect the areas at risk with the fewest stations; installation takes less than half a day per station; operators are trained on the alert platform."
    page: /deployments
    link: "See our deployments"
  - q: "Who installs the stations?"
    a: "A certified professional, or the service itself. In June 2026, the Essonne fire service (SDIS 91) installed two new stations on its own in one day."
  - q: "What support is there after installation?"
    a: "We support the teams all season: training and answers to operators' questions, maintenance, and changes to the system guided by their feedback. The system is designed to recover on its own, with clear procedures when someone needs to step in."
  - q: "How much does it cost?"
    a: "It depends on the number of high points to equip and on the cameras already in place. Thanks to volunteer R&D and a non-profit model, our prices are very competitive. Sponsors also fund stations for services with limited means, such as Crédit Agricole d'Île-de-France for French fire services. Write to us for an estimate."
  - q: "Where is Pyronear already deployed?"
    a: "More than 150 cameras keep watch in France, with 9 partner fire services, and in 6 countries, including Spain, Chile and Argentina."
    page: /deployments
    link: "See the map"
- title: "Openness and continuity"
  items:
  - q: "Why open source, and what difference does it make to a fire service?"
    a: "The station and platform code is under a free licence (Apache 2.0), with no licence fee, as are our models and the hardware list. You depend on no supplier: any service, local authority or researcher can reuse, check and improve the tool. And if Pyronear stopped, all of it would stay public."
    page: /open-approach
    link: "Our open approach"
  - q: "Where is our data hosted?"
    a: "The alert platform and the images are hosted on French clouds. We can also deploy on your own service's infrastructure."
  - q: "Do the cameras film people?"
    a: "No. From a high point, the cameras look at the forest far away: at that distance, the images identify neither people nor number plates."
  - q: "What happens to the images from our cameras?"
    a: "Sharing them is each service's choice. Shared and annotated images join an open dataset that improves detection for every area. The legal framework, identified with DINUM (the French government's digital agency), is explained in our summary of the open data webinar held with DINUM for fire services."
    page: /open-approach
    link: "Read about our open approach"
  - q: "Who is behind Pyronear?"
    a: "A French non-profit association of public interest, based in Paris and founded in 2020. More than 150 volunteers have contributed: data scientists, developers, designers and firefighters."
    page: /about
    link: "About us"
cta:
  title: "Another question?"
  text: "Fire services, local authorities, forest managers: we will answer."
---
