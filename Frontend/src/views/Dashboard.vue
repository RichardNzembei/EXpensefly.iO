<script setup>
import navigationBar from '@/components/navigationBar.vue';
import footerBar from '@/components/footerBar.vue';
import { ref } from 'vue';

// Sample data for financial overview cards
const financialStats = ref([
  { title: "Monthly Budget", value: "coming soon!!", change: "+2.5%", trend: "up" },
  { title: "Total Savings", value: "coming soon!!", change: "+12%", trend: "up" },
  { title: "Investments", value: "coming soon!!", change: "-1.2%", trend: "down" },
  { title: "Debts", value: "coming soon!!", change: "-5%", trend: "down" }
]);
</script>

<template>
  <div class="flex flex-col min-h-screen bg-gradient-to-br from-gray-50 to-green-50">
 <navigationBar />
    <!-- Financial Overview Cards -->
    <div class="container mx-auto px-4 sm:px-6 py-6 sm:py-8 mt-12">
      <div class="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8 sm:mb-10">
        <div v-for="(stat, index) in financialStats" :key="index" 
             class="bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
          <div class="flex justify-between items-start">
            <div>
              <p class="text-xs xs:text-sm font-medium text-gray-500">{{ stat.title }}</p>
              <p class="text-lg xs:text-xl sm:text-2xl font-bold mt-1 text-gray-800">{{ stat.value }}</p>
            </div>
            <span :class="{
              'bg-green-100 text-green-800': stat.trend === 'up',
              'bg-red-100 text-red-800': stat.trend === 'down'
            }" class="inline-flex items-center px-2 py-0.5 rounded-full text-2xs xs:text-xs font-medium">
              {{ stat.change }}
              <svg :class="{
                'text-green-500': stat.trend === 'up',
                'text-red-500': stat.trend === 'down'
              }" class="ml-0.5 xs:ml-1 w-2.5 h-2.5 xs:w-3 xs:h-3" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clip-rule="evenodd" v-if="stat.trend === 'up'" />
                <path fill-rule="evenodd" d="M14.707 10.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 12.586V5a1 1 0 012 0v7.586l2.293-2.293a1 1 0 011.414 0z" clip-rule="evenodd" v-else />
              </svg>
            </span>
          </div>
          <div class="mt-3 sm:mt-4">
            <div class="h-1.5 sm:h-2 bg-gray-200 rounded-full overflow-hidden">
              <div :class="{
                'bg-green-500': stat.trend === 'up',
                'bg-red-500': stat.trend === 'down'
              }" class="h-full rounded-full" :style="{ width: Math.abs(parseFloat(stat.change)) * 5 + '%' }"></div>
            </div>
          </div>
        </div>
      </div>

      <!-- Value Proposition Cards -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-12">
        <div class="bg-gradient-to-br from-green-50 to-white rounded-lg sm:rounded-xl p-4 sm:p-6 shadow-md hover:shadow-lg transition-all duration-300">
          <div class="flex items-center mb-3 sm:mb-4">
            <div class="bg-green-100 p-2 sm:p-3 rounded-lg mr-3 sm:mr-4">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 sm:h-6 sm:w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <h3 class="text-base sm:text-lg font-bold text-gray-800">Track Expenses</h3>
          </div>
          <ul class="space-y-2 sm:space-y-3 text-sm sm:text-base text-gray-600">
            <li class="flex items-start">
              <svg class="h-4 w-4 sm:h-5 sm:w-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              <span>Understand where your money goes</span>
            </li>
            <li class="flex items-start">
              <svg class="h-4 w-4 sm:h-5 sm:w-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              <span>Identify wasteful spending</span>
            </li>
            <li class="flex items-start">
              <svg class="h-4 w-4 sm:h-5 sm:w-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              <span>Create realistic budgets</span>
            </li>
          </ul>
        </div>

        <div class="bg-gradient-to-br from-blue-50 to-white rounded-lg sm:rounded-xl p-4 sm:p-6 shadow-md hover:shadow-lg transition-all duration-300">
          <div class="flex items-center mb-3 sm:mb-4">
            <div class="bg-blue-100 p-2 sm:p-3 rounded-lg mr-3 sm:mr-4">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 sm:h-6 sm:w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 class="text-base sm:text-lg font-bold text-gray-800">Grow Savings</h3>
          </div>
          <ul class="space-y-2 sm:space-y-3 text-sm sm:text-base text-gray-600">
            <li class="flex items-start">
              <svg class="h-4 w-4 sm:h-5 sm:w-5 text-blue-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              <span>Emergency fund security</span>
            </li>
            <li class="flex items-start">
              <svg class="h-4 w-4 sm:h-5 sm:w-5 text-blue-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              <span>Automated savings plans</span>
            </li>
            <li class="flex items-start">
              <svg class="h-4 w-4 sm:h-5 sm:w-5 text-blue-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              <span>Visualize your progress</span>
            </li>
          </ul>
        </div>

        <div class="bg-gradient-to-br from-purple-50 to-white rounded-lg sm:rounded-xl p-4 sm:p-6 shadow-md hover:shadow-lg transition-all duration-300">
          <div class="flex items-center mb-3 sm:mb-4">
            <div class="bg-purple-100 p-2 sm:p-3 rounded-lg mr-3 sm:mr-4">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 sm:h-6 sm:w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h3 class="text-base sm:text-lg font-bold text-gray-800">Set Targets</h3>
          </div>
          <ul class="space-y-2 sm:space-y-3 text-sm sm:text-base text-gray-600">
            <li class="flex items-start">
              <svg class="h-4 w-4 sm:h-5 sm:w-5 text-purple-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              <span>Clear financial milestones</span>
            </li>
            <li class="flex items-start">
              <svg class="h-4 w-4 sm:h-5 sm:w-5 text-purple-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              <span>Personalized goal tracking</span>
            </li>
            <li class="flex items-start">
              <svg class="h-4 w-4 sm:h-5 sm:w-5 text-purple-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              <span>Celebrate achievements</span>
            </li>
          </ul>
        </div>
      </div>

      <!-- Quick Access Sections -->
      <div class="mb-8 sm:mb-12">
        <h2 class="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6 pb-2 border-b border-gray-200">Quick Access</h2>
        
        <div class="grid grid-cols-2 xs:grid-cols-4 gap-3 sm:gap-6">
          <router-link to="/expenses" class="group">
            <div class="bg-white p-3 sm:p-4 rounded-lg sm:rounded-xl shadow-sm sm:shadow-md hover:shadow-lg transition-all duration-300 flex flex-col items-center">
              <div class="bg-green-100 p-2 sm:p-3 rounded-full mb-2 sm:mb-3 group-hover:bg-green-200 transition-colors">
                <img src="../assets/icons/expenses (1).png" alt="Expenses" class="h-6 w-6 sm:h-8 sm:w-8" />
              </div>
              <span class="text-xs sm:text-sm font-medium text-gray-700 group-hover:text-green-600 transition-colors">Expenses</span>
            </div>
          </router-link>
          
          <router-link to="/targets" class="group">
            <div class="bg-white p-3 sm:p-4 rounded-lg sm:rounded-xl shadow-sm sm:shadow-md hover:shadow-lg transition-all duration-300 flex flex-col items-center">
              <div class="bg-blue-100 p-2 sm:p-3 rounded-full mb-2 sm:mb-3 group-hover:bg-blue-200 transition-colors">
                <img src="../assets/icons/goal.png" alt="Targets" class="h-6 w-6 sm:h-8 sm:w-8" />
              </div>
              <span class="text-xs sm:text-sm font-medium text-gray-700 group-hover:text-blue-600 transition-colors">Targets</span>
            </div>
          </router-link>
          
          <router-link to="/savings" class="group">
            <div class="bg-white p-3 sm:p-4 rounded-lg sm:rounded-xl shadow-sm sm:shadow-md hover:shadow-lg transition-all duration-300 flex flex-col items-center">
              <div class="bg-purple-100 p-2 sm:p-3 rounded-full mb-2 sm:mb-3 group-hover:bg-purple-200 transition-colors">
                <img src="../assets/icons/money-box.png" alt="Savings" class="h-6 w-6 sm:h-8 sm:w-8" />
              </div>
              <span class="text-xs sm:text-sm font-medium text-gray-700 group-hover:text-purple-600 transition-colors">Savings</span>
            </div>
          </router-link>
          
          <router-link to="/investments" class="group">
            <div class="bg-white p-3 sm:p-4 rounded-lg sm:rounded-xl shadow-sm sm:shadow-md hover:shadow-lg transition-all duration-300 flex flex-col items-center">
              <div class="bg-yellow-100 p-2 sm:p-3 rounded-full mb-2 sm:mb-3 group-hover:bg-yellow-200 transition-colors">
                <img src="../assets/icons/invest.png" alt="Investments" class="h-6 w-6 sm:h-8 sm:w-8" />
              </div>
              <span class="text-xs sm:text-sm font-medium text-gray-700 group-hover:text-yellow-600 transition-colors">Investments</span>
            </div>
          </router-link>
        </div>
      </div>

      <!-- Educational Resources -->
      <div class="mb-8 sm:mb-12">
        <h2 class="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6 pb-2 border-b border-gray-200">Financial Education</h2>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          <router-link to="/monocomy" class="group">
            <div class="bg-white rounded-lg sm:rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300">
              <div class="bg-gradient-to-r from-green-400 to-blue-500 h-1.5 sm:h-2"></div>
              <div class="p-4 sm:p-6">
                <div class="flex items-center mb-3 sm:mb-4">
                  <div class="bg-green-100 p-1.5 sm:p-2 rounded-lg mr-3 sm:mr-4">
                    <img src="../assets/icons/creative-education.png" alt="Monocomy" class="h-5 w-5 sm:h-6 sm:w-6" />
                  </div>
                  <h3 class="text-sm sm:text-base font-semibold text-gray-800 group-hover:text-green-600 transition-colors">Personal Finance</h3>
                </div>
                <p class="text-xs sm:text-sm text-gray-600">Master budgeting, saving, and debt management strategies.</p>
              </div>
            </div>
          </router-link>
          
          <router-link to="/smmes" class="group">
            <div class="bg-white rounded-lg sm:rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300">
              <div class="bg-gradient-to-r from-blue-400 to-purple-500 h-1.5 sm:h-2"></div>
              <div class="p-4 sm:p-6">
                <div class="flex items-center mb-3 sm:mb-4">
                  <div class="bg-blue-100 p-1.5 sm:p-2 rounded-lg mr-3 sm:mr-4">
                    <img src="../assets/icons/smmes.png" alt="SMMEs" class="h-5 w-5 sm:h-6 sm:w-6" />
                  </div>
                  <h3 class="text-sm sm:text-base font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">Small Business</h3>
                </div>
                <p class="text-xs sm:text-sm text-gray-600">Financial management for small and medium enterprises.</p>
              </div>
            </div>
          </router-link>
          
          <router-link to="/crypto" class="group">
            <div class="bg-white rounded-lg sm:rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300">
              <div class="bg-gradient-to-r from-purple-400 to-pink-500 h-1.5 sm:h-2"></div>
              <div class="p-4 sm:p-6">
                <div class="flex items-center mb-3 sm:mb-4">
                  <div class="bg-purple-100 p-1.5 sm:p-2 rounded-lg mr-3 sm:mr-4">
                    <img src="../assets/icons/wallet.png" alt="Crypto" class="h-5 w-5 sm:h-6 sm:w-6" />
                  </div>
                  <h3 class="text-sm sm:text-base font-semibold text-gray-800 group-hover:text-purple-600 transition-colors">Digital Assets</h3>
                </div>
                <p class="text-xs sm:text-sm text-gray-600">Understand cryptocurrency and blockchain investments.</p>
              </div>
            </div>
          </router-link>
        </div>
      </div>

      <!-- Financial Tip of the Day -->
      <div class="bg-gradient-to-r from-green-500 to-blue-600 rounded-lg sm:rounded-xl p-4 sm:p-6 shadow-lg text-white mb-8 sm:mb-12">
        <div class="flex items-start">
          <div class="bg-white bg-opacity-20 p-2 sm:p-3 rounded-lg mr-3 sm:mr-4">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <h3 class="text-lg sm:text-xl font-bold mb-1 sm:mb-2">Financial Tip of the Day</h3>
            <p class="text-xs sm:text-sm opacity-90">Automate your savings by setting up a direct deposit from your paycheck to a separate savings account. Start with just 5-10% of your income.</p>
          </div>
        </div>
      </div>
    </div>

    <footerBar />
  </div>
</template>

<style scoped>
/* Base font size for mobile */
html {
  font-size: 14px;
}

/* Larger font size for tablets */
@media (min-width: 640px) {
  html {
    font-size: 15px;
  }
}

/* Even larger for desktop */
@media (min-width: 1024px) {
  html {
    font-size: 16px;
  }
}

/* Font smoothing */
body {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* Responsive typography scale */
.text-2xs {
  font-size: 0.625rem; /* 10px */
  line-height: 1rem;
}

/* Touch targets for mobile */
a, button {
  min-width: 44px;
  min-height: 44px;
}

/* Optimize images for mobile */
img {
  max-width: 100%;
  height: auto;
}

/* Smooth transitions */
.transition-all {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 200ms;
}

/* Prevent layout shifts */
img, svg, video, canvas {
  vertical-align: middle;
}

/* Responsive line heights */
p, li {
  line-height: 1.5;
}

/* Active link state */
.router-link-active {
  @apply text-green-600 font-medium;
}

/* Focus states for accessibility */
a:focus, button:focus {
  @apply outline-none ring-2 ring-green-500 ring-offset-2;
}
</style>