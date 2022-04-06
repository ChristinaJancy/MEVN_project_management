import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './index.scss'

import DashboardLayout from './components/layouts/DashboardLayout.vue';
import EmptyLayout from './components/layouts/EmptyLayout.vue';


createApp(App)
.component('default-layout', DashboardLayout)
.component('empty-layout', EmptyLayout)
.use(router)
.mount('#app');
