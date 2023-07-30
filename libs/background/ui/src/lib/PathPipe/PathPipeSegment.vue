<script setup lang="ts">
import { PathPipeSegmentType } from './PathPipe.interface';
import { LineCurve3 } from 'three';
import PathPipeArcSegment from './PathPipeArcSegment.vue';
import { Sphere, Tube } from '@tresjs/cientos';

defineProps<{
  segment: PathPipeSegmentType;
  color: string;
}>();

const segments = 24;
</script>

<template>
  <template v-if="segment.type === 'cup'">
    <Sphere
      :args="[segment.width / 2, segments, segments]"
      :color="color"
      :position="segment.start"
    />
  </template>
  <template v-if="segment.type === 'line'">
    <Tube
      :args="[
        new LineCurve3(segment.start, segment.end),
        1,
        segment.width / 2,
        segments,
      ]"
      :color="color"
    />
  </template>
  <template v-if="segment.type === 'arc'">
    <PathPipeArcSegment :color="color" :segment="segment" />
  </template>
</template>
