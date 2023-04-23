<script setup lang="ts">
import { PerspectiveCamera, Vector3 } from 'three';
import { inject, onMounted, shallowRef } from 'vue';
import { rendererKey } from '../Renderer.key';
import TorusElement from '../Elements/TorusElement.vue';
import { theme } from '@portfolio/theme';
import { ref } from 'vue';

const segments = 24;
const position = new Vector3(0, 4, 0);
const radius = 0.6;
const renderer = inject(rendererKey);

const titleContainer = shallowRef<HTMLDivElement>();
const contentVisible = ref(false);

const sphereCount = 100;

function randArray() {
  return new Array(sphereCount).fill(0).map(() => 2 * Math.random() - 1);
}

const positions = randArray();
const arcs = randArray();
const rotations = randArray();
const sizes = randArray();
const radii = randArray();

onMounted(() => {
  renderer?.value?.onAfterRender(({ renderer }) => {
    const tCamera = renderer.camera as PerspectiveCamera;
    const vector = position.clone().project(tCamera.clone());
    vector.x = ((vector.x + 1) * renderer.size.width) / 2;
    vector.y = (-(vector.y - 1) * renderer.size.height) / 2;

    const container = titleContainer.value;
    if (container) {
      container.style.transform = `
        translate(
          ${Math.max(0, vector.x + (3 - (vector.z - 0.96) * 100) * 48)}px,
          calc(-50% - 40px + ${vector.y}px)
        )
      `;
    }
  });
});
</script>

<template>
  <Sphere
    :height-segments="segments"
    :position="position"
    :radius="radius"
    :width-segments="segments"
  >
    <BasicMaterial :color="theme.colors.primary" />
  </Sphere>
  <Sphere
    :height-segments="segments"
    :position="position"
    :radius="radius / 2"
    :width-segments="segments"
  >
    <BasicMaterial
      :color="theme.colors.secondary"
      :props="{ depthTest: false, depthWrite: false }"
    />
  </Sphere>

  <TorusElement
    :arc="Math.PI"
    :color="theme.colors.secondary"
    :position="new Vector3(0, 1.25, 0)"
    :radius="1"
    :speed="0.001"
    :tube="0.25"
  />
  <TorusElement
    :arc="Math.PI"
    :color="theme.colors.secondary"
    :position="new Vector3(0, 0.25, 0)"
    :radius="2"
    :speed="-0.002"
    :tube="0.25"
  />
  <TorusElement
    :arc="Math.PI"
    :color="theme.colors.secondary"
    :position="new Vector3(0, -0.75, 0)"
    :radius="1.5"
    :speed="-0.001"
    :tube="0.25"
  />
  <TorusElement
    :arc="Math.PI / 8"
    :color="theme.colors.secondary"
    :position="new Vector3(0, 0.25, 0)"
    :radius="1"
    :rotation="0"
    :speed="0.001"
    :tube="0.15"
  />

  <template v-for="(_, i) of Array(sphereCount)" :key="i">
    <TorusElement
      :arc="(Math.PI / 10) * arcs[i]"
      :color="theme.colors.outline"
      :position="new Vector3(0, 20 * positions[i] + 10, 0)"
      :radius="26 + 10 * radii[i]"
      :rotation="Math.PI * rotations[i]"
      :speed="0.0001 + 0.001 * arcs[i]"
      :tube="0.25 + 0.1 * sizes[i]"
    />
  </template>

  <Teleport to="body">
    <div
      ref="titleContainer"
      class="ma-10 title-container text-secondary"
      style="position: fixed"
    >
      <div class="text-h1 font-weight-bold">Hi, I'm Damian</div>
      <div class="bottom-content">
        <v-sheet
          v-if="contentVisible"
          class="text pa-6 surface content"
          rounded="xl"
        >
          <div class="mb-2">
            Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Morbi nec
            metus. Phasellus gravida semper nisi. Nam quam nunc, blandit vel,
            luctus pulvinar, hendrerit id, lorem. Praesent metus tellus,
            elementum eu, semper a, adipiscing nec, purus.
          </div>
          <v-btn variant="tonal"> About me!</v-btn>
        </v-sheet>
        <v-sheet v-else class="text pa-6 surface more-content" rounded="xl">
          <div class="mb-2">
            Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Morbi nec
            metus. Phasellus gravida semper nisi. Nam quam nunc, blandit vel,
            luctus pulvinar, hendrerit id, lorem. Praesent metus tellus,
            elementum eu, semper a, adipiscing nec, purus. metus. Phasellus
            gravida semper nisi. Nam quam nunc, blandit vel, luctus pulvinar,
            hendrerit id, lorem. Praesent metus tellus, elementum eu, semper a,
            adipiscing nec, purus. drerit id, lorem. Praesent metus tellus,
            elementum eu, semper a, adipiscing nec, purus. metus. Phasellus
            gravida semper nisi. Nam quam nunc, blandit vel, luctus pulvinar,
            hendrerit id, lorem. Praesent metus tel
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
      background-color: rgba(var(--v-theme-primary), 0.07);
    }
  }
}
</style>
