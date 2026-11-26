---
title: How it works
slug: how-it-works
description: Stations on high points, frugal AI and an alert platform for firefighters.
# The opening's camera feed: step 3 (the operator takes the camera by hand) and step 4 (the engines leave)
feed:
  manual: "Manual control"
  dispatch:
    title: "Fire confirmed"
    time: "07:47"
    label: "Resources dispatched"
    units: ["Engine 1", "Engine 2"]
    status: "En route"
station:
  title: "The detection station"
  parts:
  - icon: camera
    title: "2 PTZ cameras"
    text: "Covering the horizon at 360° from pylons, water towers and lookouts."
  - icon: grid
    title: "Embedded AI"
    text: "A credit-card-sized micro-computer analyses each image on site."
  - icon: bolt
    title: "Frugal"
    text: "Very little energy and bandwidth, on standard hardware over 4G. Where needed, a solar panel and a battery make it self-sufficient."
  stats:
  - icon: pin
    value: "20 km"
    label: "Reliable detection range. A record at 35 km."
  - icon: clock
    value: "2 h"
    label: "Up to 2 hours earlier than the first emergency calls."
  - icon: wrench
    value: "< ½ day"
    label: "To install a station."
  extra: "Works with cameras already in place: our detection can connect to existing camera networks."
  install: "See how installation works"
  photos:
  - file: antenna.jpg
    caption: "Pylon fitted with a Pyronear station in the Fontainebleau forest"
  - file: cameras.jpg
    caption: "Cameras installed at the top of the pylon"
  - file: hardware.jpg
    caption: "The station box: micro-computer, power supply and 4G"
alert:
  title: "Alert and analyse"
  shot: "An ongoing alert: camera images and the fire's location on the map"
  intro: "Be informed fast, and be able to assess the risk just as fast."
  items:
  - icon: bell
    title: "Fast alert"
    text: "As soon as smoke is detected, the alert goes to the dispatch centre and to the channels each service has chosen, without depending on a single app. The platform is designed to connect to nexSIS, the French fire services' information system."
  - icon: pin
    title: "Images and location"
    text: "Each alert comes with its image sequence and the approximate position of the fire start on the map."
  - icon: shield
    title: "Confirmation"
    text: "Operators take control of the station remotely: live view and zoom on the smoke."
  example:
    value: "20 min"
    text: "In April 2026, a station spotted the first fire of the year in the Fontainebleau forest, twenty minutes before the first emergency call. A time gain we see regularly."
---

{{< youtube id="f2z8mvvggI0" title="Pyronear mini-documentary" loading="lazy" >}}

*A mini-documentary about Pyronear, made by Fast Forward.*

{{< station >}}

{{< alert >}}

## Try the model

Test our detection model in your browser: give it a video or a sequence of camera images, or failing that a single image, and watch it spot the smoke.

{{< hf-space space="pyronear/Pyronear-Wildfire-Detection" src="https://pyronear-pyronear-wildfire-detection.hf.space" image="model-input.jpg" label="Smoke" box="22.8 69.3 11.8 16.7" caption="A real frame from a Pyronear camera in the Alpes-Maritimes: the model spots a barely visible wisp of smoke." >}}

## An open approach

Code, models, data and hardware: everything we build is open. [Discover our open approach]({{< relref "/open-approach" >}}).
