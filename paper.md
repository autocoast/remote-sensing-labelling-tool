---
title: 'Remote Sensing Labelling Tool: A Scalable Open-Source Solution for Geospatial Annotation'
authors:
  - name: David Pogorzelski
    orcid: 0009-0002-1763-8978
    affiliation: 1
affiliations:
  - name: Helmholtz-Zentrum Hereon
    index: 1
date: 2025-01-13
software_repository_url: 'https://github.com/autocoast/remote-sensing-labelling-tool'
archive_doi: 10.0000/zenodo.1234567
tags:
  - remote sensing
  - geospatial analysis
  - data labelling
  - open-source
  - GIS
---

# Summary

The Remote Sensing Labelling Tool is an open-source, web-based application designed to facilitate the labelling  of remote sensing imagery. Developed to support research and operational needs in geospatial analysis, the tool enables users to annotate satellite data with efficiency and scalability. With a modular architecture built on modern frameworks like Nuxt and TailwindCSS, the tool is highly customizable, making it adaptable for diverse workflows and datasets.

# Statement of Need

Remote sensing has become indispensable for monitoring environmental changes, land use, and resource management. However, the preparation and annotation of satellite imagery for machine learning and analysis often remain bottlenecks due to the lack of intuitive and scalable software solutions. This tool addresses these challenges by offering an accessible, feature-rich environment for geospatial data preprocessing and annotation.

Key features include:
- Support for multiple satellite data formats (e.g., Sentinel-2).
- Tools for NDVI/NDWI analysis and k-means clustering.
- Intuitive UI with customizable drawing layers, bucket fill tools, and more.
- Compatibility with modern GIS data formats such as GeoTIFF.

# Software Features

The tool offers the following capabilities:
1. **Multi-Layer Editing**: Annotate and manage multiple raster layers with support for advanced drawing and erasing tools.
2. **Geospatial Data Preprocessing**: Includes tools for NDVI, NDWI, and normalization workflows for satellite imagery.
3. **Cluster Analysis**: Supports k-means clustering for easier annotation
4. **Data Management**: Provides an efficient interface for uploading and managing satellite imagery for different file types (e.g. GeoTIFF)
5. **Extensibility**: Built with Nuxt and TailwindCSS, enabling easy customization and deployment.

# Architecture

The software architecture leverages:
- **Frontend**: Nuxt framework for a responsive and modular UI.
- **Visualization**: Leaflet and PanZoom for map and raster navigation.
- **Backend Processing**: Web workers for computational tasks such as k-means clustering and NDVI computation.
- **Interoperability**: Supports file formats such as GeoTIFF and integrates with standard GIS workflows.

# Acknowledgements

This work was supported by Helmholtz Imaging with contributions from open-source libraries and the broader scientific community.
