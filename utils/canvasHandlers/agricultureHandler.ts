import { getCanvasTemplate } from "@/utils";
import { NormType, SatelliteType, type EditorStore } from "@/types";

let worker: Worker | null = null;

export function loadAgriculture(editStore: EditorStore, satelliteType: SatelliteType) {

    let tooltips = 'The agriculture band combination uses SWIR-1 (B11), near-infrared (B8), and blue (B2). It’s mostly used to monitor the health of crops because of how it uses short-wave and near-infrared. Both these bands are particularly good at highlighting dense vegetation that appears as dark green.';
    let canvas = getCanvasTemplate(editStore, 'Agriculture', tooltips, true);

    // let normalisedAgricultureTiff: ImageData = normalizeBy1And99Percentile([editStore.b11Raw, editStore.b8Raw, editStore.rgbRaw[2]], editStore.width, editStore.height);
    if (worker) {
        worker.terminate();  // Terminate any existing worker
    }

    worker = new Worker(new URL('@/public/workers/agricultureWorker.ts', import.meta.url), { type: 'module' });
    worker.onmessage = (event) => {


        const ctx = canvas.getContext('2d');
        if (ctx) {
            const { imageData } = event.data;
            ctx.clearRect(0, 0, editStore.width, editStore.height);
            ctx.putImageData(imageData, 0, 0);
            ctx.imageSmoothingEnabled = false;
        }

        worker?.terminate();  // Clean up the worker
    };

    let SWIR: Uint16Array = new Uint16Array();
    let NIR: Uint16Array = new Uint16Array();
    let BLUE: Uint16Array = new Uint16Array();

    switch (satelliteType) {
        case SatelliteType.sentinels2l2a:
            BLUE = editStore.sentinels2l2a.rawBands.b2.raster;
            NIR = editStore.sentinels2l2a.rawBands.b8.raster;
            SWIR = editStore.sentinels2l2a.rawBands.b11.raster;
            break;
    }

    worker.postMessage({
        swir: SWIR,
        nir: NIR,
        blue: BLUE,
        width: editStore.width,
        height: editStore.height,
    });
}
