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


/**
B1	60 m	443 nm	Ultra Blue (Coastal and Aerosol)
B2	10 m	490 nm	Blue
B3	10 m	560 nm	Green
B4	10 m	665 nm	Red
B5	20 m	705 nm	Visible and Near Infrared (VNIR)
B6	20 m	740 nm	Visible and Near Infrared (VNIR)
B7	20 m	783 nm	Visible and Near Infrared (VNIR)
B8	10 m	842 nm	Visible and Near Infrared (VNIR)
B8a	20 m	865 nm	Visible and Near Infrared (VNIR)
B9	60 m	940 nm	Short Wave Infrared (SWIR)
B10	60 m	1375 nm	Short Wave Infrared (SWIR)
B11	20 m	1610 nm	Short Wave Infrared (SWIR)0
 */

export interface Band {
    name: string;
    resolution: number;
    centralWaveLength: number;
    description: string;
}

export default {
    'sentinel-s2-l1c-bands': [
        {
            'name': 'Band 1',
            'resolution': 60,
            'centralWaveLength': 443,
            'description': 'Ultra Blue'
        },
        {
            'name': 'Band 2',
            'resolution': 10,
            'centralWaveLength': 490,
            'description': 'Blue'
        },
        {
            'name': 'Band 3',
            'resolution': 10,
            'centralWaveLength': 560,
            'description': 'Green'
        },
        {
            'name': 'Band 4',
            'resolution': 10,
            'centralWaveLength': 665,
            'description': 'Red'
        },
        {
            'name': 'Band 5',
            'resolution': 20,
            'centralWaveLength': 705,
            'description': 'Visible and Near Infrared (VNIR)'
        },
        {
            'name': 'Band 6',
            'resolution': 20,
            'centralWaveLength': 0.740,
            'description': 'Visible and Near Infrared (VNIR)'
        },
        {
            'name': 'Band 7',
            'resolution': 20,
            'centralWaveLength': 783,
            'description': 'Visible and Near Infrared (VNIR)'
        },
        {
            'name': 'Band 8',
            'resolution': 10,
            'centralWaveLength': 842,
            'description': 'Visible and Near Infrared (VNIR)'
        },
        {
            'name': 'Band 8a',
            'resolution': 20,
            'centralWaveLength': 865,
            'description': 'Visible and Near Infrared (VNIR)'
        },
        {
            'name': 'Band 9',
            'resolution': 60,
            'centralWaveLength': 940,
            'description': 'Short Wave Infrared (SWIR)'
        },
        {
            'name': 'Band 10',
            'resolution': 60,
            'centralWaveLength': 1375,
            'description': 'Short Wave Infrared (SWIR)'
        },
        {
            'name': 'Band 11',
            'resolution': 20,
            'centralWaveLength': 1610,
            'description': 'Short Wave Infrared (SWIR)'
        },
        {
            'name': 'Band 12',
            'resolution': 20,
            'centralWaveLength': 2190,
            'description': 'Short Wave Infrared (SWIR)'
        }

    ]
}