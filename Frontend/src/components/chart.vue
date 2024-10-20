<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { use } from 'echarts/core';
import { PieChart } from 'echarts/charts';
import { TitleComponent, TooltipComponent, LegendComponent } from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';
import VChart from 'vue-echarts';


use([TitleComponent, TooltipComponent, LegendComponent, PieChart, CanvasRenderer]);


const chartOptions = ref({
  title: {
    text: 'my expenses',
    subtext: 'some Discipline',
    left: 'center',
  },
  tooltip: {
    trigger: 'item',
  },
  series: [
    {
      name: 'Access From',
      type: 'pie',
      radius: '70%',
      data: [
        { value: 1048, name: 'Food' },
        { value: 735, name: 'Transport' },
        { value: 580, name: 'Utilities' },
        { value: 484, name: 'Shopping' },
        { value: 300, name: 'Black Tax' },
      ],
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


const setResponsiveRadius = () => {
  const screenWidth = window.innerWidth;


  if (screenWidth < 600) {
    return ['10%']; 
  } else if (screenWidth < 1024) {
    return ['40%'];
  } else {
    return ['70%'];
  }
};

onMounted(() => {
  const handleResize = () => {
    const chartInstance = document.querySelector('v-chart');
    if (chartInstance) {
      const newRadius = setResponsiveRadius();
      chartOptions.value.series[0].radius = newRadius; 
      chartInstance.setOption(chartOptions.value);
      chartInstance.resize(); 
    }
  };

  window.addEventListener('resize', handleResize);
  handleResize(); 


  onBeforeUnmount(() => {
    window.removeEventListener('resize', handleResize);
  });
})
</script>

<template>
  <div class="flex justify-center items-center w-full h-96 sm:h-96 md:h-128 lg:h-[400px] xl:h-[500px] mt-10"> 
    <v-chart :option="chartOptions" class="w-full h-full" />
  </div>
</template>

