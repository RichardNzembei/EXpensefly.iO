<script setup>
import { onMounted, computed } from 'vue';
import { useFetchUser } from '@/stores/useFetchUser';
import { useRouter } from 'vue-router';

const router = useRouter();
const store = useFetchUser();


const userId = computed(() => store.user?.phone || localStorage.getItem('userId'));
const user = computed(() => store.user);
const vTooltip = {
  mounted(el, binding) {
    const span = document.createElement('span');
    span.textContent = binding.value;
    span.className = 'tooltip-text';
    
    span.style.position = 'absolute';
    span.style.backgroundColor = 'white';
    span.style.color = 'blue';
    span.style.padding = '5px';
    span.style.borderRadius = '4px';
    span.style.whiteSpace = 'nowrap';
    span.style.display = 'none'; 
    span.style.zIndex = '1000';
    span.style.marginTop='30px';

    el.style.position = 'relative'; 
    el.appendChild(span);

    el.onmouseenter = () => {
      span.style.display = 'flex';
    };

    el.onmouseleave = () => {
      span.style.display = 'none';
    };
  }
};
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
    <p class="flex space-x-2" @click="toProfilePage" v-tooltip="'my account'">
      <img src="../assets/img/profile.png" alt="profile image" class="rounded-xl shadow-lg" />
      <span class="mt-2 text-mono text-medium">Hello,,<strong>{{ fName }}😊</strong></span>

    </p>

  </div>
</template>