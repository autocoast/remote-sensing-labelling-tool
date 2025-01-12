self.addEventListener('message', (event) => {
    const b8aRaw: Uint16Array = event.data.b8aRaw;
    const bRaw: Uint16Array = event.data.bRaw;
    const width: number = event.data.width;
    const height: number = event.data.height;

    const ndwiArray: number[] = [];
    console.log('b8aRaw', b8aRaw);
    for (let i = 0; i < b8aRaw.length; i++) {
        let ndwi = ((bRaw[i] - b8aRaw[i]) / (bRaw[i] + b8aRaw[i]));
        if (isNaN(ndwi)) {
            console.log('NDWI is NaN');
        }
        ndwiArray.push(ndwi);
    }

    const imageData = new ImageData(width, height);
    for (let i = 0; i < ndwiArray.length; i++) {
        imageData.data[i * 4] = ndwiArray[i] * 255;
        imageData.data[i * 4 + 1] = ndwiArray[i] * 255;
        imageData.data[i * 4 + 2] = ndwiArray[i] * 255;
        imageData.data[i * 4 + 3] = 255;
    }

    self.postMessage({
        imageData
    });
});