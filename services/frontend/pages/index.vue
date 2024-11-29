<template>
  <div class="p-4">
    <!-- <section>Dashboard</section> -->
    <section class="grid gap-4">
      <div>
        <article class="mt-4">
          <QuoteRecent />
        </article>
      </div>
      <div>


        <article class="mt-4">
          <n-card class="h-full">
           
          </n-card>
        </article>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import theme from '#tailwind-config/theme';
import { type ECOption, useEcharts } from '~/hooks/echart';

const themeColor = theme.colors.primary[500];

const quizAccessApp = [
  {
    to: '',
    icon: 'system-uicons:document',
    title: 'File',
  },
  {
    to: '',
    icon: 'system-uicons:paper-plane',
    title: 'Message',
  },
  {
    to: '',
    icon: 'system-uicons:users',
    title: 'Team',
  },
  {
    to: '',
    icon: 'heroicons:cog',
    title: 'Setting',
  },
];

const chart1 = ref<ECOption>() as Ref<ECOption>;
const { domRef: lineChart } = useEcharts(chart1);

const setChart = () => {
  chart1.value = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        label: {
          backgroundColor: '#6a7985',
        },
      },
    },
    grid: {
      left: '-10%',
      right: '-10%',
      bottom: '-20%',
      top: '0%',
      containLabel: true,
    },
    xAxis: [
      {
        type: 'category',
        boundaryGap: false,
        show: false,
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      },
    ],
    yAxis: [
      {
        type: 'value',
        show: false,
      },
    ],
    series: [
      {
        name: 'Email',
        type: 'line',
        stack: 'Total',
        symbolSize: 12,
        showSymbol: false,
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: 'rgba(134,92,225,0.4)',
              },
              {
                offset: 1,
                color: 'rgba(134,92,225,0.0001)',
              },
            ],
          },
        },
        color: themeColor,
        emphasis: {
          focus: 'series',
        },
        itemStyle: {
          // color: '#09b287',
          // borderColor: '#000',
          borderWidth: 10,
          borderCap: 'round',
          borderType: 'solid',
        },
        lineStyle: {
          width: 3.5,
        },
        smooth: true,
        data: [120, 132, 101, 134, 90, 230, 210],
      },
    ],
  };
};

setChart();
</script>
