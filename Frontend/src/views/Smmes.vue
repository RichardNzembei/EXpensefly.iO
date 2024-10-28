<template>
    <navigationBar />
    <div class="bg-cover bg-center bg-no-repeat rounded-lg shadow-lg mt-2 h-screen  bg-black bg-opacity-50"
        :style="{ 'background-image': `url(${smmesImage})`, 'opacity': 4 }">
        <span>
            <RouterLink to="/dashboard">
                <img src="../assets/icons/thin-arrow.png" alt="" class="h-8 w-8 ml-5">
            </RouterLink>
        </span>
        <div class="flex flex-col items-center justify-center  bg-black bg-opacity-50">

            <h2 class="text-green-900 text-4xl font-bold mb-6 text-center">Small and Medium Enterprises (SMEs)</h2>
            <p class="text-white text-lg text-center max-w-2xl mb-4">
                Small and Medium Enterprises (SMEs) are vital for economic growth, innovation, and job creation.
                They contribute significantly to the local economy and help diversify industries.
            </p>
            <p class="text-white text-lg text-center max-w-2xl mb-4">
                Despite facing challenges like limited access to finance and intense competition from larger companies,
                SMEs are known for their agility and ability to adapt quickly to market changes.
            </p>
            <p class="text-white text-lg text-center max-w-2xl mb-4">
                Supporting SMEs is crucial for fostering entrepreneurship and driving sustainable development.
            </p>
            <button
                class="mt-4 px-6 py-2 bg-blue-500 text-white font-semibold rounded shadow hover:bg-blue-600 transition">
                Learn More
            </button>
        </div>
    </div>
</template>

<script setup>
import navigationBar from '@/components/navigationBar.vue';
import smmesImage from '../assets/img/SMMEs.jpg';
</script>