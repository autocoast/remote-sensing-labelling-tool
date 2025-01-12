import type { EditorStore } from "@/types";
import type { PanzoomObject, PanzoomOptions } from "@panzoom/panzoom";
import Panzoom from "@panzoom/panzoom";
import { useEditorStore } from "~/store/editorStore";

export class PanzoomHandler {

    static instance: PanzoomHandler | null = null;

    panzoom: PanzoomObject | null = null;
    lastPan: { x: number, y: number } | null = null;
    lastPanScale: number | null = null;
    lastPanOptions: PanzoomOptions | null = null;
    lastLabelContainerStyle: string | null = null;

    editorStore: EditorStore | null = null;

    constructor() {
        if (PanzoomHandler.instance) {
            return PanzoomHandler.instance;
        }
        this.editorStore = useEditorStore();
    }

    static getInstance() {
        if (!PanzoomHandler.instance) {
            PanzoomHandler.instance = new PanzoomHandler();
        }
        return PanzoomHandler.instance;
    }

    addPanzoom(element: HTMLElement, triggerDownEvent?: boolean) {
        if (!PanzoomHandler.getInstance().panzoom) {

            PanzoomHandler.getInstance().panzoom = Panzoom(element, {
                maxScale: 20,
                minScale: 0.1,
                bounds: false,
                boundsPadding: 0
            });

            if (PanzoomHandler.getInstance().lastPan && PanzoomHandler.getInstance().lastPanScale) {
                PanzoomHandler.getInstance().panzoom!.zoom(PanzoomHandler.getInstance().lastPanScale!, { animate: false });
                setTimeout(() => {
                    PanzoomHandler.getInstance().panzoom!.pan(PanzoomHandler.getInstance().lastPan!.x, PanzoomHandler.getInstance().lastPan!.y, { animate: false });
                }, 0);
            }
            document.getElementById('panContainer')!.addEventListener('wheel', PanzoomHandler.getInstance().panzoom!.zoomWithWheel);
        } else {
            PanzoomHandler.getInstance().removePanZoom();
            document.getElementById('panContainer')!.addEventListener('pointerdown', PanzoomHandler.getInstance().panzoom!.handleDown);
        }
    }

    addRightMouseButtonDownEvent() {
        let labelContainer = document.getElementById('panContainer');
        if (labelContainer) {
            labelContainer.addEventListener('pointerdown', (e) => {
                if (e.button !== 2) return;
                PanzoomHandler.getInstance().addPanzoom(document.getElementById('panContainer')!, true);
                PanzoomHandler.getInstance().panzoom!.handleDown(e as PointerEvent);
            });
        }
    }

    addRightMouseButtonUpEvent() {
        let labelContainer = document.getElementById('panContainer');
        if (labelContainer) {
            labelContainer.addEventListener('pointerup', (e) => {
                e.preventDefault();
                if (PanzoomHandler.getInstance().editorStore!.drawingActive
                    || PanzoomHandler.getInstance().editorStore!.eraser.active
                    || PanzoomHandler.getInstance().editorStore!.wand.active
                    || PanzoomHandler.getInstance().editorStore!.bucket.active
                    || PanzoomHandler.getInstance().editorStore!.gapDrawer.active) {

                    PanzoomHandler.getInstance().removePanZoom();
                }
            });
        }
    }

    removePanZoom() {
        document.getElementById('panContainer')!.removeEventListener('pointerdown', PanzoomHandler.getInstance().panzoom!.handleDown);
    }


}