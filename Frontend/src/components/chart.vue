<script setup>
import { ref, onMounted, onBeforeUnmount, watch } from 'vue';
import { use } from 'echarts/core';
import { PieChart } from 'echarts/charts';
import { TooltipComponent, LegendComponent, GridComponent } from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';
import VChart from 'vue-echarts';
import { useExpensesStore } from '@/stores/expensesStore';

use([TooltipComponent, LegendComponent, GridComponent, PieChart, CanvasRenderer]);

const store = useExpensesStore();
const chartInstance = ref(null);

const colorPalette = [
  '#059669', '#10b981', '#34d399', '#6ee7b7',
  '#a7f3d0', '#4b5563', '#6b7280', '#9ca3af',
  '#d1d5db', '#374151'
];

const chartOptions = ref({
  tooltip: {
    trigger: 'item',
    formatter: '{b}: {c} Ksh ({d}%)',
    backgroundColor: 'rgba(255,255,255,0.95)',
    borderColor: '#e5e7eb',
    borderWidth: 1,
    textStyle: { color: '#374151', fontSize: 12 }
  },
  legend: {
    orient: 'horizontal',
    bottom: 0,
    data: [],
    textStyle: { fontSize: 11, color: '#6b7280' }
  },
  series: [
    {
      name: 'Expenses',
      type: 'pie',
      radius: ['45%', '75%'],
      avoidLabelOverlap: true,
      itemStyle: {
        borderRadius: 4,
        borderColor: '#fff',
        borderWidth: 2
      },
      label: {
        show: true,
        formatter: '{b}: {d}%',
        fontSize: 11,
        color: '#6b7280'
      },
      labelLine: { show: true, length: 8, length2: 8 },
      emphasis: {
        label: { show: true, fontSize: 13, fontWeight: 'bold' },
        itemStyle: { shadowBlur: 8, shadowColor: 'rgba(0, 0, 0, 0.15)' }
      },
      data: [],
      color: colorPalette
    }
  ],
  animationDuration: 800,
  animationEasing: 'cubicOut'
});

const calculateTotals = (expenses) => {
  if (!expenses || !Array.isArray(expenses)) return {};
  return expenses.reduce((acc, expense) => {
    const category = expense.category || 'Uncategorized';
    const amount = parseFloat(expense.amount) || 0;
    acc[category] = (acc[category] || 0) + amount;
    return acc;
  }, {});
};

const updateChartData = () => {
  const totals = calculateTotals(store.expenses);
  const chartData = Object.entries(totals).map(([name, value]) => ({
    name,
    value: parseFloat(value.toFixed(2))
  }));
  chartOptions.value.legend.data = chartData.map(item => item.name);
  chartOptions.value.series[0].data = chartData;
};

onMounted(async () => {
  await store.fetchExpenses();
  updateChartData();
});

watch(() => store.expenses, updateChartData, { deep: true });
</script>

<template>
  <div class="w-full">
    <v-chart
      ref="chartInstance"
      :option="chartOptions"
      :theme="'light'"
      class="w-full min-h-[280px]"
      autoresize
    />
  </div>
</template>
