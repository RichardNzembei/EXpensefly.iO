<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useTogglePassword } from "@/composables/toggle";


// Auth store and router
const authstore = useAuthStore();
const router = useRouter();

// Toggle password visibility composable
const { isPassVisible, togglePassword } = useTogglePassword();

// Form fields
const email = ref("");
const password = ref("");
const role = ref("");
const fName = ref("");
const lName = ref("");

// Register user function
const registerUser = () => {
  authstore.registerUser(
    email.value,
    password.value,
    role.value,
    fName.value,
    lName.value
  );
  router.push("/");
};
</script>

<template>
  <div class="container mx-auto p-4">
    <h4 class="text-2xl font-bold text-center mb-2">User Registration!!</h4>
    <p class="text-center text-gray-600 mb-8">Fill the form and submit</p>

    <div class="max-w-lg mx-auto">
      <div class="bg-white shadow-md rounded-lg p-6">
        <form @submit.prevent="registerUser">
          <div class="mb-6">
            <label for="fName" class="block mt-4 mb-2">First Name</label>
            <input
              v-model="fName"
              type="text"
              placeholder="Enter your first name"
              required
              class="w-full p-2 border rounded-md"
            />

            <label for="lName" class="block mt-4 mb-2">Last Name</label>
            <input
              v-model="lName"
              type="text"
              placeholder="Enter your last name"
              required
              class="w-full p-2 border rounded-md"
            />

            <label class="block mt-4 mb-2">Role</label>
            <select
              v-model="role"
              required
              class="w-full p-3 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option disabled value="">Select Role</option>
              <option value="product engineer">Product Engineer</option>
              <option value="product manager">Product Manager</option>
              <option value="CTO">CTO</option>
              <option value="frontend dev">Frontend Dev</option>
              <option value="backend dev">Backend Dev</option>
            </select>

            <label for="email" class="block mt-4 mb-2">Email</label>
            <input
              v-model="email"
              type="email"
              placeholder="Enter your email"
              required
              class="w-full p-2 border rounded-md"
            />

            <div class="mb-4 relative">
              <label class="block text-gray-700 font-medium mb-2"
                >Password</label
              >
              <input
                v-model="password"
                :type="isPassVisible ? 'text' : 'password'"
                placeholder="*******"
                required
                class="w-full p-2 border rounded-md"
              />
              <span
                class="absolute right-3 top-9 cursor-pointer text-gray-500 border-l-4 p-1"
                @click="togglePassword"
                >{{ isPassVisible ? "🙈" : "👁️" }}</span
              >
            </div>

            <!-- Submit Button -->
            <div>
              <button
                type="submit"
                class="bg-blue-300 rounded-lg p-1 w-full text-white hover:bg-slate-200 hover:text-blue-500"
              >
                Register
              </button>
            </div>
          </div>
        </form>

        <!-- Already have an account link -->
        <div class="mt-4 text-center">
          <span>Already have an account?</span>
          <router-link to="/" class="text-blue-500 hover:underline">
            Sign In
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>
