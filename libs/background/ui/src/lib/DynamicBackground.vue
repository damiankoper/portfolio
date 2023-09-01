<script setup lang="ts">
import HeaderNavbar from './Nav/HeaderNavbar.vue';
import NavTips from './Nav/NavTips.vue';
import TitleSectionScene from './Sections/TitleSection/TitleSectionScene.vue';
import { TresCanvas, useRenderLoop } from '@tresjs/core';
import { OrbitControls } from '@tresjs/cientos';
import { shallowRef } from 'vue';
import { PerspectiveCamera, Vector3 } from 'three';
import { watch } from 'vue';
import { camPath } from './PathPipe/PathPipe.model';
import PathPipe from './PathPipe/PathPipe.vue';
import TitleSection from './Sections/TitleSection/TitleSection.vue';
import { ref } from 'vue';
import { azimuthKey } from './utils/symbols';
import { provide } from 'vue';
import ProjectsSectionScene from './Sections/ProjectsSection/ProjectsSectionScene.vue';
import ProjectsSection from './Sections/ProjectsSection/ProjectsSection.vue';

const props = withDefaults(
  defineProps<{
    progress: number;
  }>(),
  {
    progress: 0,
  },
);

const camDistance = 10;

const orbitCtrl = shallowRef<{ $el: typeof OrbitControls } | undefined>();
const titleAnchors = shallowRef({ header: new Vector3() });
const projectsAnchors = shallowRef({ header: new Vector3() });

watch(() => props.progress, updateCamera, { immediate: true });

function updateCamera() {
  const target = camPath.getPoint(props.progress);
  if (orbitCtrl.value) {
    const orbitCtrlTarget = orbitCtrl.value.$el.target as Vector3;
    orbitCtrlTarget.set(target.x, target.y, 0);
  }
}

const azimuth = ref(0);
provide(azimuthKey, azimuth);

const { onLoop } = useRenderLoop();
const camera = shallowRef<PerspectiveCamera | null>(null);
onLoop(() => {
  if (camera.value && orbitCtrl.value?.$el) {
    const el = orbitCtrl.value.$el as unknown as {
      getAzimuthalAngle: () => number;
    };
    const angle = el.getAzimuthalAngle();
    azimuth.value = (angle * 180) / Math.PI + 180;
  }
});
</script>

<template>
  <div class="wrapper">
    <TresCanvas clear-color="#ffffff" window-size>
      <TresPerspectiveCamera ref="camera" :position="[50, 0, 50]" />
      <OrbitControls
        ref="orbitCtrl"
        :damping-factor="0.1"
        enable-damping
        :enable-pan="false"
        :enable-zoom="false"
        :max-distance="camDistance"
        :max-polar-angle="Math.PI / 2"
        :min-distance="camDistance"
        :min-polar-angle="Math.PI / 2"
        :target="[...camPath.getPoint(props.progress).toArray(), 0]"
      />
      <PathPipe />
      <TitleSectionScene @update:anchors="titleAnchors = $event" />
      <ProjectsSectionScene @update:anchors="projectsAnchors = $event" />
    </TresCanvas>
  </div>
  <TitleSection :anchors="titleAnchors" />
  <ProjectsSection :anchors="projectsAnchors" />
  <NavTips />
  <HeaderNavbar />
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
