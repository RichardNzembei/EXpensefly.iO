<script setup>
import { useRoute } from 'vue-router';
import { computed } from 'vue';

const route = useRoute();

const tabs = [
  { name: 'Home', path: '/dashboard', icon: 'home' },
  { name: 'Expenses', path: '/expenses', icon: 'expenses' },
  { name: 'Savings', path: '/savings', icon: 'savings' },
  { name: 'Goals', path: '/targets', icon: 'goals' },
  { name: 'Learn', path: '/monocomy', icon: 'learn' },
];

const isActive = (path) => {
  if (path === '/dashboard') return route.path === '/dashboard' || route.path === '/';
  if (path === '/monocomy') return ['/monocomy', '/crypto', '/smmes'].includes(route.path);
  return route.path === path;
};
</script>

<template>
  <nav class="fixed bottom-0 left-0 right-0 z-50 md:hidden h-16 bg-white border-t border-gray-100">
    <div class="flex items-center justify-around h-full px-2">
      <RouterLink
        v-for="tab in tabs"
        :key="tab.path"
        :to="tab.path"
        class="flex flex-col items-center justify-center flex-1 h-full transition-colors"
        :class="isActive(tab.path) ? 'text-emerald-600' : 'text-gray-400'"
      >
        <!-- Home -->
        <svg v-if="tab.icon === 'home'" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
        <!-- Expenses -->
        <svg v-else-if="tab.icon === 'expenses'" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <!-- Savings -->
        <svg v-else-if="tab.icon === 'savings'" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
        <!-- Goals -->
        <svg v-else-if="tab.icon === 'goals'" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
        <!-- Learn -->
        <svg v-else-if="tab.icon === 'learn'" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
        <span class="text-[10px] mt-0.5 font-medium">{{ tab.name }}</span>
      </RouterLink>
    </div>
  </nav>
</template>
