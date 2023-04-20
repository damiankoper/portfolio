<script setup lang="ts">
import { Camera, Renderer, Scene, RendererPublicInterface } from 'troisjs';

import { SplineCurve, Vector2 } from 'three';
import { onMounted, ref, watch, provide } from 'vue';
import PathPipe from './PathPipe/PathPipe.vue';
import { pathPipe } from './PathPipe/PathPipe.model';
import TitleSection from './TitleSection/TitleSection.vue';
import { rendererKey } from './Renderer.key';

const props = withDefaults(
  defineProps<{
    scroll: number;
    progress: number;
  }>(),
  {
    progress: 0,
    scroll: 0,
  }
);

const camPath = new SplineCurve(
  pathPipe
    .filter((s) => !s.excludeScroll)
    .map((s) => {
      const point = s.pathPoint || s.start;
      return new Vector2(point.x, point.y);
    })
);

const color = '#22005D';
const renderer = ref<RendererPublicInterface>();
provide(rendererKey, renderer);

watch(() => props.progress, updateCamera);

function updateCamera() {
  const orbitCtrl = renderer.value?.three.cameraCtrl;
  if (orbitCtrl) {
    const target = camPath.getPoint(props.progress);
    orbitCtrl.target.x = target.x;
    orbitCtrl.target.y = target.y;
  }
}

onMounted(() => {
  const orbitCtrl = renderer.value?.three.cameraCtrl;
  if (orbitCtrl) {
    orbitCtrl.enableZoom = false;
    orbitCtrl.enableDamping = true;
    orbitCtrl.maxPolarAngle = Math.PI / 2;
    orbitCtrl.minPolarAngle = Math.PI / 2;
    orbitCtrl.maxDistance = 10;
    orbitCtrl.minDistance = 10;
    orbitCtrl.enablePan = false;
    updateCamera();
  }
});
</script>

<template>
  <div id="anchored"></div>
  <div class="wrapper">
    <Renderer ref="renderer" alpha antialias :orbit-ctrl="{}" resize>
      <Camera :position="{ z: 10 }" />
      <Scene>
        <PathPipe :color="color" />
        <TitleSection :color="color" />
      </Scene>
    </Renderer>
  </div>
</template>

<style lang="scss">
.wrapper {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
}
</style>
