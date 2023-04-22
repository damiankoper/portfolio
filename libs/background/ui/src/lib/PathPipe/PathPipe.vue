<script setup lang="ts">
import PathPipeSegment from './PathPipeSegment.vue';
import { pathPipe } from './PathPipe.model';
import { theme } from '@portfolio/theme';
</script>

<template>
  <PathPipeSegment
    v-for="(segment, i) of pathPipe"
    :key="i"
    :color="theme.colors.primary"
    :segment="segment"
  />
</template>

<style scoped></style>
