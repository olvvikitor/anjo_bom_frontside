import { createRouter, createWebHistory } from 'vue-router'
import FormLoginAdmin from '@/components/FormLoginAdmin.vue'
import FormCreateAdmin from '@/components/FormCreateAdmin.vue'
import AdminList from '@/components/AdminList.vue'
import FormLoginUser from '@/components/FormLoginUser.vue'
import CreateEvent from '@/components/CreateEvent.vue'
import ListEvents from '@/components/ListEvents.vue'
import Payment from '@/components/Payment.vue'
import ShowAllPix from '@/components/ShowAllPix.vue'
import FormCreateEvent from '@/components/FormCreateEvent.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/admin/login',
      name: 'loginAdmin',
      component: FormLoginAdmin
    },
    {
      path: '/create-admin',
      name: 'createAdmin',
      component: FormCreateAdmin
    },
    {
      path: '/admin/show-all',
      name: 'ShowAllAdmins',
      component: AdminList
    },
    {
      path: '/admin/create-evento',
      name: 'createEvento',
      component: CreateEvent
    },
    {
      path: '/admin/list-events',
      name: 'ShowListEvents',
      component: ListEvents
    },
    {
      path: '/donor/login',
      name: 'DonorLogin',
      component: FormLoginUser
    },
    {
      path: '/payment',
      name: 'Payment',
      component: Payment
    },
    {
      path: '/admin/show-donates',
      name: 'Donates',
      component: ShowAllPix
    },
    {
      path: '/criarEvento',
      name: 'criarEvento',
      component: FormCreateEvent
    }
  ]
})

export default router
