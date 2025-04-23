<template>
    <div class="min-h-screen bg-gradient-to-br from-gray-50 to-green-50">
      <navigationBar /> 
      <div class="container mx-auto px-4 py-8 mt-12">
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
          <div class="bg-gradient-to-r from-blue-600 to-blue-400 p-6 sm:p-8 text-white">
            <div class="flex flex-col sm:flex-row items-center">
              <div class="mb-4 sm:mb-0 sm:mr-6">
                <img 
                  src="../assets/icons/money-bag.png" 
                  alt="SME Illustration" 
                  class="w-20 h-20 sm:w-24 sm:h-24 object-contain"
                />
              </div>
              <div>
                <h1 class="text-lg sm:text-3]xl font-bold mb-2 text-center sm:text-left">
                  Small and Medium Enterprises (SMEs)
                </h1>
                <p class="text-sm sm:text-base text-blue-100 text-center sm:text-left">
                  The backbone of economic growth and innovation
                </p>
              </div>
            </div>
          </div>
  
          <!-- Stats cards -->
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 p-6">
            <div class="bg-blue-50 p-4 rounded-lg border border-blue-100">
              <h3 class="text-md sm:text-sm font-medium text-blue-800">Economic Contribution</h3>
              <p class="text-lg sm:text-xl font-bold text-blue-600">40%+</p>
              <p class="text-xs text-blue-500">of GDP in many countries</p>
            </div>
            <div class="bg-blue-50 p-4 rounded-lg border border-blue-100">
              <h3 class="text-xs sm:text-sm font-medium text-blue-800">Employment</h3>
              <p class="text-lg sm:text-xl font-bold text-blue-600">60%+</p>
              <p class="text-xs text-blue-500">of total employment</p>
            </div>
            <div class="bg-blue-50 p-4 rounded-lg border border-blue-100">
              <h3 class="text-xs sm:text-sm font-medium text-blue-800">New Jobs</h3>
              <p class="text-lg sm:text-xl font-bold text-blue-600">80%</p>
              <p class="text-xs text-blue-500">of new jobs created</p>
            </div>
          </div>
  
          <!-- Main content sections -->
          <div class="p-6 sm:p-8 space-y-6">
            <section class="space-y-4">
              <h2 class="text-md font-bold text-blue-700 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clip-rule="evenodd" />
                  <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z" />
                </svg>
                Economic Importance
              </h2>
              <p class="text-gray-700 text-sm sm:text-base">
                Small and Medium Enterprises (SMEs) are the lifeblood of most economies, contributing significantly to GDP, employment, and innovation. In developing countries, they account for up to 40% of national income and create 7 out of 10 jobs.
              </p>
              <p class="text-gray-700 text-sm sm:text-base">
                Their flexibility allows them to adapt quickly to market changes and technological advancements, often serving as incubators for new ideas and business models.
              </p>
            </section>
  
            <section class="space-y-4">
              <h2 class="text-md font-bold text-blue-700 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9z" clip-rule="evenodd" />
                </svg>
                Key Challenges
              </h2>
              <ul class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <li class="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-red-500 mr-2 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
                  </svg>
                  <span class="text-gray-700 text-sm sm:text-base">Limited access to financing and credit facilities</span>
                </li>
                <li class="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-red-500 mr-2 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
                  </svg>
                  <span class="text-gray-700 text-sm sm:text-base">Competition from larger corporations</span>
                </li>
                <li class="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-red-500 mr-2 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
                  </svg>
                  <span class="text-gray-700 text-sm sm:text-base">Regulatory and bureaucratic hurdles</span>
                </li>
                <li class="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-red-500 mr-2 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
                  </svg>
                  <span class="text-gray-700 text-sm sm:text-base">Limited access to new technologies</span>
                </li>
              </ul>
            </section>
  
            <section class="space-y-4">
              <h2 class="text-md font-bold text-blue-700 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                </svg>
                Support & Solutions
              </h2>
              <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div class="bg-green-50 p-4 rounded-lg border border-green-100">
                  <h3 class="font-medium text-green-800 mb-2 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clip-rule="evenodd" />
                    </svg>
                    Financial Support
                  </h3>
                  <p class="text-sm text-green-700">
                    Government grants, low-interest loans, and venture capital can help SMEs overcome financial barriers.
                  </p>
                </div>
                <div class="bg-green-50 p-4 rounded-lg border border-green-100">
                  <h3 class="font-medium text-green-800 mb-2 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clip-rule="evenodd" />
                      <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z" />
                    </svg>
                    Training Programs
                  </h3>
                  <p class="text-sm text-green-700">
                    Business development programs and digital skills training can enhance SME competitiveness.
                  </p>
                </div>
                <div class="bg-green-50 p-4 rounded-lg border border-green-100">
                  <h3 class="font-medium text-green-800 mb-2 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clip-rule="evenodd" />
                    </svg>
                    Technology Access
                  </h3>
                  <p class="text-sm text-green-700">
                    Subsidized access to modern technologies and digital platforms can boost SME productivity.
                  </p>
                </div>
              </div>
            </section>
          </div>
  
          <!-- Call to action -->
          <div class="bg-blue-50 p-6 sm:p-8 text-center border-t border-blue-100">
            <h3 class="text-md sm:text-lg font-bold text-blue-700 mb-3">Ready to support SMEs?</h3>
            <p class="text-sm sm:text-base text-blue-600 mb-4 max-w-2xl mx-auto">
              Whether you're an investor, customer, or policymaker, your support makes a difference in building resilient local economies.
            </p>
            <button class="px-6 py-2 bg-blue-600 text-white text-sm sm:text-base font-medium rounded-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
              Learn How You Can Help
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
  button, .bg-green-50, .bg-blue-50 {
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