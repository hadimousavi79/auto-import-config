import { createMemoryHistory, createRouter } from 'vue-router'

import MainPage from '@/views/mainPage.vue'

const routes = [{ path: '/:url?', component: MainPage }]

export default createRouter({
  history: createMemoryHistory(),
  routes,
})
