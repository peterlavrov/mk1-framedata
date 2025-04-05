import './assets/main.css';

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { inject } from '@vercel/analytics/vue'; // Используем inject вместо Analytics

import App from './App.vue';
import router from './router';

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(inject); // Подключаем аналитику глобально

app.mount('#app');