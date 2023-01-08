import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      redirect: '/about',
      children: [
        {
          path: '/about',
          component: () => import('../views/AboutView.vue'),
        },
      ],
    },
  ],
})

export default router
