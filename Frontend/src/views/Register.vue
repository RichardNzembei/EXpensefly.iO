<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useTogglePassword } from "@/composables/toggle";
import { useUserStore } from "@/stores/userStore";

const userStore = useUserStore();
const router = useRouter();

const { isPassVisible, togglePassword } = useTogglePassword();

const phone = ref("");
const first_name = ref("");
const last_name = ref("");
const email = ref("");
const password = ref("");

async function registerUser() {
  try {
    const response = await userStore.register(phone.value, first_name.value, last_name.value, email.value, password.value);
    if (response) {
      router.push("/login");
    }
  } catch (error) {
    console.error("Registration failed:", error);
    alert(error.message || "An error occurred during registration.");
  }
}
</script>

<template>
  <div class="mx-auto w-full min-h-screen p-4 bg-gradient-to-r from-white to-green-400">
    <h4 class="text-2xl font-bold text-center mb-2">User Registration!!</h4>
    <p class="text-center text-gray-600 mb-8">Fill the form and submit</p>

    <div class="max-w-lg mx-auto">
      <div class="bg-white shadow-md rounded-lg p-6">
        <form @submit.prevent="registerUser">
          <div class="mb-6">
            <label for="phone" class="block mt-4 mb-2">Phone No</label>
            <input v-model="phone" v-numeric-only type="text" placeholder="07******" required
              class="w-full p-2 border rounded-md" />

            <label for="first_name" class="block mt-4 mb-2">First Name</label>
            <input v-model="first_name" type="text" placeholder="Enter your first name" required
              class="w-full p-2 border rounded-md" />

            <label for="last_name" class="block mt-4 mb-2">Last Name</label>
            <input v-model="last_name" type="text" placeholder="Enter your last name" required
              class="w-full p-2 border rounded-md" />

            <label for="email" class="block mt-4 mb-2">Email</label>
            <input v-model="email" type="email" placeholder="Enter your email" required
              class="w-full p-2 border rounded-md" />

            <div class="mb-4 relative">
              <label class="block text-gray-700 font-medium mb-2">Password</label>
              <input v-model="password" :type="isPassVisible ? 'text' : 'password'" placeholder="*******" required
                class="w-full p-2 border rounded-md" />
              <span class="absolute right-3 top-9 cursor-pointer text-gray-500 border-l-4 p-1" @click="togglePassword">
                {{ isPassVisible ? "🙈" : "👁️" }}
              </span>
            </div>


            <div>
              <button type="submit"
                class="bg-blue-300 rounded-lg p-1 w-full text-white hover:bg-slate-200 hover:text-blue-500">
                Register
              </button>
            </div>
          </div>
        </form>

        <div class="mt-4 text-center">
          <span>Already have an account?</span>
          <router-link to="/login" class="text-green-500 hover:underline">
            Sign In
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>
