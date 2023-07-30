<script setup lang="ts">
import { PathPipeArcSegment } from './PathPipe.interface';
import { Vector3, Euler } from 'three';
import { Torus } from '@tresjs/cientos';
const props = defineProps<{
  segment: PathPipeArcSegment;
  color: string;
}>();

const segments = 24;

function getPosition() {
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
}

function getRotation() {
  switch (props.segment.variant) {
    case 'top-right':
      return new Euler(0, 0, Math.PI);
    case 'top-left':
      return new Euler(0, 0, (Math.PI / 2) * 3);
    case 'left-bottom':
      return new Euler();
    default:
    case 'right-bottom':
      return new Euler(0, 0, Math.PI / 2);
  }
}
</script>

<template>
  <Torus
    :args="[segment.radius, segment.width / 2, segments, segments, Math.PI / 2]"
    :color="color"
    :position="getPosition()"
    :rotation="getRotation()"
  />
</template>
