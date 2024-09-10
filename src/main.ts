import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { createPinia, Pinia } from 'pinia'
import router from "./router";
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
const pinia: Pinia = createPinia();

const app = createApp(App);

app.use(pinia);
app.use(router);
app.use(Toast);
app.mount('#app')
