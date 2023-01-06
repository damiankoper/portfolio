<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { DynamicBackground } from '@portfolio/background/core';

const wrapper = ref<HTMLDivElement | null>(null);
const dynamicBackground = ref<DynamicBackground | null>(null);
onMounted(() => {
  if (wrapper.value)
    dynamicBackground.value = new DynamicBackground(wrapper.value);
});
</script>

<template>
  <div class="wrapper" ref="wrapper"></div>
</template>

<style scoped></style>
