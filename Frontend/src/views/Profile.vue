<script setup>
import navigationBar from "@/components/navigationBar.vue";
import { useRouter } from "vue-router";
import { useFetchUser } from "@/stores/useFetchUser";

const router = useRouter()
const toHomePage = () => {
  router.push('/dashboard')
}
const store = useFetchUser()
const userId = store.user?.id || localStorage.getItem('userId');
const user = store.user;
console.log(user)
const fullName=user.first_name.toUpperCase()+' '+ user.last_name.toUpperCase()
const phoneNo=254+user.phone.slice(1)
</script>

<template>
  <navigationBar />
  <span><img src="../assets/icons/thin-arrow.png" alt="" class="h-8 w-8 ml-5" @click="toHomePage"></span>
  <div class="min-h-screen flex justify-center items-center">
    <div class="container max-w-md w-full mx-auto px-3">
      <h2 class="text-center text-slate-500 text-2xl">ACCOUNT</h2>
      <div class="shadow-lg rounded-lg p-5 ">
        <div>
          <p class="flex space-x-2 m-auto">
            <img src="../assets/img/profile.png" alt="profile image" class="h-14 w-14 rounded-xl shadow-xl" />
            <span class="mt-4 text-mono text-slate-700"> {{ phoneNo }} </span>
          </p>
          <span class="ml-14  text-bold">{{ fullName}}</span>
        </div>
        <div class="flex bg-white space-x-2 mt-10">
          <p class="block">
            <img src="../assets/img/expenses.jpg" alt="expenses image" class="rounded-xl shadow-xl h-20">
            <span class="ml-6 text-sky-500">Expenses</span>
          </p>
          <p>
            <img src="../assets/img/savings.jpg" alt="savings image" class="rounded-xl shadow-xl h-20">
            <span class="ml-6 text-sky-500">Savings</span>
          </p>
          <p>
            <img src="../assets/img/targets.jpg" alt="targets image" class="rounded-xl shadow-xl h-20">
            <span class="ml-6 text-sky-500">Targets</span>
          </p>
        </div>
        <div class="space-y-4">
          <h1 class="text-mono text-center p-3 text-slate-700 mt-5">SETTINGS</h1>
          <div class="flex space-x-2">
            <img src="../assets/img/share.jpg" alt="share image" class="h-12">
            <span class="mt-3 hover:text-sky-300">SHARE WEB LINK</span>
          </div>
          <RouterLink to="/login"class="flex space-x-2">
            <img src="../assets/icons/log-out.png" alt="log out image" class="h-12">
            <span class="mt-3 hover:text-sky-300">LOG OUT</span>
          </RouterLink>
        
        </div>
      </div>
    </div>
  </div>
</template>