import { createApp } from 'vue'
import App from './App.vue'
import VueGoodTablePlugin from 'vue-good-table-next';
import './assets/vue-good-table-next.css'
import Router from "@/router/index.js";

const app = createApp(App)
app.use(VueGoodTablePlugin)
app.use(Router)
app.mount('#app')
