<script setup lang="ts">
import { Vector3 } from 'three';
import { watch } from 'vue';

import SceneBlob from '~/components/Scene/SceneBlob.vue';

const props = defineProps<{
  color: string;
  smAndUp: boolean;
}>();

const positionA = ref(new Vector3(0, 4, -5));
const scaleA = new Vector3(3, 3, 3);
const positionB = ref(new Vector3(0, 0, -10));
const scaleB = new Vector3(7, 7, 7);
const positionC = ref(new Vector3(0, -5, -5));
const scaleC = new Vector3(3, 3, 3);

watch(
  () => props.smAndUp,
  (v) => {
    if (v) {
      positionA.value.x = -4.25;
      positionB.value.x = 7.25;
      positionC.value.x = -4;
    } else {
      positionA.value.x = -2.5;
      positionB.value.x = 5.5;
      positionC.value.x = -2;
    }
  },
  { immediate: true },
);
</script>

<template>
  <SceneBlob
    :color="color"
    :position="positionA"
    :radius="0.6"
    :scale="scaleA"
    :seed="9"
  />
  <SceneBlob
    :color="color"
    :position="positionB"
    :radius="0.6"
    :scale="scaleB"
    :seed="2"
  />
  <SceneBlob
    :color="color"
    :position="positionC"
    :radius="0.6"
    :scale="scaleC"
    :seed="22"
  />
</template>
