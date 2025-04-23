<script setup>
import { ref, computed, onMounted } from 'vue';
import navigationBar from '@/components/navigationBar.vue';
import { useTargetStore } from '@/stores/targetStore';
import { useUserStore } from '@/stores/userStore';

const targetStore = useTargetStore();
const userStore = useUserStore();
const isLoading = ref(true);
const error = ref(null);
const showForm = ref(false); // Toggle form visibility

// Form refs
const targetDescription = ref('');
const targetAmount = ref('');
const targetDeadline = ref('');
const formError = ref('');

// Computed properties
const activeTargets = computed(() => targetStore.activeTargets);
const completedTargets = computed(() => targetStore.completedTargets);
const totalActiveAmount = computed(() => 
  activeTargets.value.reduce((sum, target) => sum + parseFloat(target.amount), 0)
);
const totalCompletedAmount = computed(() => 
  completedTargets.value.reduce((sum, target) => sum + parseFloat(target.amount), 0)
);

// Fetch targets with loading state
const fetchTargets = async () => {
  try {
    isLoading.value = true;
    error.value = null;
    await targetStore.fetchTargets();
  } catch (err) {
    error.value = 'Failed to load targets. Please try again.';
    console.error('Error fetching targets:', err);
  } finally {
    isLoading.value = false;
  }
};

// Handle form submission
const handleFormSubmit = async () => {
  if (!targetDescription.value || !targetAmount.value || !targetDeadline.value) {
    formError.value = 'Please fill all fields';
    return;
  }

  if (parseFloat(targetAmount.value) <= 0) {
    formError.value = 'Amount must be greater than 0';
    return;
  }

  try {
    formError.value = '';
    await targetStore.addTarget(
      targetDescription.value, 
      parseFloat(targetAmount.value), 
      targetDeadline.value
    );
    
    // Reset form and hide it
    targetDescription.value = '';
    targetAmount.value = '';
    targetDeadline.value = '';
    showForm.value = false;
  } catch (err) {
    formError.value = 'Failed to add target. Please try again.';
    console.error('Error adding target:', err);
  }
};

const markAsCompleted = async (targetId) => {
  try {
    await targetStore.markTargetAsCompleted(targetId);
  } catch (err) {
    error.value = 'Failed to complete target. Please try again.';
    console.error('Error completing target:', err);
  }
};

// Format date for display
const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

onMounted(fetchTargets);
</script>

<template>
  <div class="bg-gradient-to-br from-gray-50 to-green-50 min-h-screen">
    <navigationBar/>
    <div class="container mx-auto px-4 py-6 max-w-4xl mt-12">
      <!-- Back button -->
      <RouterLink to="/dashboard" class="flex items-center text-blue-600 hover:text-blue-800 mb-6 transition-colors">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clip-rule="evenodd" />
        </svg>
        <span class="ml-2 text-sm sm:text-base">Back to Dashboard</span>
      </RouterLink>

      <!-- Header with improved mobile typography -->
      <header class="text-center mb-6 sm:mb-8">
        <h1 class="text-md sm:text-lg md:text-xl font-bold text-green-700 mb-1 sm:mb-2">Financial Goals Tracker</h1>
        <p class="text-xs sm:text-sm text-gray-600 max-w-2xl mx-auto">
          Set, track, and achieve your financial objectives with clear milestones
        </p>
      </header>

      <!-- Stats Cards with better mobile sizing -->
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-6 sm:mb-8">
        <div class="bg-white p-3 sm:p-4 rounded-lg shadow-sm border border-gray-100">
          <h3 class="text-xs sm:text-sm font-medium text-gray-500">Active Goals</h3>
          <p class="text-lg sm:text-xl md:text-2xl font-bold text-blue-600">{{ activeTargets.length }}</p>
          <p class="text-xs text-gray-500 mt-0.5">Total: {{ totalActiveAmount.toFixed(2) }} KSH</p>
        </div>
        <div class="bg-white p-3 sm:p-4 rounded-lg shadow-sm border border-gray-100">
          <h3 class="text-xs sm:text-sm font-medium text-gray-500">Completed Goals</h3>
          <p class="text-lg sm:text-xl md:text-2xl font-bold text-green-600">{{ completedTargets.length }}</p>
          <p class="text-xs text-gray-500 mt-0.5">Total: {{ totalCompletedAmount.toFixed(2) }} KSH</p>
        </div>
        <div class="bg-white p-3 sm:p-4 rounded-lg shadow-sm border border-gray-100">
          <h3 class="text-xs sm:text-sm font-medium text-gray-500">Success Rate</h3>
          <p class="text-lg sm:text-xl md:text-2xl font-bold text-purple-600">
            {{ activeTargets.length + completedTargets.length > 0 
              ? Math.round((completedTargets.length / (activeTargets.length + completedTargets.length)) * 100) 
              : 0 }}%
          </p>
          <p class="text-xs text-gray-500 mt-0.5">Goals achieved</p>
        </div>
      </div>

      <!-- Toggle button for form -->
      <div class="flex justify-center mb-4 sm:mb-6">
        <button 
          @click="showForm = !showForm"
          class="px-4 py-2 bg-green-600 text-white text-sm sm:text-base font-medium rounded-md hover:bg-green-700 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
        >
          {{ showForm ? 'Cancel' : 'Create New Goal' }}
        </button>
      </div>

      <!-- Add Target Form (toggleable) -->
      <transition
        enter-active-class="transition ease-out duration-200"
        enter-from-class="opacity-0 scale-95"
        enter-to-class="opacity-100 scale-100"
        leave-active-class="transition ease-in duration-150"
        leave-from-class="opacity-100 scale-100"
        leave-to-class="opacity-0 scale-95"
      >
        <section v-if="showForm" class="bg-white p-4 sm:p-6 rounded-lg shadow-sm border border-gray-100 mb-6 sm:mb-8">
          <h2 class="text-lg sm:text-xl font-semibold text-gray-800 mb-3 sm:mb-4">New Goal Details</h2>
          
          <form @submit.prevent="handleFormSubmit" class="space-y-3 sm:space-y-4">
            <div>
              <label for="targetDescription" class="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Goal Name</label>
              <input 
                v-model="targetDescription" 
                type="text"
                class="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="e.g. Vacation Fund, New Laptop"
                required
              >
            </div>
            
            <div>
              <label for="targetAmount" class="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Target Amount (KSH)</label>
              <input 
                v-model.number="targetAmount" 
                type="number"
                min="1"
                step="0.01"
                class="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Enter amount"
                required
              >
            </div>
            
            <div>
              <label for="targetDeadline" class="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Target Date</label>
              <input 
                v-model="targetDeadline" 
                type="date"
                :min="new Date().toISOString().split('T')[0]"
                class="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                required
              >
            </div>
            
            <div v-if="formError" class="text-red-500 text-xs sm:text-sm">{{ formError }}</div>
            
            <button 
              type="submit"
              class="w-full py-2 sm:py-3 bg-green-600 text-white text-sm sm:text-base font-medium rounded-md hover:bg-green-700 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
              :disabled="isLoading"
            >
              <span v-if="!isLoading">Set Financial Goal</span>
              <span v-else class="flex items-center justify-center">
                <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </span>
            </button>
          </form>
        </section>
      </transition>

      <!-- Loading State -->
      <div v-if="isLoading" class="flex justify-center py-8">
        <div class="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-green-500"></div>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
        <div class="text-red-600 text-sm sm:text-base mb-2">{{ error }}</div>
        <button 
          @click="fetchTargets"
          class="text-xs sm:text-sm bg-red-100 hover:bg-red-200 text-red-800 px-3 py-1 rounded-md transition-colors"
        >
          Retry
        </button>
      </div>

      <!-- Content -->
      <template v-else>
        <!-- Active Targets with improved mobile typography -->
        <section class="bg-white p-4 sm:p-6 rounded-lg shadow-sm border border-gray-100 mb-6 sm:mb-8">
          <div class="flex justify-between items-center mb-3 sm:mb-4">
            <h2 class="text-lg sm:text-xl font-semibold text-gray-800">Active Goals</h2>
            <span class="text-xs sm:text-sm text-gray-500">{{ activeTargets.length }} goals</span>
          </div>
          
          <div v-if="activeTargets.length > 0" class="space-y-3 sm:space-y-4">
            <div 
              v-for="target in activeTargets" 
              :key="target.id"
              class="p-3 sm:p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
            >
              <div class="flex justify-between items-start mb-1 sm:mb-2">
                <h3 class="text-base sm:text-lg font-bold text-gray-800">{{ target.description }}</h3>
                <span class="text-sm sm:text-base font-medium text-green-600">{{ parseFloat(target.amount).toFixed(2) }} KSH</span>
              </div>
              
              <div class="flex items-center text-xs sm:text-sm text-gray-500 mb-2 sm:mb-3">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 sm:h-4 sm:w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span>Target by: {{ formatDate(target.deadline) }}</span>
              </div>
              
              <div class="mb-1 sm:mb-2">
                <div class="flex justify-between text-xs sm:text-sm text-gray-500 mb-1">
                  <span>Progress</span>
                  <span>{{ target.progress }}%</span>
                </div>
                <div class="w-full bg-gray-200 rounded-full h-2 sm:h-2.5">
                  <div 
                    class="h-2 sm:h-2.5 rounded-full" 
                    :style="{ width: `${target.progress}%` }"
                    :class="{
                      'bg-green-400': target.progress < 50,
                      'bg-yellow-400': target.progress >= 50 && target.progress < 80,
                      'bg-red-400': target.progress >= 80 && target.progress < 100,
                      'bg-blue-500': target.progress === 100
                    }"
                  ></div>
                </div>
              </div>
              
              <div class="flex justify-between items-center mt-2 sm:mt-3">
                <span class="text-xs text-gray-500">
                  Created: {{ formatDate(target.createdAt) }}
                </span>
                <button 
                  @click="markAsCompleted(target.id)"
                  class="text-xs sm:text-sm font-medium text-green-600 hover:text-green-800 transition-colors flex items-center"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 sm:h-4 sm:w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                  Mark Complete
                </button>
              </div>
            </div>
          </div>
          
          <div v-else class="text-center py-6 sm:py-8">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 sm:h-12 sm:w-12 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            <p class="text-xs sm:text-sm text-gray-500 mt-2">No active goals. Create one to get started!</p>
          </div>
        </section>
        
        <!-- Completed Targets with improved mobile typography -->
        <section class="bg-white p-4 sm:p-6 rounded-lg shadow-sm border border-gray-100">
          <div class="flex justify-between items-center mb-3 sm:mb-4">
            <h2 class="text-lg sm:text-xl font-semibold text-gray-800">Achieved Goals</h2>
            <span class="text-xs sm:text-sm text-gray-500">{{ completedTargets.length }} goals</span>
          </div>
          
          <div v-if="completedTargets.length > 0" class="space-y-3 sm:space-y-4">
            <div 
              v-for="target in completedTargets" 
              :key="target.id"
              class="p-3 sm:p-4 border border-green-100 rounded-lg bg-green-50 hover:shadow-md transition-shadow"
            >
              <div class="flex justify-between items-start">
                <div>
                  <h3 class="text-base sm:text-lg font-bold text-gray-800">{{ target.description }}</h3>
                  <p class="text-xs sm:text-sm text-gray-600 mt-1">
                    <span class="font-medium">{{ parseFloat(target.amount).toFixed(2) }} KSH</span> • 
                    Completed on {{ formatDate(target.completedAt || target.deadline) }}
                  </p>
                </div>
                <span class="bg-green-100 text-green-800 text-xs px-2 py-0.5 sm:py-1 rounded-full">
                  Achieved
                </span>
              </div>
            </div>
          </div>
          
          <div v-else class="text-center py-6 sm:py-8">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 sm:h-12 sm:w-12 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p class="text-xs sm:text-sm text-gray-500 mt-2">No completed goals yet. Keep working on your targets!</p>
          </div>
        </section>
      </template>
    </div>
  </div>
</template>