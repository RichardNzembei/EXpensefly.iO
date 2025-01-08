import './assets/css/tailwind.css';

import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';
import { useUserStore } from '@/stores/userStore';
import './registerServiceWorker'

const app = createApp(App);
const pinia = createPinia();

const numericOnly = {
    mounted(el) {
        el.addEventListener('input', (event) => {
            const originalValue = el.value;

            el.value = el.value.replace(/[^0-9]/g, '');
            if (el.value !== originalValue) {
                el.dispatchEvent(new Event('input'));
            }
        });
    }
};
app.directive('numeric-only', numericOnly);
app.use(pinia);
app.use(router);
const userStore = useUserStore();
userStore.initializeUser();
app.mount('#app');
