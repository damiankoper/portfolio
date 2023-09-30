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

watch(
  () => props.smAndUp,
  (v) => {
    if (v) {
      positionA.value.x = -4.5;
      positionB.value.x = 8;
    } else {
      positionA.value.x = -2.5;
      positionB.value.x = 5.5;
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
</template>
