<script setup lang="ts">
import supUrl from './assets/sup.png';
import yeastUrl from './assets/yeast.png';
</script>

<template>
  <v-sheet
    id="title"
    class="d-flex align-sm-center align-start mt-sm-n16"
    color="transparent"
    height="100lvh"
  >
    <v-sheet
      class="text mt-2 pa-6 surface content d-flex flex-column align-end"
      :max-width="710"
      rounded="xl"
    >
      <div class="mb-2">
        <div class="text-md-h1 text-h2 font-weight-bold"> Hi, I'm Damian </div>
        <p class="my-2">
          I'm a software engineer based in Wrocław, Poland. I would consider
          myself as a full stack&nbsp;
          <span class="text-primary font-weight-bold"> Web Developer </span>
          currently working as
          <span class="text-primary font-weight-bold">
            Senior Fullstack Developer
          </span>
          at
          <a
            class="underline"
            href="https://www.statscore.com/"
            target="_blank"
            variant="plain"
          >
            Statscore
          </a>
          collecting sport data from around the world.
        </p>
        <p class="my-2">
          Former
          <span class="text-primary font-weight-bold"> Technical Leader </span>
          at Host working on a production planning and scheduling SaaS software.
        </p>
        <p class="mb-2">
          In my free time, besides coding, I like to
          <v-menu
            :close-delay="0"
            location="right center"
            :offset="8"
            :open-delay="0"
            open-on-click
            open-on-hover
          >
            <template #activator="{ props: activatorProps }">
              <span v-bind="activatorProps" class="underline">brew beer</span>
            </template>
            <v-sheet rounded="xl">
              <v-img :src="yeastUrl" :width="300" />
            </v-sheet>
          </v-menu>
          and
          <v-menu
            :close-delay="0"
            location="right center"
            :offset="8"
            :open-delay="0"
            open-on-click
            open-on-hover
          >
            <template #activator="{ props: activatorProps }">
              <span v-bind="activatorProps" class="underline">swim</span>
            </template>
            <v-sheet rounded="xl">
              <v-img :src="supUrl" :width="300" />
            </v-sheet>
          </v-menu>
          on my SUP board.
        </p>
      </div>
      <div class="d-flex" style="gap: 8px">
        <v-btn color="secondary" disabled variant="tonal"> More to come </v-btn>
      </div>
    </v-sheet>
  </v-sheet>
</template>

<style scoped lang="scss">
.text {
  backdrop-filter: blur(12px);
}

a {
  color: inherit;
}

.underline {
  cursor: pointer;
  text-decoration: none;
  border-bottom: rgb(var(--v-theme-primary)) 2px dotted;
}
</style>
