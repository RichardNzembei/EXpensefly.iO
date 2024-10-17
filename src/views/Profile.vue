<script setup>
import navigationBar from "@/components/navigationBar.vue";
import { useRouter } from "vue-router";
const router=useRouter()
const toHomePage
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
            <img
              src="../assets/img/profile.png"
              alt="profile image"
              class="h-14 w-14 rounded-xl shadow-xl"
            />
            <span class="mt-4 text-mono text-slate-700"> 254716899396 </span>
          </p>
          <span class="ml-14  text-bold">RICHARD NZEMBEI REUBEN</span>
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
            <h1 class="text-mono text-center p-3 text-slate-700 mt-5" >SETTINGS</h1>
            <div class="flex space-x-2">
                <img src="../assets/img/share.jpg" alt="share image" class="h-12">
                <span class="mt-3">SHARE WEB LINK</span>
            </div>
            <div class="flex space-x-2" @click="logout">
                <img src="../assets/icons/log-out.png" alt="log out image" class="h-12">
                <span class="mt-3">LOG OUT</span>
            </div>
        </div>
      </div>
    </div>
  </div>
</template>