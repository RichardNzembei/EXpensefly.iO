<script setup>
import { ref, computed, onMounted } from 'vue';
import navigationBar from '@/components/navigationBar.vue';
import { useTargetStore } from '@/stores/targetStore';
import { useUserStore } from '@/stores/userStore';
import { formatKES } from '@/utils/currency';

const targetStore = useTargetStore();
const userStore = useUserStore();
const isGuest = computed(() => !userStore.user);
const hasCache = targetStore.activeTargets.length > 0 || targetStore.completedTargets.length > 0;
const isLoading = ref(!hasCache);
const error = ref(null);
const showForm = ref(false);

const targetDescription = ref('');
const targetAmount = ref('');
const targetDeadline = ref('');
const formError = ref('');

const activeTargets = computed(() => targetStore.activeTargets);
const completedTargets = computed(() => targetStore.completedTargets);
const totalActiveAmount = computed(() => targetStore.totalActiveAmount);
const totalCompletedAmount = computed(() => targetStore.totalCompletedAmount);
const completionRate = computed(() => targetStore.completionRate);

const fetchTargets = async () => {
  try { isLoading.value = true; error.value = null; await targetStore.fetchTargets(); }
  catch (err) { error.value = 'Failed to load targets. Please try again.'; console.error('Error fetching targets:', err); }
  finally { isLoading.value = false; }
};

const handleFormSubmit = async () => {
  if (!targetDescription.value || !targetAmount.value || !targetDeadline.value) { formError.value = 'Please fill all fields'; return; }
  if (parseFloat(targetAmount.value) <= 0) { formError.value = 'Amount must be greater than 0'; return; }
  try {
    formError.value = '';
    await targetStore.addTarget(targetDescription.value, parseFloat(targetAmount.value), targetDeadline.value);
    targetDescription.value = ''; targetAmount.value = ''; targetDeadline.value = '';
    showForm.value = false;
  } catch (err) { formError.value = 'Failed to add target. Please try again.'; console.error('Error adding target:', err); }
};

const markAsCompleted = async (targetId) => {
  try { await targetStore.markTargetAsCompleted(targetId); }
  catch (err) { error.value = 'Failed to complete target. Please try again.'; console.error('Error completing target:', err); }
};

const formatDate = (dateString) => new Date(dateString).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });

onMounted(() => { if (!isGuest.value) fetchTargets(); else isLoading.value = false; });
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <navigationBar/>
    <div class="max-w-5xl mx-auto px-4 sm:px-6 pt-16 pb-20 md:pb-6">
      <div class="pt-4 pb-2">
        <h1 class="text-xl font-semibold text-gray-900">Financial Goals</h1>
        <p class="text-sm text-gray-500 mt-0.5">Set, track, and achieve your financial objectives</p>
      </div>

      <!-- Guest CTA -->
      <div v-if="isGuest" class="card p-6 text-center mt-4">
        <svg class="h-12 w-12 mx-auto text-emerald-400 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
        <h3 class="text-lg font-semibold text-gray-900 mb-1">Sign in to set financial goals</h3>
        <p class="text-sm text-gray-500 mb-4">Track progress toward your financial milestones.</p>
        <RouterLink to="/login" class="btn-primary inline-block text-sm">Sign In to Get Started</RouterLink>
      </div>

      <!-- Stats Cards -->
      <div v-if="!isGuest" class="grid grid-cols-3 gap-3 mt-4">
        <div class="card p-3">
          <p class="text-xs font-medium text-gray-500">Active Goals</p>
          <p class="text-lg font-bold text-gray-900">{{ activeTargets.length }}</p>
          <p class="text-xs text-gray-400 mt-0.5">{{ formatKES(totalActiveAmount) }}</p>
        </div>
        <div class="card p-3">
          <p class="text-xs font-medium text-gray-500">Completed</p>
          <p class="text-lg font-bold text-gray-900">{{ completedTargets.length }}</p>
          <p class="text-xs text-gray-400 mt-0.5">{{ formatKES(totalCompletedAmount) }}</p>
        </div>
        <div class="card p-3">
          <p class="text-xs font-medium text-gray-500">Success Rate</p>
          <p class="text-lg font-bold text-gray-900">{{ completionRate }}%</p>
          <p class="text-xs text-gray-400 mt-0.5">Goals achieved</p>
        </div>
      </div>

      <!-- Toggle button -->
      <div v-if="!isGuest" class="flex justify-end mt-4">
        <button @click="showForm = !showForm" class="btn-primary text-sm py-2 px-4">
          {{ showForm ? 'Cancel' : 'Create Goal' }}
        </button>
      </div>

      <!-- Add Target Form -->
      <transition enter-active-class="transition ease-out duration-200" enter-from-class="opacity-0 scale-95" enter-to-class="opacity-100 scale-100" leave-active-class="transition ease-in duration-150" leave-from-class="opacity-100 scale-100" leave-to-class="opacity-0 scale-95">
        <section v-if="showForm && !isGuest" class="card p-5 mt-4">
          <h2 class="text-base font-semibold text-gray-900 mb-4">New Goal Details</h2>
          <form @submit.prevent="handleFormSubmit" class="space-y-4">
            <div>
              <label for="targetDescription" class="block text-sm font-medium text-gray-700 mb-1">Goal Name</label>
              <input v-model="targetDescription" type="text" class="input-field" placeholder="e.g. Vacation Fund, New Laptop" required>
            </div>
            <div>
              <label for="targetAmount" class="block text-sm font-medium text-gray-700 mb-1">Target Amount (KSH)</label>
              <input v-model.number="targetAmount" type="number" min="1" step="0.01" class="input-field" placeholder="Enter amount" required>
            </div>
            <div>
              <label for="targetDeadline" class="block text-sm font-medium text-gray-700 mb-1">Target Date</label>
              <input v-model="targetDeadline" type="date" :min="new Date().toISOString().split('T')[0]" class="input-field" required>
            </div>
            <div v-if="formError" class="text-red-500 text-sm">{{ formError }}</div>
            <button type="submit" class="w-full btn-primary py-3" :disabled="isLoading">
              <span v-if="!isLoading">Set Financial Goal</span>
              <span v-else class="flex items-center justify-center">
                <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                Processing...
              </span>
            </button>
          </form>
        </section>
      </transition>

      <!-- Loading -->
      <div v-if="isLoading && !isGuest" class="flex justify-center py-8">
        <div class="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-emerald-500"></div>
      </div>

      <!-- Error -->
      <div v-else-if="error" class="card p-4 text-center mt-4 border-red-100">
        <p class="text-red-600 text-sm mb-2">{{ error }}</p>
        <button @click="fetchTargets" class="text-sm text-red-700 bg-red-50 hover:bg-red-100 px-3 py-1 rounded-lg transition-colors">Retry</button>
      </div>

      <!-- Content -->
      <template v-else-if="!isGuest">
        <section class="card p-4 mt-4">
          <div class="flex justify-between items-center mb-3">
            <h2 class="text-sm font-semibold text-gray-900">Active Goals</h2>
            <span class="text-xs text-gray-400">{{ activeTargets.length }} goals</span>
          </div>
          <div v-if="activeTargets.length > 0" class="space-y-3">
            <div v-for="target in activeTargets" :key="target.id" class="p-3 border border-gray-100 rounded-xl">
              <div class="flex justify-between items-start mb-1">
                <h3 class="text-sm font-semibold text-gray-900">{{ target.description }}</h3>
                <span class="text-sm font-medium text-emerald-600">{{ formatKES(parseFloat(target.amount)) }}</span>
              </div>
              <p class="text-xs text-gray-500 mb-2">Target by: {{ formatDate(target.deadline) }}</p>
              <div class="mb-2">
                <div class="flex justify-between text-xs text-gray-400 mb-1"><span>Progress</span><span>{{ target.progress }}%</span></div>
                <div class="w-full bg-gray-100 rounded-full h-2">
                  <div class="h-2 rounded-full transition-all duration-300" :style="{ width: `${target.progress}%` }" :class="{ 'bg-emerald-400': target.progress < 50, 'bg-yellow-400': target.progress >= 50 && target.progress < 80, 'bg-red-400': target.progress >= 80 && target.progress < 100, 'bg-emerald-500': target.progress === 100 }"></div>
                </div>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-xs text-gray-400">Created: {{ formatDate(target.createdAt) }}</span>
                <button @click="markAsCompleted(target.id)" class="text-xs font-medium text-emerald-600 hover:text-emerald-700 flex items-center gap-1">
                  <svg class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" /></svg>
                  Complete
                </button>
              </div>
            </div>
          </div>
          <div v-else class="text-center py-6">
            <p class="text-sm text-gray-400">No active goals. Create one to get started!</p>
          </div>
        </section>

        <section class="card p-4 mt-4">
          <div class="flex justify-between items-center mb-3">
            <h2 class="text-sm font-semibold text-gray-900">Achieved Goals</h2>
            <span class="text-xs text-gray-400">{{ completedTargets.length }} goals</span>
          </div>
          <div v-if="completedTargets.length > 0" class="space-y-3">
            <div v-for="target in completedTargets" :key="target.id" class="p-3 border border-emerald-100 rounded-xl bg-emerald-50/50">
              <div class="flex justify-between items-start">
                <div>
                  <h3 class="text-sm font-semibold text-gray-900">{{ target.description }}</h3>
                  <p class="text-xs text-gray-500 mt-0.5">
                    {{ formatKES(parseFloat(target.amount)) }} &bull; Completed {{ formatDate(target.completedAt || target.deadline) }}
                  </p>
                </div>
                <span class="bg-emerald-100 text-emerald-700 text-xs px-2 py-0.5 rounded-full">Achieved</span>
              </div>
            </div>
          </div>
          <div v-else class="text-center py-6">
            <p class="text-sm text-gray-400">No completed goals yet. Keep working on your targets!</p>
          </div>
        </section>
      </template>
    </div>
  </div>
</template>
