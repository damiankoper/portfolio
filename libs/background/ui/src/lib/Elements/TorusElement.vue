<script setup lang="ts">
import { Matrix4, Vector3, Group as TreeGroup } from 'three';
import { Group, Torus } from 'troisjs';
import { inject, onMounted, shallowRef } from 'vue';
import { rendererKey } from '../Renderer.key';

const props = defineProps<{
  color: string;
  arc: number;
  position: Vector3;
  rotation?: number;
  radius: number;
  tube: number;
  speed: number;
}>();

const segments = 24;
const renderer = inject(rendererKey);

const torusGroup = shallowRef<typeof Torus>();
const torusRotation = new Vector3(
  Math.PI / 2,
  0,
  props.rotation ?? Math.random() * Math.PI * 2
);

onMounted(() => {
  renderer?.value?.onBeforeRender(() => {
    const group = torusGroup.value?.group as TreeGroup | undefined;
    if (group) group.rotation.z += props.speed;
  });
});
</script>

<template>
  <Group ref="torusGroup" :position="position" :rotation="torusRotation">
    <Torus
      :arc="arc"
      :radial-segments="segments"
      :radius="radius"
      :tube="tube"
      :tubular-segments="segments * 2"
    >
      <BasicMaterial :color="color" />
    </Torus>
    <Sphere
      :height-segments="segments"
      :position="
        new Vector3().applyMatrix4(new Matrix4().makeTranslation(radius, 0, 0))
      "
      :radius="tube"
      :width-segments="segments"
    >
      <BasicMaterial :color="color" />
    </Sphere>
    <Sphere
      :height-segments="segments"
      :position="
        new Vector3().applyMatrix4(
          new Matrix4()
            .makeTranslation(radius, 0, 0)
            .premultiply(new Matrix4().makeRotationZ(arc))
        )
      "
      :radius="tube"
      :width-segments="segments"
    >
      <BasicMaterial :color="color" />
    </Sphere>
  </Group>
</template>

<style scoped></style>
