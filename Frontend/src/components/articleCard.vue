<script setup>
defineProps(['title', 'content']);
</script>
<template>
    <div
        class="article-card border border-gray-200 rounded-lg shadow-md p-4 transition-transform transform hover:scale-105 bg-white">
        <h2 class="font-semibold text-xl text-gray-800 mb-2">{{ title }}</h2>
        <p class="text-gray-600">{{ content }}</p>
    </div>
</template>
<style scoped>
.article-card {
    transition: transform 0.2s;
}
</style>