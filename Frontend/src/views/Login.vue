<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useTogglePassword } from "@/composables/toggle";
import { useUserStore } from "@/stores/userStore";

const userStore = useUserStore();
const { isPassVisible, togglePassword } = useTogglePassword();
const router = useRouter();

const phone = ref("");
const password = ref("");
const loading = ref(false);

const loginUser = async () => {
  loading.value = true;
  try {
    const loginSuccess = await userStore.login(phone.value, password.value);
    if (loginSuccess) {
      router.push("/dashboard");
    } else {
      alert("Login failed. Please check your credentials.");
    }
  } catch (error) {
    console.error("Error during login:", error);
    alert("An error occurred during login.");
  } finally {
    loading.value = false;
  }
};
</script>


<template>
  <div class="min-h-screen flex justify-center items-center bg-gradient-to-l from-green-200 to-green-800">
    <div v-if="loading" class="absolute inset-0 flex items-center justify-center z-50 bg-gray-100 bg-opacity-75">
      <div class="animate-spin rounded-full h-16 w-16 border-t-4 border-green-500 border-solid"></div>
    </div>
    <div class="container max-w-md w-full mx-auto px-3">
      <div class="bg-white p-8 rounded-lg shadow-lg">
        <h3 class="text-center font-bold text-sky-600 mb-3 max-w-full text-2xl border-b-2 p-3">
          Sign In
        </h3>
        <form @submit.prevent="loginUser">
          <div class="mb-4">
            <label for="phone" class="block text-gray-500 font-medium mb-2">Phone</label>
            <input v-model="phone" v-numeric-only type="text" placeholder="07*******"
              class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required />
          </div>
          <div class="mb-4 relative">
            <label for="password" class="block text-gray-500 font-medium mb-2">Password</label>
            <input v-model="password" :type="isPassVisible ? 'text' : 'password'" placeholder="*******"
              class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required />
            <span class="absolute right-3 top-10 cursor-pointer text-gray-500 border-l-4 p-1" @click="togglePassword">
              {{ isPassVisible ? "🙈" : "👁️" }}
            </span>
          </div>
          <div>
            <button type="submit"
              class="bg-blue-300 rounded-lg p-1 w-full text-white hover:bg-slate-200 hover:text-blue-500"
              :disabled="loading">
              <span v-if="loading">Loading...</span>
              <span v-else>Login</span>
            </button>
          </div>
        </form>
        <div class="mt-4 text-center">
          <span>Don't have an account?</span>
          <router-link to="/register" class="text-green-500 hover:underline">
            Sign Up
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>
