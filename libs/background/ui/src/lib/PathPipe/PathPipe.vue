<script setup lang="ts">
import PathPipeSegment from './PathPipeSegment.vue';
import { pathPipe } from './PathPipe.model';

defineProps<{ color: string }>();
</script>

<template>
  <PathPipeSegment
    v-for="(segment, i) of pathPipe"
    :key="i"
    :color="color"
    :segment="segment"
  />
</template>

<style scoped></style>
