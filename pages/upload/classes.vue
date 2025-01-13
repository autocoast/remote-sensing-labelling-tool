<!--
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
-->

<template>
    <div class="flex justify-center min-h-screen bg-base-200">
        <div
            class="card shadow-xl dark:bg-coolgreen-900 dark:bg-opacity-10 w-full max-w-4xl dark:border-coolgreen border border-dashed">
            <div class="card-body">
                <div class="flex justify-center mt-4">
                    <div class="w-32">
                        <Button @click="saveAndContinue()">Save & Continue</Button>
                    </div>
                </div>
                <ul class="steps">
                    <li class="step step-primary text-sm">Upload files</li>
                    <li class="step step-primary text-sm">Configure Your Upload</li>
                    <li class="step step-primary text-sm">Define Classes</li>
                    <li class="step text-sm">Summary</li>
                </ul>
                <div class="m-2"></div>
                <h1 class="text-2xl font-bold text-center text-primary">Define Classes</h1>
                <hr class="my-4">
                <!-- Classes Section -->
                <div>
                    <div class="flex justify-between items-center mb-4">
                        <h2 class="text-lg font-bold">Classes</h2>
                        <button class="btn btn-primary btn-sm" @click="addClass">
                            Add Class
                        </button>
                    </div>
                    <div class="space-y-4">
                        <div v-for="(classItem, index) in classes" :key="index"
                            class="flex items-center gap-4 p-4 bg-base-100 rounded-lg shadow-md">
                            <input v-model="classItem.className" class="input input-bordered flex-1" type="text"
                                placeholder="Class Name" />
                            <input v-model="classItem.color" type="color" class="w-10 h-10 border rounded" />
                            <button class="btn btn-error btn-sm" @click="removeClass(index)">
                                Remove
                            </button>
                        </div>
                    </div>
                    <div v-if="classes.length === 0" class="text-center text-gray-500 mt-4">
                        No classes defined. Click "Add Class" to get started.
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
const classes = ref<{ id: number, className: string; color: string }[]>([]);

const uploadStore = useUploadStore();
const router = useRouter();

// Add a new class with default name and color
const addClass = () => {
    classes.value.push({ id: classes.value.length + 1, className: '', color: '#ffffff' });
};

// Remove a class by index
const removeClass = (index: number) => {
    classes.value.splice(index, 1);
};

function saveAndContinue() {
    uploadStore.classes = classes.value;
    localStorage.setItem('classes', JSON.stringify(classes.value));
    router.push('/upload/summary');
}

onMounted(() => {
    const storedClasses = localStorage.getItem('classes');
    if (storedClasses) {
        classes.value = JSON.parse(storedClasses);
    }
});

</script>