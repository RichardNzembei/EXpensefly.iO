<script setup>
import { onMounted, watch, computed } from 'vue';
import { useUserStore } from '@/stores/userStore';
import { useFetchUser } from './stores/fetchUser';
import { useExpensesStore } from '@/stores/expensesStore';
import { useRouter, useRoute } from 'vue-router';
import { useTargetStore } from '@/stores/targetStore';
import { useSavingsStore } from './stores/savingStore';
import ToastContainer from './components/ToastContainer.vue';
import BottomNav from './components/BottomNav.vue';

const targetStore = useTargetStore();
const savingStore = useSavingsStore();
const userStore = useUserStore();
const fetchUserStore = useFetchUser();
const expensesStore = useExpensesStore();
const router = useRouter();
const route = useRoute();

const isAuthPage = computed(() => ['login', 'register'].includes(route.name));

onMounted(async () => {
  await userStore.initializeUser();
  if (userStore.user) {
    await fetchUserStore.fetchUserData(userStore.user.id);
    await expensesStore.fetchExpenses();
    await targetStore.fetchTargets();
    await savingStore.fetchSavings();
  }
});

watch(
  () => userStore.user,
  (newUser) => {
    if (!newUser && route.meta.requiresAuth) {
      router.push('/login');
    }
  }
);
</script>

<template>
  <ToastContainer />
  <RouterView />
  <BottomNav v-if="!isAuthPage" />
</template>
