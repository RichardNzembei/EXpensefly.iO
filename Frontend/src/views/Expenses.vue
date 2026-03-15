<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import navigationBar from '@/components/navigationBar.vue';
import chart from '@/components/chart.vue';
import userExpenses from '@/components/userExpenses.vue';
import { useUserStore } from '@/stores/userStore';
import { useExpensesStore } from '@/stores/expensesStore';
import receiptScanner from '@/components/receiptScanner.vue';
import { useToast } from '@/composables/useToast';

const userStore = useUserStore();
const expensesStore = useExpensesStore();
const router = useRouter();
const route = useRoute();
const { error: toastError } = useToast();

const isGuest = computed(() => !userStore.user);
const date = ref('');
const amount = ref('');
const name = ref('');
const category = ref('');
const showForm = ref(false);

const handleReceiptScanned = (receiptData) => {
  if (isGuest.value) { router.push('/login'); return; }
  name.value = receiptData.merchant || '';
  amount.value = receiptData.amount || '';
  category.value = receiptData.category || '';
  date.value = receiptData.date || date.value;
  showForm.value = true;
};

const addNewExpense = async () => {
  if (!date.value || !amount.value || !category.value || !name.value) {
    toastError("Please fill all fields");
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
  } catch (err) {
    console.error("Error adding expense:", err);
    toastError("Failed to add expense. Please try again.");
  }
};

onMounted(() => {
  const today = new Date();
  date.value = today.toISOString().split('T')[0];
  if (route.query.add === 'true' && !isGuest.value) {
    showForm.value = true;
  }
});
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <navigationBar />
    <main class="max-w-5xl mx-auto px-4 sm:px-6 pt-16 pb-20 md:pb-6 space-y-4">
      <div class="pt-4">
        <h1 class="text-xl font-semibold text-gray-900">Expense Tracker</h1>
        <p class="text-sm text-gray-500 mt-0.5">Manage your spending</p>
      </div>

      <!-- Guest CTA -->
      <div v-if="isGuest" class="card p-6 text-center">
        <svg class="h-12 w-12 mx-auto text-emerald-400 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
        <h3 class="text-lg font-semibold text-gray-900 mb-1">Sign in to track expenses</h3>
        <p class="text-sm text-gray-500 mb-4">Create an account to add, scan receipts, and manage your spending.</p>
        <RouterLink to="/login" class="btn-primary inline-block text-sm">Sign In to Get Started</RouterLink>
      </div>

      <!-- Receipt scanner (auth only) -->
      <receiptScanner v-if="!isGuest" :onReceiptScanned="handleReceiptScanned" />

      <!-- Add button (auth only) -->
      <div v-if="!showForm && !isGuest">
        <button
          @click="showForm = true"
          class="w-full bg-white hover:bg-gray-50 border-2 border-dashed border-gray-200 hover:border-emerald-400 text-gray-500 hover:text-emerald-600 font-medium py-4 rounded-xl transition-all flex items-center justify-center gap-2"
        >
          <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
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
        <section v-if="showForm && !isGuest" class="card p-5">
          <div class="flex items-center justify-between mb-4">
            <h2 class="text-base font-semibold text-gray-900">New Expense</h2>
            <button @click="showForm = false" class="text-gray-400 hover:text-gray-600 p-1 rounded-lg hover:bg-gray-100 transition-colors">
              <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
              </svg>
            </button>
          </div>
          <form @submit.prevent="addNewExpense" class="space-y-4">
            <div>
              <label for="expense-name" class="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <input id="expense-name" v-model="name" type="text" class="input-field" placeholder="e.g. Groceries" required>
            </div>
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label for="expense-amount" class="block text-sm font-medium text-gray-700 mb-1">Amount (Ksh)</label>
                <input id="expense-amount" v-model="amount" type="number" min="0" step="0.01" class="input-field" placeholder="0.00" required>
              </div>
              <div>
                <label for="expense-date" class="block text-sm font-medium text-gray-700 mb-1">Date</label>
                <input id="expense-date" v-model="date" type="date" class="input-field" required>
              </div>
            </div>
            <div>
              <label for="expense-category" class="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <select id="expense-category" v-model="category" class="input-field appearance-none cursor-pointer" required>
                <option value="" disabled>Select category</option>
                <option value="Food">Food</option>
                <option value="Transportation">Transportation</option>
                <option value="Utilities">Utilities</option>
                <option value="Black Tax">Black Tax</option>
                <option value="Shopping">Shopping</option>
                <option value="Outings">Outings</option>
              </select>
            </div>
            <button type="submit" class="w-full btn-primary py-3">Save Expense</button>
          </form>
        </section>
      </transition>

      <section class="card p-4">
        <h2 class="text-sm font-semibold text-gray-900 mb-3">Expense Breakdown</h2>
        <chart />
      </section>

      <section class="card p-4">
        <h2 class="text-sm font-semibold text-gray-900 mb-3">Recent Expenses</h2>
        <userExpenses />
      </section>
    </main>
  </div>
</template>

<style scoped>
select {
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e");
  background-position: right 0.75rem center;
  background-repeat: no-repeat;
  background-size: 1.5em 1.5em;
  padding-right: 2.5rem;
}
</style>
