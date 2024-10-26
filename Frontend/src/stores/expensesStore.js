// stores/expensesStore.js
import { defineStore } from 'pinia';
import { useUserStore } from './userStore';

const apiBaseUrl = process.env.NODE_ENV === 'production'
  ? 'https://expensefly-io-1.onrender.com'
  : 'http://localhost:3000';

export const useExpensesStore = defineStore('expenses', {
  state: () => ({
    expenses: []
  }),
  
  actions: {
    async addExpense(name, amount, category, date) {
      const userStore = useUserStore();
      
      if (!userStore.user) {
        console.warn('User not logged in, cannot add expense.');
        return;
      }

      try {
        const response = await fetch(`${apiBaseUrl}/api/add-expense`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            userId: userStore.user.id,
            name,
            amount,
            date,
            category
          })
        });

        if (!response.ok) {
          const errorResult = await response.json();
          console.error('Failed to add expense:', errorResult);
          return errorResult;
        }

        const result = await response.json();
        this.expenses.push(result);
        console.log('Expense added successfully:', result);
        return result;

      } catch (error) {
        console.error('Error adding expense:', error);
        return { message: 'Server error', error };
      }
    },

    async fetchExpenses() {
      const userStore = useUserStore();

      if (!userStore.user) {
        console.warn('User not logged in, cannot fetch expenses.');
        return;
      }

      try {
        const response = await fetch(`${apiBaseUrl}/api/expenses/${userStore.user.id}`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' }
        });

        if (!response.ok) {
          const errorResult = await response.json();
          console.error('Failed to fetch expenses:', errorResult);
          return errorResult;
        }

        const result = await response.json();
        this.expenses = result;
        console.log('Fetched expenses:', result);
        return result;

      } catch (error) {
        console.error('Error fetching expenses:', error);
        return { message: 'Server error', error };
      }
    }
  }
});
