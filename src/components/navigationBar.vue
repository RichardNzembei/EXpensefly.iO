<script setup>
import { useRouter } from 'vue-router';
const router=useRouter()
const toProfilePage=()=>{
    router.push('/profile')
}
</script>

<template>
      <div
      class="flex items-center justify-between shadow-xl rounded-lg p-4 border border-b-2 bg-white"
    >
      <h1
        class="font-sans lg:text-3xl text-green-600 hover:text-green-800 transition duration-300 text-xl"
      >
        EXpensefly.iO
      </h1>
      <p class="flex space-x-2" @click="toProfilePage">
        <img
        src="../assets/img/profile.png"
        alt="profile image"
        class="rounded-xl shadow-lg"
      />
      <span class="mt-2 text-mono text-medium">Hello,,<strong>Richard😊</strong></span>
      
      </p>
   
    </div>
</template>