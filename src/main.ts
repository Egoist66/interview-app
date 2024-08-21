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
import { initFireBaseApp } from './service/firebase.config'



export const fireBaseInst = initFireBaseApp();
const app = createApp(App);


app.use(ToastServie);
app.use(PrimeVue, {
    ripple: true
});
app.use(createPinia())
app.use(router)
app.use({
    install(app) {
        console.log('💫 Welcome to the interview app');
    }
})

app.mount('#app')

