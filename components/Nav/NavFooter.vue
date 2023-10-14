<script setup lang="ts"></script>

<template>
  <v-footer>
    <v-container>
      <v-row justify="center">
        <v-col cols="auto">
          <v-row dense justify="center">
            <v-col class="text-overline text-center" cols="12">
              © {{ new Date().getFullYear() }} Damian Koper
            </v-col>
            <NavLinks />
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </v-footer>
</template>

<style scoped>
.v-footer {
  backdrop-filter: blur(24px);
  background-color: rgba(var(--v-theme-background), 0.5) !important;
}
</style>
