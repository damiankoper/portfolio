<script setup lang="ts">
import { Vector3 } from 'three';
import SceneAnchor from '../../Anchor/SceneAnchor.vue';
import supUrl from './assets/sup.png';
import yeastUrl from './assets/yeast.png';
import { useWindowSize } from '@vueuse/core';

defineProps<{
  anchors: { header: Vector3 };
}>();

const { height } = useWindowSize();
</script>

<template>
  <SceneAnchor
    :anchor="anchors.header"
    :azimuth-from="90"
    :azimuth-to="300"
    class="ma-10"
    :location="['right', 'center']"
    :offset="[(-2160 + height) * 0.05 + 40, -40]"
    style="color: rgb(var(--v-theme-on-primary-container))"
    :z-fix="5000"
  >
    <template #anchor>
      <div class="text-h1 font-weight-bold">Hi, I'm Damian</div>
    </template>
    <v-sheet
      class="text mt-2 pa-6 surface content d-flex flex-column align-end"
      :max-width="700"
      rounded="xl"
    >
      <div class="mb-2">
        <p class="mb-2">
          I'm a software engineer based in Wrocław, Poland. I would consider
          myself as a full stack&nbsp;<span
            class="text-primary font-weight-bold"
            >Web Developer
          </span>
          currently working as
          <span class="text-primary font-weight-bold"> Technical Leader </span>
          and
          <span class="text-primary font-weight-bold">Team Leader</span>.
          I&nbsp;work in a great&nbsp;team&nbsp;of&nbsp;6 on a production
          planning and scheduling SaaS software.
        </p>
        <p class="mb-2">
          In my free time, besides coding, I like to
          <v-menu
            :close-delay="0"
            location="right center"
            :offset="8"
            :open-delay="0"
            open-on-hover
          >
            <template #activator="{ props: activatorProps }">
              <a v-bind="activatorProps" class="underline">brew beer</a>
            </template>
            <v-sheet rounded="xl">
              <v-img :src="yeastUrl" :width="300"></v-img>
            </v-sheet>
          </v-menu>
          and
          <v-menu
            :close-delay="0"
            location="right center"
            :offset="8"
            :open-delay="0"
            open-on-hover
          >
            <template #activator="{ props: activatorProps }">
              <a v-bind="activatorProps" class="underline">swim</a>
            </template>
            <v-sheet rounded="xl">
              <v-img :src="supUrl" :width="300"></v-img>
            </v-sheet>
          </v-menu>
          on my SUP board.
        </p>
      </div>
      <div class="d-flex" style="gap: 8px">
        <v-btn color="secondary" variant="tonal"> More about me</v-btn>
        <v-btn variant="tonal"> Projects</v-btn>
      </div>
    </v-sheet>
  </SceneAnchor>
</template>

<style scoped lang="scss">
.text {
  backdrop-filter: blur(12px);
}

.underline {
  cursor: pointer;
  text-decoration: none;
  border-bottom: rgb(var(--v-theme-primary)) 2px dotted;
}
</style>
