<script setup>
import { ref, onMounted } from "vue";

const defaultProfileImage = new URL(
  "../assets/img/profile.png",
  import.meta.url
).href;

const imageData = ref("");

function handleFileUpload(event) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();

    reader.onload = (e) => {
      imageData.value = e.target.result;
      localStorage.setItem("uploadedImage", imageData.value);
    };

    reader.readAsDataURL(file);
  }
}

onMounted(() => {
  const storedImage = localStorage.getItem("uploadedImage");
  if (storedImage) {
    imageData.value = storedImage;
  }
});
</script>
<template>
  <div class="relative">
    <img :src="imageData || defaultProfileImage" alt="Profile Image"
      class="w-20 h-20 object-cover rounded-full border" @error="imageData = defaultProfileImage" />

    <label for="fileInput" class="absolute bottom-0 right-0 transform translate-x-1/4 translate-y-1/4 bg-white rounded-full p-1 shadow-md cursor-pointer">
      <img src="../assets/icons/upload.png" class="h-4 w-4" alt="Upload Icon">
      <input id="fileInput" type="file" @change="handleFileUpload" accept="image/*" class="hidden" />
    </label>
</div>
</template>
<style scoped>
@import url("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css");
</style>
