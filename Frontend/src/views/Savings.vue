<template>
    <div >
      
      <div class="container mx-auto px-4 py-6 max-w-4xl">
        <!-- Back button with improved mobile styling -->
        <RouterLink 
          to="/dashboard" 
          class="flex items-center text-blue-600 hover:text-blue-800 mb-6 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clip-rule="evenodd" />
          </svg>
          <span class="ml-2 text-sm sm:text-base">Back to Dashboard</span>
        </RouterLink>
  
        <!-- Header with responsive typography -->
        <header class="text-center mb-6 sm:mb-8">
          <h1 class="text-xl sm:text-2xl md:text-3xl font-bold text-green-700 mb-1 sm:mb-2">My Savings</h1>
          <p class="text-xs sm:text-sm text-gray-600 max-w-2xl mx-auto">
            Track and manage your savings across different methods
          </p>
        </header>
  
        <!-- Toggle button for form -->
        <div class="flex justify-center mb-4 sm:mb-6">
          <button 
            @click="showForm = !showForm"
            class="px-4 py-2 bg-green-600 text-white text-sm sm:text-base font-medium rounded-md hover:bg-green-700 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
          >
            {{ showForm ? 'Cancel' : 'Add New Savings' }}
          </button>
        </div>
  
        <!-- Add Savings Form with toggle and transitions -->
        <transition
          enter-active-class="transition ease-out duration-200"
          enter-from-class="opacity-0 scale-95"
          enter-to-class="opacity-100 scale-100"
          leave-active-class="transition ease-in duration-150"
          leave-from-class="opacity-100 scale-100"
          leave-to-class="opacity-0 scale-95"
        >
          <section v-if="showForm" class="bg-white p-4 sm:p-6 rounded-lg shadow-sm border border-gray-100 mb-6 sm:mb-8">
            <h2 class="text-lg sm:text-xl font-semibold text-gray-800 mb-3 sm:mb-4">Add Savings Details</h2>
            
            <form @submit.prevent="addSavings" class="space-y-3 sm:space-y-4">
              <div>
                <label for="savingsMethod" class="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Savings Method</label>
                <select 
                  v-model="savingsMethod"
                  class="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  required
                >
                  <option disabled value="">Select savings method</option>
                  <option value="M-Shwari">M-Shwari</option>
                  <option value="Bank">Bank</option>
                  <option value="Crypto">Crypto</option>
                  <option value="SMMEs">SMMEs</option>
                </select>
              </div>
  
              <div>
                <label for="savingsDate" class="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Date</label>
                <input 
                  type="date" 
                  v-model="savingsDate"
                  :max="new Date().toISOString().split('T')[0]"
                  class="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  required
                >
              </div>
  
              <div>
                <label for="savingsAmount" class="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Amount (KSH)</label>
                <input 
                  type="number" 
                  v-model.number="savingsAmount" 
                  min="1"
                  step="0.01"
                  class="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Enter amount"
                  required
                >
              </div>
  
              <div>
                <label for="savingsDuration" class="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Duration (months)</label>
                <input 
                  type="number" 
                  v-model.number="savingsDuration" 
                  min="1"
                  class="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Enter duration"
                  required
                >
              </div>
  
              <div v-if="formError" class="text-red-500 text-xs sm:text-sm">{{ formError }}</div>
              
              <button 
                type="submit"
                class="w-full py-2 sm:py-3 bg-green-600 text-white text-sm sm:text-base font-medium rounded-md hover:bg-green-700 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                :disabled="loading"
              >
                <span v-if="!loading">Add Savings</span>
                <span v-else class="flex items-center justify-center">
                  <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Saving...
                </span>
              </button>
            </form>
          </section>
        </transition>
  
        <!-- Savings Summary Cards -->
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
          <div 
            v-for="method in savingsMethods" 
            :key="method.value"
            class="bg-white p-3 sm:p-4 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow cursor-pointer"
            @click="filterByMethod(method.value)"
            :class="{ 'ring-2 ring-green-500': activeFilter === method.value }"
          >
            <div class="flex items-center">
              <img :src="method.icon" :alt="method.label" class="h-6 w-6 sm:h-8 sm:w-8 mr-2 sm:mr-3" />
              <div>
                <h3 class="text-xs sm:text-sm font-medium text-gray-500">{{ method.label }}</h3>
                <p class="text-lg sm:text-xl font-bold text-gray-800">
                  {{ getTotalByMethod(method.value).toLocaleString() }} KSH
                </p>
              </div>
            </div>
          </div>
        </div>
  
        <!-- All Savings List -->
        <section class="bg-white p-4 sm:p-6 rounded-lg shadow-sm border border-gray-100">
          <div class="flex justify-between items-center mb-3 sm:mb-4">
            <h2 class="text-lg sm:text-xl font-semibold text-gray-800">
              {{ activeFilter ? `${activeFilter} Savings` : 'All Savings' }}
            </h2>
            <button 
              v-if="activeFilter"
              @click="clearFilter"
              class="text-xs sm:text-sm text-blue-600 hover:text-blue-800 transition-colors"
            >
              Clear filter
            </button>
          </div>
          
          <div v-if="filteredSavings.length > 0" class="space-y-3 sm:space-y-4">
            <div 
              v-for="saving in filteredSavings" 
              :key="saving.id"
              class="p-3 sm:p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
            >
              <div class="flex items-start">
                <img :src="getIcon(saving.method)" :alt="saving.method" class="h-8 w-8 sm:h-10 sm:w-10 mr-3 sm:mr-4 flex-shrink-0" />
                <div class="flex-grow">
                  <div class="flex justify-between items-start">
                    <h3 class="text-base sm:text-lg font-bold text-gray-800">
                      {{ saving.amount.toLocaleString() }} KSH
                    </h3>
                    <span class="bg-blue-100 text-blue-800 text-xs px-2 py-0.5 sm:py-1 rounded-full">
                      {{ saving.method }}
                    </span>
                  </div>
                  <div class="grid grid-cols-2 gap-2 mt-2">
                    <div class="flex items-center text-xs sm:text-sm text-gray-500">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 sm:h-4 sm:w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span>{{ formatDate(saving.date) }}</span>
                    </div>
                    <div class="flex items-center text-xs sm:text-sm text-gray-500">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 sm:h-4 sm:w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>{{ saving.duration }} months</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div v-else class="text-center py-6 sm:py-8">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 sm:h-12 sm:w-12 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p class="text-xs sm:text-sm text-gray-500 mt-2">
              {{ activeFilter ? `No ${activeFilter} savings found` : 'No savings recorded yet' }}
            </p>
          </div>
        </section>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed, onMounted } from 'vue';
  import { useSavingsStore } from '@/stores/savingStore';
  import navigationBar from '@/components/navigationBar.vue';
  
  // Icons
  import cryptoIcon from '../assets/icons/cryptocurrencies.png';
  import mShwariIcon from '../assets/icons/mobile-banking (1).png';
  import bankIcon from '../assets/icons/mobile-banking.png';
  import smmesIcon from '../assets/icons/money-bag.png';
  
  const savingsStore = useSavingsStore();
  const showForm = ref(false);
  const loading = ref(false);
  const formError = ref('');
  const activeFilter = ref('');
  
  // Form fields
  const savingsMethod = ref('');
  const savingsDate = ref('');
  const savingsAmount = ref('');
  const savingsDuration = ref('');
  
  // Savings methods data
  const savingsMethods = [
    { value: 'M-Shwari', label: 'M-Shwari', icon: mShwariIcon },
    { value: 'Bank', label: 'Bank', icon: bankIcon },
    { value: 'Crypto', label: 'Crypto', icon: cryptoIcon },
    { value: 'SMMEs', label: 'SMMEs', icon: smmesIcon },
  ];
  
  // Format date for display
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };
  
  // Get icon for savings method
  const getIcon = (method) => {
    return savingsMethods.find(m => m.value === method)?.icon || '';
  };
  
  // Get total savings by method
  const getTotalByMethod = (method) => {
    return savingsStore.savings
      .filter(s => s.method === method)
      .reduce((sum, saving) => sum + saving.amount, 0);
  };
  
  // Filter savings by method
  const filteredSavings = computed(() => {
    if (!activeFilter.value) return savingsStore.savings;
    return savingsStore.savings.filter(s => s.method === activeFilter.value);
  });
  
  // Filter savings by method
  const filterByMethod = (method) => {
    activeFilter.value = activeFilter.value === method ? '' : method;
  };
  
  // Clear active filter
  const clearFilter = () => {
    activeFilter.value = '';
  };
  
  // Add new savings
  async function addSavings() {
    if (!savingsMethod.value || !savingsDate.value || !savingsAmount.value || !savingsDuration.value) {
      formError.value = 'Please fill all fields';
      return;
    }
  
    if (parseFloat(savingsAmount.value) <= 0) {
      formError.value = 'Amount must be greater than 0';
      return;
    }
  
    if (parseInt(savingsDuration.value) <= 0) {
      formError.value = 'Duration must be at least 1 month';
      return;
    }
  
    try {
      loading.value = true;
      formError.value = '';
      
      await savingsStore.addSavings(
        savingsMethod.value,
        parseFloat(savingsAmount.value),
        savingsDate.value,
        parseInt(savingsDuration.value)
      );
  
      // Reset form
      savingsMethod.value = '';
      savingsDate.value = '';
      savingsAmount.value = '';
      savingsDuration.value = '';
      showForm.value = false;
    } catch (err) {
      formError.value = 'Failed to add savings. Please try again.';
      console.error('Error adding savings:', err);
    } finally {
      loading.value = false;
    }
  }
  
  // Fetch savings on mount
  onMounted(async () => {
    try {
      loading.value = true;
      await savingsStore.fetchSavings();
    } catch (err) {
      console.error('Error fetching savings:', err);
    } finally {
      loading.value = false;
    }
  });
  </script>