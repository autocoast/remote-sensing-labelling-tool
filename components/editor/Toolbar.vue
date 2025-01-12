<template>

    <!-- Sidebar/Menu -->
    <div v-if="!editorStore.mapIsActive" class="w-28 text-white p-0 space-y-4">
        <!-- Menu Item 1 -->
        <div class="flex">
            <div class="indicator">
                <span v-if="editorStore.showHotkeys" class="indicator-item badge badge-primary">{{
                    hotkeyNameToShortcutName('hk_toggle_pan') }}</span>
                <button class="btn w-12"
                    :class="editorStore.panMoveActive ? ' bg-slate-200 text-slate-950 border-slate-200' : ''"
                    @click="editorStore.activateTool('pan')">
                    <Icon name="mdi:pan" style="color: black" />
                </button>
            </div>
            <div class="indicator">
                <span v-if="editorStore.showHotkeys" class="indicator-item badge badge-primary">{{
                    hotkeyNameToShortcutName('hk_toggle_map') }}</span>
                <button class="btn w-12"
                    :class="editorStore.mapIsActive ? ' bg-slate-200 text-slate-950 border-slate-200' : ''"
                    @click="editorStore.activateTool('map')">
                    <Icon name="mdi:map" style="color: black" />
                </button>
            </div>
        </div>
        <div class="flex">
            <div class="indicator">
                <span v-if="editorStore.showHotkeys" class="indicator-item badge badge-primary">{{
                    hotkeyNameToShortcutName('hk_toggle_pen') }}</span>
                <button class="btn w-12"
                    :class="editorStore.drawingActive ? ' bg-slate-200 text-slate-950 border-slate-200' : ''"
                    @click="editorStore.activateTool('plainDrawer')">
                    <Icon name="uil:pen" style="color: black" />
                </button>
            </div>
            <div class="indicator">
                <span v-if="editorStore.showHotkeys" class="indicator-item badge badge-primary">{{
                    hotkeyNameToShortcutName('hk_toggle_eraser')
                    }}</span>
                <button class="btn w-12"
                    :class="editorStore.eraser.active ? ' bg-slate-200 text-slate-950 border-slate-200' : ''"
                    @click="editorStore.activateTool('eraser')">
                    <Icon name="mdi:eraser" style="color: black" />
                </button>
            </div>
        </div>
        <!-- <div class="flex">
            <button class="btn w-12"
                :class="editorStore.magneticDrawer.active ? ' bg-slate-200 text-slate-950 border-slate-200' : ''"
                @click="editorStore.activateTool('magneticDrawer')">
                <Icon name="mdi:magnet" style="color: black" />
            </button>
            <button class="btn w-12"
                :class="editorStore.eraser.active ? ' bg-slate-200 text-slate-950 border-slate-200' : ''"
                @click="editorStore.activateTool('eraser')">
                <Icon name="mdi:eraser" style="color: black" />
            </button>
        </div> -->
        <div class="flex">
            <button class="btn w-12" @click="downloadNpy()">
                <Icon name="uil:download-alt" style="color: black" />
            </button>
            <div class="indicator">
                <span v-if="editorStore.showHotkeys" class="indicator-item badge badge-primary">{{
                    hotkeyNameToShortcutName('hk_toggle_bucket')
                    }}</span>
                <button class="btn w-12"
                    :class="editorStore.bucket.active ? ' bg-slate-200 text-slate-950 border-slate-200' : ''"
                    @click="editorStore.activateTool('bucket')">
                    <Icon name="mdi:fill" style="color: black" />
                </button>
            </div>
        </div>

        <div class="flex">
            <div class="indicator">
                <span v-if="editorStore.showHotkeys" class="indicator-item badge badge-primary">{{
                    hotkeyNameToShortcutName('hk_toggle_gap_drawer')
                }}</span>
                <button class="btn w-12"
                    :class="editorStore.gapDrawer.active ? ' bg-slate-200 text-slate-950 border-slate-200' : ''"
                    @click="editorStore.activateTool('gapDrawer')">
                    <Icon name="mdi:ab-testing" style="color: black" />
                </button>
            </div>
            <div class="relative">

                <!-- Activator Button -->
                <div class="indicator">
                    <span v-if="editorStore.showHotkeys" class="indicator-item badge badge-primary">{{
                        hotkeyNameToShortcutName('hk_toggle_wand')
                        }}</span>
                    <button @click="toggleMenu" class="btn w-12"
                        :class="editorStore.wand.menuOpen || editorStore.wand.active ? ' bg-slate-200 text-slate-950 border-slate-200' : ''"
                        :style="{ border: editorStore.wand.overwriteClass ? '2px solid ' + editorStore.wand.overwriteClass : 'none' }"
                        :disabled="false">
                        <Icon name="mdi:magic-staff" style="color: black" />
                    </button>
                </div>

                <!-- Dropdown Menu -->
                <transition name="fade-slide">
                    <div v-if="editorStore.wand.menuOpen"
                        class="absolute z-50 bg-white text-slate-500 shadow-lg rounded-lg p-4 w-72"
                        @click.outside="closeMenu">
                        <!-- Card Content -->
                        <h4 class="text-lg font-semibold">Wand Tool</h4>
                        <p class="text-sm">
                            The wand tool lets you replace a certain color when overpainting it without interfering
                            with
                            other colors.
                        </p>
                        <h5 class="text-md font-medium mt-4">Please pick a color that should be replaced</h5>
                        <div class="mt-2 w-24 h-12 rounded" :style="{ backgroundColor: editorStore.hoverColor }">
                        </div>
                    </div>
                </transition>
            </div>
        </div>
        <div class="flex">
            <div class="indicator">
                <span v-if="editorStore.showHotkeys" class="indicator-item badge badge-primary">{{
                    hotkeyNameToShortcutName('hk_undo')
                    }}</span>
                <button class="btn w-12" @click="HistoryHandler.getInstance().undo()">
                    <Icon name="mdi:undo" style="color: black" />
                </button>
            </div>
            <div class="indicator">
                <span v-if="editorStore.showHotkeys" class="indicator-item badge badge-primary">{{
                    hotkeyNameToShortcutName('hk_redo')
                    }}</span>
                <button class="btn w-12" @click="HistoryHandler.getInstance().redo()">
                    <Icon name="mdi:redo" style="color: black" />
                </button>
            </div>
        </div>
        <div class="indicator">
            <span v-if="editorStore.showHotkeys" class="indicator-item badge badge-primary">{{
                hotkeyNameToShortcutName('hk_toggle_norm') }}</span>
            <span class="text-xs text-slate-400">Normalization</span>
        </div>
        <select v-model="editorStore.currentNormalization"
            @change="normalize(editorStore, editorStore.currentNormalization, SatelliteType.sentinels2l2a)"
            class="select w-full max-w-xs select-xs text-slate-500 mt-0" style="margin-top: 0;">
            <option v-for="norm in normalizations" :key="norm" :value="norm">{{ normTypeToDisplayName(norm) }}
            </option>
        </select>
        <div class="indicator">
            <span v-if="editorStore.showHotkeys" class="indicator-item badge badge-primary">{{
                hotkeyNameToShortcutName('hk_decr_pen_size') }}- {{ hotkeyNameToShortcutName('hk_incr_pen_size')
                }}+</span>
            <span class="text-xs text-slate-400">Pen size</span>
        </div>
        <select v-model="editorStore.penSize" @change="CursorShadowHandler.getInstance().updateCursorShadow()"
            class="select w-full max-w-xs select-xs text-slate-500 mt-0" style="margin-top: 0;">
            <option
                v-for="i in [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25]"
                :key="i" :value="i">{{ i }}</option>
        </select>
        <!-- <div class="form-control"> -->
        <label class="label cursor-pointer">
            <span class="label-text text-xs text-slate-400">Hotkeys</span>
            <input v-model="editorStore.showHotkeys" type="checkbox"
                class="toggle bg-slate-200 hover:bg-slate-200 border-slate-400 hover:border-slate-400 focus:border-slate-400 input-primary input-bordered toggle-sm" />
        </label>
        <!-- </div> -->
    </div>

</template>

<script setup lang="ts">

import { fromUrl, fromUrls, fromArrayBuffer, fromBlob, GeoTIFF, type TypedArray, GeoTIFFImage, type ReadRasterResult } from 'geotiff';
import { normalizations, useEditorStore } from '~/store/editorStore';
import { useSettingsStore } from '~/store/settingStore';
import { useUploadStore } from '~/store/uploadStore';
import { SatelliteType } from '~/types';
import { CursorShadowHandler } from '~/utils/canvasHandlers/cursorShadowHandler';
import { normalize } from '~/utils/canvasHandlers/normalizeHandler';
const editorStore = useEditorStore();
const uploadStore = useUploadStore();
const settingStore = useSettingsStore();

function hotkeyNameToShortcutName(hotkeyName: string) {
    const setting = settingStore.settings.find(x => x.name === hotkeyName);
    return setting ? JSON.parse(setting.value).join(' + ') : '';
}

function toggleMenu() {
    editorStore.wand.menuOpen = !editorStore.wand.menuOpen;
};

// Close menu
function closeMenu() {
    editorStore.wand.menuOpen = false;
};

function downloadNpy() {
    // select all canvases from #drawingContainer
    const canvases = document.querySelectorAll('#layers canvas') as NodeListOf<HTMLCanvasElement>;
    // check if canvas id starts with "Drawing Layer"
    const drawingCanvases = Array.from(canvases).filter(canvas => canvas.id.startsWith('Drawing Layer'));
    // createMultiChannelArray(drawingCanvases, uploadStore);
    handleDownload(drawingCanvases, uploadStore);
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
</style>