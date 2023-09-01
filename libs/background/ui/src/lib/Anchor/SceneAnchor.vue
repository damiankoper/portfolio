<script setup lang="ts">
import { Vector3 } from 'three';
import { computed, inject, ref } from 'vue';
import { azimuthKey } from '../utils/symbols';

type LocationX = 'center' | 'left' | 'right';
type LocationY = 'center' | 'top' | 'bottom';

const props = withDefaults(
  defineProps<{
    anchor: Vector3;
    location: [LocationX, LocationY];
    azimuthFrom?: number;
    azimuthTo?: number;
    offset: [number, number];
    zFix?: number;
  }>(),
  {
    azimuthFrom: 0,
    azimuthTo: 360,
    offset: () => [0, 0],
    zFix: 0,
  },
);

const azimuth = inject(azimuthKey, ref(0));

function getLocationTransform(origin: LocationX | LocationY) {
  switch (origin) {
    case 'center':
      return '-50%';
    case 'left':
    case 'top':
      return '-100%';
    case 'right':
    case 'bottom':
      return '0%';
  }
}

const transform = computed(() => {
  const y = props.anchor.y;
  const z = 0.995 - props.anchor.z;
  const x = Math.max(0, props.anchor.x + z * props.zFix);
  const xOffset = props.offset[0] ? `+ ${props.offset[0]}px` : '';
  const yOffset = props.offset[1] ? `+ ${props.offset[1]}px` : '';
  const xLocation = getLocationTransform(props.location[0]);
  const yLocation = getLocationTransform(props.location[1]);
  return `translate(
      calc(${xLocation} + ${Math.round(x)}px ${xOffset}),
      calc(${yLocation} + ${Math.round(y)}px ${yOffset})
    )
  `;
});

const visible = computed(() =>
  props.azimuthFrom < props.azimuthTo
    ? azimuth.value <= props.azimuthTo && azimuth.value >= props.azimuthFrom
    : azimuth.value <= props.azimuthFrom || azimuth.value >= props.azimuthTo,
);
</script>

<template>
  <Teleport to="body">
    <div
      class="container"
      v-bind="$attrs"
      :style="{ transform, transformOrigin: location }"
    >
      <Transition>
        <div v-show="visible" style="position: relative">
          <slot name="anchor"> Anchor</slot>
          <div class="content">
            <slot></slot>
          </div>
        </div>
      </Transition>
    </div>
  </Teleport>
</template>

<style scoped lang="scss">
.v-enter-active,
.v-leave-active {
  transition: transform 0.3s ease;
}
.v-enter-active {
  transition-timing-function: cubic-bezier(0.34, 1.56, 0.64, 1);
}
.v-leave-active {
  transition-timing-function: cubic-bezier(0.36, 0, 0.66, -0.56);
}

.v-enter-from,
.v-leave-to {
  transform: scale(0%);
}

.container {
  position: fixed;
  top: 0;
  left: 0;
  will-change: transform;

  .content {
    position: absolute;
  }
}
</style>
