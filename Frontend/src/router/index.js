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
import Investments from '@/views/Investments.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/dashboard'
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: Dashboard,
      meta: { public: true }
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
      meta: { public: true }
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: { public: true }
    },
    {
      path: '/expenses',
      name: 'expenses',
      component: Expenses,
      meta: { guestViewable: true }
    },
    {
      path: '/savings',
      name: 'savings',
      component: Savings,
      meta: { guestViewable: true }
    },
    {
      path: '/targets',
      name: 'targets',
      component: Targets,
      meta: { guestViewable: true }
    },
    {
      path: '/smmes',
      name: 'smmes',
      component: Smmes,
      meta: { public: true }
    },
    {
      path: '/crypto',
      name: 'crypto',
      component: Crypto,
      meta: { public: true }
    },
    {
      path: '/profile',
      name: 'profile',
      component: Profile,
      meta: { requiresAuth: true }
    },
    {
      path: '/monocomy',
      name: 'monocomy',
      component: Monocomy,
      meta: { public: true }
    },
    {
      path: '/expensessnipet',
      name: 'expensessnipet',
      component: ExpensesSnipet
    },
    {
      path: '/targetssnipet',
      name: 'targetssnipet',
      component: TargetsSnipet
    },
    {
      path: '/savingssnipet',
      name: 'savingssnipet',
      component: SavingsSnipet
    },
    {
      path: '/:catchAll(.*)',
      name: 'not-found',
      component: NotFound
    },
    {
      path: '/investments',
      name: 'investments',
      component: Investments,
      meta: { public: true }
    }
  ]
});

router.beforeEach(async (to, from, next) => {
  const userStore = useUserStore();
  await userStore.initializeUser();

  if (to.meta.requiresAuth && !userStore.user) {
    next({ name: 'login' });
  } else {
    next();
  }
});

export default router;
