<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router';
import navigationBar from '@/components/navigationBar.vue';
import { useStore } from '@/stores/useStore';
import chart from '@/components/chart.vue';
import userExpenses from '@/components/userExpenses.vue';
const store = useStore()
const router = useRouter()
const toHomePage = () => {
    router.push('/dashboard')
}
const date = ref('')
const amount = ref('')
const name = ref('')
const category = ref('')
const addNewExpense = async () => {
    if (date.value && amount.value && category.value && name.value) {
        await store.addExpense(name.value, amount.value, category.value, date.value);
    } else {
        alert("All fields must be filled");
    }
};


</script>

<template>
    <navigationBar />
    <div class=" min-h-screen w-full max-w-full">
        <span class="inline"><img src="../assets/icons/thin-arrow.png" @click="toHomePage" alt="home image"
                class="h-8 w-8 mt-2 ml-2">
            <h4 class="text-center font-thin font-serif text-2xl text-gray-600">Welcome to the seamless money Tracker
            </h4>
        </span>
        <p class="text-san text-pretty text-lime-700 p-2 ml-5 text-center">Let's make your transactions easy and
            traceable!</p>


        <div class="shadow-lg rounded-lg bg-white">
            <div class=" max-w-full p-3 space-y-2 flex flex-col lg:flex-row justify-center items-center space-x-2">
                <div class="block">
                    <input v-model="name" type="text"
                        class="rounded-lg border-2 p-1 hover:bg-slate-100 focus:ring-2 focus:ring-green-200"
                        placeholder="Enter expense">
                </div>
                <div class="block">
                    <input v-model="amount" type="text"
                        class="rounded-lg border-2 p-1 hover:bg-slate-100 focus:ring-2 focus:ring-green-200"
                        placeholder="Enter amount">
                </div>
                <div class="block">
                    <input v-model="date" type="date"
                        class="rounded-lg border-2 p-1 bg-white text-gray-700 hover:bg-slate-100 focus:ring-2 focus:ring-green-200">
                </div>

                <div class="block">
                    <select v-model="category"
                        class="p-2 border-2 rounded-lg bg-white text-gray-700 focus:ring-2 focus:ring-green-200">
                        <option disabled value="">Select category</option> <!-- Placeholder -->
                        <option value="Food">Food</option>
                        <option value="Transportation">Transportation</option>
                        <option value="Utilities">Utilities</option>
                        <option value="Black Tax">Black Tax</option>
                        <option value="Shopping">Shopping</option>
                        <option value="Outings">Outings</option>
                    </select>
                </div>

            </div>
            <div class="flex justify-center items-center">
                <button @click="addNewExpense"
                    class="bg-green-400 rounded-lg shadow p-1 text-white hover:shadow-lg hover:scale-105 mb-2 transition-shadow duration-700 ease-in-out cursor-progress">
                    Add Expense
                </button>


            </div>
        </div>
        <h1 class="text-sky-500 text-center p-2 mt-5 underline">EXPENSES</h1>
        <div class="flex flex-col lg:flex-row">

            <div class="bg-white rounded-xl w-full ">
                <chart />
            </div>
            <div class="bg-white rounded-xl w-full">
                <userExpenses />
            </div>
        </div>
    </div>




</template>