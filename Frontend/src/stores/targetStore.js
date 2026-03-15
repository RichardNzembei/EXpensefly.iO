import { defineStore } from 'pinia';
import { useUserStore } from './userStore';

const apiBaseUrl = process.env.NODE_ENV === 'production'
    ? 'https://expensefly-io-1.onrender.com'
    : 'http://localhost:3000';

export const useTargetStore = defineStore('targetStore', {
    persist: true,
    state: () => ({
        activeTargets: [],
        completedTargets: []
    }),

    getters: {
        totalActiveAmount(state) {
            return state.activeTargets.reduce((sum, t) => sum + (parseFloat(t.amount) || 0), 0);
        },
        totalCompletedAmount(state) {
            return state.completedTargets.reduce((sum, t) => sum + (parseFloat(t.amount) || 0), 0);
        },
        completionRate(state) {
            const total = state.activeTargets.length + state.completedTargets.length;
            if (total === 0) return 0;
            return Math.round((state.completedTargets.length / total) * 100);
        },
        nearestDeadline(state) {
            if (state.activeTargets.length === 0) return null;
            return [...state.activeTargets].sort((a, b) => new Date(a.deadline) - new Date(b.deadline))[0];
        }
    },

    actions: {

        getCurrentUserId() {
            const userStore = useUserStore();
            return userStore.user ? userStore.user.id : null;
        },

        async addTarget(description, amount, deadline) {
            const userId = this.getCurrentUserId();

            if (!userId) {
                console.warn('User not logged in, cannot add target.');
                return;
            }

            try {
                const response = await fetch(`${apiBaseUrl}/api/add-target`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        userId,
                        description,
                        amount,
                        deadline
                    })
                });

                if (!response.ok) {
                    const errorResult = await response.json();
                    console.error('Failed to add target:', errorResult);
                    return errorResult;
                }

                const result = await response.json();
                this.activeTargets.push(result);
                return result;

            } catch (error) {
                console.error('Error adding target:', error);
                return { message: 'Server error', error };
            }
        },

        async fetchTargets() {
            const userId = this.getCurrentUserId();

            if (!userId) {
                console.warn('User not logged in, cannot fetch targets.');
                return;
            }

            try {
                const response = await fetch(`${apiBaseUrl}/api/targets/${userId}`, {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' }
                });

                if (!response.ok) {
                    const errorResult = await response.json();
                    console.error('Failed to fetch targets:', errorResult);
                    return errorResult;
                }

                const result = await response.json();
                this.activeTargets = result.active;
                this.completedTargets = result.completed;
                return result;

            } catch (error) {
                console.error('Error fetching targets:', error);
                return { message: 'Server error', error };
            }
        },

        async markTargetAsCompleted(targetId) {
            const userId = this.getCurrentUserId();

            if (!userId) {
                console.warn('User not logged in, cannot complete target.');
                return;
            }

            try {
                const response = await fetch(`${apiBaseUrl}/api/targets/complete/${targetId}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ userId })
                });

                if (!response.ok) {
                    const errorResult = await response.json();
                    console.error('Failed to complete target:', errorResult);
                    return errorResult;
                }
                this.activeTargets = this.activeTargets.filter(target => target.id !== targetId);
                const completedTarget = await response.json();
                this.completedTargets.push(completedTarget);
                return completedTarget;

            } catch (error) {
                console.error('Error completing target:', error);
                return { message: 'Server error', error };
            }
        }
    }
});
