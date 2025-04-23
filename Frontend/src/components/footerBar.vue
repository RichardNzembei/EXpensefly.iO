<template>
  <footer class="footer bg-gradient-to-r from-gray-800 to-gray-900 text-white py-8 mt-16">
    <div class="container mx-auto px-4">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
        <!-- Company Info -->
        <div class="mb-6 md:mb-0">
          <h3 class="text-xl font-bold mb-4 flex items-center">
            <span class="text-green-400">EX</span>pensifly.iO.KE
          </h3>
          <p class="text-gray-300 text-sm mb-4">
            Your smart expense management solution for effortless financial tracking.
          </p>
          <div class="flex space-x-4">
            <a href="#" class="text-gray-300 hover:text-green-400 transition-colors">
              <span class="sr-only">Facebook</span>
              <i class="fab fa-facebook-f text-lg"></i>
            </a>
            <a href="#" class="text-gray-300 hover:text-green-400 transition-colors">
              <span class="sr-only">Twitter</span>
              <i class="fab fa-twitter text-lg"></i>
            </a>
            <a href="#" class="text-gray-300 hover:text-green-400 transition-colors">
              <span class="sr-only">LinkedIn</span>
              <i class="fab fa-linkedin-in text-lg"></i>
            </a>
          </div>
        </div>

        <!-- Quick Links -->
        <div>
          <h4 class="text-lg font-semibold mb-4">Quick Links</h4>
          <ul class="space-y-2">
            <li>
              <router-link 
                to="/dashboard" 
                class="text-gray-300 hover:text-green-400 transition-colors text-sm"
              >
                Dashboard
              </router-link>
            </li>
            <li>
              <router-link 
                to="/expenses" 
                class="text-gray-300 hover:text-green-400 transition-colors text-sm"
              >
                Expenses
              </router-link>
            </li>
            <li>
              <router-link 
                to="/reports" 
                class="text-gray-300 hover:text-green-400 transition-colors text-sm"
              >
                Reports
              </router-link>
            </li>
            <li>
              <router-link 
                to="/settings" 
                class="text-gray-300 hover:text-green-400 transition-colors text-sm"
              >
                Settings
              </router-link>
            </li>
          </ul>
        </div>

        <!-- Resources -->
        <div>
          <h4 class="text-lg font-semibold mb-4">Resources</h4>
          <ul class="space-y-2">
            <li>
              <a href="#" class="text-gray-300 hover:text-green-400 transition-colors text-sm">
                Documentation
              </a>
            </li>
            <li>
              <a href="#" class="text-gray-300 hover:text-green-400 transition-colors text-sm">
                Help Center
              </a>
            </li>
            <li>
              <a href="#" class="text-gray-300 hover:text-green-400 transition-colors text-sm">
                API Reference
              </a>
            </li>
            <li>
              <a href="#" class="text-gray-300 hover:text-green-400 transition-colors text-sm">
                Community Forum
              </a>
            </li>
          </ul>
        </div>

        <!-- Contact -->
        <div>
          <h4 class="text-lg font-semibold mb-4">Contact Us</h4>
          <address class="not-italic text-gray-300 text-sm">
            <div class="mb-2">
              <i class="fas fa-map-marker-alt mr-2 text-green-400"></i>
              Nairobi, Kenya
            </div>
            <div class="mb-2">
              <i class="fas fa-phone-alt mr-2 text-green-400"></i>
              +254 716899396
            </div>
            <div class="mb-2">
              <i class="fas fa-envelope mr-2 text-green-400"></i>
              Richardreuben67@gmail.com
            </div>
          </address>
        </div>
      </div>

      <div class="border-t border-gray-700 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center">
        <p class="text-gray-400 text-sm mb-4 md:mb-0">
          &copy; {{ new Date().getFullYear() }} EXpensifly.iO.KE. All rights reserved.
        </p>
        <div class="flex space-x-6">
          <a href="#" class="text-gray-400 hover:text-green-400 transition-colors text-sm">
            Privacy Policy
          </a>
          <a href="#" class="text-gray-400 hover:text-green-400 transition-colors text-sm">
            Terms of Service
          </a>
          <a href="#" class="text-gray-400 hover:text-green-400 transition-colors text-sm">
            Cookies
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
// You can add any component logic here if needed
</script>

<style scoped>
.footer {
  box-shadow: 0 -4px 6px -1px rgba(0, 0, 0, 0.1);
}

/* Smooth transitions for hover effects */
a, button {
  transition: all 0.3s ease;
}

/* Accessibility focus styles */
a:focus, button:focus {
  outline: 2px solid #4ade80;
  outline-offset: 2px;
}
</style>