import { md3 } from 'vuetify/blueprints';
import { aliases, mdi } from 'vuetify/iconsets/mdi';

export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    '@tresjs/nuxt',
    '@nuxtjs/eslint-module',
    '@invictus.codes/nuxt-vuetify',
  ],
  typescript: {
    shim: false,
  },

  vuetify: {
    moduleOptions: {
      treeshaking: true,
    },
    vuetifyOptions: {
      blueprint: md3,
      theme: {
        defaultTheme: 'default',
        themes: {
          default: {
            dark: false,
            colors: {
              primary: '#ca2e55',
              'primary-container': '#FFD9DD',
              'on-primary-container': '#400012',
              secondary: '#30323d',
              outline: '#BFBDC1',
              outlineVariant: '#EDDDE1',
            },
          },
        },
      },
      icons: {
        defaultSet: 'mdi',
        aliases,
        sets: {
          mdi,
        },
      },
    },
  },
});
