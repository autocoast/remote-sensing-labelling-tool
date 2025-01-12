<script setup lang="ts">
interface Props {
  size?: "md" | "lg";
  block?: boolean;
  styleName?: "outline" | "primary" | "inverted";
  className?: string;
  [x: string]: any;
}

const props = withDefaults(defineProps<Props>(), {
  size: "md",
  styleName: "primary",
});

const size = props.size as keyof typeof sizes;

const sizes = {
  md: "px-5 py-2.5",
  lg: "px-6 py-3",
};

const styles = {
  outline: "border-2 border-black hover:bg-black text-black hover:text-white",
  primary:
    "bg-black text-white hover:bg-slate-900  border-2 border-transparent",
};
</script>

<template>
  <button :class="[
    'dark:text-coolgreen dark:bg-black dark:border-0 dark:hover:bg-slate-950 btn btn-primary w-full  hover:bg-slate-900',
    block && 'w-full',
    sizes[size],
    styles[styleName as keyof typeof styles],
    className,
  ]">
    <slot />
  </button>
</template>
