<script setup>
import { computed } from 'vue';
import { useExpensesStore } from '@/stores/expensesStore';

const store = useExpensesStore();

const streak = computed(() => {
  if (!store.expenses || store.expenses.length === 0) return 0;
  const dates = new Set(store.expenses.map(e => e.date?.split('T')[0]));
  let count = 0;
  const today = new Date();
  for (let i = 0; i < 365; i++) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const dateStr = d.toISOString().split('T')[0];
    if (dates.has(dateStr)) {
      count++;
    } else {
      break;
    }
  }
  return count;
});
</script>

<template>
  <span v-if="streak > 0" class="inline-flex items-center gap-1 px-2 py-0.5 bg-amber-50 text-amber-700 rounded-full text-xs font-medium">
    <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 23c-3.6 0-8-3.1-8-8.5C4 9 8 4 11.5 1c.3-.2.7-.2.9.1.2.2.2.5.1.8C11 5 12.5 7 14 7c.5 0 1-.2 1.5-.5.3-.2.7-.1.9.2C18 9 20 12 20 14.5 20 19.9 15.6 23 12 23z"/>
    </svg>
    {{ streak }} day{{ streak !== 1 ? 's' : '' }}
  </span>
</template>
