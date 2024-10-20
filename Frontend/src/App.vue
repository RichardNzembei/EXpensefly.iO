<template>
  <RouterView />
</template>

<script setup>
import { onMounted } from 'vue';
import { useStore } from '@/stores/useStore';

const store = useStore();

onMounted(() => {
  store.initializeUser();
});
</script>
