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
  
  // Reset errors
  errors.value = {
    phone: "",
    password: ""
  };

  // Phone validation
  if (!form.value.phone) {
    errors.value.phone = "Phone number is required";
    isValid = false;
  } else if (!validatePhone(form.value.phone)) {
    errors.value.phone = "Please enter a valid phone number (e.g. 0712345678)";
    isValid = false;
  }

  // Password validation
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
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-l from-white to-green-400 py-12 px-4 sm:px-6 lg:px-8">
    <!-- Loading overlay -->
    <div v-if="loading" class="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-30">
      <div class="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-green-500"></div>
    </div>

    <div class="w-full max-w-md space-y-8">
      <div class="text-center">
        <h2 class="mt-6 text-3xl font-extrabold text-gray-900">Welcome Back</h2>
        <p class="mt-2 text-sm text-gray-600">
          Sign in to access your account
        </p>
      </div>

      <div class="bg-white shadow-xl rounded-lg overflow-hidden">
        <div class="p-8">
          <form @submit.prevent="loginUser" novalidate>
            <!-- Phone Field -->
            <div class="mb-6">
              <label for="phone" class="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
              <input
                v-model="form.phone"
                id="phone"
                v-numeric-only
                type="text"
                placeholder="0716******"
                :class="{'border-red-500': errors.phone}"
                class="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-green-500 transition"
              />
              <p v-if="errors.phone" class="mt-1 text-sm text-red-600">{{ errors.phone }}</p>
            </div>

            <!-- Password Field -->
            <div class="mb-6">
              <label for="password" class="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <div class="relative">
                <input
                  v-model="form.password"
                  id="password"
                  :type="isPassVisible ? 'text' : 'password'"
                  placeholder="••••••••"
                  :class="{'border-red-500': errors.password}"
                  class="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-green-500 transition pr-12"
                />
                <button
                  type="button"
                  @click="togglePassword"
                  class="absolute inset-y-0 right-0 px-3 flex items-center text-gray-500 hover:text-gray-700"
                >
                  <span class="text-lg">{{ isPassVisible ? "🙈" : "👁️" }}</span>
                </button>
              </div>
              <p v-if="errors.password" class="mt-1 text-sm text-red-600">{{ errors.password }}</p>
            </div>

            <!-- Remember Me & Forgot Password -->
            <div class="flex items-center justify-between mb-6">
              <div class="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  class="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                />
                <label for="remember-me" class="ml-2 block text-sm text-gray-700">
                  Remember me
                </label>
              </div>
              <div class="text-sm">
                <router-link
                  to="/forgot-password"
                  class="font-medium text-green-600 hover:text-green-500"
                >
                  Forgot password?
                </router-link>
              </div>
            </div>

            <!-- Submit Button -->
            <button
              type="submit"
              :disabled="loading"
              class="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition disabled:opacity-75 disabled:cursor-not-allowed"
            >
              <span v-if="loading">Signing In...</span>
              <span v-else>Sign In</span>
            </button>
          </form>

          <div class="mt-6 text-center">
            <p class="text-sm text-gray-600">
              Don't have an account?
              <router-link
                to="/register"
                class="font-medium text-green-600 hover:text-green-500 ml-1"
              >
                Sign up
              </router-link>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>