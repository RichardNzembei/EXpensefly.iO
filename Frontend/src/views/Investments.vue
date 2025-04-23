<template>
    <div class=" py-6 px-2 sm:px-3">
      <RouterLink 
        to="/dashboard" 
        class="flex items-center text-blue-600 hover:text-blue-800 mb-6 transition-colors"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clip-rule="evenodd" />
        </svg>
        <span class="ml-2 text-sm sm:text-base">Back to Dashboard</span>
      </RouterLink>
      <div class="max-w-4xl mx-auto">
        <!-- Header -->
        <div class="text-center mb-12">
          <h1 class="text-4xl sm:text-5xl font-bold text-gray-800 mb-4">
            Investment <span class="text-blue-600">Hub</span>
          </h1>
          <p class="text-xl text-gray-600 max-w-2xl mx-auto">
            Our powerful investment tools are coming soon to help grow your wealth
          </p>
        </div>
  
        <!-- Under Development Banner -->
        <div class="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-12 animate-pulse">
          <div class="flex">
            <div class="flex-shrink-0">
              <svg class="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
              </svg>
            </div>
            <div class="ml-3">
              <h3 class="text-lg font-medium text-yellow-800">Under Active Development</h3>
              <div class="mt-2 text-yellow-700">
                <p>We're working hard to bring you advanced investment tracking and analysis tools.</p>
              </div>
            </div>
          </div>
        </div>
  
        <!-- Coming Soon Features -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div class="bg-white p-6 rounded-xl shadow-md border border-gray-200 transform hover:scale-[1.02] transition-all duration-300">
            <div class="flex items-center mb-4">
              <div class="bg-blue-100 p-3 rounded-full mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <h3 class="text-xl font-bold text-gray-800">Portfolio Tracking</h3>
            </div>
            <p class="text-gray-600">Monitor all your investments in one place with real-time performance metrics.</p>
            <div class="mt-4 text-sm text-blue-600 font-medium">Coming Soon</div>
          </div>
  
          <div class="bg-white p-6 rounded-xl shadow-md border border-gray-200 transform hover:scale-[1.02] transition-all duration-300">
            <div class="flex items-center mb-4">
              <div class="bg-green-100 p-3 rounded-full mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 class="text-xl font-bold text-gray-800">Market Analysis</h3>
            </div>
            <p class="text-gray-600">Get insights and trends to help make informed investment decisions.</p>
            <div class="mt-4 text-sm text-blue-600 font-medium">Coming Soon</div>
          </div>
  
          <div class="bg-white p-6 rounded-xl shadow-md border border-gray-200 transform hover:scale-[1.02] transition-all duration-300">
            <div class="flex items-center mb-4">
              <div class="bg-purple-100 p-3 rounded-full mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 class="text-xl font-bold text-gray-800">Risk Assessment</h3>
            </div>
            <p class="text-gray-600">Understand your risk tolerance and get personalized investment recommendations.</p>
            <div class="mt-4 text-sm text-blue-600 font-medium">Coming Soon</div>
          </div>
  
          <div class="bg-white p-6 rounded-xl shadow-md border border-gray-200 transform hover:scale-[1.02] transition-all duration-300">
            <div class="flex items-center mb-4">
              <div class="bg-indigo-100 p-3 rounded-full mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h3 class="text-xl font-bold text-gray-800">Diversification Tools</h3>
            </div>
            <p class="text-gray-600">Optimize your portfolio allocation across different asset classes.</p>
            <div class="mt-4 text-sm text-blue-600 font-medium">Coming Soon</div>
          </div>
        </div>
  
        <!-- Progress Indicator -->
        <div class="bg-white p-6 rounded-xl shadow-md mb-12">
          <h3 class="text-lg font-medium text-gray-900 mb-4">Development Progress</h3>
          <div class="mb-2 flex justify-between">
            <span class="text-sm font-medium text-gray-700">Feature Completion</span>
            <span class="text-sm font-medium text-blue-600">35%</span>
          </div>
          <div class="w-full bg-gray-200 rounded-full h-2.5">
            <div class="bg-blue-600 h-2.5 rounded-full" style="width: 35%"></div>
          </div>
          <p class="mt-3 text-sm text-gray-600">We're making steady progress and will notify you when these tools are ready.</p>
        </div>
  
        <!-- Notification Signup -->
        <div class="bg-blue-50 rounded-xl p-8 text-center">
          <h3 class="text-xl font-bold text-gray-800 mb-3">Want to be notified when we launch?</h3>
          <p class="text-gray-600 mb-6 max-w-md mx-auto">Join our waiting list to get early access to these investment tools.</p>
          <div class="max-w-md mx-auto flex">
            <input 
              type="email" 
              placeholder="Enter your email" 
              class="flex-grow px-4 py-3 rounded-l-lg border border-r-0 border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
            <button class="px-6 py-3 bg-blue-600 text-white font-medium rounded-r-lg hover:bg-blue-700 transition-colors">
              Notify Me
            </button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'InvestmentPage',
    metaInfo: {
      title: 'Investment Hub (Coming Soon)',
      meta: [
        { name: 'description', content: 'Our investment tools are under development. Sign up to be notified when we launch.' }
      ]
    }
  }
  </script>
  
  <style scoped>
  /* Animation for the coming soon cards */
  @keyframes subtlePulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.01); }
  }
  
  .animate-pulse {
    animation: subtlePulse 2s infinite;
  }
  
  /* Transition for hover effects */
  .transform {
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }
  </style>