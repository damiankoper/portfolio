<script setup lang="ts">
import { ScrollControls } from '@tresjs/cientos';
import { TresCanvas } from '@tresjs/core';
import { useDisplay, useTheme } from 'vuetify';

import TitleSectionScene from '../Section/TitleSection/TitleSectionScene.vue';

const theme = useTheme();
const { smAndUp } = useDisplay();
</script>

<template>
  <ClientOnly>
    <TresCanvas clear-color="#ffffff">
      <TresPerspectiveCamera ref="camera" :position="[0, 0, 5]" />
      <TitleSectionScene
        :color="theme.current.value.colors.primary"
        :sm-and-up="smAndUp"
      />
      <ScrollControls :distance="5" html-scroll :smooth-scroll="0.05" />
    </TresCanvas>
  </ClientOnly>
</template>

<style scoped lang="scss">
.v-main {
  --v-layout-top: 64px !important;
}
</style>
