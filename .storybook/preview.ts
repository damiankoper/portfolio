import { App } from 'vue';
import { StoryObj, setup, StoryContext } from '@storybook/vue3';
import { createVuetify } from 'vuetify';
import { VThemeProvider } from 'vuetify/components';
import { md3 } from 'vuetify/blueprints';
import { theme } from '@portfolio/theme';
import 'vuetify/styles';
import { aliases, mdi } from 'vuetify/iconsets/mdi';
import '@mdi/font/css/materialdesignicons.css'; // Ensure you are using css-loader

setup((app: App) => {
  app.use(
    createVuetify({
      blueprint: md3,
      theme: {
        defaultTheme: 'default',
        themes: {
          default: theme,
        },
      },
      icons: {
        defaultSet: 'mdi',
        aliases,
        sets: {
          mdi,
        },
      },
    })
  );
});

const themeDecorator = (_: StoryObj, context: StoryContext) => ({
  components: { VThemeProvider },
  template: `<v-theme-provider style="background:transparent" with-background theme="aps">
      <story/>
    </v-theme-provider>`,
});

export const parameters = {};

export const decorators = [themeDecorator];
