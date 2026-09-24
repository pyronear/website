---
title: How it works
slug: how-it-works
description: Stations on high points, frugal AI and an alert platform for firefighters.
menus:
  main:
    weight: 2
---

## A complete solution

Pyronear is a **complete fire risk management solution**. It consists of an **early wildfire detection algorithm**, implemented on a microcomputer, connected to **cameras positioned on high spots** with a view on the forest. Our detectors communicate **fire alerts** to a database that is connected to a **supervision platform** for the fire department.

![Overview of the Pyronear solution](solution-en.png)

## The detection station

Our stations are installed on high points (pylons, water towers, lookout towers) overlooking the forest. High-resolution cameras cover the horizon at 360°, and a credit-card-sized micro-computer analyses the images on site with our artificial intelligence model. Very energy-efficient, a station can run on a solar panel and communicates over 4G.

- Smoke detection up to **15 km** away
- Up to **2 hours earlier** than the first emergency calls
- On-site analysis, **very low power use**, standard hardware

Our detection towers consist of 4/5 high resolution cameras and a micro computer. We capture one image per camera at regular intervals and then analyze it locally using our wildfire detection model. In case of detection, the alert mode is activated, all the images coming from the camera having detected the fire are then sent to our database via our api, the communication protocol we have developed.

![How a detection station works](model.png)

## The alert platform

When a station detects smoke, the images are sent to our web platform. Fire service operators receive the alert in real time: they confirm it, control the cameras and locate the fire by triangulation between several stations.

In April 2026, a station spotted the first fire of the year in the Fontainebleau forest, twenty minutes before the first emergency call.

## Open source

All our work is released under a free licence (Apache 2.0): the station software, the AI models and the platform. Any fire service, local authority or researcher can reuse it without depending on a vendor. Find our code on [GitHub](https://github.com/pyronear).

## Why an open data set?

Our detection algorithm is an **artificial intelligence (AI)** model that has been trained on numerous **images of fire outbreaks**. In other words, the algorithm has been trained to recognise smoke and flames in numerous situations and in different areas.

To this end, **with the help of our partners and volunteers**, we are building a **dataset** that we are sharing in **open data**, so that the images collected and annotated can be used by as many people as possible. In this way, by sharing these resources, we are increasing the chances of preserving another resource: forests and natural areas.

In October 2025, we released PYRONEAR-2025, the largest open wildfire detection dataset in the world: 50,000 images from 640 fires in 4 countries.

- [Find the dataset on HuggingFace](https://huggingface.co/datasets/pyronear/pyro-sdis)
- [Legal note for fire services who want to share their images (in French)](https://pyronear.notion.site/Notes-de-synth-se-FAQ-du-webinaire-open-data-DINUM-SDIS-MSP-18c425b63668806cb5dbc7a35d7452b4)
