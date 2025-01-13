<!--
/*
 * Remote Sensing Labelling Tool
 * Copyright (C) 2025 Helmholtz-Zentrum Hereon
 * Author: David Pogorzelski
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */
-->

<template>
    <EditorHeader>
        <div class="flex h-screen">

            <!-- Tool Bar -->
            <EditorToolbar />
            <!-- Main Editor -->
            <div class="flex-1 bg-slate-600 relative">
                <EditorMap v-if="editorStore.mapViewActive" />
                <EditorClassicView v-else />
            </div>

            <!-- Layers/Right Panel -->
            <div v-if="!editorStore.mapIsActive" class="w-48 text-black p-4 space-y-4">
                <div class="flex items-center">
                    <span class="text-xs text-slate-400">Drawing Layers</span>
                    <div class="m-1"></div>
                    <button class="items-center flex" @click.stop
                        @click="() => { editorStore.addDrawingLayer('Drawing Layer ' + (editorStore.drawingLayerNameDisplayOrder.length + 1), editorStore.width, editorStore.height) }">
                        <Icon name="mdi:plus" />
                    </button>
                </div>
                <div class="cursor-pointer text-sm text-slate-500 rounded-lg p-2"
                    :class="editorStore.selectedDrawingLayer === layerName ? 'bg-slate-200' : ''"
                    @click="editorStore.selectLayer(layerName)"
                    v-for="layerName in editorStore.drawingLayerNameDisplayOrder" :key="layerName">
                    <div>{{ layerName }}</div>
                    <div class="m-2"></div>
                    <div class="flex w-full">
                        <button @click.stop
                            @click="editorStore.layerNameDrawerSettings.get(layerName)!.visible = !editorStore.layerNameDrawerSettings.get(layerName)!.visible">
                            <Icon
                                :name="editorStore.layerNameDrawerSettings.get(layerName)!.visible ? 'mdi:eye' : 'mdi:eye-closed'" />
                        </button>
                        <div class="m-1"></div>
                        <input v-model="editorStore.layerNameDrawerSettings.get(layerName)!.opacity" type="range"
                            min="0" max="100" class="range range-primary range-xs bg-slate-100" @click.stop />
                    </div>
                </div>
                <div class="m-4"></div>
                <span class="text-xs text-slate-400">Other Layers</span>
                <div class="cursor-pointer text-sm text-slate-500 rounded-lg p-2"
                    :class="editorStore.selectedOtherLayer === layerName ? 'bg-slate-200' : ''"
                    @click="editorStore.selectLayer(layerName)" v-for="layerName in editorStore.layerNameDisplayOrder"
                    :key="layerName">
                    <div>{{ layerName }}</div>
                    <div class="m-2"></div>
                    <div class="flex w-full">
                        <button @click.stop
                            @click="editorStore.layerNameDrawerSettings.get(layerName)!.visible = !editorStore.layerNameDrawerSettings.get(layerName)!.visible">
                            <Icon
                                :name="editorStore.layerNameDrawerSettings.get(layerName)!.visible ? 'mdi:eye' : 'mdi:eye-closed'" />
                        </button>
                        <div class="m-1"></div>
                        <button @click.stop @click="toggleMenu(layerName)">
                            <Icon name="mdi:stairs" />
                        </button>
                        <transition name="fade-slide">
                            <div v-if="editorStore.layerNameDrawerSettings.get(layerName)!.kmeansMenuOpen"
                                ref="kmeansMenuRef" :style="menuStyle"
                                class=" absolute z-50 bg-white text-slate-500 shadow-lg rounded-lg p-4 w-72">
                                <!-- Card Content -->
                                <h4 class="text-lg font-semibold">K-Means Clustering</h4>
                                <p class="text-sm">
                                    Cluster the satellite image to reduce the number of colors.
                                    This helps to simplify the labelling process.
                                    <br />
                                    <br />
                                    Number of clusters:
                                </p>
                                <select v-model="numberOfClusters" class="mt-2 w-24 h-12 rounded">
                                    <option
                                        v-for="i in [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]"
                                        :value="i" :selected="i === numberOfClusters">{{ i }}</option>
                                </select>
                                <button @click.stop class="btn w-24 mt-2 border-none"
                                    @click="() => { continuosToDiscrete(layerName) }">{{
                                        editorStore.kmeansLoading ? '' : 'Cluster' }}
                                    <span v-if="editorStore.kmeansLoading"
                                        class="loading loading-spinner loading-xs"></span>
                                </button>
                                <button @click.stop class="btn w-12 mt-2 border-none" @click="closeMenu(layerName)">
                                    <Icon name="mdi:close" />
                                </button>
                            </div>
                        </transition>
                        <div class="m-1"></div>
                        <button @click="discreteToContinuos(layerName)" @click.stop>
                            <Icon name="mdi:chart-bell-curve-cumulative"
                                :class="editorStore.layerNameDrawerSettings.get(layerName)!.kmeansClustered ? 'bg-red-600' : ''" />
                        </button>
                        <div class="m-1"></div>
                        <input v-model="editorStore.layerNameDrawerSettings.get(layerName)!.opacity" type="range"
                            min="0" max="100" class="range range-primary range-xs bg-slate-100" @click.stop />
                    </div>
                </div>
            </div>
            <div v-else class="w-48 text-black p-4 space-y-4">
                <div class="indicator">
                    <span v-if="editorStore.showHotkeys" class="indicator-item badge badge-primary">m</span>
                    <button class="btn w-30 mt-2 border-none text-sm text-slate-400"
                        @click="editorStore.mapIsActive = false, editorStore.panMoveActive = true">
                        <Icon name="mdi:close" />Close Map
                    </button>
                </div>

            </div>
        </div>
    </EditorHeader>
</template>


<script lang="ts" setup>
import { fromUrl, fromArrayBuffer, GeoTIFFImage, type ReadRasterResult } from 'geotiff';
import { useEditorStore } from '~/store/editorStore';
import { useSettingsStore } from '~/store/settingStore';
import { useUploadStore } from '~/store/uploadStore';
import { SatelliteType } from '~/types';
import { loadAgriculture } from '~/utils/canvasHandlers/agricultureHandler';
import { discretize } from '~/utils/canvasHandlers/kmeansHandler';
import { loadNDVI } from '~/utils/canvasHandlers/ndviHandler';
import { loadNDWI } from '~/utils/canvasHandlers/ndwiHandler';
import GeoTIFF from 'geotiff';
import proj4 from 'proj4';
import { useNavStore } from '~/store/navStore';
import _ from 'lodash';

definePageMeta({
    layout: 'editor'
})

const editorStore = useEditorStore();
const uploadStore = useUploadStore();
const settingStore = useSettingsStore();
const navStore = useNavStore();
const route = useRoute()

function bilinearInterpolate() {
    // Determine the highest resolution band
    const maxResolutionBand = Object.values(editorStore.sentinels2l2a.rawBands).reduce((max, band) => {
        return band.raster.length > max.raster.length ? band : max;
    });

    const maxResolution = Math.sqrt(maxResolutionBand.raster.length);
    if (!Number.isInteger(maxResolution)) {
        throw new Error("Invalid raster length for a square grid.");
    }

    const result: Record<string, Uint16Array> = {};

    for (const [bandKey, { raster }] of Object.entries(editorStore.sentinels2l2a.rawBands)) {
        const resolution = Math.sqrt(raster.length);
        if (!Number.isInteger(resolution)) {
            throw new Error(`Invalid raster length for band ${bandKey}.`);
        }

        if (resolution === maxResolution) {
            continue;
        }

        const scale = resolution / maxResolution;
        const interpolated = new Uint16Array(maxResolution * maxResolution);

        for (let y = 0; y < maxResolution; y++) {
            for (let x = 0; x < maxResolution; x++) {
                // Calculate the corresponding position in the lower-res image
                const srcX = x * scale;
                const srcY = y * scale;

                const x0 = Math.floor(srcX);
                const y0 = Math.floor(srcY);
                const x1 = Math.min(x0 + 1, resolution - 1);
                const y1 = Math.min(y0 + 1, resolution - 1);

                const xWeight = srcX - x0;
                const yWeight = srcY - y0;

                const topLeft = raster[y0 * resolution + x0];
                const topRight = raster[y0 * resolution + x1];
                const bottomLeft = raster[y1 * resolution + x0];
                const bottomRight = raster[y1 * resolution + x1];

                const interpolatedValue =
                    topLeft * (1 - xWeight) * (1 - yWeight) +
                    topRight * xWeight * (1 - yWeight) +
                    bottomLeft * (1 - xWeight) * yWeight +
                    bottomRight * xWeight * yWeight;

                interpolated[y * maxResolution + x] = Math.round(interpolatedValue);
            }
        }

        //@ts-ignore
        editorStore.sentinels2l2a.rawBands[bandKey].raster = interpolated;
    }
}

async function loadTifByUrlAndStore(tifName: string, bandName: string) {
    const tifImage = await fromUrl('https://mapit.earth/example/' + tifName);
    // const tifImage = await fromUrl('http://localhost:3000/example/' + tifName);
    const image: GeoTIFFImage = await tifImage.getImage();
    const rasterImage: ReadRasterResult = await image.readRasters()


    if (uploadStore.selectedSatellite === 'sentinel-2') {
        switch (bandName) {
            case 'B1':
                editorStore.sentinels2l2a.rawBands.b1.raster = rasterImage[0] as Uint16Array;
                break;
            case 'B2':
                editorStore.sentinels2l2a.rawBands.b2.raster = rasterImage[0] as Uint16Array;
                break;
            case 'B3':
                editorStore.sentinels2l2a.rawBands.b3.raster = rasterImage[0] as Uint16Array;
                editorStore.referenceGeoTiff = tifImage;
                break;
            case 'B4':
                editorStore.sentinels2l2a.rawBands.b4.raster = rasterImage[0] as Uint16Array;
                break;
            case 'B5':
                editorStore.sentinels2l2a.rawBands.b5.raster = rasterImage[0] as Uint16Array;
                break;
            case 'B6':
                editorStore.sentinels2l2a.rawBands.b6.raster = rasterImage[0] as Uint16Array;
                break;
            case 'B7':
                editorStore.sentinels2l2a.rawBands.b7.raster = rasterImage[0] as Uint16Array;
                break;
            case 'B8':
                editorStore.sentinels2l2a.rawBands.b8.raster = rasterImage[0] as Uint16Array;
                break;
            case 'B8A':
                editorStore.sentinels2l2a.rawBands.b8a.raster = rasterImage[0] as Uint16Array;
                break;
            case 'B9':
                editorStore.sentinels2l2a.rawBands.b9.raster = rasterImage[0] as Uint16Array;
                break;
            case 'B11':
                editorStore.sentinels2l2a.rawBands.b11.raster = rasterImage[0] as Uint16Array;
                break;
            case 'B12':
                editorStore.sentinels2l2a.rawBands.b12.raster = rasterImage[0] as Uint16Array;
                break;
        }
    }
}

async function loadTifByFileAndStore(tif: File, bandName: string) {
    const tifImage = await fromArrayBuffer(await tif.arrayBuffer());
    const image: GeoTIFFImage = await tifImage.getImage();
    const rasterImage: ReadRasterResult = await image.readRasters()

    if (uploadStore.selectedSatellite === 'sentinel-2') {
        switch (bandName) {
            case 'B1':
                editorStore.sentinels2l2a.rawBands.b1.raster = rasterImage[0] as Uint16Array;
                break;
            case 'B2':
                editorStore.sentinels2l2a.rawBands.b2.raster = rasterImage[0] as Uint16Array;
                break;
            case 'B3':
                editorStore.sentinels2l2a.rawBands.b3.raster = rasterImage[0] as Uint16Array;
                editorStore.referenceGeoTiff = tifImage;
                break;
            case 'B4':
                editorStore.sentinels2l2a.rawBands.b4.raster = rasterImage[0] as Uint16Array;
                break;
            case 'B5':
                editorStore.sentinels2l2a.rawBands.b5.raster = rasterImage[0] as Uint16Array;
                break;
            case 'B6':
                editorStore.sentinels2l2a.rawBands.b6.raster = rasterImage[0] as Uint16Array;
                break;
            case 'B7':
                editorStore.sentinels2l2a.rawBands.b7.raster = rasterImage[0] as Uint16Array;
                break;
            case 'B8':
                editorStore.sentinels2l2a.rawBands.b8.raster = rasterImage[0] as Uint16Array;
                break;
            case 'B8A':
                editorStore.sentinels2l2a.rawBands.b8a.raster = rasterImage[0] as Uint16Array;
                break;
            case 'B9':
                editorStore.sentinels2l2a.rawBands.b9.raster = rasterImage[0] as Uint16Array;
                break;
            case 'B11':
                editorStore.sentinels2l2a.rawBands
                    .b11.raster = rasterImage[0] as Uint16Array;
                break;
            case 'B12':
                editorStore.sentinels2l2a.rawBands
                    .b12.raster = rasterImage[0] as Uint16Array;
                break;
        }
    }
}

async function loadBandByFile(bandName: string, uploadFile: File) {
    switch (bandName) {
        case 'B1':
            await loadTifByFileAndStore(uploadFile, 'B1')
            break;
        case 'B2':
            await loadTifByFileAndStore(uploadFile, 'B2')
            break;
        case 'B3':
            await loadTifByFileAndStore(uploadFile, 'B3')
            break;
        case 'B4':
            await loadTifByFileAndStore(uploadFile, 'B4')
            break;
        case 'B5':
            await loadTifByFileAndStore(uploadFile, 'B5')
            break;
        case 'B6':
            await loadTifByFileAndStore(uploadFile, 'B6')
            break;
        case 'B7':
            await loadTifByFileAndStore(uploadFile, 'B7')
            break;
        case 'B8':
            await loadTifByFileAndStore(uploadFile, 'B8')
            break;
        case 'B8A':
            await loadTifByFileAndStore(uploadFile, 'B8A')
            break;
        case 'B9':
            await loadTifByFileAndStore(uploadFile, 'B9')
            break;
        case 'B10':
            break;
        case 'B11':
            await loadTifByFileAndStore(uploadFile, 'B11')
            break;
        case 'B12':
            await loadTifByFileAndStore(uploadFile, 'B12')
            break;
        case 'B13':
            break;
    }
}

async function loadBandByUrl(bandName: string) {
    switch (bandName) {
        case 'B1':
            await loadTifByUrlAndStore('B1.tif', 'B1')
            break;
        case 'B2':
            await loadTifByUrlAndStore('b.tif', 'B2')
            break;
        case 'B3':
            await loadTifByUrlAndStore('g.tif', 'B3')
            break;
        case 'B4':
            await loadTifByUrlAndStore('r.tif', 'B4')
            break;
        case 'B5':
            await loadTifByUrlAndStore('B5.tif', 'B5')
            break;
        case 'B6':
            await loadTifByUrlAndStore('B6.tif', 'B6')
            break;
        case 'B7':
            await loadTifByUrlAndStore('B7.tif', 'B7')
            break;
        case 'B8':
            await loadTifByUrlAndStore('B8.tif', 'B8')
            break;
        case 'B8A':
            await loadTifByUrlAndStore('B8A.tif', 'B8A')
            break;
        case 'B9':
            await loadTifByUrlAndStore('B9.tif', 'B9')
            break;
        case 'B10':
            break;
        case 'B11':
            await loadTifByUrlAndStore('B11.tif', 'B11')
            break;
        case 'B12':
            await loadTifByUrlAndStore('B12.tif', 'B12')
            break;
        case 'B13':
            break;
    }
}

interface Coordinate {
    x: number;
    y: number;
}

interface GeoKeys {
    ProjectedCSTypeGeoKey?: number;
}

async function getCornerCoordinates(tiff: GeoTIFF): Promise<[number, number][]> {
    // Load the GeoTIFF
    const image = await tiff.getImage();

    // Get GeoTIFF metadata
    const bbox = image.getBoundingBox(); // [minX, minY, maxX, maxY]
    const geoKeys: GeoKeys = image.getGeoKeys();

    // Check the projection (CRS)
    const sourceCRS = geoKeys.ProjectedCSTypeGeoKey
        ? `EPSG:${geoKeys.ProjectedCSTypeGeoKey}`
        : 'EPSG:4326'; // Default to WGS84 if no projection is defined

    // Define corner coordinates in image space
    const corners: Coordinate[] = [
        { x: bbox[0], y: bbox[3] }, // Top-left
        { x: bbox[2], y: bbox[3] }, // Top-right
        { x: bbox[0], y: bbox[1] }, // Bottom-left
        { x: bbox[2], y: bbox[1] }, // Bottom-right
    ];

    // Transform to geographic coordinates (WGS84)
    const wgs84Corners = corners.map((corner) => {
        const [lon, lat] = proj4(sourceCRS, 'EPSG:4326', [corner.x, corner.y]);
        return [lon, lat] as [number, number];
    });

    return wgs84Corners;
}

watch(() => navStore.currentLinkIndex, () => {
    editorStore.resetStore();
    loadEditor();
});

async function loadEditor() {

    await settingStore.loadSettings();
    HotkeyHandler.getInstance();

    uploadStore.selectedSatellite = 'sentinel-2';
    if (!_.has(route.query, 'example')) {
        let folderIndex = 0;
        let folderName = '';
        let linkList: string[] = []
        for (let i = 0; i < uploadStore.uploadedFiles.length; i++) {
            if (folderName === '') {
                folderName = uploadStore.uploadedFiles[i].webkitRelativePath.split('/')[1];
                linkList.push(folderName);
            } else {
                if (folderName !== uploadStore.uploadedFiles[i].webkitRelativePath.split('/')[1]) {
                    folderIndex++;
                    folderName = uploadStore.uploadedFiles[i].webkitRelativePath.split('/')[1];
                    linkList.push(folderName);
                }
            }

            if (folderIndex === navStore.currentLinkIndex) {
                for (const [key, value] of Object.entries(uploadStore.sentinels2aAssignment)) {
                    if (value === uploadStore.uploadedFiles[i].webkitRelativePath.split('/')[2]) {
                        await loadBandByFile(key.replace('Band ', 'B').toUpperCase(), uploadStore.uploadedFiles[i]);
                    }
                }
            }
        }

        navStore.links = linkList;
    } else {
        await loadBandByUrl('B1');
        await loadBandByUrl('B2');
        await loadBandByUrl('B3');
        await loadBandByUrl('B4');
        await loadBandByUrl('B5');
        await loadBandByUrl('B6');
        await loadBandByUrl('B7');
        await loadBandByUrl('B8');
        await loadBandByUrl('B8A');
        await loadBandByUrl('B9');
        await loadBandByUrl('B11');
        await loadBandByUrl('B12');
    }



    // await Promise.all([
    //     loadBandByUrl('B1'),
    //     loadBandByUrl('B2'),
    //     loadBandByUrl('B3'),
    //     loadBandByUrl('B4'),
    //     loadBandByUrl('B5'),
    //     loadBandByUrl('B6'),
    //     loadBandByUrl('B7'),
    //     loadBandByUrl('B8'),
    //     loadBandByUrl('B8A'),
    //     loadBandByUrl('B9'),
    //     loadBandByUrl('B11'),
    //     loadBandByUrl('B12')
    // ]);

    if (editorStore.referenceGeoTiff) {
        getCornerCoordinates(editorStore.referenceGeoTiff).then((corners) => {
            if (corners.length === 4) {
                editorStore.cornerCoordinates = corners.map(([x, y]) => ({ x, y })) as [{ x: number; y: number; }, { x: number; y: number; }, { x: number; y: number; }, { x: number; y: number; }];
            } else {
                throw new Error("Expected 4 corner coordinates.");
            }
        });
    }

    bilinearInterpolate()


    let w = 0;
    let h = 0;
    switch (uploadStore.selectedSatellite) {
        case 'sentinel-2':
            w = Math.sqrt(editorStore.sentinels2l2a.rawBands.b4.raster.length);
            h = Math.sqrt(editorStore.sentinels2l2a.rawBands.b4.raster.length);
            break;
    }

    editorStore.width = w;
    editorStore.height = h;

    let sourceCanvas = editorStore.displaySourceImage(w, h);
    editorStore.addLayer('Source Image', sourceCanvas);
    editorStore.addDrawingLayer('Drawing Layer 1', w, h);
    editorStore.selectLayer('Drawing Layer 1');

    // load remaining layers
    switch (uploadStore.selectedSatellite) {
        case 'sentinel-2':
            if (uploadStore.useNdvi) {
                loadNDVI(editorStore, SatelliteType.sentinels2l2a);
            }
            if (uploadStore.useAgriculture) {
                loadAgriculture(editorStore, SatelliteType.sentinels2l2a);
            }
            if (uploadStore.useNdwi) {
                loadNDWI(editorStore, SatelliteType.sentinels2l2a);
            }
            break;
    }
}


onMounted(async () => {
    loadEditor();
});

// const kmeansMenuOpen = ref(false);


function toggleMenu(layerName: string) {
    // editorStore.kmeansMenuOpen = !editorStore.kmeansMenuOpen;

    editorStore.otherLayers.forEach((layer) => {
        editorStore.layerNameDrawerSettings.get(layer.title)!.kmeansMenuOpen = false;
    });

    editorStore.layerNameDrawerSettings.get(layerName)!.kmeansMenuOpen = !editorStore.layerNameDrawerSettings.get(layerName)!.kmeansMenuOpen;
    adjustMenuPosition();
    // nextTick(() => {
    //     if (kmeansMenuOpen.value) {
    //         adjustMenuPosition();
    //     }
    // });
};

const numberOfClusters = ref(5);

// Close menu
function closeMenu(layerName: string) {
    editorStore.layerNameDrawerSettings.get(layerName)!.kmeansMenuOpen = false;
};

const kmeansMenuRef = ref<HTMLElement | null>(null);
const menuStyle = ref({
    marginTop: `20px`,
    right: '0px'
});

function continuosToDiscrete(layerName: string) {
    editorStore.displaySourceImage(editorStore.width, editorStore.height);
    let canvas = editorStore.layerNameToCanvas.get(layerName)!;
    discretize(canvas, numberOfClusters.value, editorStore, layerName);
    editorStore.layerNameDrawerSettings.get(layerName)!.discreteActive = true;
}

function discreteToContinuos(layerName: string) {
    switch (layerName) {
        case 'Source Image':
            editorStore.displaySourceImage(editorStore.width, editorStore.height);
            break;
        case 'NDVI':
            switch (uploadStore.selectedSatellite) {
                case 'sentinel-2':
                    loadNDVI(editorStore, SatelliteType.sentinels2l2a);
            }
            break;
        case 'Agriculture':
            switch (uploadStore.selectedSatellite) {
                case 'sentinel-2':
                    loadAgriculture(editorStore, SatelliteType.sentinels2l2a);
            }
            break;
        case 'NDWI':
            switch (uploadStore.selectedSatellite) {
                case 'sentinel-2':
                    loadNDWI(editorStore, SatelliteType.sentinels2l2a);
            }
            break;
    }
    editorStore.layerNameDrawerSettings.get(layerName)!.kmeansClustered = false;
}

function adjustMenuPosition() {
    const menu = kmeansMenuRef.value;
    if (menu) {
        const rect = menu.getBoundingClientRect();
        const viewportWidth = window.innerWidth;

        let left = rect.left;

        // Adjust if the menu goes beyond the right edge
        if (rect.right > viewportWidth) {
            left -= rect.right - viewportWidth + 16; // Add some padding
        }

        // Apply dynamic styles
        menuStyle.value = {
            marginTop: `20px`,
            right: `${left}px`,
        };
    }
}

</script>


<style>
/* Add Tailwind-based transition animation */
.fade-slide-enter-active,
.fade-slide-leave-active {
    @apply transition duration-300 ease-out;
}

.fade-slide-enter-from {
    @apply opacity-0 scale-95;
}

.fade-slide-enter-to {
    @apply opacity-100 scale-100;
}

.fade-slide-leave-from {
    @apply opacity-100 scale-100;
}

.fade-slide-leave-to {
    @apply opacity-0 scale-95;
}

#labelContainer.cursor-draw {
    cursor: url('@/assets/cursors/draw-pen.svg'), auto;
}

#labelContainer.cursor-move {
    cursor: move;
}

#labelContainer.cursor-ab {
    cursor: url('@/assets/cursors/ab-testing.svg'), auto;
}

#labelContainer.cursor-bucket {
    cursor: url('@/assets/cursors/format-color-fill.svg'), auto;
}

#labelContainer.cursor-wand {
    cursor: url('@/assets/cursors/auto-fix.svg'), auto;
}

#labelContainer.cursor-delete {
    cursor: url('@/assets/cursors/eraser.svg'), auto;
}
</style>