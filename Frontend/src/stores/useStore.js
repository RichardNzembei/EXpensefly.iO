import { defineStore } from 'pinia';

export const useStore = defineStore('main', {
  state: () => ({
    user: null, // Logged-in user
    expenses: [] // Expenses linked to the logged-in user
  }),
  actions: {
    // Register user and redirect to login
    async register(phone, first_name, last_name, email, password) {
      const response = await fetch('http://localhost:3000/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone, first_name, last_name, email, password })
      });
    
      if (!response.ok) {
        const errorData = await response.json(); // Get the error message from the response
        throw new Error(errorData.message || 'Registration failed');
      }
    
      return response.json(); // Return the response data if needed
    },
    
    async login(email, password) {
      try {
        const response = await fetch('http://localhost:3000/api/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password })
        });

        if (!response.ok) {
          // Handle error response
          const errorData = await response.json();
          throw new Error(errorData.message || 'Login failed');
        }

        const data = await response.json();

        // Store user data if login is successful
        this.user = data.user; // Directly assign to user in the state

        return true; // Indicate success
      } catch (error) {
        console.error('Login error:', error);
        return false; // Indicate failure
      }
    },
    // Add new expense for the logged-in user
    async addExpense(name, amount) {
      if (!this.user) return;
      const response = await fetch('http://localhost:3000/api/add-expense', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: this.user.id, name, amount })
      });
      return response.json();
    },
    
    // Fetch all expenses for the logged-in user
    async fetchExpenses() {
      if (!this.user) return;
      const response = await fetch(`http://localhost:3000/api/expenses/${this.user.id}`);
      const expenses = await response.json();
      this.expenses = expenses;
    }
  }
});
