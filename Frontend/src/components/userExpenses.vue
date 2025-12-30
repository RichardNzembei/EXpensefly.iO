<script setup>
import { computed, onMounted, ref } from 'vue';
import { useExpensesStore } from '@/stores/expensesStore';

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
  'Food': 'bg-orange-100 text-orange-700 border-orange-200',
  'Transportation': 'bg-blue-100 text-blue-700 border-blue-200',
  'Utilities': 'bg-yellow-100 text-yellow-700 border-yellow-200',
  'Black Tax': 'bg-purple-100 text-purple-700 border-purple-200',
  'Shopping': 'bg-pink-100 text-pink-700 border-pink-200',
  'Outings': 'bg-green-100 text-green-700 border-green-200'
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

  if (date.toDateString() === today.toDateString()) {
    return 'Today';
  } else if (date.toDateString() === yesterday.toDateString()) {
    return 'Yesterday';
  } else {
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  }
};

onMounted(fetchExpenses);
</script>
<template>
  <div>
    <div v-if="isLoading" class="flex justify-center py-12">
      <div class="w-12 h-12 border-4 border-green-600 border-t-transparent rounded-full animate-spin"></div>
    </div>
    <div v-else-if="error" class="text-center py-12">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 mx-auto mb-3 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
      </svg>
      <p class="text-red-600 mb-3">{{ error }}</p>
      <button
          @click="fetchExpenses"
          class="px-4 py-2 bg-red-100 hover:bg-red-200 text-red-700 rounded-lg transition-colors"
      >
        Retry
      </button>
    </div>
    <div v-else-if="expenses.length === 0" class="text-center py-12">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 mx-auto mb-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
        <path stroke-linecap="round" stroke-linejoin="round" d="M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2z" />
      </svg>
      <p class="text-gray-600 font-medium mb-1">No expenses yet</p>
      <p class="text-sm text-gray-500">Add your first expense to get started</p>
    </div>
    <div v-else class="space-y-3">
      <div
          v-for="expense in displayedExpenses"
          :key="expense.id"
          class="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors group"
      >
        <div class="flex items-center gap-3 flex-1 min-w-0">
          <div class="flex-shrink-0">
            <span
                :class="categoryColors[expense.category] || 'bg-gray-100 text-gray-700 border-gray-200'"
                class="inline-flex items-center justify-center w-10 h-10 rounded-lg text-lg border"
            >
              {{ categoryIcons[expense.category] || '📝' }}
            </span>
          </div>
          <div class="flex-1 min-w-0">
            <p class="font-medium text-gray-900 truncate">{{ expense.name }}</p>
            <div class="flex items-center gap-2 mt-1">
              <span
                  :class="categoryColors[expense.category] || 'bg-gray-100 text-gray-700'"
                  class="text-xs px-2 py-0.5 rounded-md font-medium"
              >
                {{ expense.category }}
              </span>
              <span class="text-xs text-gray-500">{{ formatDate(expense.date) }}</span>
            </div>
          </div>
        </div>
        <div class="text-right ml-4">
          <p class="text-lg font-semibold text-gray-900">
            Ksh {{ parseFloat(expense.amount).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) }}
          </p>
        </div>
      </div>
      <div v-if="hasMoreExpenses" class="text-center pt-2">
        <button
            @click="showAll = !showAll"
            class="text-green-600 hover:text-green-700 font-medium text-sm px-4 py-2 rounded-lg hover:bg-green-50 transition-colors"
        >
          {{ showAll ? 'Show Less' : `Show All (${expenses.length})` }}
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
@keyframes spin {
  to { transform: rotate(360deg); }
}
.animate-spin {
  animation: spin 1s linear infinite;
}
.group:hover {
  transform: translateX(2px);
}
</style>