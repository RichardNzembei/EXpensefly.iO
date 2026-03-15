<script setup>
import { ref, computed, onMounted, onBeforeUnmount, watch } from 'vue';
import { use } from 'echarts/core';
import { LineChart } from 'echarts/charts';
import { GridComponent, TooltipComponent } from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';
import VChart from 'vue-echarts';

use([LineChart, GridComponent, TooltipComponent, CanvasRenderer]);

const props = defineProps({
  data: { type: Array, default: () => [] }
});

const chartOptions = computed(() => ({
  grid: { top: 10, right: 10, bottom: 20, left: 40 },
  tooltip: {
    trigger: 'axis',
    backgroundColor: 'rgba(255,255,255,0.95)',
    borderColor: '#e5e7eb',
    borderWidth: 1,
    textStyle: { color: '#374151', fontSize: 12 },
    formatter: (params) => {
      const p = params[0];
      return `<span style="color:#6b7280">${p.axisValue}</span><br/><b>KES ${p.value.toLocaleString()}</b>`;
    }
  },
  xAxis: {
    type: 'category',
    data: props.data.map(d => {
      const date = new Date(d.date);
      return `${date.getDate()}/${date.getMonth() + 1}`;
    }),
    axisLine: { show: false },
    axisTick: { show: false },
    axisLabel: { color: '#9ca3af', fontSize: 10, interval: 6 }
  },
  yAxis: {
    type: 'value',
    axisLine: { show: false },
    axisTick: { show: false },
    splitLine: { lineStyle: { color: '#f3f4f6' } },
    axisLabel: { color: '#9ca3af', fontSize: 10 }
  },
  series: [{
    type: 'line',
    data: props.data.map(d => d.total),
    smooth: true,
    symbol: 'none',
    lineStyle: { color: '#059669', width: 2 },
    areaStyle: {
      color: {
        type: 'linear', x: 0, y: 0, x2: 0, y2: 1,
        colorStops: [
          { offset: 0, color: 'rgba(5, 150, 105, 0.15)' },
          { offset: 1, color: 'rgba(5, 150, 105, 0.01)' }
        ]
      }
    }
  }],
  animationDuration: 800
}));
</script>

<template>
  <div class="w-full" style="height: 180px">
    <v-chart :option="chartOptions" autoresize class="w-full h-full" />
  </div>
</template>
