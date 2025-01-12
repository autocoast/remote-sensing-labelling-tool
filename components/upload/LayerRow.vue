<template>
    <div class="space-y-4">
        <div class="flex items-center gap-4 p-4 bg-base-100 rounded-lg shadow-md">
            <input v-model="layerName" class="input input-bordered flex-1"
                :class="referenceVariable ? '' : 'line-through'" type="text" placeholder="Class Name" />
            <button class="btn text-white  btn-sm " :class="referenceVariable ? 'btn-error' : 'btn-success'"
                @click="referenceVariable = !referenceVariable">
                {{ referenceVariable ? 'Remove' : 'Add' }}
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">

import { ref } from 'vue';
import { useUploadStore } from '~/store/uploadStore';

const uploadStore = useUploadStore();

const layerName: Ref<string> = ref('');

const props = defineProps<{
    layerType: 'ndvi' | 'ndwi' | 'agriculture';
}>();

const referenceVariable: Ref<boolean> = ref(false);

watch(referenceVariable, (value) => {
    switch (props.layerType) {
        case 'ndvi':
            uploadStore.useNdvi = value;
            break;
        case 'ndwi':
            uploadStore.useNdwi = value;
            break;
        case 'agriculture':
            uploadStore.useAgriculture = value;
            break;
    }
});

onMounted(() => {
    switch (props.layerType) {
        case 'ndvi':
            layerName.value = 'NDVI';
            referenceVariable.value = uploadStore.useNdvi
            break;
        case 'ndwi':
            layerName.value = 'NDWI';
            referenceVariable.value = uploadStore.useNdwi
            break;
        case 'agriculture':
            layerName.value = 'Agriculture';
            referenceVariable.value = uploadStore.useAgriculture
            break;
    }
});

</script>