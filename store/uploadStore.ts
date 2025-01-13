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

import { defineStore } from "pinia";
import type { UploadStore, UploadStoreActions, UploadStoreGetters } from "~/types";
// You can name the return value of `defineStore()` anything you want,
// but it's best to use the name of the store and surround it with `use`
// and `Store` (e.g. `useUserStore`, `useCartStore`, `useProductStore`)
// the first argument is a unique id of the store across your application
export const useUploadStore = defineStore<'uploadStore', UploadStore, UploadStoreGetters, UploadStoreActions>('uploadStore', {
    state: () => ({
        singleFilesUpload: true,
        multipleFilesUpload: false,
        uploadedFiles: [] as File[],
        selectedSatellite: 'sentinel-2' as 'custom' | 'sentinel-2' | 'landsat-8',
        useNdvi: true,
        useNdwi: true,
        useAgriculture: true,
        sentinels2aAssignment: {
            'Band 1': '',
            'Band 2': '',
            'Band 3': '',
            'Band 4': '',
            'Band 5': '',
            'Band 6': '',
            'Band 7': '',
            'Band 8': '',
            'Band 8a': '',
            'Band 9': '',
            'Band 11': '',
            'Band 12': ''
        } as Record<string, string>,
        classes: [
            {
                id: 1,
                className: 'Building',
                color: '#FF0000'
            }, {
                id: 2,
                className: 'Tree',
                color: '#00FF00'
            }, {
                id: 3,
                className: 'Road',
                color: '#0000FF'
            },
            {
                id: 1,
                className: 'Sand',
                color: '#DD3F00'
            }, {
                id: 2,
                className: 'Tidal',
                color: '#44AA44'
            }, {
                id: 3,
                className: 'Desert',
                color: '#00AAFF'
            },
            {
                id: 4,
                className: 'Scrubs',
                color: '#FFE000'
            }, {
                id: 5,
                className: 'Vegetation',
                color: '#DFFF23'
            }, {
                id: 6,
                className: 'Skyscraper',
                color: '#FF00FF'
            }
        ] as {
            id: number;
            className: string,
            color: string
        }[]
    }),
    actions: {
        hexColorToClassNumber(hexColor: string) {
            let found = this.classes.find((c) => c.color.toLowerCase() === hexColor.toLowerCase());
            if (found) {
                return found.id;
            }
            return 0;
        }
    },
})