<template>
    <div v-if="editorStore.bucket.active"
        class="z-50 absolute top-2 left-1/2 transform -translate-x-1/2 w-96 p-2 h-12 bg-slate-400 shadow-md rounded flex items-center justify-center">
        <p class="mr-3">Bucket Fill Tolerance</p>
        <input type="range" class="bg-slate-200 range range-primary" min="0" max="100" step="1"
            v-model="editorStore.bucketFillTolerance" @change="handleSliderChange" />
    </div>
</template>

<script setup>
import { useEditorStore } from '~/store/editorStore';
import { useUploadStore } from '~/store/uploadStore';
import { bucketFillWorker } from '~/utils/canvasHandlers/bucketfill';

const editorStore = useEditorStore();
const uploadStore = useUploadStore();

// Method to handle slider change logic
const handleSliderChange = () => {
    if (HistoryHandler.history.length) {
        if (HistoryHandler.history[HistoryHandler.history.length - 1][3] === HistoryAction.BUCKETFILL) {
            HistoryHandler.getInstance().undo();
            const canvas = ActionEventHandler.getInstance().getCanvas();
            bucketFillWorker(canvas, editorStore.lastXY.x, editorStore.lastXY.y, editorStore, uploadStore);
        }
    }
};

</script>