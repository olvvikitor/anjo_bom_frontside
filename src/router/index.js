import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import FormLoginAdmin from '@/components/FormLoginAdmin.vue'
import FormCreateAdmin from '@/components/FormCreateAdmin.vue'
import AdminList from '@/components/AdminList.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/login-admin',
      name: 'login',
      component: FormLoginAdmin
    },
    {
      path: '/create-admin',
      name: 'create',
      component: FormCreateAdmin
    },
    {
      path: '/show-all',
      name: 'Show',
      component: AdminList
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    }
  ]
})

export default router
