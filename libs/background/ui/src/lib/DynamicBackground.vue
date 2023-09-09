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
import { onMounted } from 'vue';

const props = withDefaults(
  defineProps<{
    progress: number;
  }>(),
  { progress: 0 },
);

const camDistance = 4;

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
const main = shallowRef();
</script>

<template>
  <v-app style="background: none">
    <NavTips />
    <HeaderNavbar />
    <v-main ref="main">
      <v-container>
        <TitleSection :anchors="titleAnchors" />
      </v-container>
    </v-main>
  </v-app>

  <TresCanvas clear-color="#ffffff" style="z-index: -1" window-size>
    <TresPerspectiveCamera ref="camera" :position="[0, 0, 1]" />
    <OrbitControls
      ref="orbitCtrl"
      :damping-factor="0.1"
      :dom-element="main.$el"
      enable-damping
      :enable-pan="false"
      :enable-zoom="false"
      :max-distance="camDistance"
      :max-polar-angle="Math.PI / 2"
      :min-distance="camDistance"
      :min-polar-angle="Math.PI / 2"
      :target="[...camPath.getPoint(props.progress).toArray(), 0]"
    />
    <!-- <PathPipe /> -->
    <TitleSectionScene @update:anchors="titleAnchors = $event" />
    <!-- <ProjectsSectionScene @update:anchors="projectsAnchors = $event" /> -->
  </TresCanvas>
  <!-- <ProjectsSection :anchors="projectsAnchors" /> -->
</template>

<style lang="scss"></style>
