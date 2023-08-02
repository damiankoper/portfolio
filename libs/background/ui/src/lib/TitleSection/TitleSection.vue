<script setup lang="ts">
import { Vector3 } from 'three';
import { computed } from 'vue';
import supUrl from '../assets/sup.png';
import yeastUrl from '../assets/yeast.png';

const props = defineProps<{
  anchors: { header: Vector3 };
}>();

const headerTransform = computed(() => {
  const y = props.anchors.header.y;
  const z = 0.995 - props.anchors.header.z;
  const x = Math.max(0, props.anchors.header.x + z * 5000);
  return `translate(
      ${Math.round(x)}px,
      calc(-50% - 40px + ${Math.round(y)}px)
    )
  `;
});
</script>

<template>
  <Teleport to="body">
    <div
      class="ma-10 title-container text-secondary"
      :style="{ transform: headerTransform }"
    >
      <div class="text-h1 font-weight-bold">Hi, I'm Damian</div>
      <div class="bottom-content">
        <v-sheet
          class="text pa-6 surface content d-flex flex-column align-end"
          :max-width="800"
          rounded="xl"
        >
          <div class="mb-2">
            <p class="mb-2">
              I'm a software engineer based in Wrocław, Poland. I would consider
              myself as a&nbsp;<span class="text-primary font-weight-bold"
                >Web Developer
              </span>
              currently working as
              <span class="text-primary font-weight-bold">
                Technical Leader
              </span>
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
          <v-btn variant="tonal"> More about me!</v-btn>
        </v-sheet>
      </div>
    </div>
  </Teleport>
</template>

<style scoped lang="scss">
.title-container {
  position: fixed;
  will-change: transform;
  top: 0;
  left: 0;

  .bottom-content {
    position: absolute;
    top: calc(100% + 16px);
    .text {
      backdrop-filter: blur(12px);
    }
    .surface {
      background-color: color-mix(
        in srgb,
        rgba(var(--v-theme-primary)) 7%,
        white 0%
      );
    }
  }
}

.underline {
  cursor: pointer;
  text-decoration: none;
  border-bottom: rgb(var(--v-theme-primary)) 2px dotted;
}
</style>
