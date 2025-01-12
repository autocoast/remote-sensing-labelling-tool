<template>
    <div class="flex justify-center min-h-screen bg-base-200">
        <div
            class="card shadow-xl dark:bg-coolgreen-900 dark:bg-opacity-10 w-full max-w-4xl dark:border-coolgreen border border-dashed">
            <div class="card-body">
                <div class="flex justify-center mt-4">
                    <div class="min-w-44">
                        <Button @click="startLabelling()">Start Labeling</Button>
                    </div>
                </div>
                <ul class="steps mt-7">
                    <li class="step step-primary text-sm">Upload files</li>
                    <li class="step step-primary text-sm">Configure Your Upload</li>
                    <li class="step step-primary text-sm">Define Classes</li>
                    <li class="step step-primary text-sm">Summary</li>
                </ul>
                <div class="m-2"></div>
                <h1 class="text-2xl font-bold text-center text-primary">Layers Summary</h1>
                <hr class="my-4">
                <!-- Classes Section -->
                <div>
                    <div class="space-y-4" v-if="uploadStore.selectedSatellite === 'sentinel-2'">
                        <div class=" items-center gap-4 p-4 bg-base-100 rounded-lg shadow-md">
                            <input v-model="rgbLayerName" disabled class="input w-full input-bordered flex-1"
                                type="text" placeholder="Class Name" />
                            <p class="text-gray-500 mt-5">
                                The RGB layers will be computed using these files:<br>
                                <span class="font-bold">Red:</span> {{ uploadStore.sentinels2aAssignment['Band 4']
                                }}<br>
                                <span class="font-bold">Green:</span> {{ uploadStore.sentinels2aAssignment['Band 3']
                                }}<br>
                                <span class="font-bold">Blue:</span> {{ uploadStore.sentinels2aAssignment['Band 2']
                                }}<br>
                                In the labelling editor, you will be able to switch between different normalisations.
                            </p>
                        </div>
                    </div>
                    <UploadLayerRow layerType="ndvi" />
                    <UploadLayerRow layerType="ndwi" />
                    <UploadLayerRow layerType="agriculture" />
                    <div class="m-5"></div>
                    <p class="text-slate-400">Further Layers</p>
                    <div class="space-y-4">
                        <div v-for="(layer, index) in otherLayers" :key="index"
                            class="flex items-center gap-4 p-4 bg-base-100 rounded-lg shadow-md">
                            <p>{{ layer }}</p>
                        </div>
                    </div>
                    <div class="m-5"></div>
                    <p class="text-slate-400">Classes</p>
                    <div class="space-y-4">
                        <div v-for="(classItem, index) in uploadStore.classes" :key="index"
                            class="flex items-center gap-4 p-4 bg-base-100 rounded-lg shadow-md">
                            <div :style="{ backgroundColor: classItem.color }" class="w-5 h-5 rounded"></div>
                            <input v-model="classItem.className" class="input input-bordered flex-1" type="text"
                                placeholder="Class Name" />
                            <!-- <button class="btn text-white  btn-sm "
                                :class="referenceVariable ? 'btn-error' : 'btn-success'"
                                @click="referenceVariable = !referenceVariable">
                                {{ referenceVariable ? 'Remove' : 'Add' }}
                            </button> -->
                        </div>
                    </div>
                    <div class="flex justify-center mt-4">
                        <div class="min-w-44">
                            <Button @click="startLabelling()">Start Labeling</Button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useUploadStore } from '~/store/uploadStore';

// Reactive array to store classes

const uploadStore = useUploadStore();
const router = useRouter();

const rgbLayerName = ref<string>('RGB');
const otherLayers: Ref<string[]> = ref([]);


function startLabelling() {
    router.push('/editor');
}

function getOtherLayers() {
    let folderName = '';
    for (let i = 0; i < uploadStore.uploadedFiles.length; i++) {
        if (folderName === '') {
            folderName = uploadStore.uploadedFiles[i].webkitRelativePath.split('/')[1];
        } else {
            if (folderName !== uploadStore.uploadedFiles[i].webkitRelativePath.split('/')[1]) {
                break
            }
        }

        // console.log(uploadStore.uploadedFiles[i].webkitRelativePath.split('/'));

        let fileName = uploadStore.uploadedFiles[i].webkitRelativePath.split('/')[2];

        if (uploadStore.selectedSatellite === 'sentinel-2') {
            let found = false;
            for (const [key, value] of Object.entries(uploadStore.sentinels2aAssignment)) {
                if (value === fileName) {
                    found = true;
                }
            }
            if (found) {
                continue;
            }

            if (fileName.endsWith('.jpg') || fileName.endsWith('.png') || fileName.endsWith('.jpeg') || fileName.endsWith('.tif') || fileName.endsWith('.tiff') || fileName.endsWith('.bmp')) {
                otherLayers.value.push(fileName);
            }

        }

    }
}

onMounted(() => {
    console.log('a');
    getOtherLayers();
});

</script>