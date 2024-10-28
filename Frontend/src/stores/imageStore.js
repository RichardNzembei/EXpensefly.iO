import { defineStore } from 'pinia';
import { useUserStore } from './userStore';

const apiBaseUrl = process.env.NODE_ENV === 'production'
  ? 'https://your-production-url.com'
  : 'http://localhost:3000';

export const useImageStore = defineStore('imageStore', {
  state: () => ({
    images: [] 
  }),

  actions: {
    getCurrentUserId() {
      const userStore = useUserStore();
      return userStore.user ? userStore.user.id : null;
    },

    async uploadImage(file) {
      const userId = this.getCurrentUserId();
      if (!userId) {
        console.warn('User not logged in, cannot upload image.');
        return;
      }

      try {
        const formData = new FormData();
        formData.append('userId', userId);
        formData.append('image', file);

        const response = await fetch(`${apiBaseUrl}/api/images/upload`, {
          method: 'POST',
          body: formData,
        });

        if (!response.ok) {
          const errorResult = await response.json();
          console.error('Failed to upload image:', errorResult);
          return errorResult;
        }

        const result = await response.json();
        this.images.push(result);
        console.log('Image uploaded successfully:', result);
        return result;
      } catch (error) {
        console.error('Error uploading image:', error);
        return { message: 'Server error', error };
      }
    },

    async fetchImages() {
        const userId = this.getCurrentUserId();
      
        if (!userId) {
          console.warn('User not logged in, cannot fetch images.');
          return;
        }
      
        try {
          const response = await fetch(`${apiBaseUrl}/api/images/${userId}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
          });
      
          if (!response.ok) {
            const errorResult = await response.json();
            console.error('Failed to fetch images:', errorResult);
            return errorResult;
          }
      
          const result = await response.json();
          this.images = result.images; // Ensure you are setting the right property
          console.log('Fetched images:', JSON.parse(JSON.stringify(this.images))); // Deep clone to avoid proxy output
          return this.images;
      
        } catch (error) {
          console.error('Error fetching images:', error);
          return { message: 'Server error', error };
        }
      },
      
    async deleteImage(imageId) {
      const userId = this.getCurrentUserId();
      if (!userId) {
        console.warn('User not logged in, cannot delete image.');
        return;
      }

      try {
        const response = await fetch(`${apiBaseUrl}/api/images/delete/${imageId}`, {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId }),
        });

        if (!response.ok) {
          const errorResult = await response.json();
          console.error('Failed to delete image:', errorResult);
          return errorResult;
        }

        this.images = this.images.filter(image => image.id !== imageId);
        console.log('Image deleted successfully');
        return { message: 'Image deleted successfully' };
      } catch (error) {
        console.error('Error deleting image:', error);
        return { message: 'Server error', error };
      }
    }
  }
});
