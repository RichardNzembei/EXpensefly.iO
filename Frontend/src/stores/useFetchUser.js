import { defineStore } from 'pinia';

export const useFetchUser = defineStore('main', {
  state: () => ({
    user: null,
  }),
  actions: {

    async fetchUserData(userId) {
      try {
        const response = await fetch(`http://localhost:3000/api/user/${userId}`);

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Failed to fetch user data');
        }

        const data = await response.json();
        this.user = data;
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    }
  }
});
