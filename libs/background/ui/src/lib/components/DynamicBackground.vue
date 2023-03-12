<script setup lang="ts">
import {
  AmbientLight,
  Box,
  Camera,
  BasicMaterial,
  PointLight,
  Renderer,
  Scene,
  Torus,
  Sphere,
} from 'troisjs';

import { PerspectiveCamera, Vector3 } from 'three';
import { onMounted, ref, shallowRef } from 'vue';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
const boxColor = ref('#000');
const torus = ref<typeof Torus>();
const torus1 = ref<typeof Torus>();
const renderer = ref<typeof Renderer>();
const camera = ref<typeof Camera>();
const screenPos = shallowRef(new Vector3());

function boxOver({ over }: { over: boolean }) {
  boxColor.value = over ? '#ff0000' : '#004';
}
function boxClick(e: MouseEvent) {
  alert('Click');
  console.log(e);
}

onMounted(() => {
  const orbitCtrl = renderer.value?.three.cameraCtrl as OrbitControls;
  if (orbitCtrl) {
    orbitCtrl.enableDamping = true;
    orbitCtrl.maxPolarAngle = Math.PI / 2 + Math.PI / 8;
    orbitCtrl.minPolarAngle = Math.PI / 2 - Math.PI / 8;
  }
  renderer.value?.onAfterRender(
    ({ renderer }: { renderer: typeof Renderer }) => {
      const tCamera = renderer.camera as PerspectiveCamera;
      const vector = new Vector3(-8, 0, 0).project(tCamera.clone());
      vector.x = ((vector.x + 1) * renderer.size.width) / 2;
      vector.y = (-(vector.y - 1) * renderer.size.height) / 2;
      screenPos.value = vector;
      if (torus.value) torus.value.mesh.rotation.z += 0.01;
      if (torus1.value) torus1.value.mesh.rotation.z -= 0.01;

      if (orbitCtrl) {
        //orbitCtrl.target.y += 0.01;
      }
    }
  );
});
</script>

<template>
  <div
    :style="{
      borderRadius: '12px',
      backgroundColor: 'rgba(240,240,255,0.5)',
      width: `200px`,
      height: `100px`,
      position: 'fixed',
      top: `${screenPos.y}px`,
      left: `${screenPos.x}px`,
      padding: '20px',
      backdropFilter: 'blur(10px)',
    }"
  >
    Hejka
  </div>

  <Renderer ref="renderer" antialias resize alpha :orbit-ctrl="{}">
    <Camera ref="camera" :position="{ z: 10 }" />
    <Scene>
      <PointLight :position="{ y: 50, z: 50 }" />
      <AmbientLight :intensity="0.5" />
      <Box
        @pointerOver="boxOver"
        @click="boxClick"
        :rotation="{ y: Math.PI / 4, z: Math.PI / 4 }"
      >
        <BasicMaterial :color="boxColor" />
      </Box>
      <Box :position="{ x: -8 }">
        <BasicMaterial :color="boxColor" />
      </Box>
      <Sphere
        :radius="0.5"
        :width-segments="30"
        :height-segments="30"
        :position="{ x: 8 }"
      >
        <BasicMaterial :color="boxColor" />
      </Sphere>
      <Torus
        ref="torus"
        :rotation="{ x: Math.PI / 2 }"
        :radial-segments="50"
        :tubular-segments="50"
        :arc="Math.PI / 8"
        :radius="4"
        :tube="0.1"
      >
        <BasicMaterial :color="boxColor" />
      </Torus>

      <Torus
        ref="torus1"
        :rotation="{ x: Math.PI / 2 }"
        :radial-segments="50"
        :tubular-segments="50"
        :arc="Math.PI / 2"
        :radius="3"
        :tube="0.1"
      >
        <BasicMaterial :color="boxColor" />
      </Torus>
    </Scene>
  </Renderer>
</template>
