// stores/expensesStore.js
import { defineStore } from 'pinia';
import { useUserStore } from './userStore';

const apiBaseUrl = process.env.NODE_ENV === 'production'
  ? 'https://expensefly-io-1.onrender.com'
  : 'http://localhost:3000';

export const useExpensesStore = defineStore('expenses', {
  persist: true,
  state: () => ({
    expenses: []
  }),

  getters: {
    monthlyTotal(state) {
      const now = new Date();
      const month = now.getMonth();
      const year = now.getFullYear();
      return state.expenses
        .filter(e => {
          const d = new Date(e.date);
          return d.getMonth() === month && d.getFullYear() === year;
        })
        .reduce((sum, e) => sum + (parseFloat(e.amount) || 0), 0);
    },
    previousMonthTotal(state) {
      const now = new Date();
      const month = now.getMonth() === 0 ? 11 : now.getMonth() - 1;
      const year = now.getMonth() === 0 ? now.getFullYear() - 1 : now.getFullYear();
      return state.expenses
        .filter(e => {
          const d = new Date(e.date);
          return d.getMonth() === month && d.getFullYear() === year;
        })
        .reduce((sum, e) => sum + (parseFloat(e.amount) || 0), 0);
    },
    monthlyChange() {
      if (this.previousMonthTotal === 0) return 0;
      return Math.round(((this.monthlyTotal - this.previousMonthTotal) / this.previousMonthTotal) * 100);
    },
    expensesByCategory(state) {
      return state.expenses.reduce((acc, e) => {
        const cat = e.category || 'Uncategorized';
        acc[cat] = (acc[cat] || 0) + (parseFloat(e.amount) || 0);
        return acc;
      }, {});
    },
    dailyTotals(state) {
      const days = 30;
      const result = [];
      const now = new Date();
      for (let i = days - 1; i >= 0; i--) {
        const d = new Date(now);
        d.setDate(d.getDate() - i);
        const dateStr = d.toISOString().split('T')[0];
        const total = state.expenses
          .filter(e => e.date && e.date.startsWith(dateStr))
          .reduce((sum, e) => sum + (parseFloat(e.amount) || 0), 0);
        result.push({ date: dateStr, total });
      }
      return result;
    },
    topCategory() {
      const cats = this.expensesByCategory;
      const entries = Object.entries(cats);
      if (entries.length === 0) return null;
      return entries.sort((a, b) => b[1] - a[1])[0][0];
    }
  },

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
        return result;

      } catch (error) {
        console.error('Error fetching expenses:', error);
        return { message: 'Server error', error };
      }
    }
  }
});
