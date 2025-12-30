<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import navigationBar from '@/components/navigationBar.vue';
import chart from '@/components/chart.vue';
import userExpenses from '@/components/userExpenses.vue';
import { useUserStore } from '@/stores/userStore';
import { useExpensesStore } from '@/stores/expensesStore';
import receiptScanner from '@/components/receiptScanner.vue';

const userStore = useUserStore();
const expensesStore = useExpensesStore();
const router = useRouter();
const date = ref('');
const amount = ref('');
const name = ref('');
const category = ref('');
const showForm = ref(false);

const handleReceiptScanned = (receiptData) => {
  name.value = receiptData.merchant || '';
  amount.value = receiptData.amount || '';
  category.value = receiptData.category || '';
  date.value = receiptData.date || date.value;
  showForm.value = true;
};
const addNewExpense = async () => {
  if (!date.value || !amount.value || !category.value || !name.value) {
    alert("Please fill all fields");
    return;
  }
  try {
    await expensesStore.addExpense(
        name.value.trim(),
        parseFloat(amount.value),
        category.value,
        date.value
    );
    name.value = '';
    amount.value = '';
    category.value = '';
    date.value = '';
    showForm.value = false;
  } catch (error) {
    console.error("Error adding expense:", error);
    alert("Failed to add expense. Please try again.");
  }
};
onMounted(() => {
  const today = new Date();
  date.value = today.toISOString().split('T')[0];
});
</script>
<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 via-white to-green-50">
    <navigationBar />
    <header class="bg-white border-b border-gray-100 sticky top-0 z-10 backdrop-blur-sm bg-white/90 mt-16">
      <div class="max-w-6xl mx-auto px-4 py-4 flex items-center gap-4">
        <RouterLink to="/dashboard" class="p-2 hover:bg-gray-100 rounded-lg transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </RouterLink>
        <div class="flex-1">
          <h1 class="text-xl font-semibold text-gray-900">Expense Tracker</h1>
          <p class="text-sm text-gray-500">Manage your spending</p>
        </div>
      </div>
    </header>

    <main class="max-w-6xl mx-auto px-4 py-6 space-y-6">
      <receiptScanner :onReceiptScanned="handleReceiptScanned" />
      <div v-if="!showForm" class="text-center">
        <button
            @click="showForm = true"
            class="w-full bg-white hover:bg-gray-50 border-2 border-dashed border-gray-300 hover:border-green-600 text-gray-600 hover:text-green-600 font-medium py-4 rounded-2xl transition-all flex items-center justify-center gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd" />
          </svg>
          <span>Add Expense Manually</span>
        </button>
      </div>
      <transition
          enter-active-class="transition ease-out duration-200"
          enter-from-class="opacity-0 scale-95"
          enter-to-class="opacity-100 scale-100"
          leave-active-class="transition ease-in duration-150"
          leave-from-class="opacity-100 scale-100"
          leave-to-class="opacity-0 scale-95"
      >
        <section v-if="showForm" class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div class="flex items-center justify-between mb-6">
            <h2 class="text-lg font-semibold text-gray-900">New Expense</h2>
            <button
                @click="showForm = false"
                class="text-gray-400 hover:text-gray-600 p-1 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
              </svg>
            </button>
          </div>
          <form @submit.prevent="addNewExpense" class="space-y-4">
            <div>
              <label for="expense-name" class="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <input
                  id="expense-name"
                  v-model="name"
                  type="text"
                  class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all"
                  placeholder="e.g. Groceries"
                  required
              >
            </div>
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label for="expense-amount" class="block text-sm font-medium text-gray-700 mb-2">
                  Amount (Ksh)
                </label>
                <input
                    id="expense-amount"
                    v-model="amount"
                    type="number"
                    min="0"
                    step="0.01"
                    class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all"
                    placeholder="0.00"
                    required
                >
              </div>
              <div>
                <label for="expense-date" class="block text-sm font-medium text-gray-700 mb-2">
                  Date
                </label>
                <input
                    id="expense-date"
                    v-model="date"
                    type="date"
                    class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all bg-white"
                    required
                >
              </div>
            </div>
            <div>
              <label for="expense-category" class="block text-sm font-medium text-gray-700 mb-2">
                Category
              </label>
              <select
                  id="expense-category"
                  v-model="category"
                  class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all bg-white appearance-none cursor-pointer"
                  required
              >
                <option value="" disabled>Select category</option>
                <option value="Food">Food</option>
                <option value="Transportation">Transportation</option>
                <option value="Utilities">Utilities</option>
                <option value="Black Tax">Black Tax</option>
                <option value="Shopping">Shopping</option>
                <option value="Outings">Outings</option>
              </select>
            </div>
            <button
                type="submit"
                class="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 rounded-xl transition-colors shadow-sm hover:shadow-md"
            >
              Save Expense
            </button>
          </form>
        </section>
      </transition>
      <section class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <div class="flex items-center gap-3 mb-4">
          <div class="p-2 bg-blue-100 rounded-lg">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
              <path stroke-linecap="round" stroke-linejoin="round" d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
            </svg>
          </div>
          <h2 class="text-lg font-semibold text-gray-900">Expense Breakdown</h2>
        </div>
        <chart />
      </section>
      <section class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <div class="flex items-center gap-3 mb-4">
          <div class="p-2 bg-green-100 rounded-lg">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
          </div>
          <h2 class="text-lg font-semibold text-gray-900">Recent Expenses</h2>
        </div>
        <userExpenses />
      </section>
    </main>
  </div>
</template>

<style scoped>
input[type="date"]::-webkit-calendar-picker-indicator {
  cursor: pointer;
  opacity: 0.6;
}
input[type="date"]::-webkit-calendar-picker-indicator:hover {
  opacity: 1;
}
select {
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e");
  background-position: right 0.75rem center;
  background-repeat: no-repeat;
  background-size: 1.5em 1.5em;
  padding-right: 2.5rem;
}
.transition-all {
  transition: all 0.2s ease;
}
</style>