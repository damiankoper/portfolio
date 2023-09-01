<script setup lang="ts">
import { Vector3 } from 'three';
import SceneAnchor from '../../Anchor/SceneAnchor.vue';

defineProps<{
  anchors: { header: Vector3 };
}>();
</script>

<template>
  <SceneAnchor
    :anchor="anchors.header"
    class="ma-10"
    :location="['center', 'center']"
    :offset="[-40, -40]"
  >
    <template #anchor>
      <v-sheet
        class="text-h6 pa-6 surface-white d-flex gap-4 align-start"
        rounded="xl"
      >
        <v-img
          min-width="100"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Typescript_logo_2020.svg/2048px-Typescript_logo_2020.svg.png"
        />
        <div>
          <p class="text-h3">TypeScript enthusiast</p>
          <p class="text-h6 mb-4">Not afraid of anything else!</p>
          <p class="text-body-1">Not afraid of anything else!</p>
          <p class="text-body-1">Not afraid of anything else!</p>
          <p class="text-body-1">Not afraid of anything else!</p>
          <p class="text-body-1">Not afraid of anything else!</p>
        </div>
      </v-sheet>
    </template>
  </SceneAnchor>
</template>

<style scoped lang="scss"></style>
