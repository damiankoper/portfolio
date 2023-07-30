<script setup lang="ts">
import HeaderNavbar from './Nav/HeaderNavbar.vue';
import TitleSectionScene from './TitleSection/TitleSectionScene.vue';
import { TresCanvas } from '@tresjs/core';
import { OrbitControls } from '@tresjs/cientos';
import { shallowRef } from 'vue';
import { Vector3 } from 'three';
import { watch } from 'vue';
import { camPath } from './PathPipe/PathPipe.model';
import PathPipe from './PathPipe/PathPipe.vue';
import TitleSection from './TitleSection/TitleSection.vue';

const props = withDefaults(
  defineProps<{
    scroll: number;
    progress: number;
  }>(),
  {
    progress: 0,
    scroll: 0,
  },
);

const camDistance = 10;

const orbitCtrl = shallowRef<{ $el: typeof OrbitControls } | undefined>();
const titleAnchors = shallowRef({ header: new Vector3() });

watch(() => props.progress, updateCamera, { immediate: true });

function updateCamera() {
  const target = camPath.getPoint(props.progress);
  if (orbitCtrl.value) {
    const orbitCtrlTarget = orbitCtrl.value.$el.target as Vector3;
    orbitCtrlTarget.set(target.x, target.y, 0);
  }
}
</script>

<template>
  <HeaderNavbar />
  <div class="wrapper">
    <TresCanvas clear-color="#ffffff" window-size>
      <TresPerspectiveCamera :position="[10, 0, 100]" />
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
    </TresCanvas>
  </div>
  <TitleSection :anchors="titleAnchors" />
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
