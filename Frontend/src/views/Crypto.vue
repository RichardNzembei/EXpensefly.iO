<template>
    <div class="min-h-screen bg-gradient-to-br from-gray-50 to-green-50">
    
      <navigationBar />
      <div class="container mx-auto px-4 py-6 mt-12">
        <!-- Back button with improved styling -->
        <RouterLink 
          to="/dashboard" 
          class="flex items-center text-blue-600 hover:text-blue-800 mb-6 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clip-rule="evenodd" />
          </svg>
          <span class="ml-2 text-sm sm:text-base">Back to Dashboard</span>
        </RouterLink>
  
        <!-- Main content -->
        <main class="bg-white rounded-xl shadow-md overflow-hidden max-w-4xl mx-auto">
          <!-- Hero section with gradient background -->
          <div class="bg-gradient-to-r from-purple-600 to-indigo-500 p-6 sm:p-8 text-white">
            <div class="flex flex-col sm:flex-row items-center">
              <div class="mb-4 sm:mb-0 sm:mr-6">
                <img 
                  src="../assets/icons/cryptocurrencies.png" 
                  alt="Cryptocurrency Illustration" 
                  class="w-20 h-20 sm:w-24 sm:h-24 object-contain"
                />
              </div>
              <div>
                <h1 class="text-md sm:text-xl font-bold mb-2 text-center sm:text-left">
                  Cryptocurrency Guide
                </h1>
                <p class="text-sm sm:text-base text-purple-100 text-center sm:text-left">
                  Understanding digital currencies and blockchain technology
                </p>
              </div>
            </div>
          </div>
  
          <!-- Stats cards -->
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 p-6">
            <div class="bg-purple-50 p-4 rounded-lg border border-purple-100">
              <h3 class="text-xs sm:text-sm font-medium text-purple-800">Market Cap</h3>
              <p class="text-lg sm:text-xl font-bold text-purple-600">$1.2T+</p>
              <p class="text-xs text-purple-500">Global cryptocurrency market</p>
            </div>
            <div class="bg-purple-50 p-4 rounded-lg border border-purple-100">
              <h3 class="text-xs sm:text-sm font-medium text-purple-800">Active Users</h3>
              <p class="text-lg sm:text-xl font-bold text-purple-600">300M+</p>
              <p class="text-xs text-purple-500">Worldwide crypto users</p>
            </div>
            <div class="bg-purple-50 p-4 rounded-lg border border-purple-100">
              <h3 class="text-xs sm:text-sm font-medium text-purple-800">Blockchains</h3>
              <p class="text-lg sm:text-xl font-bold text-purple-600">10,000+</p>
              <p class="text-xs text-purple-500">Active projects</p>
            </div>
          </div>
  
          <!-- Main content sections -->
          <div class="p-6 sm:p-8 space-y-6">
            <section class="space-y-4">
              <h2 class="text-md font-bold text-purple-700 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M11 17a1 1 0 001.447.894l4-2A1 1 0 0017 15V9.236a1 1 0 00-1.447-.894l-4 2a1 1 0 00-.553.894V17zM15.211 6.276a1 1 0 000-1.788l-4.764-2.382a1 1 0 00-.894 0L4.789 4.488a1 1 0 000 1.788l4.764 2.382a1 1 0 00.894 0l4.764-2.382zM4.447 8.342A1 1 0 003 9.236V15a1 1 0 00.553.894l4 2A1 1 0 009 17v-5.764a1 1 0 00-.553-.894l-4-2z" />
                </svg>
                Blockchain Technology
              </h2>
              <p class="text-gray-700 text-sm sm:text-base">
                Cryptocurrencies operate on blockchain technology, a decentralized digital ledger that records transactions across many computers. This ensures that records cannot be altered retroactively without altering all subsequent blocks and network consensus.
              </p>
              <p class="text-gray-700 text-sm sm:text-base">
                Blockchain enables secure peer-to-peer transactions without intermediaries like banks, reducing costs and increasing transaction speed, especially for cross-border payments.
              </p>
            </section>
  
            <section class="space-y-4">
              <h2 class="text-md font-bold text-purple-700 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9z" clip-rule="evenodd" />
                </svg>
                Key Considerations
              </h2>
              <ul class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <li class="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-yellow-500 mr-2 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
                  </svg>
                  <span class="text-gray-700 text-sm sm:text-base">High volatility - prices can swing dramatically</span>
                </li>
                <li class="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-yellow-500 mr-2 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
                  </svg>
                  <span class="text-gray-700 text-sm sm:text-base">Regulatory uncertainty in many countries</span>
                </li>
                <li class="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-yellow-500 mr-2 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
                  </svg>
                  <span class="text-gray-700 text-sm sm:text-base">Security risks of digital wallets</span>
                </li>
                <li class="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-yellow-500 mr-2 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
                  </svg>
                  <span class="text-gray-700 text-sm sm:text-base">Environmental concerns with mining</span>
                </li>
              </ul>
            </section>
  
            <section class="space-y-4">
              <h2 class="text-md font-bold text-purple-700 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                </svg>
                Getting Started
              </h2>
              <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div class="bg-indigo-50 p-4 rounded-lg border border-indigo-100">
                  <h3 class="font-medium text-indigo-800 mb-2 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd" />
                    </svg>
                    Secure Storage
                  </h3>
                  <p class="text-sm text-indigo-700">
                    Use hardware wallets for large amounts and reputable exchanges for trading. Never share private keys.
                  </p>
                </div>
                <div class="bg-indigo-50 p-4 rounded-lg border border-indigo-100">
                  <h3 class="font-medium text-indigo-800 mb-2 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9z" clip-rule="evenodd" />
                    </svg>
                    Start Small
                  </h3>
                  <p class="text-sm text-indigo-700">
                    Begin with a small investment you can afford to lose while learning the market dynamics.
                  </p>
                </div>
                <div class="bg-indigo-50 p-4 rounded-lg border border-indigo-100">
                  <h3 class="font-medium text-indigo-800 mb-2 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z" clip-rule="evenodd" />
                    </svg>
                    Research
                  </h3>
                  <p class="text-sm text-indigo-700">
                    Understand each cryptocurrency's purpose, technology, and team before investing.
                  </p>
                </div>
              </div>
            </section>
          </div>
  
          <!-- Call to action -->
          <div class="bg-purple-50 p-6 sm:p-8 text-center border-t border-purple-100">
            <h3 class="text-md sm:text-lg font-bold text-purple-700 mb-3">Ready to explore cryptocurrencies?</h3>
            <p class="text-sm sm:text-base text-purple-600 mb-4 max-w-2xl mx-auto">
              Start with reputable exchanges and always prioritize security when dealing with digital assets.
            </p>
            <button class="px-6 py-2 bg-purple-600 text-white text-sm sm:text-base font-medium rounded-md hover:bg-purple-700 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2">
              Learn More About Crypto
            </button>
          </div>
        </main>
      </div>
    </div>
  </template>
  
  <script setup>
  import navigationBar from '@/components/navigationBar.vue';
  </script>
  
  <style scoped>
  /* Smooth transitions for hover effects */
  button, .bg-indigo-50, .bg-purple-50 {
    transition: all 0.2s ease-in-out;
  }
  
  /* Responsive typography */
  @media (max-width: 640px) {
    .text-3xl {
      font-size: 1.5rem;
    }
    .text-xl {
      font-size: 1.25rem;
    }
  }
  </style>