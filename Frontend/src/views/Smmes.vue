<script setup>
import navigationBar from '@/components/navigationBar.vue';
import { useRouter } from 'vue-router';
import { ref } from 'vue';
import router from '@/router';
const isModalOpen=ref(true)
const toDashBoard=()=>{
    router.push('/dashboard')
}
</script>
<template>
    <navigationBar/>
    <div v-if="isModalOpen" class="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-75">
        <div class="bg-white rounded-lg p-6 max-w-sm mx-auto text-center">
            <h2 class="text-xl font-semibold text-green-600">Under Development</h2>
            <p class="text-gray-700 mt-2">This feature is currently being developed. Please check back later!</p>
            <button @click="toDashBoard" class="mt-4 w-full py-2 bg-green-600 text-white font-semibold rounded-md shadow hover:bg-green-500 focus:ring focus:ring-green-200 transition duration-200 ease-in-out">
                Back
            </button>
        </div>
    </div>
    <h2>SSMEs</h2>
</template>