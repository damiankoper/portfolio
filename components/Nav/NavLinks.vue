<script setup lang="ts">
import xIcon from '../Icons/XIcon.vue';

import IconEmail from '~icons/mdi/email';
import IconGithub from '~icons/mdi/github';
import IconLinkedin from '~icons/mdi/linkedin';
</script>

<template>
  <v-btn
    aria-label="Mail kopernickk@gmail.com"
    href="mailto:kopernickk@gmail.com"
    :icon="IconEmail"
    target="_blanc"
    variant="plain"
  />
  <v-btn
    aria-label="Go to Linkedin profile"
    href="https://www.linkedin.com/in/damiankoper/"
    :icon="IconLinkedin"
    target="_blanc"
    variant="plain"
  />
  <v-btn
    aria-label="Go to GitHub profile"
    href="https://github.com/damiankoper"
    :icon="IconGithub"
    target="_blanc"
    variant="plain"
  />
  <v-btn
    aria-label="Go to X profile"
    href="https://twitter.com/kopernickk"
    icon
    target="_blanc"
    variant="plain"
  >
    <xIcon />
  </v-btn>
</template>
