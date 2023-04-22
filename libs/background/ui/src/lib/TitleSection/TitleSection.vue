<script setup lang="ts">
import { PerspectiveCamera, Vector3 } from 'three';
import { inject, onMounted, shallowRef } from 'vue';
import { rendererKey } from '../Renderer.key';
import TorusElement from '../Elements/TorusElement.vue';
import { theme } from '@portfolio/theme';
import SphereElement from '../Elements/SphereElement.vue';

const segments = 24;
const position = new Vector3(0, 4, 0);
const anchor = shallowRef(new Vector3());
const radius = 0.75;
const renderer = inject(rendererKey);

const sphereCount = 100;
const positions = new Array(sphereCount)
  .fill(0)
  .map(() => 2 * Math.random() - 1);
const rotations = new Array(sphereCount)
  .fill(0)
  .map(() => 2 * Math.random() - 1);
const sizes = new Array(sphereCount).fill(0).map(() => 2 * Math.random() - 1);

onMounted(() => {
  renderer?.value?.onAfterRender(({ renderer }) => {
    const tCamera = renderer.camera as PerspectiveCamera;
    const vector = position.clone().project(tCamera.clone());
    vector.x = ((vector.x + 1) * renderer.size.width) / 2;
    vector.y = (-(vector.y - 1) * renderer.size.height) / 2;
    anchor.value = vector;
  });
});
</script>

<template>
  <Sphere
    :height-segments="segments"
    :position="position"
    :radius="radius"
    :width-segments="segments"
  >
    <BasicMaterial color="white" />
  </Sphere>
  <Sphere
    :height-segments="segments"
    :position="position"
    :radius="radius / 2"
    :width-segments="segments"
  >
    <BasicMaterial
      :color="theme.colors.secondary"
      :props="{ depthTest: false, depthWrite: false }"
    />
  </Sphere>

  <TorusElement
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

  // TODO: change to torus
  <template v-for="(_, i) of Array(sphereCount)" :key="i">
    <SphereElement
      :center="new Vector3(0, 20 * positions[i] + 10, 0)"
      :color="theme.colors.outline"
      :radius="0.25 + 0.1 * sizes[i]"
      :rotation="Math.PI * rotations[i]"
      :shift="20 + 7 * rotations[i]"
      :speed="0.001 * rotations[i]"
    />
  </template>

  <Teleport to="body">
    <div
      class="ma-10"
      style="position: fixed"
      :style="{
        top: `${anchor.y}px`,
        left: `${Math.max(0, anchor.x + (3 - (anchor.z - 0.96) * 100) * 32)}px`,
        transform: `translateY( calc(-50% - 40px)`,
      }"
    >
      <div class="text-h1 font-weight-bold">Hi, I'm Damian</div>
      <div class="bottom-content">
        <v-sheet class="text pa-6 surface" rounded="xl">
          <!-- JavaScript & TypeScript enthusiast, not afraid of anything else! -->
          Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Morbi nec
          metus. Phasellus gravida semper nisi. Nam quam nunc, blandit vel,
          luctus pulvinar, hendrerit id, lorem. Praesent metus tellus, elementum
          eu, semper a, adipiscing nec, purus.
        </v-sheet>
      </div>
    </div>
  </Teleport>
</template>

<style scoped lang="scss">
.bottom-content {
  position: absolute;
  top: calc(100% + 16px);
  .text {
    backdrop-filter: blur(12px);
  }
  .surface {
    background-color: rgba(var(--v-theme-primary), 0.07);
  }
}
</style>
