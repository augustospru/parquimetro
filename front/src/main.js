import { createApp } from 'vue'
import App from './App.vue'
import PrimeVue from 'primevue/config';

import 'primevue/resources/themes/lara-light-indigo/theme.css';
import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css'
import './assets/main.css'
import router from './router'

const app = createApp(App).use(router)
app.use(PrimeVue)
app.mount("#app")
