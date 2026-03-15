<script setup>
defineProps({
  height: { type: String, default: '80px' }
});
</script>

<template>
  <div class="card p-4 animate-pulse" :style="{ minHeight: height }">
    <div class="h-3 bg-gray-200 rounded w-1/3 mb-3"></div>
    <div class="h-6 bg-gray-200 rounded w-2/3 mb-2"></div>
    <div class="h-3 bg-gray-200 rounded w-1/4"></div>
  </div>
</template>
