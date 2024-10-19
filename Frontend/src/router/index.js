import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from '@/views/Dashboard.vue'
import Register from '@/views/Register.vue'
import Login from '@/views/Login.vue'
import Expenses from '@/views/Expenses.vue'
import Savings from '@/views/Savings.vue'
import Targets from '@/views/Targets.vue'
import Profile from '@/views/Profile.vue'
import { useStore } from '@/stores/useStore'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/dashboard',
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
router.beforeEach((to, from, next) => {
  const store = useStore();

  // Redirect to login if user is not logged in and trying to access a protected page
  if (!store.user && to.name !== 'login' && to.name !== 'register') {
    next({ name: 'login' });
  } else {
    next();
  }
});

export default router
