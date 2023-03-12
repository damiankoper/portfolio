import { App } from 'vue';
import { setup } from '@storybook/vue3';
import { TroisJSVuePlugin } from 'troisjs';

setup((app: App) => {
  app.use(TroisJSVuePlugin);
});

export const parameters = {};
