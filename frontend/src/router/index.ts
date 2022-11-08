import { createRouter, createWebHistory } from 'vue-router'

import Home from '../pages/index.vue'

export default createRouter({
  history: createWebHistory(),
  routes: [
    {
      name: 'Home',
      path: '/',
      component: Home
    },

    {
      name: 'About',
      path: '/about',
      component: () => import('../pages/About.vue')
    }
  ]
})
