<template>
    <div class="dark:bg-transparent dark:text-coolgreen border-dashed border-gray-200 dark:border-coolgreen border cursor-pointer rounded-md card shadow-md bg-base-100 w-50 transition-transform transform hover:bg-black-100 hover:shadow-2xl hover:shadow-black-300 duration-200"
        @click="handleClick">
        <div class="card-body">
            <div class="flex justify-between items-center">
                <h2 class="text-lg font-semibold">{{ title }}</h2>
                <slot name="icon"></slot>
            </div>
            <p class="text-sm">{{ description }}</p>
            <pre class="text-xs leading-tight">{{ details }}</pre>
            <slot name="actions">
                <Button><a href='https://mapit.earth/editor?example=true'>Example</a></Button>
            </slot>
        </div>
    </div>
</template>

<script setup lang="ts">
const props = defineProps({
    title: String,
    description: String,
    details: String,
    onClick: {
        type: Function,
        default: null,
    },
    onExampleClick: {
        type: Function,
        default: null,
    }
});

function handleExampleClick() {
    if (props.onExampleClick) {
        props.onExampleClick();
    }
}

function handleClick() {
    if (props.onClick) {
        props.onClick();
    }
}
</script>

<style scoped>
/* Add specific styling for the CardOption component if needed */
</style>