<script setup>
import navigationBar from '@/components/navigationBar.vue';
import { useRouter } from 'vue-router';
import { ref } from 'vue';
import router from '@/router';
const isModalOpen=ref(true)
const toDashBoard=()=>{
    router.push('/dashboard')
}
</script>

<template>
    <navigationBar />
    <div v-if="isModalOpen" class="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-75">
        <div class="bg-white rounded-lg p-6 max-w-sm mx-auto text-center">
            <h2 class="text-xl font-semibold text-green-600">Under Development</h2>
            <p class="text-gray-700 mt-2">This feature is currently being developed. Please check back later!</p>
            <button @click="toDashBoard" class="mt-4 w-full py-2 bg-green-600 text-white font-semibold rounded-md shadow hover:bg-green-500 focus:ring focus:ring-green-200 transition duration-200 ease-in-out">
                Back
            </button>
        </div>
    </div>
    <div class="max-w-3xl mx-auto p-8 bg-white shadow-lg rounded-lg mt-10">
        <h1 class="text-3xl font-bold text-green-600 mb-4">Savings Tracker</h1>
        <p class="text-gray-700 mb-6">Manage your savings efficiently. Add your savings details below.</p>
        
        <form @submit.prevent="addSavings" class="space-y-6">
            <div>
                <label for="savingsMethod" class="block text-sm font-medium text-gray-700">Savings Method:</label>
                <select id="savingsMethod" class="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-green-200 focus:border-green-500">
                    <option disabled value="">Select a mode of saving</option>
                    <option value="M-Shwari">M-Shwari</option>
                    <option value="Bank">Bank</option>
                    <option value="Crypto">Crypto</option>
                    <option value="SMMEs">SMMEs</option>
                </select>
            </div>
            
            <div>
                <label for="savingsDate" class="block text-sm font-medium text-gray-700">Date:</label>
                <input type="date" id="savingsDate" class="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-green-200 focus:border-green-500" required>
            </div>
            
            <div>
                <label for="savingsAmount" class="block text-sm font-medium text-gray-700">Amount:</label>
                <input type="number" id="savingsAmount" class="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-green-200 focus:border-green-500" placeholder="Enter amount" required>
            </div>
            
            <div>
                <label for="savingsDuration" class="block text-sm font-medium text-gray-700">Duration (in months):</label>
                <input type="number" id="savingsDuration" class="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-green-200 focus:border-green-500" placeholder="Enter duration" required>
            </div>

            <button type="submit" class="w-full py-3 bg-green-600 text-white font-semibold rounded-md shadow hover:bg-green-500 focus:ring focus:ring-green-200 focus:outline-none transition duration-200 ease-in-out">
                Add Savings
            </button>
        </form>

        <div class="mt-6">
            <h2 class="text-xl font-semibold text-green-600">Your Savings Overview</h2>
            <div class="mt-4 border border-gray-300 rounded-md p-4">
                <!-- Display user savings here -->
                <p class="text-gray-600">No savings added yet.</p>
                <!-- Example savings entries can be dynamically generated here -->
                <!-- <div class="flex justify-between items-center border-b border-gray-200 py-2">
                    <span>M-Shwari: $500</span>
                    <span>Duration: 6 months</span>
                </div> -->
            </div>
        </div>
    </div>
</template>

<script>
export default {
  methods: {
    addSavings() {
      // Logic to add savings
      // e.g., this.$store.dispatch('addTarget', {...});
      console.log("Savings added");
    }
  }
}
</script>

<style scoped>
/* Additional styles can be added here */
</style>
