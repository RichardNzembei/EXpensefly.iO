import { createRouter, createWebHistory } from 'vue-router';
import Dashboard from '@/views/Dashboard.vue';
import Register from '@/views/Register.vue';
import Login from '@/views/Login.vue';
import Expenses from '@/views/Expenses.vue';
import Savings from '@/views/Savings.vue';
import Targets from '@/views/Targets.vue';
import Profile from '@/views/Profile.vue';
import NotFound from '@/views/NotFound.vue';
import { useUserStore } from '@/stores/userStore';
import Monocomy from '@/views/Monocomy.vue';
import Smmes from '@/views/Smmes.vue';
import Crypto from '@/views/Crypto.vue';
import ExpensesSnipet from '@/components/expensesSnipet.vue';
import TargetsSnipet from '@/components/targetsSnipet.vue';
import SavingsSnipet from '@/components/savingsSnipet.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: Dashboard
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/expenses',
      name: 'expenses',
      component: Expenses
    },
    {
      path: '/savings',
      name: 'savings',
      component: Savings
    },
    {
      path: '/targets',
      name: 'targets',
      component: Targets
    },
    {
      path: '/smmes',
      name: 'smmes',
      component: Smmes
    },
    {
      path: '/crypto',
      name: 'crypto',
      component: Crypto
    },
    {
      path: '/profile',
      name: 'profile',
      component: Profile
    },
    {
      path: '/monocomy',
      name: 'monocomy',
      component: Monocomy
    },
    {
      path: '/expensessnipet',
      name: 'expensessnipet',
      component:ExpensesSnipet
    },
    {
      path: '/targetssnipet',
      name: 'targetssnipet',
      component:TargetsSnipet
    },
    {
      path: '/savingssnipet',
      name: 'savingssnipet',
      component:SavingsSnipet
    },
    {
      path: '/:catchAll(.*)',
      name: 'not-found',
      component: NotFound
    }
  ]
});

router.beforeEach(async (to, from, next) => {
  const userStore = useUserStore();
  await userStore.initializeUser();
  if (!userStore.user && to.name !== 'login' && to.name !== 'register') {
    next({ name: 'login' });
  } else {
    next();
  }
});
export default router;
