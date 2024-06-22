import './assets/main.css';
import { createApp } from 'vue/dist/vue.esm-bundler';
import App from './App.vue';
import router from './router';
import store from './store/store';
import Vue3Marquee from 'vue3-marquee';

const app = createApp(App);

app.use(router).use(store).use(Vue3Marquee);

app.mount('#app');
