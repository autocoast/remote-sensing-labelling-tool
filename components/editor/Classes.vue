<template>
    <div v-if="!editorStore.mapIsActive" @mouseenter="showClassLegend = true" @mouseleave="showClassLegend = false"
        class="absolute top-0 left-5 h-screen z-40 overflow-hidden">
        <div class="overflow-y-auto scroll-navbar">
            <div>
                <h3 class="text-lg font-bold text-lime-300">Current Class: {{
                    uploadStore.classes[editorStore.selectedClass].className }}</h3>
            </div>
            <div @click="editorStore.selectedClass = classIndex" v-for="(labelClass, classIndex) in uploadStore.classes"
                :key="labelClass.id" class="flex items-center cursor-pointer my-5">
                <!-- Color Box -->
                <div :style="{ backgroundColor: labelClass.color }" class="w-5 h-5 rounded"></div>

                <!-- Margin (can be replaced with Tailwind spacing) -->
                <div class="mx-2"></div>

                <!-- Class Name with Transition -->
                <transition name="fade">
                    <div v-show="showClassLegend" class="text-sm truncate text-lime-300">
                        {{ labelClass.className }}
                    </div>
                </transition>
            </div>
            <!-- Extra space at the bottom -->
            <div class="h-24"></div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useUploadStore } from '~/store/uploadStore';
import { useEditorStore } from '~/store/editorStore';

const uploadStore = useUploadStore();
const editorStore = useEditorStore();

// State to show/hide the class legend
const showClassLegend = ref(false);
</script>

<style>
/* Example fade transition */
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

.scroll-navbar {
    height: 100%;
    overflow-y: scroll;
}
</style>