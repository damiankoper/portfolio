<script setup lang="ts">
import { PathPipeArcSegment } from './PathPipe.interface';
import { computed } from 'vue';
import { Vector3 } from 'three';
import { BasicMaterial } from 'troisjs';
const props = defineProps<{
  segment: PathPipeArcSegment;
  color: string;
}>();

const segments = 24;
const position = computed(() => {
  const position = props.segment.start.clone();
  switch (props.segment.variant) {
    case 'top-right':
      position.add(new Vector3(props.segment.radius, 0, 0));
      break;
    case 'top-left':
      position.add(new Vector3(-props.segment.radius, 0, 0));
      break;
    case 'left-bottom':
      position.add(new Vector3(0, -props.segment.radius, 0));
      break;
    case 'right-bottom':
      position.add(new Vector3(0, -props.segment.radius, 0));
      break;
  }
  return position;
});

const rotation = computed(() => {
  switch (props.segment.variant) {
    case 'top-right':
      return { z: Math.PI };
    case 'top-left':
      return { z: (Math.PI / 2) * 3 };
    case 'left-bottom':
      return {};
    default:
    case 'right-bottom':
      return { z: Math.PI / 2 };
  }
});
</script>

<template>
  <Torus
    :arc="Math.PI / 2"
    :position="position"
    :radial-segments="segments"
    :radius="segment.radius"
    :rotation="rotation"
    :tube="segment.width / 2"
    :tubular-segments="segments"
  >
    <BasicMaterial :color="color" />
  </Torus>
</template>

<style scoped></style>
