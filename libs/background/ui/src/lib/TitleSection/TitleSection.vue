<script setup lang="ts">
import { PerspectiveCamera, Vector3 } from 'three';
import { inject, onMounted, shallowRef } from 'vue';
import { rendererKey } from '../Renderer.key';

defineProps<{ color: string }>();
const segments = 24;
const position = new Vector3(0, 4, 0);
const anchor = shallowRef(new Vector3());
const radius = 0.5;
const renderer = inject(rendererKey);

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
      :color="color"
      :props="{ depthTest: false, depthWrite: false }"
    />
  </Sphere>

  <Teleport to="body">
    <div
      class="ma-10"
      style="position: fixed"
      :style="{
        top: `${anchor.y}px`,
        left: `${Math.max(0, anchor.x + (3 - (anchor.z - 0.96) * 100) * 12)}px`,
        transform: `translateY( calc(-50% - 40px)`,
      }"
    >
      <div class="text-h1 font-weight-bold">Hi, I'm Damian</div>
      <div class="bottom-content">
        <v-sheet class="text pa-4 bg-primary" rounded="xl">
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
}
</style>
