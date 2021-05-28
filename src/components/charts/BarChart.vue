<template>
  <div class="chart-component" :style="backgroundStyle">
    <ChartTitle :title-config="info.titleConfig || {}" />
    <div ref="barChartRef" class="chart-canvas bar-chart-canvas"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, watch, onMounted, ref, computed, ComputedRef } from 'vue';
import * as echarts from 'echarts';
import { debounce } from '@/utils/commonUtils';
import computedBackgroundStyle from '@/components/charts/supplement/computedBackgroundStyle';

export default defineComponent({
  name: 'BarChart',
  props: {
    info: {
      type: Object,
      default: () => ({})
    }
  },
  setup(props) {
    const backgroundStyle: ComputedRef = computed(() => {
      return computedBackgroundStyle(props);
    });

    let barChart: any = null;

    const barChartRef: any = ref(null);

    const defaultOptions = {
      grid: {
        left: 60,
        top: 60,
        right: 60,
        bottom: 60,
        containLabel: true
      },
      legend: {
        data: ['最高气温', '最低气温']
      },
      xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          name: '最高气温',
          type: 'bar',
          data: [10, 11, 13, 11, 12, 12, 9]
        },
        {
          name: '最低气温',
          type: 'bar',
          data: [1, -2, 2, 5, 3, 2, 0]
        }
      ]
    };

    const grid = computed(() => props.info.grid || defaultOptions.grid);
    const legend = computed(() => props.info.legend || defaultOptions.legend);
    const xAxis = computed(() => props.info.xAxis || defaultOptions.xAxis);
    const yAxis = computed(() => props.info.yAxis || defaultOptions.yAxis);

    const options = computed(() => {
      return {
        ...defaultOptions,
        grid: { ...grid.value },
        legend: { ...defaultOptions.legend, ...legend.value },
        xAxis: { ...defaultOptions.xAxis, ...xAxis.value },
        yAxis: { ...yAxis.value }
      };
    });

    const createChart = () => {
      if (barChartRef.value) {
        barChart = echarts.init(barChartRef.value);
        barChart.setOption(options.value);
      }
    };

    const debounceResize = debounce(() => {
      if (barChart) {
        barChart.dispose();
        barChart = null;
      }
      createChart();
    }, 200);

    watch(
      [
        () => props.info?.size,
        () => props.info?.grid,
        () => props.info?.legend,
        () => props.info?.xAxis,
        () => props.info?.yAxis,
        () => props.info?.background?.borderWidth,
        () => props.info?.titleConfig?.titleVisible,
        () => props.info?.titleConfig?.unitVisible
      ],
      () => debounceResize(),
      { deep: true, immediate: true }
    );

    onMounted(() => createChart());

    return {
      barChartRef,
      backgroundStyle
    };
  }
});
</script>
