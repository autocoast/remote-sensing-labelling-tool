// import { getSettings, updateSetting } from "@/utils/helpers/api";
import { defineStore } from "pinia";

export interface Setting {
    id: number;
    name: string;
    value: string;
    type: string;
    displayName: string;
}

export interface HotKeySetting {
    id: number;
    name: string;
    value: string;
    type: string;
    keys: string[];
    displayName: string;
}

export const useSettingsStore = defineStore({
    id: 'settingStore',
    state: () => ({
        settings: [] as Setting[],
        hotKeys: [] as HotKeySetting[],
        isLoading: false
    }),
    actions: {
        async loadSettings() {
            this.settings = [];
            this.hotKeys = [];
            // const settings = await getSettings();
            // this.settings = settings.settings;
            this.settings = [
                {
                    type: "string[]",
                    value: '["w"]',
                    displayName: 'Plain Drawer',
                    id: 1,
                    name: 'hk_toggle_pen'
                },
                {
                    type: "string[]",
                    value: '["m"]',
                    displayName: 'Toggle Map',
                    id: 2,
                    name: 'hk_toggle_map'
                },
                {
                    type: "string[]",
                    value: '["q"]',
                    displayName: 'Panmove',
                    id: 3,
                    name: 'hk_toggle_pan'
                },
                {
                    type: "string[]",
                    value: '["a"]',
                    displayName: 'Bucket',
                    id: 4,
                    name: 'hk_toggle_bucket'
                },
                {
                    type: "string[]",
                    value: '["x"]',
                    displayName: 'Normalize',
                    id: 5,
                    name: 'hk_toggle_norm'
                },
                {
                    type: "string[]",
                    value: '["z"]',
                    displayName: 'Undo',
                    id: 6,
                    name: 'hk_undo'
                },
                {
                    type: "string[]",
                    value: '["y"]',
                    displayName: 'Redo',
                    id: 7,
                    name: 'hk_redo'
                },
                {
                    type: "string[]",
                    value: '["c"]',
                    displayName: 'Decrease Pen Size',
                    id: 8,
                    name: 'hk_decr_pen_size'
                },
                {
                    type: "string[]",
                    value: '["v"]',
                    displayName: 'Increase Pen Size',
                    id: 9,
                    name: 'hk_incr_pen_size'
                },
                {
                    type: "string[]",
                    value: '["e"]',
                    displayName: 'Eraser',
                    id: 10,
                    name: 'hk_toggle_eraser'
                },
                {
                    type: "string[]",
                    value: '["s"]',
                    displayName: 'Gap Drawer',
                    id: 11,
                    name: 'hk_toggle_gap_drawer'
                },
                {
                    type: "string[]",
                    value: '["d"]',
                    displayName: 'Wand',
                    id: 12,
                    name: 'hk_toggle_wand'
                },
                {
                    type: "string[]",
                    value: '["m"]',
                    displayName: 'Wand',
                    id: 12,
                    name: 'hk_toggle_map'
                },

            ];

            this.settings.forEach((setting: Setting) => {
                switch (setting.type) {
                    case 'string[]':
                        this.hotKeys.push({
                            ...setting,
                            keys: JSON.parse(setting.value)
                        });
                        localStorage.setItem(setting.displayName, JSON.parse(setting.value));
                        break;
                }
            });
        },
        async saveSetting(setting: Setting) {
            // await updateSetting(setting);
            // await this.loadSettings();
        }
    }
});