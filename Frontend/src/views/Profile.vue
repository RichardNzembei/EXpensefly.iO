<script setup>
import { ref, onMounted, computed } from "vue";
import { useRouter } from "vue-router";
import { useFetchUser } from "@/stores/fetchUser";
import { useUserStore } from "@/stores/userStore";
import navigationBar from "@/components/navigationBar.vue";
import info from "@/components/info.vue";
const showAbout = ref(false);

const toggleAbout = () => {
  showAbout.value = !showAbout.value;
};

const router = useRouter();
const fetchUserStore = useFetchUser();
const userStore = useUserStore();

onMounted(() => {
  userStore.initializeUser();
});

const userId = computed(() => userStore.user?.id || localStorage.getItem('userId'));
const user = computed(() => userStore.user);

const fullName = computed(() => {
  return user.value ? `${user.value.first_name.toUpperCase()} ${user.value.last_name.toUpperCase()}` : '';
});

const phoneNo = computed(() => {
  return user.value ? `254${user.value.phone.slice(1)}` : '';
});

const handleLogout = () => {
  userStore.logout();
  router.push('/login');
};
</script>


<template>
  <navigationBar />
  <span>
    <RouterLink to="/dashboard">
      <img src="../assets/icons/thin-arrow.png" alt="" class="h-8 w-8 ml-5">
    </RouterLink>
  </span>
  <div class="min-h-screen flex justify-center  text-md">
    <div class="max-w-md w-full mx-auto px-3">
      <h2 class="text-center text-slate-500 text-2xl">ACCOUNT</h2>
      <div class="shadow-xl rounded-lg p-5 ">
        <div>
          <p class="flex space-x-2 m-auto">
            <img src="../assets/img/profile.png" alt="profile image" class="h-14 w-14 rounded-xl shadow-xl" />
            <span class="mt-4 text-mono text-slate-700"> {{ phoneNo }} </span>
          </p>
          <span class="ml-14 text-bold">{{ fullName }}</span>
        </div>
        <div class="flex bg-white space-x-2 mt-10 ">
          <p class="block">
            <img src="../assets/img/expenses.jpg" alt="expenses image" class="rounded-xl shadow-xl h-20">
            <RouterLink to="expenses">
              <span class="ml-6 text-sky-500 hover:underline">Expenses</span>
            </RouterLink>
          </p>
          <p>
            <img src="../assets/img/savings.jpg" alt="savings image" class="rounded-xl shadow-xl h-20">
            <RouterLink to="savings">
              <span class="ml-6 text-sky-500 hover:underline">Savings</span>
            </RouterLink>
          </p>
          <p>
            <img src="../assets/img/targets.jpg" alt="targets image" class="rounded-xl shadow-xl h-20">
            <RouterLink to="targets">
              <span class="ml-6 text-sky-500 hover:underline">Targets</span>
            </RouterLink>
          </p>
        </div>
        <div class="space-y-4">
          <h1 class="text-mono text-center p-3 text-slate-700 mt-5">SETTINGS</h1>
          <div class="flex space-x-2">
            <img src="../assets/img/share.jpg" alt="share image" class="h-12">
            <span class="mt-3 hover:text-sky-300">SHARE WEB LINK</span>
          </div>
          <div @click="handleLogout" class="flex space-x-2 cursor-pointer">
            <img src="../assets/icons/log-out.png" alt="log out image" class="h-12">
            <span class="mt-3 hover:text-sky-300">LOG OUT</span>
          </div>
          <div @click="toggleAbout" class="flex space-x-2 cursor-pointer">
            <img src="../assets/icons/info.png" alt="info icon" class="h-12">
            <span class="mt-3 hover:text-sky-300">INFO</span>
          </div>
        </div>

      </div>
    </div>
  </div>
  <transition name="slide-up">
    <div v-if="showAbout" class="about-overlay">
      <button @click="toggleAbout" class="close-button">Close</button>
      <div class="info-scrollable">
        <info />
      </div>
    </div>
  </transition>
</template>
<style scoped>
.slide-up-enter-active,
.slide-up-leave-active {
  transition: transform 0.3s ease;
}

.slide-up-enter,
.slide-up-leave-to {
  transform: translateY(100%);
}

.about-overlay {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 50vh;
  background-color: rgba(255, 255, 255, 0.9);
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
  box-shadow: 0 -4px 12px rgba(0, 0, 0, 0.2);
  overflow: hidden;
  z-index: 100;
}

.close-button {
  position: absolute;
  top: 1rem;
  right: 1rem;

  color: green;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  cursor: pointer;
  z-index: 101;
}

.info-scrollable {
  max-height: calc(50vh - 3rem);
  overflow-y: auto;
  padding: 1rem;
  margin-top: 50px;
}
</style>
