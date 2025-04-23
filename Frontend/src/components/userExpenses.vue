<script setup>
import { computed, onMounted, ref } from 'vue';
import { useExpensesStore } from '@/stores/expensesStore';

const store = useExpensesStore();
const showAll = ref(false);
const isLoading = ref(false);
const error = ref(null);

// Computed properties
const expenses = computed(() => store.expenses);
const displayedExpenses = computed(() => 
  showAll.value ? expenses.value : expenses.value.slice(-5)
);
const hasMoreExpenses = computed(() => expenses.value.length > 5);
const totalExpenses = computed(() => 
  expenses.value.reduce((sum, expense) => sum + parseFloat(expense.amount), 0)
);

// Fetch expenses with loading and error states
const fetchExpenses = async () => {
  try {
    isLoading.value = true;
    error.value = null;
    await store.fetchExpenses();
  } catch (err) {
    error.value = 'Failed to load expenses. Please try again.';
    console.error('Error fetching expenses:', err);
  } finally {
    isLoading.value = false;
  }
};

onMounted(fetchExpenses);
</script>

<template>
  <div class="p-6 bg-white rounded-xl shadow-md max-w-md mx-auto">
    <div class="flex justify-between items-center mb-6">
      <h2 class="text-xl font-bold text-gray-800">Expense Tracker</h2>
      <div class="text-sm font-medium text-gray-600">
        Total: <span class="text-indigo-600">{{ totalExpenses.toFixed(2) }} KSH</span>
      </div>
    </div>

    <!-- Loading state -->
    <div v-if="isLoading" class="flex justify-center py-8">
      <div class="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-500"></div>
    </div>

    <!-- Error state -->
    <div v-else-if="error" class="bg-red-50 text-red-600 p-4 rounded-lg mb-4 text-center">
      {{ error }}
      <button 
        @click="fetchExpenses"
        class="mt-2 text-sm bg-red-100 hover:bg-red-200 px-3 py-1 rounded-md"
      >
        Retry
      </button>
    </div>

    <!-- Empty state -->
    <div v-else-if="expenses.length === 0" class="text-center py-8">
      <div class="text-gray-500 mb-2">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2z" />
        </svg>
      </div>
      <p class="text-gray-600">No expenses recorded yet</p>
      <p class="text-sm text-gray-500 mt-1">Add your first expense to get started</p>
    </div>

    <!-- Expenses list -->
    <div v-else>
      <ul class="divide-y divide-gray-100">
        <li 
          v-for="expense in displayedExpenses" 
          :key="expense.id" 
          class="py-3 flex justify-between items-center hover:bg-gray-50 px-2 rounded"
        >
          <div class="flex items-center space-x-3">
            <div class="bg-indigo-100 p-2 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <span class="text-gray-700">{{ expense.name }}</span>
          </div>
          <span class="font-medium text-gray-900">{{ parseFloat(expense.amount).toFixed(2) }} KSH</span>
        </li>
      </ul>

      <!-- Show more/less toggle -->
      <div v-if="hasMoreExpenses" class="mt-4 text-center">
        <button
          @click="showAll = !showAll"
          class="text-indigo-600 hover:text-indigo-800 text-sm font-medium focus:outline-none"
        >
          {{ showAll ? 'Show less' : `Show all (${expenses.length})` }}
        </button>
      </div>
    </div>
  </div>
</template>