import { defineStore } from 'pinia';
import { useUserStore } from './userStore';

const apiBaseUrl = process.env.NODE_ENV === 'production'
    ? 'https://expensefly-io-1.onrender.com'
    : 'http://localhost:3000';

export const useSavingsStore = defineStore('savingsStore', {
    state: () => ({
        savings: []
    }),

    actions: {
        getCurrentUserId() {
            const userStore = useUserStore();
            return userStore.user ? userStore.user.id : null;
        },

        async addSavings(method, amount, date, duration) {
            const userId = this.getCurrentUserId();

            if (!userId) {
                console.warn('User not logged in, cannot add savings.');
                return;
            }

            try {
                const response = await fetch(`${apiBaseUrl}/api/add-savings`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        userId,
                        method,
                        amount,
                        date,
                        duration
                    })
                });

                if (!response.ok) {
                    const errorResult = await response.json();
                    console.error('Failed to add savings:', errorResult);
                    return errorResult;
                }

                const result = await response.json();
                this.savings.push(result);
                console.log('Savings added successfully:', result);
                return result;

            } catch (error) {
                console.error('Error adding savings:', error);
                return { message: 'Server error', error };
            }
        },

        async fetchSavings() {
            const userId = this.getCurrentUserId();

            if (!userId) {
                console.warn('User not logged in, cannot fetch savings.');
                return;
            }

            try {
                const response = await fetch(`${apiBaseUrl}/api/savings/${userId}`, {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' }
                });

                if (!response.ok) {
                    const errorResult = await response.json();
                    console.error('Failed to fetch savings:', errorResult);
                    return errorResult;
                }

                const result = await response.json();
                console.log('Fetched savings:', result);


                if (result && Array.isArray(result.savings)) {
                    this.savings = result.savings;
                } else if (Array.isArray(result)) {
                    this.savings = result;
                } else {
                    console.error('Expected an array but got:', result);
                    this.savings = [];
                }
            } catch (error) {
                console.error('Error fetching savings:', error);
                return { message: 'Server error', error };
            }
        }
    }
});
