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

// workers/bucketFillWorker.ts

// import config from "@/config";

// function patchNumberToCoords(patchNumber: number) {

//     let numColumns = config.patchColumns;
//     let cellWidth = config.patchSize;

//     let x = (patchNumber % numColumns) * cellWidth;
//     let y = Math.floor(patchNumber / numColumns) * cellWidth;

//     return { x, y }
// }

function hexToRgb(hex: string) {
    // Remove the '#' if it exists
    hex = hex.replace(/^#/, '');

    // Parse the r, g, b values
    let bigint = parseInt(hex, 16);
    let r = (bigint >> 16) & 255;
    let g = (bigint >> 8) & 255;
    let b = bigint & 255;

    return [r, g, b];
}

function colorDistance(rgb1: number[], rgb2: number[]) {
    // Calculate Euclidean distance between two RGB colors
    return Math.sqrt(
        Math.pow(rgb1[0] - rgb2[0], 2) +
        Math.pow(rgb1[1] - rgb2[1], 2) +
        Math.pow(rgb1[2] - rgb2[2], 2)
    );
}

function colorsAreSimilar(hex1: string, hex2: string, tolerance: number = 15) {
    let rgb1 = hexToRgb(hex1);
    let rgb2 = hexToRgb(hex2);
    let distance = colorDistance(rgb1, rgb2);

    return distance <= tolerance;
}


self.addEventListener('message', (event) => {
    const {
        sourceIsPatchSize,
        targetImageData,
        imageData,
        startX,
        startY,
        hexColorToReplace,
        replacingHexColor,
        sourceCanvasWidth,
        sourceCanvasHeight,
        layerIsDrawingLayer,
        tolerance,
        imageSize
    } = event.data;

    const sourceImageData = new Uint8ClampedArray(imageData.data);
    const targetImageData2 = new Uint8ClampedArray(targetImageData.data);
    const stack: [number, number][] = [];
    let visited = new Set<string>();
    stack.push([startX, startY]);

    while (stack.length > 0) {
        const [x, y] = stack.pop()!;

        if (x < 0 || y < 0 || x >= sourceCanvasWidth || y >= sourceCanvasHeight) {
            continue;
        }

        const sourceIndex = (y * sourceCanvasWidth + x) * 4;
        const targetIndex = (y * imageSize + x) * 4;
        const pixelColorHex = `#${('000000' + ((sourceImageData[sourceIndex] << 16) | (sourceImageData[sourceIndex + 1] << 8) | sourceImageData[sourceIndex + 2]).toString(16)).slice(-6)}`.toUpperCase();

        if (colorsAreSimilar(pixelColorHex, hexColorToReplace, tolerance) && !visited.has(`${x},${y}`)) {

            if (!layerIsDrawingLayer && (targetImageData2[targetIndex] !== 0 || targetImageData2[targetIndex + 1] !== 0 || targetImageData2[targetIndex + 2] !== 0 || targetImageData2[targetIndex + 3] !== 0)) {
                continue;
            }

            const rgb = parseInt(replacingHexColor.slice(1), 16);
            targetImageData2[targetIndex] = (rgb >> 16) & 255;
            targetImageData2[targetIndex + 1] = (rgb >> 8) & 255;
            targetImageData2[targetIndex + 2] = rgb & 255;
            targetImageData2[targetIndex + 3] = 255;

            visited.add(`${x},${y}`);
            stack.push([x + 1, y]);
            stack.push([x - 1, y]);
            stack.push([x, y + 1]);
            stack.push([x, y - 1]);
        }
    }

    // @ts-ignore
    self.postMessage({ imageData: targetImageData2.buffer }, [targetImageData2.buffer]);
});
