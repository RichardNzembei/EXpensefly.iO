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
  if (!store.userId) {
    router.push('/login');
  } else {

    await store.fetchUserData(store.userId);
  }
});
watch(
  () => store.userId,
  (newUserId) => {
    if (!newUserId) {
      router.push('/login');
    }
  }
);
</script>
