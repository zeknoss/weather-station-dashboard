import './assets/main.scss';

import { createApp } from 'vue';
import { i18n } from './composables/i18n';
import App from './App.vue';

const app = createApp(App);
app.use(i18n).mount('#app');