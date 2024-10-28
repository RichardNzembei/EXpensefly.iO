<template>
    <navigationBar />
    <span>
        <RouterLink to="/dashboard">
            <img src="../assets/icons/thin-arrow.png" alt="Back to Dashboard" class="h-8 w-8 ml-5" />
        </RouterLink>
    </span>
    <div class="max-w-3xl mx-auto p-8 bg-white shadow-lg rounded-lg text-md lg:text-lg">
        <h1 class="font-semibold text-green-600 mb-2 text-lg lg:text-3xl text-center">My Savings</h1>
        <p class="text-gray-700 mb-6">Manage your savings efficiently. Add your savings details below.</p>

        <form @submit.prevent="addSavings" class="space-y-6">
            <div>
                <label for="savingsMethod" class="block text-sm font-medium text-gray-700">Savings Method:</label>
                <select v-model="savingsMethod"
                    class="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-green-200 focus:border-green-500"
                    required>
                    <option disabled value="">Select a mode of saving</option>
                    <option value="M-Shwari">M-Shwari</option>
                    <option value="Bank">Bank</option>
                    <option value="Crypto">Crypto</option>
                    <option value="SMMEs">SMMEs</option>
                </select>
            </div>

            <div>
                <label for="savingsDate" class="block text-sm font-medium text-gray-700">Date:</label>
                <input type="date" v-model="savingsDate"
                    class="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-green-200 focus:border-green-500"
                    required>
            </div>

            <div>
                <label for="savingsAmount" class="block text-sm font-medium text-gray-700">Amount:</label>
                <input type="number" v-model="savingsAmount" min="0"
                    class="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-green-200 focus:border-green-500"
                    placeholder="Enter amount" required>
            </div>

            <div>
                <label for="savingsDuration" class="block text-sm font-medium text-gray-700">Duration (in
                    months):</label>
                <input type="number" v-model="savingsDuration" min="1"
                    class="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-green-200 focus:border-green-500"
                    placeholder="Enter duration" required>
            </div>

            <button type="submit"
                class="w-full py-3 bg-green-400 text-white font-bold rounded-md hover:bg-white hover:text-green-600 transition duration-200 border border-green-300"
                :disabled="loading">
                <span v-if="loading">Adding...</span>
                <span v-else>Add Savings</span>
            </button>
        </form>

        <div class="mt-6">
            <h2 class="text-md lg:text-xl font-bold text-gray-600 text-center">ALL SAVINGS</h2>
            <div v-if="savingsStore.savings && savingsStore.savings.length > 0" class="mt-4 bg-white p-6 space-y-6">
                <div v-for="saving in savingsStore.savings" :key="saving.id"
                    class="flex items-center p-4 border border-gray-200 rounded-lg shadow-sm transition-transform transform hover:scale-105">
                    <div class="flex-shrink-0">
                        <img :src="getIcon(saving.method)" alt="" class="h-8 w-8" />
                    </div>
                    <div class="ml-4 flex-grow">
                        <p class="text-gray-800 text-lg"> {{ saving.amount ? saving.amount.toLocaleString() : 'N/A' }}
                            <span class="text-gray-600 text-sm">({{ saving.method }})</span></p>
                        <p class="text-gray-500 text-sm">Date: {{ saving.date }} | Duration: {{ saving.duration }}
                            months</p>
                    </div>
                </div>
            </div>
            <p v-else class="text-gray-600 text-lg italic">No savings added yet.</p>
        </div>
    </div>
</template>

<script setup>
import navigationBar from '@/components/navigationBar.vue';
import { ref } from 'vue';
import { useSavingsStore } from '@/stores/savingStore';


import cryptoIcon from '../assets/icons/cryptocurrencies.png';
import mShwariIcon from '../assets/icons/mobile-banking (1).png';
import bankIcon from '../assets/icons/mobile-banking.png';
import smmesIcon from '../assets/icons/money-bag.png';

const savingsStore = useSavingsStore();
const savingsMethod = ref('');
const savingsDate = ref('');
const savingsAmount = ref('');
const savingsDuration = ref('');
const loading = ref(false);


async function addSavings() {
    loading.value = true;
    const newSaving = await savingsStore.addSavings(
        savingsMethod.value,
        parseFloat(savingsAmount.value) || 0,
        savingsDate.value,
        parseInt(savingsDuration.value) || 0,
    );

    loading.value = false;
    if (newSaving && newSaving.savingsId) {
        savingsMethod.value = '';
        savingsDate.value = '';
        savingsAmount.value = '';
        savingsDuration.value = '';
    } else {
        console.warn('Invalid new saving returned:', newSaving);
    }
}
const getIcon = (method) => {
    switch (method) {
        case 'Crypto':
            return cryptoIcon;
        case 'M-Shwari':
            return mShwariIcon;
        case 'Bank':
            return bankIcon;
        case 'SMMEs':
            return smmesIcon;
        default:
            return '';
    }
};
</script>