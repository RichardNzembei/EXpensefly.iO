<script setup>
import { ref, onMounted, onBeforeUnmount, watch } from 'vue';
import { use } from 'echarts/core';
import { PieChart } from 'echarts/charts';
import { TitleComponent, TooltipComponent, LegendComponent, GridComponent } from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';
import VChart, { THEME_KEY } from 'vue-echarts';
import { useExpensesStore } from '@/stores/expensesStore';

use([TitleComponent, TooltipComponent, LegendComponent, GridComponent, PieChart, CanvasRenderer]);

const store = useExpensesStore();
const chartInstance = ref(null);

// Chart color palette
const colorPalette = [
  '#4E79A7', '#F28E2B', '#E15759', '#76B7B2', 
  '#59A14F', '#EDC948', '#B07AA1', '#FF9DA7', 
  '#9C755F', '#BAB0AC'
];

const chartOptions = ref({
  title: {
    text: 'Expense Distribution',
    subtext: 'By Category',
    left: 'center',
    textStyle: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#333'
    },
    subtextStyle: {
      fontSize: 12,
      color: '#666'
    }
  },
  tooltip: {
    trigger: 'item',
    formatter: '{b}: {c} Ksh ({d}%)',
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderColor: '#ddd',
    borderWidth: 1,
    textStyle: {
      color: '#333'
    }
  },
  legend: {
    orient: 'horizontal',
    bottom: 0,
    data: [],
    textStyle: {
      fontSize: 12
    }
  },
  series: [
    {
      name: 'Expenses',
      type: 'pie',
      radius: ['40%', '70%'],
      avoidLabelOverlap: true,
      itemStyle: {
        borderRadius: 5,
        borderColor: '#fff',
        borderWidth: 2
      },
      label: {
        show: true,
        formatter: '{b}: {d}%',
        fontSize: 12
      },
      labelLine: {
        show: true,
        length: 10,
        length2: 10
      },
      emphasis: {
        label: {
          show: true,
          fontSize: 14,
          fontWeight: 'bold'
        },
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.3)'
        }
      },
      data: [],
      color: colorPalette
    }
  ],
  animationDuration: 1000,
  animationEasing: 'cubicOut'
});

// Calculate category totals with error handling
const calculateTotals = (expenses) => {
  if (!expenses || !Array.isArray(expenses)) return {};

  return expenses.reduce((acc, expense) => {
    try {
      const category = expense.category || 'Uncategorized';
      const amount = parseFloat(expense.amount) || 0;

      if (!acc[category]) {
        acc[category] = 0;
      }

      acc[category] += amount;
      return acc;
    } catch (error) {
      console.error('Error processing expense:', expense, error);
      return acc;
    }
  }, {});
};

// Update chart data when expenses change
const updateChartData = () => {
  const totals = calculateTotals(store.expenses);
  const chartData = Object.entries(totals).map(([name, value]) => ({
    name,
    value: parseFloat(value.toFixed(2))
  }));

  chartOptions.value.legend.data = chartData.map(item => item.name);
  chartOptions.value.series[0].data = chartData;
  
  if (chartInstance.value) {
    chartInstance.value.setOption(chartOptions.value);
  }
};

// Responsive adjustments
const handleResize = () => {
  if (!chartInstance.value) return;

  const screenWidth = window.innerWidth;
  
  // Adjust chart radius based on screen size
  if (screenWidth < 640) {
    chartOptions.value.series[0].radius = ['30%', '60%'];
    chartOptions.value.series[0].label.fontSize = 10;
  } else if (screenWidth < 1024) {
    chartOptions.value.series[0].radius = ['40%', '70%'];
    chartOptions.value.series[0].label.fontSize = 12;
  } else {
    chartOptions.value.series[0].radius = ['50%', '80%'];
    chartOptions.value.series[0].label.fontSize = 14;
  }

  chartInstance.value.setOption(chartOptions.value);
  chartInstance.value.resize();
};

// Initialize chart
onMounted(async () => {
  await store.fetchExpenses();
  updateChartData();
  
  window.addEventListener('resize', handleResize);
  handleResize();
});

// Watch for expense changes
watch(() => store.expenses, updateChartData, { deep: true });

// Clean up
onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize);
  if (chartInstance.value) {
    chartInstance.value.dispose();
  }
});
</script>

<template>
  <div class="chart-container w-full h-full p-2 sm:p-4">
    <v-chart 
      ref="chartInstance"
      :option="chartOptions" 
      :theme="'light'"
      :init-options="{ renderer: 'canvas' }"
      class="w-full h-full min-h-[300px] sm:min-h-[400px] md:min-h-[500px]"
      autoresize
    />
  </div>
</template>

<style scoped>
.chart-container {
  transition: all 0.3s ease;
}

/* Responsive text sizes */
@media (max-width: 640px) {
  :deep(.echarts-title) {
    font-size: 14px !important;
  }
  :deep(.echarts-legend) {
    font-size: 10px !important;
  }
}

@media (min-width: 641px) and (max-width: 1024px) {
  :deep(.echarts-title) {
    font-size: 16px !important;
  }
  :deep(.echarts-legend) {
    font-size: 12px !important;
  }
}

/* Dark mode support */
@media (prefers-color-scheme: dark) {
  :deep(.echarts) {
    background-color: transparent !important;
  }
  :deep(.echarts-title),
  :deep(.echarts-legend) {
    color: #eee !important;
  }
  :deep(.echarts-tooltip) {
    background-color: #2d2d2d !important;
    border-color: #444 !important;
  }
}
</style>