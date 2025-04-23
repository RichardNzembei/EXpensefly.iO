<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useTogglePassword } from "@/composables/toggle"; 
import { useUserStore } from "@/stores/userStore"; 
import { validateEmail, validatePhone, validatePassword } from "@/utils/validators";

const userStore = useUserStore();
const router = useRouter();
const { isPassVisible, togglePassword } = useTogglePassword();

// Form fields
const form = ref({
  phone: "",
  first_name: "",
  last_name: "",
  email: "",
  password: ""
});

const errors = ref({
  phone: "",
  first_name: "",
  last_name: "",
  email: "",
  password: ""
});

const loading = ref(false);
const showSuccess = ref(false);

const validateForm = () => {
  let isValid = true;
  
  // Reset errors
  errors.value = {
    phone: "",
    first_name: "",
    last_name: "",
    email: "",
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

  // Name validation
  if (!form.value.first_name) {
    errors.value.first_name = "First name is required";
    isValid = false;
  }

  if (!form.value.last_name) {
    errors.value.last_name = "Last name is required";
    isValid = false;
  }

  // Email validation
  if (!form.value.email) {
    errors.value.email = "Email is required";
    isValid = false;
  } else if (!validateEmail(form.value.email)) {
    errors.value.email = "Please enter a valid email address";
    isValid = false;
  }

  // Password validation
  if (!form.value.password) {
    errors.value.password = "Password is required";
    isValid = false;
  } else if (!validatePassword(form.value.password)) {
    errors.value.password = "Password must be at least 8 characters with uppercase, lowercase, and a number";
    isValid = false;
  }

  return isValid;
};

async function registerUser() {
  if (!validateForm()) return;

  loading.value = true;
  
  try {
    const response = await userStore.register(
      form.value.phone,
      form.value.first_name,
      form.value.last_name,
      form.value.email,
      form.value.password
    );
    
    if (response) {
      showSuccess.value = true;
      setTimeout(() => {
        router.push("/login");
      }, 2000);
    }
  } catch (error) {
    console.error("Registration failed:", error);
    // Handle specific error messages from API
    if (error.response?.data?.message) {
      alert(error.response.data.message);
    } else {
      alert(error.message || "An error occurred during registration.");
    }
  } finally {
    loading.value = false;
  }
}
</script>

<template>
  <div class="min-h-screen bg-gradient-to-r from-white to-green-400 py-12 px-4 sm:px-6 lg:px-8">
    <!-- Loading overlay -->
    <div v-if="loading" class="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-30">
      <div class="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-green-500"></div>
    </div>

    <!-- Success message -->
    <transition name="fade">
      <div v-if="showSuccess" class="fixed top-4 right-4 z-50">
        <div class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative">
          <strong class="font-bold">Success!</strong>
          <span class="block sm:inline"> Registration successful. Redirecting to login...</span>
        </div>
      </div>
    </transition>

    <div class="max-w-md mx-auto">
      <div class="text-center mb-8">
        <h1 class="text-3xl font-extrabold text-gray-900">Create an Account</h1>
        <p class="mt-2 text-sm text-gray-600">
          Join our community and start your journey
        </p>
      </div>

      <div class="bg-white shadow-xl rounded-lg overflow-hidden">
        <div class="p-8">
          <form @submit.prevent="registerUser" novalidate>
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

            <!-- Name Fields -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <label for="first_name" class="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                <input
                  v-model="form.first_name"
                  id="first_name"
                  type="text"
                  placeholder="Saint"
                  :class="{'border-red-500': errors.first_name}"
                  class="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-green-500 transition"
                />
                <p v-if="errors.first_name" class="mt-1 text-sm text-red-600">{{ errors.first_name }}</p>
              </div>
              <div>
                <label for="last_name" class="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                <input
                  v-model="form.last_name"
                  id="last_name"
                  type="text"
                  placeholder="Reborn"
                  :class="{'border-red-500': errors.last_name}"
                  class="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-green-500 transition"
                />
                <p v-if="errors.last_name" class="mt-1 text-sm text-red-600">{{ errors.last_name }}</p>
              </div>
            </div>

            <!-- Email Field -->
            <div class="mb-6">
              <label for="email" class="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
              <input
                v-model="form.email"
                id="email"
                type="email"
                placeholder="saint.reborn@example.com"
                :class="{'border-red-500': errors.email}"
                class="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-green-500 transition"
              />
              <p v-if="errors.email" class="mt-1 text-sm text-red-600">{{ errors.email }}</p>
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
              <p class="mt-1 text-xs text-gray-500">
                Password must be at least 8 characters with uppercase, lowercase, and a number
              </p>
            </div>

            <!-- Submit Button -->
            <button
              type="submit"
              :disabled="loading"
              class="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition disabled:opacity-75 disabled:cursor-not-allowed"
            >
              <span v-if="loading">Creating Account...</span>
              <span v-else>Create Account</span>
            </button>
          </form>

          <div class="mt-6 text-center">
            <p class="text-sm text-gray-600">
              Already have an account?
              <router-link
                to="/login"
                class="font-medium text-green-600 hover:text-green-500 ml-1"
              >
                Sign in
              </router-link>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>