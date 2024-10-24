import './assets/css/tailwind.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { useStore } from '@/stores/useStore'
const app = createApp(App)
const pinia = createPinia()
const numericOnly = {
    mounted(el) {
        el.addEventListener('input', () => {
            el.value = el.value.replace(/[^0-9]/g, '');
            el.dispatchEvent(new Event('input'));
        });
    }
};


app.directive('numeric-only', numericOnly);
app.use(pinia)
app.use(router)

const store = useStore();
store.initializeUser();

app.mount('#app')
