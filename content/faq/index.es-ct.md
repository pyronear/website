---
title: Preguntes freqüents
slug: preguntes-frequents
description: "Detecció, alerta, desplegament, cost, obertura: respostes a les preguntes que ens fan els serveis de bombers."
groups:
- title: "La detecció"
  items:
  - q: "Com detecta Pyronear un inici d'incendi?"
    a: "Una estació instal·lada en un punt alt (torre, dipòsit d'aigua, torre de guaita) porta dues càmeres PTZ que cobreixen l'horitzó a 360°. Un microordinador de la mida d'una targeta de crèdit analitza cada imatge in situ i detecta el fum. El model segueix el fum en una seqüència d'imatges, no en una imatge aïllada."
    page: /how-it-works
    link: "Veure com funciona"
  - q: "A quina distància es detecta el fum?"
    a: "La detecció és fiable fins a 20 km, amb un rècord a 35 km. L'abast real depèn del relleu: per això cada desplegament comença amb un estudi de cobertura que tria els punts alts."
  - q: "Quant de temps es guanya?"
    a: "Fins a 2 hores d'avançament sobre les primeres trucades d'emergència. L'abril del 2026, una estació va detectar el primer incendi de l'any al bosc de Fontainebleau vint minuts abans de la primera trucada."
  - q: "Podem fer servir les càmeres que ja tenim?"
    a: "Sí. La nostra detecció es pot connectar a xarxes de càmeres existents. On no n'hi ha, instal·lem estacions completes."
  - q: "Què necessita una estació per funcionar?"
    a: "Un punt alt, molt poca energia i una connexió 4G. El maquinari és estàndard. On no hi ha corrent, un panell solar i una bateria fan l'estació autònoma."
- title: "L'alerta"
  items:
  - q: "Qui rep l'alerta, i com?"
    a: "Tan bon punt es detecta fum, l'alerta arriba a la central i als canals triats per cada servei, sense dependre d'una sola aplicació. La plataforma està pensada per connectar-se a nexSIS, el sistema d'informació dels bombers francesos."
  - q: "Com es comprova que és realment un incendi?"
    a: "Cada alerta arriba amb la seva seqüència d'imatges i la posició aproximada de l'inici d'incendi al mapa. Els operadors poden prendre el control de l'estació a distància, en vista directa, i fer zoom sobre el fum per confirmar-ho."
  - q: "I les falses alertes?"
    a: "Les reduïm de manera contínua. El model jutja el fum al llarg del temps i no en una sola imatge, cosa que descarta bona part de les falses alertes. Els comentaris dels operadors i les imatges anotades pels nostres voluntaris serveixen per entrenar-lo, temporada rere temporada."
- title: "El desplegament"
  items:
  - q: "Com és un desplegament?"
    a: "En tres passos, amb els equips locals: un estudi de cobertura tria els punts alts que millor protegeixen les zones de risc amb el mínim d'estacions; la instal·lació dura menys de mitja jornada per estació; els operadors es formen en la plataforma d'alerta."
    page: /deployments
    link: "Veure els nostres desplegaments"
  - q: "Qui instal·la les estacions?"
    a: "Un professional autoritzat, o el mateix servei. El juny del 2026, els bombers d'Essonne (SDIS 91) van instal·lar pel seu compte dues estacions noves en un dia."
  - q: "Quin seguiment hi ha després de la instal·lació?"
    a: "Acompanyem els equips tota la temporada: formació i respostes a les preguntes dels operadors, manteniment i millores del sistema guiades pels seus comentaris. El sistema està dissenyat per recuperar-se sol, amb procediments clars quan cal intervenir."
  - q: "Quant costa?"
    a: "Depèn del nombre de punts alts que calgui equipar i de les càmeres ja instal·lades. Gràcies a una R+D voluntària i a un model sense ànim de lucre, els nostres preus són molt competitius. Alguns mecenes també financen estacions per a serveis amb pocs mitjans, com el Crédit Agricole d'Île-de-France per a bombers francesos. Escriviu-nos per a una estimació."
  - q: "On està ja desplegat Pyronear?"
    a: "Més de 150 càmeres vigilen a França, amb 9 serveis de bombers socis, i a 6 països, entre els quals Espanya, Xile i l'Argentina."
    page: /deployments
    link: "Veure el mapa"
- title: "Obertura i continuïtat"
  items:
  - q: "Per què codi obert, i què canvia per a un servei?"
    a: "El codi de les estacions i de la plataforma té llicència lliure (Apache 2.0), sense cost de llicència, com els nostres models i la llista del maquinari. No depeneu de cap proveïdor: qualsevol servei, ens local o investigador pot reutilitzar, verificar i millorar l'eina. I si Pyronear s'aturés, tot continuaria sent públic."
    page: /open-approach
    link: "El nostre enfocament obert"
  - q: "On s'allotgen les nostres dades?"
    a: "La plataforma d'alertes i les imatges s'allotgen en núvols francesos. També podem desplegar a la infraestructura del vostre servei."
  - q: "Les càmeres graven persones?"
    a: "No. Des d'un punt alt, les càmeres miren el bosc de lluny: a aquesta distància, les imatges no permeten identificar ni persones ni matrícules."
  - q: "Què passa amb les imatges de les nostres càmeres?"
    a: "Compartir-les és decisió de cada servei. Les imatges compartides i anotades s'afegeixen a un conjunt de dades obert que millora la detecció a tots els territoris. El marc jurídic, identificat amb la DINUM (l'agència digital del Govern francès), s'explica al nostre resum del webinari de dades obertes organitzat amb la DINUM per als bombers."
    page: /open-approach
    link: "Llegir sobre l'enfocament obert"
  - q: "Qui hi ha darrere de Pyronear?"
    a: "Una associació francesa sense ànim de lucre i d'interès general, amb seu a París i creada el 2020. Hi han contribuït més de 150 voluntaris: científics de dades, desenvolupadors, dissenyadors i bombers."
    page: /about
    link: "Qui som"
cta:
  title: "Una altra pregunta?"
  text: "Serveis de bombers, ens locals, gestors forestals: us responem."
---
