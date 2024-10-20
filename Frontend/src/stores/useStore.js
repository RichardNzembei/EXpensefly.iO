import { defineStore } from 'pinia';

const apiBaseUrl = process.env.NODE_ENV === 'production'
  ? 'https://expensefly-io-1.onrender.com'
  : 'http://localhost:3000';

export const useStore = defineStore('main', {
  state: () => ({
    user: null,
    expenses: []
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
        return true;
      } catch (error) {
        console.error('Login error:', error);
        return false;
      }
    },

    async addExpense(name, amount, category, date) {
      if (!this.user) {
        console.warn('User not logged in, cannot add expense.');
        return;
      }

      const userId = this.user.id; 

      try {
        const response = await fetch(`${apiBaseUrl}/api/add-expense`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            userId, 
            name,
            amount,
            date,
            category
          })
        });

        const result = await response.json();

        if (response.ok) {
          console.log('Expense added successfully:', result);
          this.expenses.push(result);
        } else {
          console.error('Failed to add expense:', result);
        }

        return result;
      } catch (error) {
        console.error('Error adding expense:', error);
        return { message: 'Server error', error };
      }
    }
  }
});
