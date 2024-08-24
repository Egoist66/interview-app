import './assets/main.scss'
import 'primeicons/primeicons.css'
import 'primeflex/primeflex.min.css'
// import 'primevue/resources/themes/aura-light-blue/theme.css'


import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import PrimeVue from 'primevue/config';
import ToastServie from 'primevue/toastservice';
import ConfirmationService from 'primevue/confirmationservice';
import { initFireBaseApp } from './service/firebase.config'
import { welcomePlugin } from './plugins/welcome'



export const fireBaseInst = initFireBaseApp();
const app = createApp(App);


app.use(ToastServie);
app.use(ConfirmationService);
app.use(PrimeVue, {
    ripple: true
});

app.use(createPinia())
app.use(router)
app.use(welcomePlugin)

app.mount('#app')

