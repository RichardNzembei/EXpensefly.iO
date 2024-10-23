// App.vue
<script setup>
import { onMounted, watch } from 'vue';
import { useStore } from '@/stores/useStore';
import { useFetchUser } from '@/stores/useFetchUser';
import { useRouter } from 'vue-router';

const store = useStore();
const fetchUserStore = useFetchUser();
const router = useRouter();

onMounted(async () => {
  await store.initializeUser();
  if (!store.user) {
    router.push('/login');
  } else {
    await fetchUserStore.fetchUserData(store.user.id);
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

Copy code
<template>
  <RouterView />
</template>