import { defineStore } from 'pinia';

const apiBaseUrl = process.env.NODE_ENV === 'production'
  ? 'https://expensefly-io-1.onrender.com'
  : 'http://localhost:3000';

export const useFetchUser = defineStore('fetchUser', {
  state: () => ({
    user: null,
  }),
  actions: {
    async initializeUser() {
      const phone = localStorage.getItem('userId');
      if (phone) {
        await this.fetchUserData(phone);
      }
    },

    async fetchUserData(phone) {
      try {
        const response = await fetch(`${apiBaseUrl}/api/user/${phone}`);

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

