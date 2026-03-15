<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useTogglePassword } from "@/composables/toggle";
import { useUserStore } from "@/stores/userStore";
import { validatePhone } from "@/utils/validators";
const userStore = useUserStore();
const { isPassVisible, togglePassword } = useTogglePassword();
const router = useRouter();

const form = ref({
  phone: "",
  password: ""
});

const errors = ref({
  phone: "",
  password: ""
});

const loading = ref(false);

const validateForm = () => {
  let isValid = true;
  errors.value = { phone: "", password: "" };

  if (!form.value.phone) {
    errors.value.phone = "Phone number is required";
    isValid = false;
  } else if (!validatePhone(form.value.phone)) {
    errors.value.phone = "Please enter a valid phone number (e.g. 0712345678)";
    isValid = false;
  }

  if (!form.value.password) {
    errors.value.password = "Password is required";
    isValid = false;
  }

  return isValid;
};

const loginUser = async () => {
  if (!validateForm()) return;

  loading.value = true;
  try {
    const loginSuccess = await userStore.login(form.value.phone, form.value.password);
    if (loginSuccess) {
      router.push("/dashboard");
    } else {
      errors.value.password = "Invalid phone number or password";
    }
  } catch (error) {
    console.error("Error during login:", error);
    if (error.response?.data?.message) {
      errors.value.password = error.response.data.message;
    } else {
      errors.value.password = "An error occurred during login. Please try again.";
    }
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <!-- Loading overlay -->
    <div v-if="loading" class="fixed inset-0 flex items-center justify-center z-50 bg-white/60">
      <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-600"></div>
    </div>

    <div class="w-full max-w-md space-y-6">
      <div class="text-center">
        <RouterLink to="/dashboard" class="text-lg font-semibold text-emerald-600">ExpenseFly.io</RouterLink>
        <h2 class="mt-4 text-2xl font-bold text-gray-900">Welcome Back</h2>
        <p class="mt-1 text-sm text-gray-500">Sign in to access your account</p>
      </div>

      <div class="card p-8">
        <form @submit.prevent="loginUser" novalidate>
          <div class="mb-5">
            <label for="phone" class="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
            <input
              v-model="form.phone"
              id="phone"
              v-numeric-only
              type="text"
              placeholder="0716******"
              :class="{'border-red-300 focus:ring-red-500': errors.phone}"
              class="input-field"
            />
            <p v-if="errors.phone" class="mt-1 text-sm text-red-500">{{ errors.phone }}</p>
          </div>

          <div class="mb-5">
            <label for="password" class="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <div class="relative">
              <input
                v-model="form.password"
                id="password"
                :type="isPassVisible ? 'text' : 'password'"
                placeholder="Enter your password"
                :class="{'border-red-300 focus:ring-red-500': errors.password}"
                class="input-field pr-12"
              />
              <button
                type="button"
                @click="togglePassword"
                class="absolute inset-y-0 right-0 px-3 flex items-center text-gray-400 hover:text-gray-600"
              >
                <svg v-if="!isPassVisible" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                  <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <svg v-else class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                </svg>
              </button>
            </div>
            <p v-if="errors.password" class="mt-1 text-sm text-red-500">{{ errors.password }}</p>
          </div>

          <div class="flex items-center mb-5">
            <input
              id="remember-me"
              name="remember-me"
              type="checkbox"
              class="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
            />
            <label for="remember-me" class="ml-2 block text-sm text-gray-600">
              Remember me
            </label>
          </div>

          <button
            type="submit"
            :disabled="loading"
            class="w-full btn-primary py-3 disabled:opacity-75 disabled:cursor-not-allowed"
          >
            <span v-if="loading">Signing In...</span>
            <span v-else>Sign In</span>
          </button>
        </form>

        <div class="mt-5 text-center">
          <p class="text-sm text-gray-500">
            Don't have an account?
            <router-link to="/register" class="font-medium text-emerald-600 hover:text-emerald-700 ml-1">Sign up</router-link>
          </p>
        </div>
      </div>

      <div class="text-center">
        <router-link to="/dashboard" class="text-sm text-gray-500 hover:text-emerald-600 underline underline-offset-2">
          Continue as Guest
        </router-link>
      </div>
    </div>
  </div>
</template>
