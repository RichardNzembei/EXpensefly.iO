<script setup>
import { ref, onMounted, computed } from "vue";
import { useRouter } from "vue-router";
import { useFetchUser } from "@/stores/fetchUser";
import { useUserStore } from "@/stores/userStore";
import navigationBar from "@/components/navigationBar.vue";
import imageUpload from "@/components/imageUpload.vue";
import info from "@/components/info.vue";

const router = useRouter();
const fetchUserStore = useFetchUser();
const userStore = useUserStore();
const showAbout = ref(false);

// Reactive state
const activeTab = ref('dashboard');
const showMobileMenu = ref(false);

// User data
onMounted(() => {
  userStore.initializeUser();
});

const userId = computed(() => userStore.user?.id || localStorage.getItem('userId'));
const user = computed(() => userStore.user);

const fullName = computed(() => {
  return user.value ? `${user.value.first_name.toUpperCase()} ${user.value.last_name.toUpperCase()}` : '';
});

const formattedPhone = computed(() => {
  if (!user.value?.phone) return '';
  const cleaned = user.value.phone.replace(/\D/g, '');
  return `+254 ${cleaned.slice(3, 6)} ${cleaned.slice(6, 9)} ${cleaned.slice(9)}`;
});

// Navigation functions
const navigateTo = (route) => {
  router.push(route);
  activeTab.value = route;
  showMobileMenu.value = false;
};

const handleLogout = () => {
  userStore.logout();
  router.push('/login');
};

const toggleAbout = () => {
  showAbout.value = !showAbout.value;
};

const shareProfile = async () => {
  try {
    const shareData = {
      title: 'My Financial Dashboard',
      text: `Check out ${fullName.value}'s financial management dashboard`,
      url: window.location.href
    };
    
    if (navigator.share) {
      await navigator.share(shareData);
    } else {
      // Fallback for browsers that don't support Web Share API
      await navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  } catch (err) {
    console.error('Error sharing:', err);
  }
};
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 to-green-50">
    <navigationBar/>
    <!-- Back button -->
    <div class="container mx-auto px-4 py-4 mt-12">
      <RouterLink 
        to="/dashboard" 
        class="flex items-center text-blue-600 hover:text-blue-800 transition-colors"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clip-rule="evenodd" />
        </svg>
        <span class="ml-2 text-sm sm:text-base">Back to Dashboard</span>
      </RouterLink>
    </div>

    <!-- Mobile menu button -->
    <div class="sm:hidden flex justify-end px-4">
      <button 
        @click="showMobileMenu = !showMobileMenu"
        class="p-2 rounded-md text-gray-500 hover:text-gray-700 focus:outline-none"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
    </div>

    <!-- Main content -->
    <div class="container mx-auto px-4 py-6 max-w-4xl">
      <!-- Header -->
      <div class="text-center mb-8">
        <h1 class="text-2xl sm:text-3xl font-bold text-gray-800">Account Dashboard</h1>
        <p class="text-sm sm:text-base text-gray-600 mt-2">Manage your financial profile and settings</p>
      </div>

      <!-- Profile card -->
      <div class="bg-white rounded-xl shadow-md overflow-hidden mb-8">
        <div class="p-6 sm:p-8">
          <div class="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6">
            <div class="relative">
              <imageUpload/>
            </div>
            <div class="text-center sm:text-left">
              <h2 class="text-xl sm:text-2xl font-bold text-gray-800">{{ fullName }}</h2>
              <div class="flex items-center justify-center sm:justify-start mt-2 text-gray-600">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                <span class="text-sm sm:text-base">{{ formattedPhone }}</span>
              </div>
              <div class="mt-3 flex justify-center sm:justify-start space-x-2">
                <button 
                  @click="shareProfile"
                  class="px-3 py-1 bg-blue-50 text-blue-600 text-xs sm:text-sm rounded-full hover:bg-blue-100 transition-colors"
                >
                  Share Profile
                </button>
                <RouterLink 
                  to="/edit-profile"
                  class="px-3 py-1 bg-gray-50 text-gray-600 text-xs sm:text-sm rounded-full hover:bg-gray-100 transition-colors"
                >
                  Edit Profile
                </RouterLink>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Quick Access Cards -->
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div 
          @click="navigateTo('expenses')"
          class="bg-white rounded-lg shadow-sm p-4 flex flex-col items-center cursor-pointer hover:shadow-md transition-shadow"
        >
          <div class="bg-blue-50 p-3 rounded-full mb-3">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 class="text-sm sm:text-base font-medium text-gray-800">Expenses</h3>
          <p class="text-xs text-gray-500 mt-1 text-center">Track and manage your spending</p>
        </div>
        
        <div 
          @click="navigateTo('savings')"
          class="bg-white rounded-lg shadow-sm p-4 flex flex-col items-center cursor-pointer hover:shadow-md transition-shadow"
        >
          <div class="bg-green-50 p-3 rounded-full mb-3">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 class="text-sm sm:text-base font-medium text-gray-800">Savings</h3>
          <p class="text-xs text-gray-500 mt-1 text-center">Grow your financial safety net</p>
        </div>
        
        <div 
          @click="navigateTo('targets')"
          class="bg-white rounded-lg shadow-sm p-4 flex flex-col items-center cursor-pointer hover:shadow-md transition-shadow"
        >
          <div class="bg-purple-50 p-3 rounded-full mb-3">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <h3 class="text-sm sm:text-base font-medium text-gray-800">Targets</h3>
          <p class="text-xs text-gray-500 mt-1 text-center">Set and achieve financial goals</p>
        </div>
      </div>

      <!-- Settings Section -->
      <div class="bg-white rounded-xl shadow-md overflow-hidden">
        <div class="p-6 sm:p-8">
          <h2 class="text-lg sm:text-xl font-bold text-gray-800 mb-6 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clip-rule="evenodd" />
            </svg>
            Account Settings
          </h2>
          
          <div class="space-y-4">
            <div 
              @click="shareProfile"
              class="flex items-center p-3 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors"
            >
              <div class="bg-blue-100 p-2 rounded-full mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
                </svg>
              </div>
              <div class="flex-grow">
                <h3 class="text-sm sm:text-base font-medium text-gray-800">Share Profile</h3>
                <p class="text-xs text-gray-500">Invite others to view your financial dashboard</p>
              </div>
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
              </svg>
            </div>
            
            <div 
              @click="handleLogout"
              class="flex items-center p-3 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors"
            >
              <div class="bg-red-100 p-2 rounded-full mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-red-600" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clip-rule="evenodd" />
                </svg>
              </div>
              <div class="flex-grow">
                <h3 class="text-sm sm:text-base font-medium text-gray-800">Log Out</h3>
                <p class="text-xs text-gray-500">Sign out of your account</p>
              </div>
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
              </svg>
            </div>
            
            <div 
              @click="toggleAbout"
              class="flex items-center p-3 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors"
            >
              <div class="bg-green-100 p-2 rounded-full mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-green-600" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9z" clip-rule="evenodd" />
                </svg>
              </div>
              <div class="flex-grow">
                <h3 class="text-sm sm:text-base font-medium text-gray-800">App Information</h3>
                <p class="text-xs text-gray-500">Learn more about this application</p>
              </div>
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Mobile menu overlay -->
    <transition name="fade">
      <div 
        v-if="showMobileMenu" 
        class="fixed inset-0 bg-black bg-opacity-50 z-40 sm:hidden"
        @click="showMobileMenu = false"
      ></div>
    </transition>

    <!-- Mobile menu -->
    <transition name="slide-up">
      <div 
        v-if="showMobileMenu"
        class="fixed bottom-0 left-0 right-0 bg-white rounded-t-xl shadow-xl z-50 p-4 sm:hidden"
      >
        <div class="grid grid-cols-3 gap-2 mb-4">
          <button 
            @click="navigateTo('expenses')"
            class="flex flex-col items-center p-2 rounded-lg hover:bg-gray-50"
          >
            <div class="bg-blue-50 p-2 rounded-full mb-1">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <span class="text-xs">Expenses</span>
          </button>
          
          <button 
            @click="navigateTo('savings')"
            class="flex flex-col items-center p-2 rounded-lg hover:bg-gray-50"
          >
            <div class="bg-green-50 p-2 rounded-full mb-1">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <span class="text-xs">Savings</span>
          </button>
          
          <button 
            @click="navigateTo('targets')"
            class="flex flex-col items-center p-2 rounded-lg hover:bg-gray-50"
          >
            <div class="bg-purple-50 p-2 rounded-full mb-1">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <span class="text-xs">Targets</span>
          </button>
        </div>
        <button 
          @click="showMobileMenu = false"
          class="w-full py-2 bg-gray-100 rounded-lg text-gray-700 font-medium"
        >
          Close Menu
        </button>
      </div>
    </transition>

    <!-- About overlay -->
    <transition name="slide-up">
      <div 
        v-if="showAbout" 
        class="fixed bottom-0 left-0 right-0 bg-white rounded-t-xl shadow-xl z-50 p-4"
        style="height: 70vh;"
      >
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-lg font-bold text-gray-800">App Information</h2>
          <button 
            @click="toggleAbout"
            class="p-1 rounded-full hover:bg-gray-100"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div class="h-[calc(70vh-56px)] overflow-y-auto">
          <info />
        </div>
      </div>
    </transition>
  </div>
</template>

<style scoped>
/* Transitions */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-up-enter-active,
.slide-up-leave-active {
  transition: transform 0.3s ease, opacity 0.3s ease;
}

.slide-up-enter-from,
.slide-up-leave-to {
  transform: translateY(100%);
  opacity: 0;
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 10px;
}

::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 10px;
}

::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}

/* Responsive adjustments */
@media (min-width: 640px) {
  .slide-up-enter-from,
  .slide-up-leave-to {
    transform: translateY(20px);
  }
}
</style>