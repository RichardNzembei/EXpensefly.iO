<script setup>
import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';
import { useFetchUser } from '@/stores/fetchUser';
import { useUserStore } from '@/stores/userStore';

const route = useRoute();
const store = useFetchUser();
const userStore = useUserStore();

const user = computed(() => userStore.user);
const imageData = ref(localStorage.getItem("uploadedImage") || "");
const defaultProfileImage = new URL("../assets/img/profile.png", import.meta.url).href;

const fName = computed(() => {
  return user.value ? user.value.first_name.charAt(0).toUpperCase() + user.value.first_name.slice(1) : '';
});

const navLinks = [
  { name: 'Dashboard', path: '/dashboard' },
  { name: 'Expenses', path: '/expenses' },
  { name: 'Savings', path: '/savings' },
  { name: 'Goals', path: '/targets' },
  { name: 'Learn', path: '/monocomy' },
];

const isActive = (path) => {
  if (path === '/dashboard') return route.path === '/dashboard' || route.path === '/';
  if (path === '/monocomy') return ['/monocomy', '/crypto', '/smmes'].includes(route.path);
  return route.path === path;
};
</script>

<template>
  <nav class="fixed top-0 w-full z-50 h-14 bg-white border-b border-gray-100">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
      <div class="flex items-center justify-between h-full">
        <!-- Logo -->
        <RouterLink to="/dashboard" class="flex items-center">
          <span class="text-lg font-semibold text-emerald-600">ExpenseFly.io</span>
        </RouterLink>

        <!-- Desktop nav links -->
        <div class="hidden md:flex items-center gap-1">
          <RouterLink
            v-for="link in navLinks"
            :key="link.path"
            :to="link.path"
            class="px-3 py-1.5 text-sm font-medium rounded-lg transition-colors"
            :class="isActive(link.path) ? 'text-emerald-600 bg-emerald-50' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'"
          >
            {{ link.name }}
          </RouterLink>
        </div>

        <!-- Profile / Sign In -->
        <div class="flex items-center">
          <RouterLink
            v-if="user"
            to="/profile"
            class="flex items-center gap-2"
          >
            <img
              :src="imageData || defaultProfileImage"
              alt="Profile"
              class="w-8 h-8 object-cover rounded-full border border-gray-200"
              @error="imageData = defaultProfileImage"
            />
            <span class="hidden md:block text-sm text-gray-700 font-medium">{{ fName }}</span>
          </RouterLink>
          <RouterLink
            v-else
            to="/login"
            class="btn-primary text-sm py-1.5 px-4"
          >
            Sign In
          </RouterLink>
        </div>
      </div>
    </div>
  </nav>
</template>
