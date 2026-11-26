---
title: Open approach
slug: open-approach
description: "Open code, models, data and hardware: a tool you can check, reuse and keep, without depending on a supplier."
---

## What openness means for you

- **No dependence on a supplier**: the code is under a free licence (Apache 2.0), with no licence fee. You can use it and change it freely.
- **A tool you can check**: your IT department, or any expert you choose, can examine the code, the models and the hardware.
- **Continuity**: if Pyronear stopped, everything would stay public and usable.
- **Your data in France**: the alert platform and the images are hosted on French clouds. We can also deploy on your own service's infrastructure.

In Chile, this is what lets CENIA, the national centre for artificial intelligence, become autonomous: knowledge transfer, then training in assembling the stations and deploying the system. We published our research together ([read the paper](https://www.mdpi.com/2079-9292/15/12/2652)).

## What is open

- **The code**: the station software, the alert platform and the tools. [See on GitHub](https://github.com/pyronear)
- **The AI models**: our detection models. [See on Hugging Face](https://huggingface.co/pyronear)
- **The data**: a dataset of camera images annotated by our volunteers, as open data (Apache 2.0). More than 15,000 downloads. [See the dataset](https://huggingface.co/datasets/pyronear/pyro-sdis)
- **The hardware**: the list of components and the configuration of the stations, so that anyone can assemble them. [See on GitHub](https://github.com/pyronear)
- **The research**: our work is done with partners and published. [Learn more](#research)

To go further, this approach is in line with the idea of a [digital common](https://www.ign.fr/institut/la-demarche-geocommuns) (in French), promoted in France by public bodies such as IGN, the national mapping agency.

## Sharing your images

Sharing images is each service's choice. Shared and annotated images join the open dataset and improve detection for every area.

From a high point, the cameras look at the forest far away: at that distance, the images identify neither people nor number plates.

In France, the legal framework favours opening up this data. We identified it with DINUM, the French government's digital agency: our [summary of the open data webinar held with DINUM for fire services](https://pyronear.notion.site/Notes-de-synth-se-FAQ-du-webinaire-open-data-DINUM-SDIS-MSP-18c425b63668806cb5dbc7a35d7452b4) explains how to do it (in French).

## Open research {#research}

We do our work as open science, with our partners, so that methods and progress benefit everyone. [EarthToolsMaker](https://www.earthtoolsmaker.org/) tells in detail how we improved our models:

- [Smoke Is a Behavior: Inside Pyronear's Temporal Wildfire Detection Model](https://www.earthtoolsmaker.org/posts/smoke-is-a-behavior/)
- [Racing Models, Not Opinions: How We Ran Wildfire ML R&D for Pyronear](https://www.earthtoolsmaker.org/posts/racing-models-not-opinions/)
- [Protecting the Forest: Building an early forest fire detector](https://www.earthtoolsmaker.org/posts/protecting-the-forest-early-forest-fire-detector/)

## Let's talk

Does your IT department want to examine the code or the hardware? Would you like to share images or deploy on your own infrastructure? [Write to us](../#contact-form). For other ways to contribute, see [Get involved]({{< relref "/support" >}}).
