<script setup>
import { ref, computed } from 'vue';
import navigationBar from '@/components/navigationBar.vue';
import { useTargetStore } from '@/stores/targetStore';

const targetStore = useTargetStore();
const targetDescription = ref('');
const targetAmount = ref('');
const targetDeadline = ref('');
const activeTargets = computed(() => targetStore.activeTargets);
const completedTargets = computed(() => targetStore.completedTargets);

const handleFormSubmit = async () => {
    await targetStore.addTarget(targetDescription.value, targetAmount.value, targetDeadline.value);
    targetDescription.value = '';
    targetAmount.value = '';
    targetDeadline.value = '';
};

const markAsCompleted = async (index) => {
    const target = activeTargets.value[index];
    await targetStore.markTargetAsCompleted(target.id);
};
</script>
<template>
    <navigationBar />
    <span>
        <RouterLink to="/dashboard">
            <img src="../assets/icons/thin-arrow.png" alt="" class="h-8 w-8 ml-5">
        </RouterLink>
    </span>
    <section class="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg space-y-8 text-md lg:text-lg">
        <div class="text-center">
            <h1 class=" font-semibold text-green-600 mb-2 text-lg lg:text-3xl">Financial Targets</h1>
            <p class="text-gray-600">
                Set financial goals, track progress, and stay motivated to reach them.
            </p>
        </div>

        <div class="flex justify-between items-center text-center p-4 bg-blue-50 rounded-lg">
            <div>
                <h2 class="text-xl font-bold text-blue-600">{{ activeTargets.length }}</h2>
                <p class="text-gray-500">Active Targets</p>
            </div>
            <div>
                <h2 class="text-xl font-bold text-blue-600">{{ completedTargets.length }}</h2>
                <p class="text-gray-500">Completed Targets</p>
            </div>
        </div>

        <form @submit.prevent="handleFormSubmit" class="space-y-4">
            <div>
                <label for="targetDescription" class="block text-gray-700 font-medium">Target Name:</label>
                <input v-model="targetDescription" type="text"
                    class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter target description" required>
            </div>
            <div>
                <label for="targetAmount" class="block text-gray-700 font-medium">Target Amount:</label>
                <input v-model.number="targetAmount" type="number"
                    class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter target amount" required>
            </div>
            <div>
                <label for="targetDeadline" class="block text-gray-700 font-medium">Deadline:</label>
                <input v-model="targetDeadline" type="date"
                    class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required>
            </div>
            <button type="submit"
                class="w-full py-3 bg-green-400 text-white font-bold rounded-md hover:bg-white hover:text-green-600 transition duration-200 border border-green-300">
                Set Target
            </button>
        </form>

        <section class="mt-8 text-md">
            <h2 class=" font-semibold text-slate-700 mb-4 text-center font-mono text-xl">Undone Targets</h2>
            <div v-if="activeTargets.length > 0" class="space-y-4">
                <div v-for="(target, index) in activeTargets" :key="target.id"
                    class="p-4 border border-gray-200 rounded-md bg-gray-50">
                    <h3 class="text-lg font-bold text-gray-800">{{ target.description }}</h3>
                    <p class="text-sm text-gray-600">Goal: ksh{{ target.amount }} | Deadline: {{ target.deadline }}</p>
                    <div class="w-full bg-gray-200 rounded-full h-2 mt-2">
                        <div class="bg-blue-600 h-2 rounded-full" :style="{ width: target.progress + '%' }"></div>
                    </div>
                    <div class="flex justify-between items-center mt-3">
                        <span class="text-gray-500 text-sm">Progress: {{ target.progress }}%</span>
                        <button @click="markAsCompleted(index)"
                            class="text-blue-600 text-sm font-semibold hover:underline hover:text-green-400">
                            Mark as Done
                        </button>
                    </div>
                </div>
            </div>
            <p v-else class="text-gray-500">No active targets. Set a new target to get started!</p>
        </section>

        <section class="mt-8 text-md">
            <h2 class="text-xl font-semibold text-slate-700 mb-4 text-center font-mono">Done Targets</h2>
            <div v-if="completedTargets.length > 0" class="space-y-4">
                <div v-for="target in completedTargets" :key="target.id"
                    class="p-4 border border-green-200 rounded-md bg-green-50">
                    <h3 class="text-lg font-bold text-gray-800">{{ target.description }}</h3>
                    <p class="text-sm text-gray-600">Goal: ksh{{ target.amount }} | Completed on: {{ target.deadline }}
                    </p>
                </div>
            </div>
            <p v-else class="text-gray-500">No completed targets yet.</p>
        </section>
    </section>
</template>
