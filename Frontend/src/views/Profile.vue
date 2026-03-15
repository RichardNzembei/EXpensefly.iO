<script setup>
import { ref, onMounted, computed } from "vue";
import { useRouter } from "vue-router";
import { useFetchUser } from "@/stores/fetchUser";
import { useUserStore } from "@/stores/userStore";
import navigationBar from "@/components/navigationBar.vue";
import imageUpload from "@/components/imageUpload.vue";
import info from "@/components/info.vue";
import { useToast } from "@/composables/useToast";

const router = useRouter();
const fetchUserStore = useFetchUser();
const userStore = useUserStore();
const showAbout = ref(false);
const { info: toastInfo } = useToast();

onMounted(() => { userStore.initializeUser(); });

const userId = computed(() => userStore.user?.id || localStorage.getItem('userId'));
const user = computed(() => userStore.user);

const fullName = computed(() => {
  return user.value ? `${user.value.first_name.toUpperCase()} ${user.value.last_name.toUpperCase()}` : '';
});

const formattedPhone = computed(() => {
  if (!user.value?.phone) return '';
  const cleaned = user.value.phone.replace(/\D/g, '');
  return `+254 ${cleaned.slice(3, 6)} ${cleaned.slice(6, 9)} ${cleaned.slice(9)}`;
});

const handleLogout = () => { userStore.logout(); router.push('/login'); };
const toggleAbout = () => { showAbout.value = !showAbout.value; };

const shareProfile = async () => {
  try {
    const shareData = { title: 'My Financial Dashboard', text: `Check out ${fullName.value}'s financial management dashboard`, url: window.location.href };
    if (navigator.share) {
      await navigator.share(shareData);
    } else {
      await navigator.clipboard.writeText(window.location.href);
      toastInfo('Link copied to clipboard!');
    }
  } catch (err) { console.error('Error sharing:', err); }
};
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <navigationBar/>
    <div class="max-w-3xl mx-auto px-4 sm:px-6 pt-16 pb-20 md:pb-6">
      <div class="pt-4 pb-2">
        <h1 class="text-xl font-semibold text-gray-900">Account</h1>
        <p class="text-sm text-gray-500 mt-0.5">Manage your profile and settings</p>
      </div>

      <!-- Profile Card -->
      <div class="card p-5 mt-4">
        <div class="flex items-center gap-4">
          <div class="shrink-0"><imageUpload/></div>
          <div class="min-w-0">
            <h2 class="text-lg font-bold text-gray-900 truncate">{{ fullName }}</h2>
            <p class="text-sm text-gray-500 flex items-center gap-1 mt-0.5">
              <svg class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" /></svg>
              {{ formattedPhone }}
            </p>
          </div>
        </div>
      </div>

      <!-- Settings -->
      <div class="card mt-4 divide-y divide-gray-50">
        <div @click="shareProfile" class="flex items-center p-4 hover:bg-gray-50 cursor-pointer transition-colors">
          <div class="bg-emerald-50 p-2 rounded-lg mr-3">
            <svg class="h-5 w-5 text-emerald-600" viewBox="0 0 20 20" fill="currentColor"><path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" /></svg>
          </div>
          <div class="flex-grow">
            <h3 class="text-sm font-medium text-gray-900">Share Profile</h3>
            <p class="text-xs text-gray-500">Invite others to view your dashboard</p>
          </div>
          <svg class="h-5 w-5 text-gray-300" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" /></svg>
        </div>
        <div @click="handleLogout" class="flex items-center p-4 hover:bg-gray-50 cursor-pointer transition-colors">
          <div class="bg-red-50 p-2 rounded-lg mr-3">
            <svg class="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clip-rule="evenodd" /></svg>
          </div>
          <div class="flex-grow">
            <h3 class="text-sm font-medium text-gray-900">Log Out</h3>
            <p class="text-xs text-gray-500">Sign out of your account</p>
          </div>
          <svg class="h-5 w-5 text-gray-300" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" /></svg>
        </div>
        <div @click="toggleAbout" class="flex items-center p-4 hover:bg-gray-50 cursor-pointer transition-colors">
          <div class="bg-emerald-50 p-2 rounded-lg mr-3">
            <svg class="h-5 w-5 text-emerald-600" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9z" clip-rule="evenodd" /></svg>
          </div>
          <div class="flex-grow">
            <h3 class="text-sm font-medium text-gray-900">App Information</h3>
            <p class="text-xs text-gray-500">Learn more about this application</p>
          </div>
          <svg class="h-5 w-5 text-gray-300" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" /></svg>
        </div>
      </div>
    </div>

    <!-- About panel -->
    <transition name="fade"><div v-if="showAbout" class="fixed inset-0 bg-black/30 z-40" @click="showAbout = false"></div></transition>
    <transition name="slide-up">
      <div v-if="showAbout" class="fixed bottom-0 left-0 right-0 bg-white rounded-t-xl shadow-xl z-50 p-4" style="height: 70vh;">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-base font-bold text-gray-900">App Information</h2>
          <button @click="toggleAbout" class="p-1 rounded-lg hover:bg-gray-100"><svg class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" /></svg></button>
        </div>
        <div class="h-[calc(70vh-56px)] overflow-y-auto"><info /></div>
      </div>
    </transition>
  </div>
</template>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity 0.3s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
.slide-up-enter-active, .slide-up-leave-active { transition: transform 0.3s ease, opacity 0.3s ease; }
.slide-up-enter-from, .slide-up-leave-to { transform: translateY(100%); opacity: 0; }
</style>
