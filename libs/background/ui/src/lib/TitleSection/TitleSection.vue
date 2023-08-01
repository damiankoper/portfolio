<script setup lang="ts">
import { Vector3 } from 'three';
import { computed } from 'vue';

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
              In my free time, besides coding, I like to brew beer&nbsp;🍺 and
              swim on my SUP board&nbsp;🏄.
            </p>
          </div>
          <v-btn variant="tonal"> More about me!</v-btn>
        </v-sheet>

        <!--  <div v-if="contentVisible">
        </div>
        <div v-else>
          <img class="more-content" src="https://picsum.photos/636/454" />
        </div> -->
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
</style>
