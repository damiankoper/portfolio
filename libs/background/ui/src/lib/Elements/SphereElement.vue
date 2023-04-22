<script setup lang="ts">
import { Vector3, Group as TreeGroup } from 'three';
import { Group, Sphere } from 'troisjs';
import { inject, onMounted, shallowRef } from 'vue';
import { rendererKey } from '../Renderer.key';

const props = defineProps<{
  color: string;
  center: Vector3;
  shift: number;
  radius: number;
  speed: number;
  rotation?: number;
}>();

const segments = 24;
const renderer = inject(rendererKey);

const sphereGroup = shallowRef<typeof Group>();
const sphereRotation = new Vector3(
  0,
  props.rotation ?? Math.random() * Math.PI * 2,
  0
);

onMounted(() => {
  renderer?.value?.onBeforeRender(() => {
    const group = sphereGroup.value?.group as TreeGroup | undefined;
    if (group) group.rotation.y += props.speed;
  });
});
</script>

<template>
  <Group ref="sphereGroup" :position="center" :rotation="sphereRotation">
    <Sphere
      :height-segments="segments"
      :position="new Vector3(0, 0, shift)"
      :radius="radius"
      :width-segments="segments"
    >
      <BasicMaterial :color="color" />
    </Sphere>
  </Group>
</template>
