---
title: How it works
slug: how-it-works
description: Stations on high points, frugal AI and an alert platform for firefighters.
images:
  - view.jpg
---

## A complete solution

Pyronear is a **complete fire risk management solution**: **cameras** installed on high points, our own stations or cameras already in place, **detect fire starts early** thanks to a lightweight, embedded AI. Fire services **quickly receive** an alert, which they **analyse and assess** on our supervision platform.

{{< youtube id="f2z8mvvggI0" title="Pyronear mini-documentary" loading="lazy" >}}

*A mini-documentary about Pyronear, made by Fast Forward.*

![Overview of the Pyronear solution](solution-en.png)

## The detection station

Our stations are installed on high points (pylons, water towers, lookout towers) overlooking natural areas. They usually have 2 PTZ detection cameras, covering the horizon at 360°, and a credit-card-sized micro-computer. It captures an image per camera at regular intervals and analyses it on site with our artificial intelligence model. Very energy-efficient, a station can run on a solar panel and communicates over 4G.

- Reliable detection up to **20 km**. *A record at 72 km.*
- Up to **2 hours earlier** than the first emergency calls
- On-site analysis, **very low power use**, standard hardware
- Works with **cameras already in place**: our detection can also connect to existing camera networks

A station is installed in less than half a day: [see how]({{< relref "/deployments#installation" >}}).

![How a detection station works](model.png)

{{< gallery >}}
![Pylon fitted with a Pyronear station in the Fontainebleau forest](antenna.jpg)
![Cameras installed at the top of the pylon](cameras.jpg)
![The station box, which holds the micro-computer, power supply and 4G connection](hardware.jpg)
![The forest seen from the top of the pylon](view.jpg)
{{< /gallery >}}

## Alert and analyse

When a camera detects smoke, the station switches to alert mode: all the images from the camera concerned are sent to our database through our API. The alert is sent to users through several channels, depending on their needs, so that it arrives as quickly as possible and they can assess it as well as possible. On our platform, operators confirm it, control the cameras remotely and locate the fire by triangulation between several cameras.

![An ongoing alert: camera images and the fire's location on the map](platform-alert.jpg)

*For example, in April 2026, a station spotted the first fire of the year in the Fontainebleau forest, twenty minutes before the first emergency call.*

## Try the model

Test our detection model in your browser: pick a camera image and watch it spot the smoke.

{{< hf-space "pyronear/Pyronear-Wildfire-Detection" "https://pyronear-pyronear-wildfire-detection.hf.space" >}}

## An open approach

Code, models, data and hardware: everything we build is open. [Discover our open approach]({{< relref "/open-approach" >}}).
