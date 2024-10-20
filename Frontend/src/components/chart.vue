<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { use } from 'echarts/core';
import { PieChart } from 'echarts/charts';
import { TitleComponent, TooltipComponent, LegendComponent } from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';
import VChart from 'vue-echarts';
import { useStore } from '@/stores/useStore';

use([TitleComponent, TooltipComponent, LegendComponent, PieChart, CanvasRenderer]);

const store = useStore();

const chartOptions = ref({
  title: {
    text: 'My Expenses',
    subtext: 'Expense Breakdown',
    left: 'center',
  },
  tooltip: {
    trigger: 'item',
  },
  series: [
    {
      name: 'Expenses',
      type: 'pie',
      radius: '70%',
      data: [],
      emphasis: {
        itemStyle: {
          shadowBlur: 20,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)',
        },
      },
    },
  ],
});


const calculateTotals = (expenses) => {
  return expenses.reduce((acc, expense) => {
    const category = expense.category;
    const amount = parseFloat(expense.amount);

    if (isNaN(amount)) {
      console.error(`Invalid amount for expense:`, expense);
      return acc;
    }

    if (!acc[category]) {
      acc[category] = 0;
    }

    acc[category] += amount;
    return acc;
  }, {});
};
const setResponsiveRadius = () => {
  const screenWidth = window.innerWidth;

  if (screenWidth < 600) {
    return ['40%'];
  } else if (screenWidth < 1024) {
    return ['60%'];
  } else {
    return ['70%'];
  }
};


const handleResize = () => {
  const chartInstance = document.querySelector('v-chart');
  if (chartInstance) {
    const newRadius = setResponsiveRadius();
    chartOptions.value.series[0].radius = newRadius;
    chartInstance.setOption(chartOptions.value);
    chartInstance.resize();
  }
};

onMounted(async () => {
  await store.fetchExpenses();

  const expenses = store.expenses;
  console.log('Expenses:', expenses);

  const totals = calculateTotals(expenses);
  const chartData = Object.entries(totals).map(([name, value]) => ({ name, value }));

  chartOptions.value.series[0].data = chartData;
  console.log('Chart Data:', chartData);

  window.addEventListener('resize', handleResize);
  handleResize();
});
onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize);
});
</script>

<template>
  <div class="flex justify-center items-center w-full h-96 sm:h-96 md:h-128 lg:h-[400px] xl:h-[500px] mt-10">
    <v-chart :option="chartOptions" class="w-full h-full" />
  </div>
</template>
