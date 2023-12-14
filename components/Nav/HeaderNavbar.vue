<script setup lang="ts">
import { useDisplay } from 'vuetify';

import NavLinks from './NavLinks.vue';

import IconMenu from '~icons/mdi/menu';

const extended = ref(false);
const { xs } = useDisplay();
</script>

<template>
  <v-app-bar :extension-height="64">
    <v-container class="py-2">
      <v-row align="center" dense justify="space-between">
        <v-col class="font-weight-bold text-button">
          <v-btn
            class="me-2 d-inline-flex d-sm-none"
            :icon="IconMenu"
            @click="extended = !extended"
          />
          Damian Koper
        </v-col>
        <v-col class="d-sm-flex d-none gap-1" cols="auto">
          <NavLinks />
        </v-col>
      </v-row>
    </v-container>
    <template v-if="extended && xs" #extension>
      <v-row dense justify="center">
        <v-col class="d-xs-flex gap-1" cols="auto">
          <NavLinks />
        </v-col>
      </v-row>
    </template>
  </v-app-bar>
</template>

<style scoped>
.v-app-bar {
  width: 100vw;
  z-index: 1;
  backdrop-filter: blur(24px);
  background-color: rgba(var(--v-theme-background), 0.5) !important;
}
</style>
