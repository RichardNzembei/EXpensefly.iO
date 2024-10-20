<script setup>
import { computed, onMounted } from 'vue';
import { useStore } from '@/stores/useStore';
const store = useStore();
const expenses = computed(() => store.expenses);

console.log('Current expenses:', expenses.value);
onMounted(async () => {
    console.log('Component mounted, fetching expenses...');
    await store.fetchExpenses();
    console.log('Expenses after fetching:', expenses.value);
});
</script>
<template>
    <div class="p-4 bg-gray-50 rounded-lg shadow-lg max-w-lg mx-auto">
        <span class="block text-lg text-center font-semibold text-gray-700 mb-4">all expenses</span>

        <div v-if="expenses.length > 0">
            <ul class="divide-y divide-gray-200">
                <li v-for="expense in expenses" :key="expense.id" class="py-3 flex justify-between items-center">
                    <span class="text-gray-600">{{ expense.name }}</span>
                    <span class="font-bold text-gray-800">{{ expense.amount}} ksh</span>
                </li>
            </ul>
        </div>

        <div v-else class="text-center text-gray-500">
            <span>NO Expenses at the moment</span>
        </div>
    </div>
</template>