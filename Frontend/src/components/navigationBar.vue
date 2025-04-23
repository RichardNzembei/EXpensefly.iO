<script setup>
import { ref, onMounted, computed, onBeforeUnmount } from 'vue';
import { useRouter } from 'vue-router';
import { useFetchUser } from '@/stores/fetchUser';
import { useUserStore } from '@/stores/userStore';
import imageUpload from './imageUpload.vue';

const router = useRouter();
const store = useFetchUser();
const userStore = useUserStore();

// Reactive state
const imageData = ref("");
const isNavVisible = ref(true);
const lastScrollPosition = ref(0);
const isScrollingDown = ref(false);
const isHoveringProfile = ref(false);

// Computed properties
const userId = computed(() => store.user?.phone || localStorage.getItem('userId'));
const user = computed(() => userStore.user);
const defaultProfileImage = new URL("../assets/img/profile.png", import.meta.url).href;

const fName = computed(() => {
  return user.value ? user.value.first_name.charAt(0).toUpperCase() + user.value.first_name.slice(1) : '';
});

// Handle scroll behavior
const handleScroll = () => {
  const currentScrollPosition = window.pageYOffset || document.documentElement.scrollTop;
  
  if (currentScrollPosition < 0) return;
  
  // Stop hiding navbar when at top of page
  if (currentScrollPosition <= 0) {
    isNavVisible.value = true;
    return;
  }
  
  isScrollingDown.value = currentScrollPosition > lastScrollPosition.value;
  lastScrollPosition.value = currentScrollPosition;
  
  // Only hide navbar when scrolling down, show when scrolling up
  isNavVisible.value = !isScrollingDown.value;
};

// Initialize user data
onMounted(async () => {
  if (!userId.value) {
    router.push('/login');
  } else {
    await store.initializeUser();
    if (!user.value) {
      await store.fetchUserData(userId.value);
    }
  }
  
  // Check for stored image
  const storedImage = localStorage.getItem("uploadedImage");
  if (storedImage) {
    imageData.value = storedImage;
  }
  
  // Add scroll event listener
  window.addEventListener('scroll', handleScroll);
});

// Cleanup
onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>

<template>
  <nav 
    class="fixed top-0 w-full z-50 transition-all duration-500 ease-in-out"
    :class="{
      'transform translate-y-0': isNavVisible,
      'transform -translate-y-full': !isNavVisible,
      'shadow-lg': lastScrollPosition > 10,
      'bg-white/90 backdrop-blur-sm': lastScrollPosition > 10,
      'bg-white': lastScrollPosition <= 10
    }"
  >
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <!-- Logo -->
        <div class="flex-shrink-0 flex items-center">
          <RouterLink 
            to="/dashboard" 
            class="flex items-center space-x-2 group"
          >
            <span class="text-green-600 group-hover:text-green-800 transition-colors duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </span>
            <h1 
              class="font-sans text-xl md:text-2xl font-bold text-green-600 group-hover:text-green-800 transition-colors duration-300"
            >
              ExpenseFly.io
            </h1>
          </RouterLink>
        </div>

        <!-- Profile Section -->
        <div class="ml-4 flex items-center md:ml-6">
          <RouterLink 
            to="/profile" 
            class="flex items-center space-x-2 group relative"
            @mouseenter="isHoveringProfile = true"
            @mouseleave="isHoveringProfile = false"
          >
            <!-- Profile Image -->
            <div class="relative">
              <img 
                :src="imageData || defaultProfileImage" 
                alt="Profile Image"
                class="w-10 h-10 object-cover rounded-full border-2 border-green-200 hover:border-green-400 transition-all duration-300"
                @error="imageData = defaultProfileImage"
              />
              <!-- Online status indicator -->
              <span class="absolute bottom-0 right-0 block h-3 w-3 rounded-full bg-green-400 ring-2 ring-white"></span>
            </div>

            <!-- Greeting Text -->
            <div class="hidden md:block">
              <p class="text-sm text-gray-700 group-hover:text-gray-900 transition-colors duration-300">
                Hello, <span class="font-semibold">{{ fName }}</span>
                <span class="ml-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">😊</span>
              </p>
            </div>

            <!-- Tooltip -->
            <transition
              enter-active-class="transition-opacity duration-200 ease-out"
              enter-from-class="opacity-0"
              enter-to-class="opacity-100"
              leave-active-class="transition-opacity duration-150 ease-in"
              leave-from-class="opacity-100"
              leave-to-class="opacity-0"
            >
              <div 
                v-if="isHoveringProfile"
                class="absolute top-full mt-2 right-0 w-48 bg-white rounded-md shadow-lg py-1 z-50"
              >
                <p class="block px-4 py-2 text-sm text-gray-700">View Profile</p>
              </div>
            </transition>
          </RouterLink>
        </div>
      </div>
    </div>
  </nav>
</template>

<style scoped>
/* Custom scroll behavior */
nav {
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), 
              background-color 0.3s ease,
              box-shadow 0.3s ease;
}

/* Smooth transitions for hover effects */
.group:hover .group-hover\:text-green-800 {
  transition: color 0.3s ease;
}

.group:hover .group-hover\:text-gray-900 {
  transition: color 0.3s ease;
}

.group:hover .group-hover\:border-green-400 {
  transition: border-color 0.3s ease;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  nav {
    @apply px-2;
  }
}
</style>