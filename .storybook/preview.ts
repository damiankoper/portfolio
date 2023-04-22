import { App } from 'vue';
import { StoryObj, setup, StoryContext } from '@storybook/vue3';
import { TroisJSVuePlugin } from 'troisjs';
import { createVuetify } from 'vuetify';
import { VThemeProvider } from 'vuetify/components';
import { theme } from '@portfolio/theme';
import 'vuetify/styles';

setup((app: App) => {
  app.use(TroisJSVuePlugin);
  app.use(
    createVuetify({
      theme: {
        defaultTheme: 'default',
        themes: {
          default: theme,
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
