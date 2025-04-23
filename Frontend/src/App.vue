<script setup>
import { onMounted, watch } from 'vue';
import { useUserStore } from '@/stores/userStore';
import { useFetchUser } from './stores/fetchUser'; 
import { useExpensesStore } from '@/stores/expensesStore';
import { useRouter } from 'vue-router';
import { useTargetStore } from '@/stores/targetStore';
import { useSavingsStore } from './stores/savingStore';
import navigationBar from './components/navigationBar.vue';

const targetStore = useTargetStore();

const savingStore=useSavingsStore()
const userStore = useUserStore();
const fetchUserStore = useFetchUser();
const expensesStore = useExpensesStore();
const router = useRouter();

onMounted(async () => {
  await userStore.initializeUser();
  if (!userStore.user) {
    router.push('/login');
  } else {
    await fetchUserStore.fetchUserData(userStore.user.id);
    await expensesStore.fetchExpenses();
    await targetStore.fetchTargets();
    await savingStore.fetchSavings();
  }
});


watch(
  () => userStore.user,
  (newUser) => {
    if (!newUser) {
      router.push('/login');
    }
  }
);
</script>


<template>
 <div class="min-h-screen bg-gradient-to-br from-gray-50 to-green-50">
  <navigationBar />
 <div class="mt-16 ">
  <RouterView />
 </div>
 </div>
</template>