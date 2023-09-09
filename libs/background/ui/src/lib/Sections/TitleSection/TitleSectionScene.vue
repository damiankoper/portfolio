<script setup lang="ts">
import {
  Color,
  NoColorSpace,
  PerspectiveCamera,
  ShaderMaterial,
  Vector3,
} from 'three';
import { theme } from '@portfolio/theme';
import { useRenderLoop, useTresContext } from '@tresjs/core';
import { randArray } from '../../utils/number.utils';
import { shallowRef } from 'vue';

import vertex from './shaders/vertexShader';
import fragment from './shaders/fragmentShader';

const segments = 128;
const position = new Vector3(-1.5, 0.5, 1.5);
const radius = 0.6;
const { onAfterLoop } = useRenderLoop();
const { camera, renderer } = useTresContext();

const sphereCount = 100;

const positions = randArray(sphereCount);
const arcs = randArray(sphereCount);
const rotations = randArray(sphereCount);
const sizes = randArray(sphereCount);
const radii = randArray(sphereCount);
const blobMaterialA = shallowRef<ShaderMaterial>();
const blobMaterialB = shallowRef<ShaderMaterial>();
const timeOffsets = [6, 2];
const emit = defineEmits<{
  (e: 'update:anchors', p: { header: Vector3 }): void;
}>();

onAfterLoop(({ elapsed }) => {
  const tCamera = camera.value as PerspectiveCamera;
  const vector = position.clone().project(tCamera.clone());
  vector.x = ((vector.x + 1) * renderer.value.domElement.width) / 2;
  vector.y = (-(vector.y - 1) * renderer.value.domElement.height) / 2;
  emit('update:anchors', { header: vector });
  [blobMaterialA, blobMaterialB].forEach((blobMaterial, i) => {
    if (blobMaterial.value)
      blobMaterial.value.uniforms['time'].value =
        (timeOffsets[i] + elapsed) * 0.05;
  });
});
const diffuse = new Color()
  .setStyle(theme.colors.primary, NoColorSpace)
  .toArray();
//TODO: blob position depends on window width
</script>

<template>
  <TresMesh :frustum-culled="false" :position="position">
    <TresSphereGeometry :args="[radius, segments, segments]">
    </TresSphereGeometry>
    <TresShaderMaterial
      ref="blobMaterialA"
      :fragment-shader="fragment"
      :uniforms="{
        time: { value: 0 },
        scale: { value: 0.5 },
        diffuse: { value: diffuse },
        opacity: { value: 1 },
      }"
      :vertex-shader="vertex"
    ></TresShaderMaterial>
  </TresMesh>

  <TresMesh :frustum-culled="false" :position="[8, -4, -10]" :scale="[8, 8, 8]">
    <TresSphereGeometry :args="[radius, segments, segments]">
    </TresSphereGeometry>
    <TresShaderMaterial
      ref="blobMaterialB"
      :fragment-shader="fragment"
      :uniforms="{
        time: { value: 0 },
        scale: { value: 0.5 },
        diffuse: { value: diffuse },
        opacity: { value: 1 },
      }"
      :vertex-shader="vertex"
    ></TresShaderMaterial>
  </TresMesh>

  <!--   <Sphere
    :args="[radius, segments, segments]"
    :color="theme.colors.primary"
    :position="position"
  /> -->
  <!--   <Sphere :args="[radius / 4, segments, segments]" :position="position">
    <TresMeshBasicMaterial
      :color="theme.colors['on-primary-container']"
      :depth-test="false"
      :depth-write="false"
    />
  </Sphere> -->
  <!--
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
-->
  <!--   <template v-for="(_, i) of Array(sphereCount)" :key="i">
    <TorusElement
      :arc="Math.PI / 200"
      :color="theme.colors.primary"
      :position="new Vector3(0, 20 * positions[i] + 10, 0)"
      :radius="26 + 13 * radii[i]"
      :rotation="Math.PI * rotations[i]"
      :speed="0.0001 + 0.001 * arcs[i]"
      :tube="0.3 + 0 * sizes[i]"
    />
  </template> -->
</template>
