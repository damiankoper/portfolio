<script setup lang="ts">
import { Color, Mesh, NoColorSpace, ShaderMaterial, Vector3 } from 'three';
import { onMounted, watch } from 'vue';

import fragment from '../../assets/shaders/fragmentShader';
import vertex from '../../assets/shaders/vertexShader';

const props = defineProps<{
  position: Vector3;
  scale: Vector3;
  radius: number;
  color: string;
  seed: number;
}>();

const segments = 128;

const { onAfterLoop } = useRenderLoop();

const blobMaterial = shallowRef<ShaderMaterial>();
const meshRef = shallowRef<Mesh>();

const diffuse = computed(() =>
  new Color().setStyle(props.color, NoColorSpace).toArray(),
);

onAfterLoop(({ elapsed }) => {
  if (blobMaterial.value)
    blobMaterial.value.uniforms.time.value = (props.seed + elapsed) * 0.05;
});
onMounted(() => {
  meshRef.value?.position.copy(props.position);
});
watch(
  () => props.position,
  () => meshRef.value?.position.copy(props.position),
  { deep: true },
);
</script>

<template>
  <TresMesh ref="meshRef" :frustum-culled="false" :scale="scale">
    <TresSphereGeometry :args="[radius, segments, segments]" />
    <TresShaderMaterial
      ref="blobMaterial"
      :fragment-shader="fragment"
      :uniforms="{
        time: { value: 0 },
        scale: { value: 0.5 },
        diffuse: { value: diffuse },
        opacity: { value: 1 },
      }"
      :vertex-shader="vertex"
    />
  </TresMesh>
</template>
