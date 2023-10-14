import { md3 } from 'vuetify/blueprints';

export default defineNuxtConfig({
  devtools: { enabled: true },
  app: {
    head: {
      htmlAttrs: { lang: 'en' },
    },
  },

  modules: [
    '@tresjs/nuxt',
    '@nuxtjs/eslint-module',
    '@invictus.codes/nuxt-vuetify',
    'unplugin-icons/nuxt',
  ],
  typescript: {
    shim: false,
  },

  vuetify: {
    moduleOptions: {
      treeshaking: true,
      useIconCDN: false,
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
    },
  },
});
