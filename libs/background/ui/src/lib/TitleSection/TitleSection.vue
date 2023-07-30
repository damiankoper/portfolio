<script setup lang="ts">
import { Vector3 } from 'three';
import { computed } from 'vue';

const props = defineProps<{
  anchors: { header: Vector3 };
}>();

const headerTransform = computed(() => {
  const z = 0.995 - props.anchors.header.z;
  const x = props.anchors.header.x + z * 5000;
  return `translate(
      ${x}px,
      calc(-50% - 40px + ${props.anchors.header.y}px)
    )
  `;
});
</script>

<template>
  <div></div>
  <Teleport to="body">
    <div
      class="ma-10 title-container text-secondary"
      style="position: fixed"
      :style="{ transform: headerTransform }"
    >
      <div class="text-h1 font-weight-bold">Hi, I'm Damian</div>
      <div class="bottom-content">
        <v-sheet class="text pa-6 surface content" rounded="xl">
          <div class="mb-2">
            Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Morbi nec
            metus. Phasellus gravida semper nisi. Nam quam nunc, blandit vel,
            luctus pulvinar, hendrerit id, lorem. Praesent metus tellus,
            elementum eu, semper a, adipiscing nec, purus.
          </div>
          <v-btn variant="tonal"> About me!</v-btn>
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
  will-change: transform;
  top: 0;
  left: 0;
  .content,
  .more-content {
    box-sizing: border-box;
    img {
      contain: layout;
    }
  }

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
        white 50%
      );
    }
  }
}
</style>
