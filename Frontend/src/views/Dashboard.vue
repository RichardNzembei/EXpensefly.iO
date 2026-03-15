<script setup>
import navigationBar from '@/components/navigationBar.vue';
import footerBar from '@/components/footerBar.vue';
import SpendingChart from '@/components/SpendingChart.vue';
import SkeletonCard from '@/components/SkeletonCard.vue';
import StreakBadge from '@/components/StreakBadge.vue';
import userExpenses from '@/components/userExpenses.vue';
import { ref, computed, onMounted } from 'vue';
import { useUserStore } from '@/stores/userStore';
import { useExpensesStore } from '@/stores/expensesStore';
import { useSavingsStore } from '@/stores/savingStore';
import { useTargetStore } from '@/stores/targetStore';
import { useRouter } from 'vue-router';
import { useAnimatedNumber } from '@/composables/useAnimatedNumber';
import { formatKES } from '@/utils/currency';

const userStore = useUserStore();
const expensesStore = useExpensesStore();
const savingsStore = useSavingsStore();
const targetStore = useTargetStore();
const router = useRouter();

const isGuest = computed(() => !userStore.user);
const hasData = expensesStore.expenses.length > 0 || savingsStore.savings.length > 0 || targetStore.activeTargets.length > 0;
const isLoading = ref(!hasData);

const firstName = computed(() => {
  if (!userStore.user) return '';
  const name = userStore.user.first_name || '';
  return name.charAt(0).toUpperCase() + name.slice(1);
});

const greeting = computed(() => {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 17) return 'Good afternoon';
  return 'Good evening';
});

const currentMonth = computed(() => {
  return new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
});

const monthlySpend = computed(() => expensesStore.monthlyTotal);
const totalSavings = computed(() => savingsStore.totalSavings);
const activeGoalsCount = computed(() => targetStore.activeTargets.length);
const goalsValue = computed(() => targetStore.totalActiveAmount);

const animatedSpend = useAnimatedNumber(monthlySpend);
const animatedSavings = useAnimatedNumber(totalSavings);
const animatedGoalsValue = useAnimatedNumber(goalsValue);

const monthlyChange = computed(() => expensesStore.monthlyChange);
const spendingData = computed(() => expensesStore.dailyTotals);

const topGoals = computed(() => targetStore.activeTargets.slice(0, 2));

const handleFab = () => {
  if (isGuest.value) {
    router.push('/login');
  } else {
    router.push('/expenses?add=true');
  }
};

onMounted(() => {
  setTimeout(() => { isLoading.value = false; }, 600);
});
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <navigationBar />
    <div class="max-w-5xl mx-auto px-4 sm:px-6 pt-16 pb-20 md:pb-6">

      <!-- Authenticated Dashboard -->
      <template v-if="!isGuest">
        <!-- Greeting -->
        <div class="pt-4 pb-2 flex items-center justify-between">
          <div>
            <h1 class="text-xl sm:text-2xl font-semibold text-gray-900">{{ greeting }}, {{ firstName }}</h1>
            <p class="text-sm text-gray-500 mt-0.5">{{ currentMonth }}</p>
          </div>
          <StreakBadge />
        </div>

        <!-- Stat Cards -->
        <div class="grid grid-cols-2 lg:grid-cols-4 gap-3 mt-4">
          <template v-if="isLoading">
            <SkeletonCard v-for="i in 4" :key="i" />
          </template>
          <template v-else>
            <div class="card p-4">
              <p class="text-xs font-medium text-gray-500">Monthly Spend</p>
              <p class="text-lg sm:text-xl font-bold text-gray-900 mt-1">{{ formatKES(animatedSpend) }}</p>
              <span
                v-if="monthlyChange !== 0"
                class="inline-flex items-center mt-2 text-xs font-medium px-1.5 py-0.5 rounded-full"
                :class="monthlyChange > 0 ? 'bg-amber-50 text-amber-700' : 'bg-emerald-50 text-emerald-700'"
              >
                {{ monthlyChange > 0 ? '+' : '' }}{{ monthlyChange }}% vs last month
              </span>
            </div>
            <div class="card p-4">
              <p class="text-xs font-medium text-gray-500">Total Savings</p>
              <p class="text-lg sm:text-xl font-bold text-gray-900 mt-1">{{ formatKES(animatedSavings) }}</p>
            </div>
            <div class="card p-4">
              <p class="text-xs font-medium text-gray-500">Active Goals</p>
              <p class="text-lg sm:text-xl font-bold text-gray-900 mt-1">{{ activeGoalsCount }}</p>
            </div>
            <div class="card p-4">
              <p class="text-xs font-medium text-gray-500">Goals Value</p>
              <p class="text-lg sm:text-xl font-bold text-gray-900 mt-1">{{ formatKES(animatedGoalsValue) }}</p>
            </div>
          </template>
        </div>

        <!-- Monthly Comparison Banner -->
        <div
          v-if="!isLoading && monthlyChange !== 0"
          class="mt-4 card px-4 py-3 flex items-center gap-2"
          :class="monthlyChange < 0 ? 'border-emerald-100' : 'border-amber-100'"
        >
          <svg v-if="monthlyChange < 0" class="w-5 h-5 text-emerald-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
          </svg>
          <svg v-else class="w-5 h-5 text-amber-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
          </svg>
          <p class="text-sm" :class="monthlyChange < 0 ? 'text-emerald-700' : 'text-amber-700'">
            You've spent {{ Math.abs(monthlyChange) }}% {{ monthlyChange < 0 ? 'less' : 'more' }} than last month
          </p>
        </div>

        <!-- Spending Trend -->
        <div v-if="!isLoading" class="card p-4 mt-4">
          <h2 class="text-sm font-semibold text-gray-900 mb-3">Spending Trend (30 days)</h2>
          <SpendingChart :data="spendingData" />
        </div>

        <!-- Recent Transactions -->
        <div v-if="!isLoading" class="card p-4 mt-4">
          <div class="flex items-center justify-between mb-3">
            <h2 class="text-sm font-semibold text-gray-900">Recent Transactions</h2>
            <RouterLink to="/expenses" class="text-xs text-emerald-600 hover:text-emerald-700 font-medium">See all &rarr;</RouterLink>
          </div>
          <userExpenses />
        </div>

        <!-- Goal Progress -->
        <div v-if="!isLoading && topGoals.length > 0" class="card p-4 mt-4">
          <div class="flex items-center justify-between mb-3">
            <h2 class="text-sm font-semibold text-gray-900">Goal Progress</h2>
            <RouterLink to="/targets" class="text-xs text-emerald-600 hover:text-emerald-700 font-medium">See all &rarr;</RouterLink>
          </div>
          <div class="space-y-3">
            <div v-for="goal in topGoals" :key="goal.id" class="flex items-center gap-3">
              <div class="flex-1 min-w-0">
                <p class="text-sm font-medium text-gray-900 truncate">{{ goal.description }}</p>
                <p class="text-xs text-gray-500">{{ formatKES(parseFloat(goal.amount)) }}</p>
              </div>
              <div class="w-24">
                <div class="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div class="h-full bg-emerald-500 rounded-full" :style="{ width: `${goal.progress || 0}%` }"></div>
                </div>
              </div>
              <span class="text-xs text-gray-500 w-8 text-right">{{ goal.progress || 0 }}%</span>
            </div>
          </div>
        </div>
      </template>

      <!-- Guest Dashboard -->
      <template v-else>
        <div class="pt-6 pb-2">
          <h1 class="text-xl sm:text-2xl font-semibold text-gray-900">Welcome to ExpenseFly.io</h1>
          <p class="text-sm text-gray-500 mt-1">Your personal finance companion</p>
        </div>

        <!-- Placeholder stat cards -->
        <div class="grid grid-cols-2 lg:grid-cols-4 gap-3 mt-4">
          <div class="card p-4" v-for="label in ['Monthly Spend', 'Total Savings', 'Active Goals', 'Goals Value']" :key="label">
            <p class="text-xs font-medium text-gray-500">{{ label }}</p>
            <p class="text-lg font-bold text-gray-300 mt-1">&mdash;</p>
          </div>
        </div>

        <!-- CTA Card -->
        <div class="card p-6 mt-6 text-center">
          <svg class="w-12 h-12 mx-auto text-emerald-400 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 class="text-lg font-semibold text-gray-900 mb-1">Start tracking your finances</h3>
          <p class="text-sm text-gray-500 mb-4">Sign in to track expenses, set savings goals, and gain financial insights.</p>
          <div class="flex items-center justify-center gap-3">
            <RouterLink to="/login" class="btn-primary text-sm">Sign In</RouterLink>
            <RouterLink to="/register" class="btn-secondary text-sm">Register</RouterLink>
          </div>
        </div>

        <!-- Education links -->
        <div class="grid grid-cols-3 gap-3 mt-6">
          <RouterLink to="/monocomy" class="card p-3 text-center hover:border-emerald-200 transition-colors">
            <p class="text-xs font-medium text-gray-700">Personal Finance</p>
          </RouterLink>
          <RouterLink to="/smmes" class="card p-3 text-center hover:border-emerald-200 transition-colors">
            <p class="text-xs font-medium text-gray-700">Small Business</p>
          </RouterLink>
          <RouterLink to="/crypto" class="card p-3 text-center hover:border-emerald-200 transition-colors">
            <p class="text-xs font-medium text-gray-700">Digital Assets</p>
          </RouterLink>
        </div>
      </template>

      <footerBar />
    </div>

    <!-- Quick-Add FAB -->
    <button
      @click="handleFab"
      class="fixed bottom-20 md:bottom-6 right-4 w-14 h-14 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all flex items-center justify-center z-40"
      aria-label="Add expense"
    >
      <svg class="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
        <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
      </svg>
    </button>
  </div>
</template>
