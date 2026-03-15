<template>
  <div class="min-h-screen bg-gray-50">
    <navigationBar />
    <div class="max-w-5xl mx-auto px-4 sm:px-6 pt-16 pb-20 md:pb-6">
      <div class="pt-4 pb-2">
        <h1 class="text-xl font-semibold text-gray-900">My Savings</h1>
        <p class="text-sm text-gray-500 mt-0.5">Track and manage your savings across different methods</p>
      </div>

      <!-- Guest CTA -->
      <div v-if="isGuest" class="card p-6 text-center mt-4">
        <svg class="h-12 w-12 mx-auto text-emerald-400 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
        <h3 class="text-lg font-semibold text-gray-900 mb-1">Sign in to start saving</h3>
        <p class="text-sm text-gray-500 mb-4">Track your savings across M-Shwari, Bank, Crypto, and more.</p>
        <RouterLink to="/login" class="btn-primary inline-block text-sm">Sign In to Get Started</RouterLink>
      </div>

      <!-- Toggle button for form (auth only) -->
      <div v-if="!isGuest" class="flex justify-end mt-4">
        <button
          @click="showForm = !showForm"
          class="btn-primary text-sm py-2 px-4"
        >
          {{ showForm ? 'Cancel' : 'Add Savings' }}
        </button>
      </div>

      <!-- Add Savings Form -->
      <transition
        enter-active-class="transition ease-out duration-200"
        enter-from-class="opacity-0 scale-95"
        enter-to-class="opacity-100 scale-100"
        leave-active-class="transition ease-in duration-150"
        leave-from-class="opacity-100 scale-100"
        leave-to-class="opacity-0 scale-95"
      >
        <section v-if="showForm && !isGuest" class="card p-5 mt-4">
          <h2 class="text-base font-semibold text-gray-900 mb-4">Add Savings Details</h2>
          <form @submit.prevent="addSavings" class="space-y-4">
            <div>
              <label for="savingsMethod" class="block text-sm font-medium text-gray-700 mb-1">Savings Method</label>
              <select v-model="savingsMethod" class="input-field" required>
                <option disabled value="">Select savings method</option>
                <option value="M-Shwari">M-Shwari</option>
                <option value="Bank">Bank</option>
                <option value="Crypto">Crypto</option>
                <option value="SMMEs">SMMEs</option>
              </select>
            </div>
            <div>
              <label for="savingsDate" class="block text-sm font-medium text-gray-700 mb-1">Date</label>
              <input type="date" v-model="savingsDate" :max="new Date().toISOString().split('T')[0]" class="input-field" required>
            </div>
            <div>
              <label for="savingsAmount" class="block text-sm font-medium text-gray-700 mb-1">Amount (KSH)</label>
              <input type="number" v-model.number="savingsAmount" min="1" step="0.01" class="input-field" placeholder="Enter amount" required>
            </div>
            <div>
              <label for="savingsDuration" class="block text-sm font-medium text-gray-700 mb-1">Duration (months)</label>
              <input type="number" v-model.number="savingsDuration" min="1" class="input-field" placeholder="Enter duration" required>
            </div>
            <div v-if="formError" class="text-red-500 text-sm">{{ formError }}</div>
            <button type="submit" class="w-full btn-primary py-3" :disabled="loading">
              <span v-if="!loading">Add Savings</span>
              <span v-else class="flex items-center justify-center">
                <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                Saving...
              </span>
            </button>
          </form>
        </section>
      </transition>

      <!-- Savings Summary Cards -->
      <div class="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4">
        <div
          v-for="method in savingsMethods"
          :key="method.value"
          class="card p-3 cursor-pointer hover:border-emerald-200 transition-colors"
          @click="filterByMethod(method.value)"
          :class="{ 'border-emerald-400': activeFilter === method.value }"
        >
          <div class="flex items-center gap-2">
            <img :src="method.icon" :alt="method.label" class="h-6 w-6" />
            <div>
              <h3 class="text-xs font-medium text-gray-500">{{ method.label }}</h3>
              <p class="text-sm font-bold text-gray-900">{{ formatKES(getTotalByMethod(method.value)) }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- All Savings List -->
      <section class="card p-4 mt-4">
        <div class="flex justify-between items-center mb-3">
          <h2 class="text-sm font-semibold text-gray-900">
            {{ activeFilter ? `${activeFilter} Savings` : 'All Savings' }}
          </h2>
          <button v-if="activeFilter" @click="clearFilter" class="text-xs text-emerald-600 hover:text-emerald-800">
            Clear filter
          </button>
        </div>
        <div v-if="filteredSavings.length > 0" class="space-y-3">
          <div v-for="saving in filteredSavings" :key="saving.id" class="p-3 border border-gray-100 rounded-xl hover:bg-gray-50 transition-colors">
            <div class="flex items-start gap-3">
              <img :src="getIcon(saving.method)" :alt="saving.method" class="h-8 w-8 shrink-0" />
              <div class="flex-grow min-w-0">
                <div class="flex justify-between items-start">
                  <h3 class="text-sm font-bold text-gray-900">{{ formatKES(saving.amount) }}</h3>
                  <span class="bg-emerald-50 text-emerald-700 text-xs px-2 py-0.5 rounded-full">{{ saving.method }}</span>
                </div>
                <div class="flex items-center gap-3 mt-1 text-xs text-gray-500">
                  <span>{{ formatDate(saving.date) }}</span>
                  <span>{{ saving.duration }} months</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-else class="text-center py-8">
          <p class="text-sm text-gray-400">
            {{ isGuest ? 'Sign in to start tracking your savings' : (activeFilter ? `No ${activeFilter} savings found` : 'No savings recorded yet') }}
          </p>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useSavingsStore } from '@/stores/savingStore';
import { useUserStore } from '@/stores/userStore';
import navigationBar from '@/components/navigationBar.vue';
import { formatKES } from '@/utils/currency';

import cryptoIcon from '../assets/icons/cryptocurrencies.png';
import mShwariIcon from '../assets/icons/mobile-banking (1).png';
import bankIcon from '../assets/icons/mobile-banking.png';
import smmesIcon from '../assets/icons/money-bag.png';

const savingsStore = useSavingsStore();
const userStore = useUserStore();
const isGuest = computed(() => !userStore.user);
const showForm = ref(false);
const loading = ref(false);
const formError = ref('');
const activeFilter = ref('');

const savingsMethod = ref('');
const savingsDate = ref('');
const savingsAmount = ref('');
const savingsDuration = ref('');

const savingsMethods = [
  { value: 'M-Shwari', label: 'M-Shwari', icon: mShwariIcon },
  { value: 'Bank', label: 'Bank', icon: bankIcon },
  { value: 'Crypto', label: 'Crypto', icon: cryptoIcon },
  { value: 'SMMEs', label: 'SMMEs', icon: smmesIcon },
];

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
};

const getIcon = (method) => savingsMethods.find(m => m.value === method)?.icon || '';

const getTotalByMethod = (method) => {
  return savingsStore.savings.filter(s => s.method === method).reduce((sum, saving) => sum + saving.amount, 0);
};

const filteredSavings = computed(() => {
  if (!activeFilter.value) return savingsStore.savings;
  return savingsStore.savings.filter(s => s.method === activeFilter.value);
});

const filterByMethod = (method) => { activeFilter.value = activeFilter.value === method ? '' : method; };
const clearFilter = () => { activeFilter.value = ''; };

async function addSavings() {
  if (!savingsMethod.value || !savingsDate.value || !savingsAmount.value || !savingsDuration.value) {
    formError.value = 'Please fill all fields'; return;
  }
  if (parseFloat(savingsAmount.value) <= 0) { formError.value = 'Amount must be greater than 0'; return; }
  if (parseInt(savingsDuration.value) <= 0) { formError.value = 'Duration must be at least 1 month'; return; }
  try {
    loading.value = true;
    formError.value = '';
    await savingsStore.addSavings(savingsMethod.value, parseFloat(savingsAmount.value), savingsDate.value, parseInt(savingsDuration.value));
    savingsMethod.value = ''; savingsDate.value = ''; savingsAmount.value = ''; savingsDuration.value = '';
    showForm.value = false;
  } catch (err) {
    formError.value = 'Failed to add savings. Please try again.';
    console.error('Error adding savings:', err);
  } finally {
    loading.value = false;
  }
}

onMounted(async () => {
  if (!isGuest.value) {
    const hasCache = savingsStore.savings.length > 0;
    try { if (!hasCache) loading.value = true; await savingsStore.fetchSavings(); }
    catch (err) { console.error('Error fetching savings:', err); }
    finally { loading.value = false; }
  }
});
</script>
