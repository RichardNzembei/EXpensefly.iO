<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import navigationBar from '@/components/navigationBar.vue';
import chart from '@/components/chart.vue';
import userExpenses from '@/components/userExpenses.vue';
import { useUserStore } from '@/stores/userStore';
import { useExpensesStore } from '@/stores/expensesStore';

const userStore = useUserStore();
const expensesStore = useExpensesStore();
const router = useRouter();

const date = ref('');
const amount = ref('');
const name = ref('');
const category = ref('');
const showForm = ref(false);

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
        
        // Reset form and hide
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

// Set default date to today
onMounted(() => {
    const today = new Date();
    date.value = today.toISOString().split('T')[0];
});
</script>

<template>
    <div class="min-h-screen bg-gradient-to-br from-gray-50 to-green-50">
        <navigationBar />
        <!-- Header Section -->
        <header class="bg-gradient-to-r from-green-50 to-blue-50 py-4 px-4 sm:px-6 mt-12">
            <div class="max-w-7xl mx-auto flex items-center">
                <RouterLink to="/dashboard" class="flex-shrink-0 mr-4" aria-label="Go back to dashboard">
                    <img src="../assets/icons/thin-arrow.png" alt="Back arrow" class="h-8 w-8">
                </RouterLink>
                <div>
                    <h1 class="text-md sm:text-lg md:text-xl font-light text-gray-800">
                        Expense Tracker
                    </h1>
                    <p class="text-sm sm:text-base text-green-700 mt-1">
                        Track and manage your spending effortlessly
                    </p>
                </div>
            </div>
        </header>

        <!-- Main Content -->
        <main class="max-w-7xl mx-auto px-4 sm:px-6 py-6">
            <!-- Add Expense Button -->
            <div class="mb-6 flex justify-center sm:justify-end">
                <button
                    @click="showForm = !showForm"
                    class="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 sm:py-3 sm:px-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 flex items-center"
                >
                    <span class="mr-2">{{ showForm ? 'Cancel' : 'Add New Expense' }}</span>
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd" />
                    </svg>
                </button>
            </div>

            <!-- Expense Form (Hidden by default) -->
            <transition
                enter-active-class="transition ease-out duration-200"
                enter-from-class="opacity-0 translate-y-4"
                enter-to-class="opacity-100 translate-y-0"
                leave-active-class="transition ease-in duration-150"
                leave-from-class="opacity-100 translate-y-0"
                leave-to-class="opacity-0 translate-y-4"
            >
                <section v-if="showForm" class="bg-white rounded-xl shadow-md p-4 sm:p-6 mb-8">
                    <h2 class="sr-only">Add New Expense</h2>
                    <form @submit.prevent="addNewExpense" class="space-y-4 sm:space-y-0 sm:grid sm:grid-cols-2 lg:grid-cols-5 sm:gap-4">
                        <div class="space-y-1">
                            <label for="expense-name" class="block text-sm font-medium text-gray-700">Description</label>
                            <input
                                id="expense-name"
                                v-model="name"
                                type="text"
                                class="w-full rounded-lg border border-gray-300 p-2 sm:p-3 focus:ring-2 focus:ring-green-500 focus:border-green-500"
                                placeholder="e.g. Groceries"
                                required
                            >
                        </div>

                        <div class="space-y-1">
                            <label for="expense-amount" class="block text-sm font-medium text-gray-700">Amount (Ksh)</label>
                            <input
                                id="expense-amount"
                                v-model="amount"
                                v-numeric-only
                                type="number"
                                min="0"
                                step="0.01"
                                class="w-full rounded-lg border border-gray-300 p-2 sm:p-3 focus:ring-2 focus:ring-green-500 focus:border-green-500"
                                placeholder="0.00"
                                required
                            >
                        </div>

                        <div class="space-y-1">
                            <label for="expense-date" class="block text-sm font-medium text-gray-700">Date</label>
                            <input
                                id="expense-date"
                                v-model="date"
                                type="date"
                                class="w-full rounded-lg border border-gray-300 p-2 sm:p-3 bg-white text-gray-700 focus:ring-2 focus:ring-green-500 focus:border-green-500"
                                required
                            >
                        </div>

                        <div class="space-y-1">
                            <label for="expense-category" class="block text-sm font-medium text-gray-700">Category</label>
                            <select
                                id="expense-category"
                                v-model="category"
                                class="w-full rounded-lg border border-gray-300 p-2 sm:p-3 bg-white text-gray-700 focus:ring-2 focus:ring-green-500 focus:border-green-500"
                                required
                            >
                                <option value="" disabled selected>Select category</option>
                                <option value="Food">Food</option>
                                <option value="Transportation">Transportation</option>
                                <option value="Utilities">Utilities</option>
                                <option value="Black Tax">Black Tax</option>
                                <option value="Shopping">Shopping</option>
                                <option value="Outings">Outings</option>
                            </select>
                        </div>

                        <div class="flex items-end">
                            <button
                                type="submit"
                                class="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 sm:py-3 px-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                            >
                                Save Expense
                            </button>
                        </div>
                    </form>
                </section>
            </transition>

            <!-- Data Visualization -->
            <section class="mb-8">
                <h2 class="text-lg sm:text-xl font-semibold text-blue-600 mb-4 text-center">Expense Breakdown</h2>
                <div class="bg-white rounded-xl shadow-md p-4 sm:p-6">
                    <chart />
                </div>
            </section>

            <!-- Expense List -->
            <section>
                <h2 class="text-lg sm:text-xl font-semibold text-blue-600 mb-4 text-center">Recent Expenses</h2>
                <div class="bg-white rounded-xl shadow-md p-4 sm:p-6">
                    <userExpenses />
                </div>
            </section>
        </main>
    </div>
</template>

<style scoped>
/* Responsive typography */
@media (max-width: 640px) {
    html {
        font-size: 14px;
    }
}

@media (min-width: 641px) and (max-width: 1023px) {
    html {
        font-size: 15px;
    }
}

@media (min-width: 1024px) {
    html {
        font-size: 16px;
    }
}

/* Accessibility improvements */
button, input, select {
    min-height: 44px;
}

/* Focus styles */
:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.5);
}

/* Smooth transitions */
button, .transition {
    transition: all 0.2s ease;
}

/* Responsive grid adjustments */
@media (max-width: 767px) {
    .sm\:grid {
        display: block;
    }
}

/* Optimize form layout on small screens */
@media (max-width: 639px) {
    form > div {
        margin-bottom: 1rem;
    }
}

/* Animation for form toggle */
.transition {
    will-change: transform, opacity;
}
</style>