<script setup lang="ts">
import { Camera, Renderer, Scene, RendererPublicInterface } from 'troisjs';

import { onMounted, ref, watch, provide } from 'vue';
import PathPipe from './PathPipe/PathPipe.vue';
import { camPath } from './PathPipe/PathPipe.model';
import TitleSection from './TitleSection/TitleSection.vue';
import { rendererKey } from './Renderer.key';
import { Vector3 } from 'three';
import HeaderNavbar from './Nav/HeaderNavbar.vue';

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
  <HeaderNavbar />
  <div class="wrapper">
    <Renderer ref="renderer" alpha antialias :orbit-ctrl="{}" resize>
      <Camera :position="{ z: 100 }" />
      <Scene>
        <PathPipe />
        <TitleSection />
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
