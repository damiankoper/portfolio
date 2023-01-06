import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { DynamicBackground } from '@portfolio/background/ui';

import App from './App.vue';
import router from './router';
import './assets/main.css';

const app = createApp(App);
console.log(DynamicBackground);

app.use(createPinia());
app.use(router);

app.mount('#app'); //
