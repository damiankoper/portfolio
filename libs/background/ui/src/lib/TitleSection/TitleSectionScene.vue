<script setup lang="ts">
import { PerspectiveCamera, Vector3 } from 'three';
import { theme } from '@portfolio/theme';
import { Sphere } from '@tresjs/cientos';
import { useRenderLoop, useTresContext } from '@tresjs/core';

const segments = 24;
const position = new Vector3(0, 4, 0);
const radius = 0.6;
const { onBeforeLoop } = useRenderLoop();
const { camera, renderer } = useTresContext();

/* const sphereCount = 100;

function randArray() {
  return new Array(sphereCount).fill(0).map(() => 2 * Math.random() - 1);
}
 */
/* const positions = randArray();
const arcs = randArray();
const rotations = randArray();
const sizes = randArray();
const radii = randArray(); */

const emit = defineEmits<{
  (e: 'update:anchors', p: { header: Vector3 }): void;
}>();

onBeforeLoop(() => {
  const tCamera = camera.value as PerspectiveCamera;
  const vector = position.clone().project(tCamera.clone());
  vector.x = ((vector.x + 1) * renderer.value.domElement.width) / 2;
  vector.y = (-(vector.y - 1) * renderer.value.domElement.height) / 2;
  emit('update:anchors', { header: vector });
});
</script>

<template>
  <Sphere
    :args="[radius, segments, segments]"
    :color="theme.colors.primary"
    :position="position"
  />
  <Sphere :args="[radius / 2, segments, segments]" :position="position">
    <TresMeshBasicMaterial
      :color="theme.colors.secondary"
      :depth-test="false"
      :depth-write="false"
    />
  </Sphere>

  <!--  <TorusElement
    :arc="Math.PI"
    :color="theme.colors.secondary"
    :position="new Vector3(0, 1.25, 0)"
    :radius="1"
    :speed="0.001"
    :tube="0.25"
  />
  <TorusElement
    :arc="Math.PI"
    :color="theme.colors.secondary"
    :position="new Vector3(0, 0.25, 0)"
    :radius="2"
    :speed="-0.002"
    :tube="0.25"
  />
  <TorusElement
    :arc="Math.PI"
    :color="theme.colors.secondary"
    :position="new Vector3(0, -0.75, 0)"
    :radius="1.5"
    :speed="-0.001"
    :tube="0.25"
  />
  <TorusElement
    :arc="Math.PI / 8"
    :color="theme.colors.secondary"
    :position="new Vector3(0, 0.25, 0)"
    :radius="1"
    :rotation="0"
    :speed="0.001"
    :tube="0.15"
  />

  <template v-for="(_, i) of Array(sphereCount)" :key="i">
    <TorusElement
      :arc="(Math.PI / 10) * arcs[i]"
      :color="theme.colors.outline"
      :position="new Vector3(0, 20 * positions[i] + 10, 0)"
      :radius="26 + 10 * radii[i]"
      :rotation="Math.PI * rotations[i]"
      :speed="0.0001 + 0.001 * arcs[i]"
      :tube="0.25 + 0.1 * sizes[i]"
    />
  </template>
 -->
</template>
