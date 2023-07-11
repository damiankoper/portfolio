<script setup lang="ts">
import HeaderNavbar from './Nav/HeaderNavbar.vue';
import { TresCanvas } from '@tresjs/core';
import { OrbitControls } from '@tresjs/cientos';
import { shallowRef } from 'vue';
import { Vector3 } from 'three';
import { watchEffect } from 'vue';
import { watch } from 'vue';
import { camPath } from './PathPipe/PathPipe.model';

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

const orbitCtrl = shallowRef<{ $el: typeof OrbitControls } | undefined>();

watchEffect(() => console.log(orbitCtrl.value));
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
    <TresCanvas window-size>
      <TresPerspectiveCamera />
      <OrbitControls
        ref="orbitCtrl"
        :damping-factor="scroll / 1000 + 0.01"
        enable-damping
        :enable-pan="false"
        :enable-zoom="false"
        :max-distance="10"
        :max-polar-angle="Math.PI / 2"
        :min-distance="10"
        :min-polar-angle="Math.PI / 2"
        :target="[...camPath.getPoint(props.progress).toArray(), 0]"
      />

      <TresMesh>
        <TresTorusGeometry :args="[1, 0.5, 16, 32]" />
        <TresMeshBasicMaterial color="orange" />
      </TresMesh>
    </TresCanvas>
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
