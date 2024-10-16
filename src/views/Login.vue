<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useTogglePassword } from "@/composables/toggle";

const authstore = useAuthStore();
const { isPassVisible, togglePassword } = useTogglePassword();
const router = useRouter();
const email = ref("");
const password = ref("");
const loginUser = () => {
  const loginSuccess = authstore.loginUser(email.value, password.value);
  if (loginSuccess) {
    router.push("/dashboard");
  } else {
    alert("login failed");
  }
};
</script>
<template>
         <div
    class="min-h-screen flex justify-center items-center bg-gradient-to-l from-slate-300 to-sky-400"
  >
    <div class="container max-w-md w-full mx-auto px-3">
      <div class="bg-white p-8 rounded-lg shadow-lg">
        <h3
          class="text-center font-bold text-sky-600 mb-3max-w-full text-2xl border-b-2 p-3"
        >
          Sign In Page
        </h3>
        <form @submit.prevent="loginUser">
          <div class="mb-4">
            <label for="email" class="block text-gray-500 font-medium mb-2"
              >Email</label
            >
            <input
              v-model="email"
              type="text"
              placeholder="enter email"
              class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div class="mb-4 relative">
            <label for="password" class="block text-gray-500 font-medium mb-2"
              >Password</label
            >
            <input
              v-model="password"
              :type="isPassVisible ? 'text' : 'password'"
              placeholder="*******"
              class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <span
              class="absolute right-3 top-10 cursor-pointer text-gray-500 border-l-4 p-1"
              @click="togglePassword"
              >{{ isPassVisible ? "🙈" : "👁️" }}</span
            >
          </div>
          <div>
            <button
              type="submit"
              class="bg-blue-300 rounded-lg p-1 w-full text-white hover:bg-slate-200 hover:text-blue-500"
            >
              Login
            </button>
          </div>
        </form>
        <div class="mt-4 text-center">
          <span>Don't have an account?</span>
          <router-link to="/register" class="text-blue-500 hover:underline"
            >Sign Up</router-link
          >
        </div>
      </div>
    </div>
  </div>
</template>