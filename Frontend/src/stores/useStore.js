import { defineStore } from 'pinia';

export const useStore = defineStore('main', {
  state: () => ({
    user: null,
    expenses: []
  }),
  actions: {

    async register(phone, first_name, last_name, email, password) {
      const response = await fetch('http://localhost:3000/api/register', {
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

    async login(email, password) {
      try {
        const response = await fetch('http://localhost:3000/api/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password })
        });

        if (!response.ok) {

          const errorData = await response.json();
          throw new Error(errorData.message || 'Login failed');
        }

        const data = await response.json();


        this.user = data.user;
        localStorage.setItem('userId', data.user.id);
        return true;
      } catch (error) {
        console.error('Login error:', error);
        return false;
      }
    },

    async addExpense(name, amount) {
      if (!this.user) return;
      const response = await fetch('http://localhost:3000/api/add-expense', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: this.user.id, name, amount })
      });
      return response.json();
    },


    async fetchExpenses() {
      if (!this.user) return;
      const response = await fetch(`http://localhost:3000/api/expenses/${this.user.id}`);
      const expenses = await response.json();
      this.expenses = expenses;
    }
  }
});
