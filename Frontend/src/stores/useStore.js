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
        localStorage.setItem('user', JSON.stringify(data.user));

        console.log('Login successful:', data.user);
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
    },
    async fetchExpenses() {
      if (!this.user) {
        console.warn('User not logged in, cannot fetch expenses.');
        return;
      }

      const userId = this.user.id;
      console.log(`Starting to fetch expenses for user ID: ${userId}`);

      try {
        const response = await fetch(`${apiBaseUrl}/api/expenses/${userId}`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' }
        });

        const result = await response.json();

        if (response.ok) {
          console.log('Response OK. Expenses fetched successfully for user ID:', userId);
          console.log('Fetched expenses:', result);


          this.expenses = result;
          console.log('Assigned fetched expenses to state:', this.expenses);
        } else {
          console.error('Failed to fetch expenses. Status:', response.status, 'Message:', result);
        }

        return result;
      } catch (error) {
        console.error('Error fetching expenses for user ID:', userId, error);
        return { message: 'Server error', error };
      }
    }


  }
});
