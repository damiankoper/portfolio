<script setup lang="ts">
import { Vector3 } from 'three';
import SceneAnchor from '../../Anchor/SceneAnchor.vue';
import supUrl from './assets/sup.png';
import yeastUrl from './assets/yeast.png';

defineProps<{
  anchors: { header: Vector3 };
}>();
</script>

<template>
  <!--   <SceneAnchor
    :anchor="anchors.header"
    :azimuth-from="0"
    :azimuth-to="360"
    class="ma-5"
    :location="['right', 'bottom']"
    :offset="[25, 25]"
    style="color: rgb(var(--v-theme-on-primary-container))"
    :z-fix="5000"
  >
    <template #anchor> </template>
  </SceneAnchor> -->

  <v-sheet
    class="d-flex align-sm-center align-start mt-sm-n16"
    color="transparent"
    height="100vh"
  >
    <v-sheet
      class="text mt-2 pa-6 surface content d-flex flex-column align-end"
      :max-width="700"
      rounded="xl"
    >
      <div class="mb-2">
        <div class="text-md-h1 text-h2 font-weight-bold">Hi, I'm Damian</div>
        <p class="my-2">
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
            open-on-click
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
            open-on-click
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
  </v-sheet>
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
