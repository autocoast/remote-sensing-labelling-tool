import { getCanvasTemplate } from "@/utils";
import { SatelliteType, type EditorStore } from "~/types";

let worker: Worker | null = null;

export function loadNDVI(editStore: EditorStore, satelliteType: SatelliteType) {

    let tooltips = 'Because near-infrared (which vegetation strongly reflects) and red light (which vegetation absorbs), the vegetation index is good for quantifying the amount of vegetation. The formula for the normalized difference vegetation index is (B8-B4)/(B8+B4). While high values suggest dense canopy, low or negative values indicate urban and water features.';
    let canvas = getCanvasTemplate(editStore, 'NDVI', tooltips, true);

    if (worker) {
        worker.terminate();  // Terminate any existing worker
    }

    worker = new Worker(new URL('@/public/workers/ndviWorker.ts', import.meta.url), { type: 'module' });
    worker.onmessage = (event) => {


        const ctx = canvas.getContext('2d');
        if (ctx) {
            const { imageData } = event.data;
            ctx.putImageData(imageData, 0, 0);
            ctx.imageSmoothingEnabled = false;
        }

        worker?.terminate();  // Clean up the worker
    };

    let NIR: Uint16Array = new Uint16Array();
    let RED: Uint16Array = new Uint16Array();

    switch (satelliteType) {
        case SatelliteType.sentinels2l2a:
            RED = editStore.sentinels2l2a.rawBands.b4.raster;
            NIR = editStore.sentinels2l2a.rawBands.b8.raster;
            break;
    }



    worker.postMessage({
        b8Raw: NIR,
        rRaw: RED,
        width: editStore.width,
        height: editStore.height
    });
}