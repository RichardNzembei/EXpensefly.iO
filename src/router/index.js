import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from '@/views/Dashboard.vue'
import Register from '@/views/Register.vue'
import Login from '@/views/Login.vue'
import Expenses from '@/views/Expenses.vue'
import Savings from '@/views/Savings.vue'
import Targets from '@/views/Targets.vue'
import Profile from '@/views/Profile.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: Dashboard
    },
    {
      path: '/register',
      name: 'register',
      component:Register
    },
    {
      path: '/login',
      name: 'login',
      component:Login
    },
    {
      path: '/expenses',
      name: 'expenses',
      component:Expenses
    },
    {
      path: '/savings',
      name: 'savings',
      component:Savings
    },
    {
      path: '/targets',
      name: 'targets',
      component:Targets
    },
    {
      path: '/profile',
      name: 'profile',
      component:Profile
    }
  ]
})

export default router
