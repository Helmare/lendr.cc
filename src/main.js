import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';
import './assets/main.css';

// Create pinia
const pinia = createPinia();

// Create app.
const app = createApp(App);
app.use(pinia);
app.use(router);
app.mount('#app');
