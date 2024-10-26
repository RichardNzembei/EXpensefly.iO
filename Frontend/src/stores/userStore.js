// stores/userStore.js
import { defineStore } from 'pinia';

const apiBaseUrl = process.env.NODE_ENV === 'production'
  ? 'https://expensefly-io-1.onrender.com'
  : 'http://localhost:3000';

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null
  }),
  actions: {
    async register(phone, first_name, last_name, email, password) {
      const response = await fetch(`${apiBaseUrl}/api/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone, first_name, last_name, email, password })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Registration failed');
      }

      return response.json();
    },

    async login(phone, password) {
      try {
        const response = await fetch(`${apiBaseUrl}/api/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ phone, password })
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Login failed');
        }
        
        const data = await response.json();
        this.user = data.user;
        localStorage.setItem('userId', data.user.id);
        localStorage.setItem('user', JSON.stringify(data.user));

        return true;
      } catch (error) {
        console.error('Login error:', error.message || error);
        return false;
      }
    },

    initializeUser() {
      const user = localStorage.getItem('user');
      if (user) {
        this.user = JSON.parse(user);
      }
    },

    logout() {
      this.user = null;
      localStorage.removeItem('user');
      localStorage.removeItem('userId');
    }
  }
});
