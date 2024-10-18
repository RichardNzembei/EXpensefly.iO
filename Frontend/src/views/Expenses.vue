<script setup>
import { useRouter } from 'vue-router';
import navigationBar from '@/components/navigationBar.vue';
const router=useRouter()
const toHomePage=()=>{
    router.push('/')
}
</script>

<template>
   <navigationBar/>
   <div class="container min-h-screen w-full max-w-full">
    <span class="inline"><img src="../assets/icons/thin-arrow.png" @click="toHomePage" alt="home image" class="h-8 w-8 mt-2 ml-2">
        <h4 class="text-center font-thin font-serif text-2xl text-gray-600">Welcome to the seamless money Tracker</h4>
    </span>
        <p class="text-san text-pretty text-lime-700 p-2 ml-5 text-center">Let's make your transactions easy and traceable!</p>

    
      <div class="shadow-lg rounded-lg bg-white">
        <div class=" max-w-full p-3 space-y-2 flex flex-col lg:flex-row justify-center items-center space-x-2">
            <div class="block">
                <input type="text"  class="rounded-lg border-2 p-1 hover:bg-slate-100 focus:ring-2 focus:ring-green-200" placeholder="Enter expense">
            </div>
            <div class="block">
                <input type="text"  class="rounded-lg border-2 p-1 hover:bg-slate-100 focus:ring-2 focus:ring-green-200" placeholder="Enter amount">
            </div>
            <div class="block">
                <input type="date" class="rounded-lg border-2 p-1 hover:bg-slate-100 focus:ring-2 focus:ring-green-200">
            </div>
            <div class="block">
                <select  class="p-2 border-1 rounded-lg text-blue-500">
                    <option disabled value="category">category</option>
                    <option value="Food">Food</option>
                    <option value="Transportation">Transportation</option>
                    <option value="Utilities">Utilities</option>
                   
                </select>
            </div>
        </div>
        <div class="flex justify-center items-center">
                <button id="addExpenseBtn" class="bg-green-400 rounded-lg shadow p-1 text-white hover:bg-white hover:text-green-600 mb-2">Add Expense</button>
            </div>
      </div>
     
    </div>
   
 

   
</template>