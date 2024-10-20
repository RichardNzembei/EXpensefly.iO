<script setup>
import { onMounted, computed } from 'vue';
import { useFetchUser } from '@/stores/useFetchUser';
import { useRouter } from 'vue-router';

const router = useRouter();
const store = useFetchUser();


const userId = computed(() => store.user?.phone || localStorage.getItem('userId'));
const user = computed(() => store.user);

onMounted(async () => {
  if (!userId.value) {
    router.push('/login');
  } else {

    await store.initializeUser();
    if (!user.value) {
      await store.fetchUserData(userId.value);
    }
  }
});

const toProfilePage = () => {
  router.push('/profile');
};

const fName = computed(() => {
  return user.value ? user.value.first_name.charAt(0).toUpperCase() + user.value.first_name.slice(1) : '';
});
</script>

<template>
  <div class="flex items-center justify-between shadow-xl rounded-lg p-4 border border-b-2 bg-white">
    <h1 class="font-sans lg:text-3xl text-green-600 hover:text-green-800 transition duration-300 text-xl">
      EXpensefly.iO
    </h1>
    <p class="flex space-x-2" @click="toProfilePage">
      <img src="../assets/img/profile.png" alt="profile image" class="rounded-xl shadow-lg" />
      <span class="mt-2 text-mono text-medium">Hello,,<strong>{{ fName }}😊</strong></span>

    </p>

  </div>
</template>