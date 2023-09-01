<script setup lang="ts"></script>

<template>
  <nav>
    <v-container class="py-2">
      <v-row align="center" dense justify="space-between">
        <v-col class="text-overline font-weight-bold text-secondary">
          Damian Koper
        </v-col>
        <v-col class="d-flex align-center" cols="auto" style="gap: 4px">
          <v-btn variant="plain">About me</v-btn>
          <v-btn variant="plain">Projects</v-btn>
          <v-btn variant="plain">Writing</v-btn>
          <v-divider color="primary" inset vertical />
          <v-btn icon="mdi-email" variant="plain"> </v-btn>
          <v-btn icon="mdi-linkedin" variant="plain"> </v-btn>
          <v-btn icon="mdi-github" variant="plain"> </v-btn>
          <v-btn icon="mdi-twitter" variant="plain"> </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </nav>
</template>

<style scoped>
nav {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  z-index: 1;
  backdrop-filter: blur(24px);
  background-color: rgba(var(--v-theme-background), 0.5);
}
</style>
