<template>
    <div style="position: relative;" oncontextmenu="return false;" class="relative w-full h-full">
        <EditorClasses />
        <EditorBucketSlider />
        <EditorMap />
        <div :class="editorStore.mapIsActive ? 'hidden' : 'display'" id="panContainer" class="w-full h-full">
            <div id="labelContainer" class="w-full h-full">
                <div id="layers"></div>
                <div id="drawingContainer"></div>
                <canvas id="cursorShadow"></canvas>
                <canvas id="autofill"></canvas>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { useEditorStore } from '~/store/editorStore';
import { useSettingsStore } from '~/store/settingStore';
import { CursorShadowHandler } from '~/utils/canvasHandlers/cursorShadowHandler';



const editorStore = useEditorStore();
const settingsStore = useSettingsStore();

// watch(() => editorStore.layerNameDrawerSettings, () => {



//     if (editorStore.layerNameDrawerSettings.get(layer.title)!.visible) {
//         document.getElementById(layer.title)!.style.display = 'block';
//     } else {
//         document.getElementById(layer.title)!.style.display = 'none';
//     }
// }, { deep: true });

watch(() => editorStore.layerNameDrawerSettings, () => {

    for (const [key, value] of editorStore.layerNameDrawerSettings.entries()) {
        const element = document.getElementById(key);
        if (element) {
            element.style.opacity = '' + (value.opacity / 100);

            if (value.visible) {
                element.style.display = 'block';
            } else {
                element.style.display = 'none';
            }

        }
    }

}, { deep: true });

watch(() => editorStore.layerNameToCanvas, () => {
    LayersHandler.getInstance().clearLayerCanvases();
    for (let i = editorStore.layerNameDisplayOrder.length - 1; i >= 0; i--) {
        let layerName = editorStore.layerNameDisplayOrder[i];
        let canvas = editorStore.layerNameToCanvas.get(layerName);
        if (canvas) {
            document.getElementById('layers')?.appendChild(canvas);
        }
    }
    editorStore.drawingLayerNameDisplayOrder.forEach((layerName) => {
        let canvas = editorStore.layerNameToCanvas.get(layerName);
        if (canvas) {
            document.getElementById('layers')?.appendChild(canvas);
        }
    });

}, { deep: true });

watch(() => editorStore.panMoveActive, (isActive) => {
    if (isActive) {
        PanzoomHandler.getInstance().addPanzoom(document.getElementById('panContainer')!);
        console.log('activating')
    } else {
        console.log('removing')
        if (PanzoomHandler.getInstance().panzoom) {
            PanzoomHandler.getInstance().lastPan = PanzoomHandler.getInstance().panzoom!.getPan();
            PanzoomHandler.getInstance().lastPanScale = PanzoomHandler.getInstance().panzoom!.getScale();
            PanzoomHandler.getInstance().lastPanOptions = PanzoomHandler.getInstance().panzoom!.getOptions();
            PanzoomHandler.getInstance().lastLabelContainerStyle = document.getElementById('panContainer')!.style.transform;
            PanzoomHandler.getInstance().removePanZoom();
        }
    }
});

watch(() => editorStore.penSize, (penSize) => {
    CursorShadowHandler.getInstance().updateCursorShadow();
});

watch(() => editorStore.width, (width) => {
    let cursorCanvas = document.querySelector('#cursorShadow')! as HTMLCanvasElement;
    cursorCanvas.width = width;
    cursorCanvas.height = editorStore.height;
    CursorShadowHandler.getInstance().updateCursorShadow();
});

onMounted(async () => {

    CursorShadowHandler.getInstance().addMouseOverContainer();
    PanzoomHandler.getInstance().addPanzoom(document.getElementById('panContainer')!);
    PanzoomHandler.getInstance().addRightMouseButtonDownEvent();
    PanzoomHandler.getInstance().addRightMouseButtonUpEvent();
    HistoryHandler.getInstance();
})

onBeforeUnmount(() => {
    PanzoomHandler.getInstance().removePanZoom();
    CursorShadowHandler.getInstance().removeMouseOverContainer();
});

</script>