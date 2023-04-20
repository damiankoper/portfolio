<script setup lang="ts">
import { PathPipeSegmentType } from './PathPipe.interface';
import { LineCurve3 } from 'three';
import PathPipeArcSegment from './PathPipeArcSegment.vue';
import { BasicMaterial, Sphere, Tube } from 'troisjs';

defineProps<{
  segment: PathPipeSegmentType;
  color: string;
}>();

const segments = 24;
</script>

<template>
  <template v-if="segment.type === 'cup'">
    <Sphere
      :height-segments="segments"
      :position="segment.start"
      :radius="segment.width / 2"
      :width-segments="segments"
    >
      <BasicMaterial :color="color" />
    </Sphere>
  </template>
  <template v-if="segment.type === 'line'">
    <Tube
      :path="new LineCurve3(segment.start, segment.end)"
      :radial-segments="segments"
      :radius="segment.width / 2"
      :tubular-segments="1"
    >
      <BasicMaterial :color="color" />
    </Tube>
  </template>
  <template v-if="segment.type === 'arc'">
    <PathPipeArcSegment :color="color" :segment="segment" />
  </template>
</template>
