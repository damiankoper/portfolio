<script setup lang="ts">
import '~/assets/scss/index.scss';

import DynamicBackground from './components/Background/DynamicBackground.vue';
import HeaderNavbar from './components/Nav/HeaderNavbar.vue';
import NavFooter from './components/Nav/NavFooter.vue';
import NavTips from './components/Nav/NavTips.vue';
import MoreToComeSection from './components/Section/MoreToComeSection/MoreToComeSection.vue';
import TitleSection from './components/Section/TitleSection/TitleSection.vue';

useSeoMeta({
  title: 'Damian Koper',
  ogTitle: 'Damian Koper',
  description: "Damian Koper's portfolio.",
  ogDescription: "Damian Koper's portfolio.",
  ogImage: 'https://example.com/image.png',
});
</script>

<template>
  <v-app style="background: none">
    <DynamicBackground />

    <HeaderNavbar />
    <v-main ref="main">
      <v-container>
        <TitleSection />
        <MoreToComeSection />
      </v-container>
    </v-main>
    <NavFooter />
    <NavTips />
  </v-app>
</template>
