<script setup>
import { ref,onMounted, computed } from 'vue';
import imageUpload from './imageUpload.vue';
import { useFetchUser } from '@/stores/fetchUser';
import { useUserStore } from '@/stores/userStore';
import { useRouter } from 'vue-router';

const router = useRouter();
const store = useFetchUser();
const userStore = useUserStore();

const imageData = ref("");
const userId = computed(() => store.user?.phone || localStorage.getItem('userId'));
const user = computed(() => userStore.user);
const vTooltip = {
  mounted(el, binding) {
    const span = document.createElement('span');
    span.textContent = binding.value;
    span.className = 'tooltip-text';

    span.style.position = 'absolute';
    
    span.style.color = 'sky-blue';
    span.style.padding = '5px';
    span.style.borderRadius = '4px';
    span.style.whiteSpace = 'nowrap';
    span.style.display = 'none';
    span.style.zIndex = '1000';
    span.style.marginTop = '40px';

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
onMounted(() => {
  const storedImage = localStorage.getItem("uploadedImage");
  if (storedImage) {
    imageData.value = storedImage;
  }
});
const defaultProfileImage = new URL(
  "../assets/img/profile.png",
  import.meta.url
).href;

const fName = computed(() => {
  return user.value ? user.value.first_name.charAt(0).toUpperCase() + user.value.first_name.slice(1) : '';
});
</script>

<template>
  <div class="flex items-center justify-between shadow-xl rounded-lg p-4 border border-b-2 bg-white">
    <h1 class="font-sans lg:text-3xl text-green-600 hover:text-green-800 transition duration-300 text-lg">
      EXpensefly.iO
    </h1>
    <RouterLink to="/profile">
      <p class="flex space-x-2" v-tooltip="'view profile'">
 
        <img :src="imageData || defaultProfileImage" alt="Profile Image"
        class="w-10 h-10 object-cover rounded-full border" @error="imageData = defaultProfileImage" />
        <span class="mt-2 text-mono text-medium">Hello,,<strong>{{ fName }}😊</strong></span>

      </p>
    </RouterLink>
  </div>
</template>