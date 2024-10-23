<template>
  <RouterView />
</template>

<script setup>
import { onMounted, watch } from 'vue';
import { useStore } from '@/stores/useStore';
import { useRouter } from 'vue-router';

const store = useStore();
const router = useRouter();

onMounted(async () => {

  await store.initializeUser();
  if (!store.user) {
    router.push('/login');
  } else {
    await store.fetchUserData(store.user.id);
  }
});


watch(
  () => store.user,
  (newUser) => {
    if (!newUser) {
      router.push('/login');
    }
  }
);
</script>