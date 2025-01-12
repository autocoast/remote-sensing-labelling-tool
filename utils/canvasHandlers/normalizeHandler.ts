import { SatelliteType, type EditorStore, type EditorStoreActions, type EditorStoreGetters, type NormType } from "@/types";

let worker: Worker | null = null;

export function normalize(editStore: (EditorStore & EditorStoreActions & EditorStoreGetters), normType: NormType, satelliteType: SatelliteType) {

    let tooltips = 'Source Image';
    // let canvas = getCanvasTemplate(labelStore, 'Source Image', tooltips);

    let canvas: HTMLCanvasElement = document.getElementById('Source Image') as HTMLCanvasElement;

    if (worker) {
        worker.terminate();  // Terminate any existing worker
    }

    worker = new Worker(new URL('@/public/workers/normalizeWorker.ts', import.meta.url), { type: 'module' });
    worker.onmessage = (event) => {
        // const { canvas } = event.data;
        // labelStore.layerNameToCanvas.set('savi', canvas);

        const ctx = canvas.getContext('2d');
        if (ctx) {
            const { imageData } = event.data;
            ctx.putImageData(imageData, 0, 0);
            ctx.imageSmoothingEnabled = false;
        }

        worker?.terminate();  // Clean up the worker
    };

    let r: Uint16Array = new Uint16Array();
    let g: Uint16Array = new Uint16Array();
    let b: Uint16Array = new Uint16Array();

    switch (satelliteType) {
        case SatelliteType.sentinels2l2a:
            r = editStore.sentinels2l2a.rawBands.b4.raster;
            g = editStore.sentinels2l2a.rawBands.b3.raster;
            b = editStore.sentinels2l2a.rawBands.b2.raster;
            break;
    }

    worker.postMessage({
        rRaw: r,
        gRaw: g,
        bRaw: b,
        normType,
        width: editStore.width,
        height: editStore.height
    });
}