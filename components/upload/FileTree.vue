<template>
    <div v-if="tree">
        <ul class="tree">
            <UploadTreeNode :node="tree" name="root" />
        </ul>
    </div>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import TreeNode from "./TreeNode.vue";
import { useUploadStore } from "~/store/uploadStore";

interface UploadedFile {
    webkitRelativePath: string;
}

interface TreeNode {
    [key: string]: TreeNode | null;
}

const props = defineProps({
    uploadedFiles: {
        type: Array as PropType<UploadedFile[]>,
        required: true,
    },
});

const buildTree = (files: UploadedFile[]): TreeNode => {
    const tree: TreeNode = {};
    files.forEach((file) => {
        const parts = file.webkitRelativePath.split("/");
        let current = tree;
        parts.forEach((part, index) => {
            if (!current[part]) {
                current[part] = index === parts.length - 1 ? null : {};
            }
            current = current[part] as TreeNode;
        });
    });
    return tree;
};

// const tree = computed(() => buildTree(props.uploadedFiles));

const tree = ref<TreeNode | null>(null);

const uploadStore = useUploadStore();

watch(() => uploadStore.uploadedFiles, (newFiles) => {
    tree.value = buildTree(newFiles);
});
</script>