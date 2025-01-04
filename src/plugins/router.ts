import { createWebHistory, createRouter } from 'vue-router'

import MainPage from '@/views/mainPage.vue'

const routes = [{ path: '/', component: MainPage }]

export default createRouter({
  history: createWebHistory(),
  routes,
})
