import { createWebHistory, createRouter } from 'vue-router'

import MainPage from '@/views/mainPage.vue'
import SchemaPage from '@/views/schemaPage.vue'

const routes = [
  { path: '/', component: MainPage },
  { path: '/gen', component: SchemaPage },
]

export default createRouter({
  history: createWebHistory(),
  routes,
})
