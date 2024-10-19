import { defineStore } from 'pinia';

export const useFetchUser = defineStore('main', {
  state: () => ({
    user: null,
  }),
  actions: {

    async fetchUserData(userId) {
      try {
        const response = await fetch(`https://expensefly-io-1.onrender.com/api/user/${userId}`);

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
