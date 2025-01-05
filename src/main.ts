import './assets/index.css'
import router from '@/plugins/router'
import { createDeviceDetector } from 'next-vue-device-detector'

const device = createDeviceDetector()

import { createApp } from 'vue'
import App from './App.vue'

createApp(App).use(router).use(device).mount('#app')
