<script setup>
import { computed } from 'vue';
import { use } from 'echarts/core';
import { BarChart } from 'echarts/charts';
import { GridComponent, TooltipComponent } from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';
import VChart from 'vue-echarts';

use([BarChart, GridComponent, TooltipComponent, CanvasRenderer]);

const props = defineProps({
  labels: { type: Array, default: () => [] },
  values: { type: Array, default: () => [] }
});

const chartOptions = computed(() => ({
  grid: { top: 10, right: 10, bottom: 24, left: 50 },
  tooltip: {
    trigger: 'axis',
    backgroundColor: 'rgba(255,255,255,0.95)',
    borderColor: '#e5e7eb',
    borderWidth: 1,
    textStyle: { color: '#374151', fontSize: 12 }
  },
  xAxis: {
    type: 'category',
    data: props.labels,
    axisLine: { show: false },
    axisTick: { show: false },
    axisLabel: { color: '#9ca3af', fontSize: 11 }
  },
  yAxis: {
    type: 'value',
    axisLine: { show: false },
    axisTick: { show: false },
    splitLine: { lineStyle: { color: '#f3f4f6' } },
    axisLabel: { color: '#9ca3af', fontSize: 10 }
  },
  series: [{
    type: 'bar',
    data: props.values,
    barWidth: '60%',
    itemStyle: {
      color: '#059669',
      borderRadius: [4, 4, 0, 0]
    }
  }],
  animationDuration: 800
}));
</script>

<template>
  <div class="w-full" style="height: 220px">
    <v-chart :option="chartOptions" autoresize class="w-full h-full" />
  </div>
</template>
