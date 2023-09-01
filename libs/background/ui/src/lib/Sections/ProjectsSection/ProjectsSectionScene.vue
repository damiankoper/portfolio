<script setup lang="ts">
import { PerspectiveCamera, Vector3 } from 'three';
import { theme } from '@portfolio/theme';
import { Sphere } from '@tresjs/cientos';
import { useRenderLoop, useTresContext } from '@tresjs/core';
import TorusElement from '../../Elements/TorusElement.vue';
import { randArray } from '../../utils/number.utils';

const segments = 24;
const position = new Vector3(4, -6, 0);
const radius = 1.2;
const { onAfterLoop } = useRenderLoop();
const { camera, renderer } = useTresContext();

const sphereCount = 100;

const positions = randArray(sphereCount);
const arcs = randArray(sphereCount);
const rotations = randArray(sphereCount);
const sizes = randArray(sphereCount);
const radii = randArray(sphereCount);

const emit = defineEmits<{
  (e: 'update:anchors', p: { header: Vector3 }): void;
}>();

onAfterLoop(() => {
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

  <template v-for="(_, i) of Array(sphereCount)" :key="i">
    <TorusElement
      :arc="(Math.PI / 10) * arcs[i]"
      :color="theme.colors.outlineVariant"
      :position="new Vector3(0, 50 * positions[i] + 10, 0)"
      :radius="26 + 13 * radii[i]"
      :rotation="Math.PI * rotations[i]"
      :speed="0.0001 + 0.001 * arcs[i]"
      :tube="0.2 + 0.05 * sizes[i]"
    />
  </template>
</template>
