<script setup>
import { computed } from 'vue';
import navigationBar from '@/components/navigationBar.vue';
import chart from '@/components/chart.vue';
import BarChart from '@/components/BarChart.vue';
import { useUserStore } from '@/stores/userStore';
import { useExpensesStore } from '@/stores/expensesStore';
import { useSavingsStore } from '@/stores/savingStore';
import { useTargetStore } from '@/stores/targetStore';
import { useAnimatedNumber } from '@/composables/useAnimatedNumber';
import { formatKES } from '@/utils/currency';

const userStore = useUserStore();
const expensesStore = useExpensesStore();
const savingsStore = useSavingsStore();
const targetStore = useTargetStore();

const isGuest = computed(() => !userStore.user);

const netWorth = computed(() => savingsStore.totalSavings + targetStore.totalCompletedAmount);
const animatedNetWorth = useAnimatedNumber(netWorth);

const savingsByMethod = computed(() => savingsStore.savingsByMethod);
const savingsEntries = computed(() => {
  const entries = Object.entries(savingsByMethod.value);
  if (entries.length === 0) return [];
  const max = Math.max(...entries.map(e => e[1]));
  return entries.map(([method, amount]) => ({
    method,
    amount,
    percent: max > 0 ? (amount / max) * 100 : 0
  }));
});

// Monthly spending for last 6 months
const monthlySpending = computed(() => {
  const months = [];
  const labels = [];
  const values = [];
  const now = new Date();
  for (let i = 5; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const month = d.getMonth();
    const year = d.getFullYear();
    const label = d.toLocaleDateString('en-US', { month: 'short' });
    const total = expensesStore.expenses
      .filter(e => {
        const ed = new Date(e.date);
        return ed.getMonth() === month && ed.getFullYear() === year;
      })
      .reduce((sum, e) => sum + (parseFloat(e.amount) || 0), 0);
    labels.push(label);
    values.push(total);
  }
  return { labels, values };
});

const completionRate = computed(() => targetStore.completionRate);
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <navigationBar />
    <div class="max-w-5xl mx-auto px-4 sm:px-6 pt-16 pb-20 md:pb-6">
      <div class="pt-4 pb-2">
        <h1 class="text-xl sm:text-2xl font-semibold text-gray-900">Financial Overview</h1>
        <p class="text-sm text-gray-500 mt-0.5">A snapshot of your financial health</p>
      </div>

      <template v-if="!isGuest">
        <!-- Net Worth -->
        <div class="card p-6 mt-4 text-center">
          <p class="text-xs font-medium text-gray-500 uppercase tracking-wide">Net Worth</p>
          <p class="text-2xl sm:text-3xl font-bold text-gray-900 mt-1">{{ formatKES(animatedNetWorth) }}</p>
          <p class="text-xs text-gray-400 mt-1">Savings + Completed Goals</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <!-- Expense Pie Chart -->
          <div class="card p-4">
            <h2 class="text-sm font-semibold text-gray-900 mb-2">Expense Distribution</h2>
            <chart />
          </div>

          <!-- Monthly Spending Bar Chart -->
          <div class="card p-4">
            <h2 class="text-sm font-semibold text-gray-900 mb-2">Monthly Spending</h2>
            <BarChart :labels="monthlySpending.labels" :values="monthlySpending.values" />
          </div>
        </div>

        <!-- Savings Breakdown -->
        <div class="card p-4 mt-4">
          <h2 class="text-sm font-semibold text-gray-900 mb-3">Savings Breakdown</h2>
          <div v-if="savingsEntries.length > 0" class="space-y-3">
            <div v-for="entry in savingsEntries" :key="entry.method" class="flex items-center gap-3">
              <span class="text-sm text-gray-600 w-20 shrink-0">{{ entry.method }}</span>
              <div class="flex-1 h-3 bg-gray-100 rounded-full overflow-hidden">
                <div class="h-full bg-emerald-500 rounded-full transition-all duration-500" :style="{ width: `${entry.percent}%` }"></div>
              </div>
              <span class="text-sm font-medium text-gray-900 w-28 text-right">{{ formatKES(entry.amount) }}</span>
            </div>
          </div>
          <p v-else class="text-sm text-gray-400 text-center py-4">No savings recorded yet</p>
        </div>

        <!-- Goals Overview -->
        <div class="card p-4 mt-4">
          <div class="flex items-center justify-between mb-3">
            <h2 class="text-sm font-semibold text-gray-900">Goals Overview</h2>
            <span class="text-xs text-gray-500">{{ completionRate }}% completion rate</span>
          </div>
          <div v-if="targetStore.activeTargets.length > 0" class="space-y-3">
            <div v-for="target in targetStore.activeTargets" :key="target.id" class="flex items-center gap-3">
              <div class="flex-1 min-w-0">
                <p class="text-sm font-medium text-gray-900 truncate">{{ target.description }}</p>
                <p class="text-xs text-gray-500">{{ formatKES(parseFloat(target.amount)) }}</p>
              </div>
              <div class="w-20">
                <div class="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div class="h-full bg-emerald-500 rounded-full" :style="{ width: `${target.progress || 0}%` }"></div>
                </div>
              </div>
              <span class="text-xs text-gray-500 w-8 text-right">{{ target.progress || 0 }}%</span>
            </div>
          </div>
          <p v-else class="text-sm text-gray-400 text-center py-4">No active goals</p>
        </div>
      </template>

      <!-- Guest -->
      <template v-else>
        <div class="card p-6 mt-6 text-center">
          <svg class="w-12 h-12 mx-auto text-emerald-400 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
          <h3 class="text-lg font-semibold text-gray-900 mb-1">Sign in for your financial overview</h3>
          <p class="text-sm text-gray-500 mb-4">View charts, savings breakdowns, and track your progress.</p>
          <RouterLink to="/login" class="btn-primary text-sm inline-block">Sign In</RouterLink>
        </div>
      </template>
    </div>
  </div>
</template>
