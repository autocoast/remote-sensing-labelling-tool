# Remote Sensing Labeling Tool

Remote Sensing Labeling Tool is an interactive platform for annotating and labeling remote sensing data, such as satellite imagery. This tool is particularly suited for researchers, data scientists, and geospatial analysts working with remote sensing datasets and aiming to prepare labeled data for machine learning and analysis workflows.

# Demo

We also provide a live demo which is currently being refined
[Demo](https://mapit.earth/)

## Features

- **Data Upload & Management**: Easily upload GeoTIFF and other remote sensing formats for labeling.
- **Interactive Labeling Tools**: Utilize customizable drawing and erasing tools to label images pixel-by-pixel or region-by-region.
- **Image Processing**: Built-in support for band adjustment, brightness/contrast tuning, and other preprocessing tools.
- **Data Interpolation**: Bilinear interpolation and nearest neighbor methods for fine-grained data handling.
- **Flexible Class Management**: Create and manage classes for different data labels, which can be visualized on the labeling canvas.
- **Export**: Export labeled data in formats compatible with machine learning pipelines.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [License](#license)

## Technologies Used

- **Vue 3** with TypeScript: For reactive UI components and efficient state management.
- **Vuetify**: Provides a beautiful Material Design interface for user interactions.
- **GeoTIFF.js**: Processes and renders geospatial TIFF images.
- **Pinia**: State management tailored for Vue 3, handling the application's global states.
- **Proj4js**: Projects spatial data between coordinate systems.

## Installation

### Prerequisites

Ensure you have the following installed:

- **Node.js** (>= 14.x recommended)
- **NPM** or **Yarn**

### Steps

1. Clone the repository:
   ```bash
   git clone https://github.com/autocoast/remote-sensing-labelling-tool.git
   cd remote-sensing-labelling-tool
