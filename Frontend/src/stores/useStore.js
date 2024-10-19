import { defineStore } from 'pinia';

export const useStore = defineStore('main', {
  state: () => ({
    user: null,
    expenses: []
  }),
  actions: {

    async register(phone, first_name, last_name, email, password) {
      const response = await fetch('https://expensefly-io-1.onrender.com/api/register', {
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
        const response = await fetch('https://expensefly-io-1.onrender.com/api/login', {
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

    async addExpense(name, amount, category, date) {
      if (!this.user) {
        console.warn('User not logged in, cannot add expense.');
        return;
      }
    
      try {
        const response = await fetch('http://localhost:3000/api/add-expense', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId: this.user.id, name, amount, date, category })
        });
    
        const result = await response.json();
    
        if (response.ok) {
          console.log('Expense added successfully:', result);
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
