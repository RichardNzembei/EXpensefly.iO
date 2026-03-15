<script setup>
import { computed, onMounted, ref } from 'vue';
import { useExpensesStore } from '@/stores/expensesStore';
import { formatKES } from '@/utils/currency';

const store = useExpensesStore();
const showAll = ref(false);
const isLoading = ref(false);
const error = ref(null);
const expenses = computed(() => store.expenses || []);
const displayedExpenses = computed(() =>
    showAll.value ? expenses.value : expenses.value.slice(0, 5)
);
const hasMoreExpenses = computed(() => expenses.value.length > 5);

const categoryIcons = {
  'Food': '🍔',
  'Transportation': '🚗',
  'Utilities': '💡',
  'Black Tax': '👨‍👩‍👧‍👦',
  'Shopping': '🛍️',
  'Outings': '🎉'
};

const categoryColors = {
  'Food': 'bg-emerald-50 text-emerald-700',
  'Transportation': 'bg-gray-100 text-gray-700',
  'Utilities': 'bg-emerald-50 text-emerald-600',
  'Black Tax': 'bg-gray-100 text-gray-800',
  'Shopping': 'bg-emerald-50 text-emerald-800',
  'Outings': 'bg-gray-100 text-gray-600'
};

const fetchExpenses = async () => {
  try {
    isLoading.value = true;
    error.value = null;
    await store.fetchExpenses();
  } catch (err) {
    error.value = 'Failed to load expenses';
  } finally {
    isLoading.value = false;
  }
};

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  if (date.toDateString() === today.toDateString()) return 'Today';
  if (date.toDateString() === yesterday.toDateString()) return 'Yesterday';
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
};

onMounted(fetchExpenses);
</script>

<template>
  <div>
    <div v-if="isLoading" class="flex justify-center py-8">
      <div class="w-8 h-8 border-2 border-emerald-600 border-t-transparent rounded-full animate-spin"></div>
    </div>
    <div v-else-if="error" class="text-center py-8">
      <p class="text-red-500 text-sm mb-2">{{ error }}</p>
      <button @click="fetchExpenses" class="text-sm text-red-700 bg-red-50 hover:bg-red-100 px-3 py-1 rounded-lg">Retry</button>
    </div>
    <div v-else-if="expenses.length === 0" class="text-center py-8">
      <p class="text-sm text-gray-400">No expenses yet</p>
      <p class="text-xs text-gray-300 mt-0.5">Add your first expense to get started</p>
    </div>
    <div v-else class="space-y-2">
      <div
        v-for="expense in displayedExpenses"
        :key="expense.id"
        class="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 transition-colors"
      >
        <div class="flex items-center gap-3 flex-1 min-w-0">
          <span
            :class="categoryColors[expense.category] || 'bg-gray-100 text-gray-700'"
            class="inline-flex items-center justify-center w-9 h-9 rounded-lg text-base"
          >
            {{ categoryIcons[expense.category] || '📝' }}
          </span>
          <div class="flex-1 min-w-0">
            <p class="text-sm font-medium text-gray-900 truncate">{{ expense.name }}</p>
            <div class="flex items-center gap-2 mt-0.5">
              <span
                :class="categoryColors[expense.category] || 'bg-gray-100 text-gray-700'"
                class="text-[10px] px-1.5 py-0.5 rounded font-medium"
              >
                {{ expense.category }}
              </span>
              <span class="text-[10px] text-gray-400">{{ formatDate(expense.date) }}</span>
            </div>
          </div>
        </div>
        <p class="text-sm font-semibold text-gray-900 ml-3">{{ formatKES(parseFloat(expense.amount)) }}</p>
      </div>
      <div v-if="hasMoreExpenses" class="text-center pt-1">
        <button
          @click="showAll = !showAll"
          class="text-emerald-600 hover:text-emerald-700 font-medium text-xs px-3 py-1.5 rounded-lg hover:bg-emerald-50 transition-colors"
        >
          {{ showAll ? 'Show Less' : `Show All (${expenses.length})` }}
        </button>
      </div>
    </div>
  </div>
</template>
