<template>
    <navigationBar />
    <span>
        <RouterLink to="/dashboard">
            <img src="../assets/icons/thin-arrow.png" alt="" class="h-8 w-8 ml-5">
        </RouterLink>
    </span>
    <div class="flex flex-col items-center  h-screen ">
        <div class=" p-8 max-w-lg w-full">
            <h2 class="text-blue-600 text-xl font-bold mb-6 text-center">Small and Medium Enterprises (SMEs)</h2>

            <div class="mb-4 flex justify-center">
                <img src="../assets/icons/money-bag.png" alt="SME image" class="w-16 h-16" />
            </div>

            <p class="text-gray-700  text-sm text-center mb-4">
                Small and Medium Enterprises (SMEs) are vital for economic growth, innovation, and job creation.
                They contribute significantly to the local economy and help diversify industries.
            </p>
            <p class="text-gray-700 text-sm text-center mb-4">
                Despite facing challenges like limited access to finance and intense competition from larger companies,
                SMEs are known for their agility and ability to adapt quickly to market changes.
            </p>
            <p class="text-gray-700 text-sm text-center mb-4">
                Supporting SMEs is crucial for fostering entrepreneurship and driving sustainable development.
            </p>

        </div>
    </div>
</template>

<script setup>
import navigationBar from '@/components/navigationBar.vue';
</script>

<style scoped>
/* Add any additional styles here if needed */
</style>