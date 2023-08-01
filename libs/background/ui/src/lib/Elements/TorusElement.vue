<script setup lang="ts">
import { Matrix4, Vector3, Group } from 'three';
import { shallowRef } from 'vue';
import { useRenderLoop } from '@tresjs/core';
import { Sphere, Torus } from '@tresjs/cientos';

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
const { onAfterLoop } = useRenderLoop();

const torusGroup = shallowRef<Group>();
const torusRotation = new Vector3(
  Math.PI / 2,
  0,
  props.rotation ?? Math.random() * Math.PI * 2,
);

onAfterLoop(() => {
  const group = torusGroup.value;
  if (group) group.rotation.z += props.speed;
});
</script>

<template>
  <TresGroup
    ref="torusGroup"
    :position="position.toArray()"
    :rotation="torusRotation.toArray()"
  >
    <Torus :args="[radius, tube, segments, segments * 2, arc]" :color="color" />
    <Sphere
      :args="[tube, segments, segments]"
      :color="color"
      :position="
        new Vector3()
          .applyMatrix4(new Matrix4().makeTranslation(radius, 0, 0))
          .toArray()
      "
    >
    </Sphere>
    <Sphere
      :args="[tube, segments, segments]"
      :color="color"
      :position="
        new Vector3()
          .applyMatrix4(
            new Matrix4()
              .makeTranslation(radius, 0, 0)
              .premultiply(new Matrix4().makeRotationZ(arc)),
          )
          .toArray()
      "
    >
    </Sphere>
  </TresGroup>
</template>
