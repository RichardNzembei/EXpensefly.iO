<script setup>
import navigationBar from '@/components/navigationBar.vue';
import footerBar from '@/components/footerBar.vue';
</script>
<template>
  <div class="bg-gray-50 min-h-screen flex flex-col">
    <navigationBar />
    <div class="mx-auto mt-8 flex flex-col md:flex-row space-y-2 md:space-x-4 p-2 border-b-4 text-sm lg:text-lg">
      <div class="bg-slate-100 w-full md:w-1/3 rounded-lg p-4 shadow-md">
        <h2 class="text-center text-md font-semibold text-green-500">
          Why Track Your Expenses?
        </h2>
        <ul class="mt-2 space-y-2 text-gray-700 list-disc list-inside">
          <li>Understand where your money is going</li>
          <li>Identify areas where you can save money</li>
          <li>Plan and budget effectively</li>
          <li>Achieve your financial goals</li>
        </ul>
      </div>

      <div class="bg-slate-100 w-full md:w-1/3 rounded-lg p-4 shadow-md">
        <h2 class="text-md text-center font-semibold text-green-500">Why Save Money?</h2>
        <ul class="mt-2 space-y-2 text-gray-700 list-disc list-inside">
          <li>Provides financial security</li>
          <li>Achieve your long-term goals</li>
          <li>Safety net for unexpected expenses</li>
          <li>Investments and wealth building</li>
        </ul>
      </div>

      <div class="bg-slate-100 w-full md:w-1/3 rounded-lg p-4 shadow-md">
        <h2 class="text-md text-center font-semibold text-green-500">
          Why Set Financial Targets?
        </h2>
        <ul class="mt-2 space-y-2 text-gray-700 list-disc list-inside">
          <li>Stay focused on your financial goals</li>
          <li>Motivate yourself to save and invest</li>
          <li>Track your progress</li>
          <li>Plan for major expenses</li>
        </ul>
      </div>
    </div>
    <h2 class="block text-center text-lg font-semibold text-green-700 mt-6 border-b-1">
      Services
    </h2>
    <div class="container mx-auto mt-8 bg-white  flex justify-center items-center space-x-6 p-4">
      <div class="text-blue-300 block hover:text-blue-600">
        <img src="../assets/icons/expenses (1).png" alt="expenses image" class="h-10 w-10 rounded-xl shadow-xl ml-3" />
        <router-link to="/expenses">Expenses</router-link>
      </div>
      <div class="text-blue-300 block hover:text-blue-600">
        <img src="../assets/icons/goal.png" alt="targets image" class="h-10 w-10 rounded-xl shadow-xl ml-1" />
        <router-link to="/targets">Targets</router-link>
      </div>
      <div class="text-blue-300 block hover:text-blue-600">
        <img src="../assets/icons/money-box.png" alt="targets image" class="h-10 w-10 rounded-xl shadow-xl ml-1" />
        <router-link to="/savings">Savings</router-link>
      </div>
    </div>
    <h2 class="block text-center text-lg font-semibold text-green-700 mt-6 border-b-1">
      Educational
    </h2>
    <div class="container mx-auto mt-8 bg-white  flex justify-center items-center space-x-8 p-4 ">
      <div class="text-blue-300 block hover:text-blue-600">
        <img src="../assets/icons/creative-education.png" alt="expenses image"
          class="h-10 w-10 rounded-xl shadow-xl ml-4" />
        <router-link to="/monocomy">Monocomy</router-link>
      </div>
      <div class="text-blue-300 block hover:text-blue-600">
        <img src="../assets/icons/smmes.png" alt="targets image" class="h-10 w-10 rounded-xl shadow-xl" />
        <router-link to="/smmes">SMMEs</router-link>
      </div>
      <div class="text-blue-300 block hover:text-blue-600">
        <img src="../assets/icons/wallet.png" alt="targets image" class="h-10 w-10 rounded-xl shadow-xl ml-1" />
        <router-link to="/crypto">crypto</router-link>
      </div>
    </div>
  </div>
  <footerBar />
</template>