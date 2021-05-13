<template>
  <div class="chart-component" :style="backgroundStyle">
    <ChartTitle :title-config="info.titleConfig || {}" />
    <div ref="lineChartRef" class="chart-canvas line-chart-canvas"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch, computed, onMounted, ComputedRef } from 'vue';
import * as echarts from 'echarts';
import { debounce } from '@/utils/commonUtils';
import computedBackgroundStyle from '@/components/charts/supplement/computedBackgroundStyle';

export default defineComponent({
  name: 'LineChart',
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

    let lineChart: any = null;

    const lineChartRef: any = ref(null);

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
        boundaryGap: false,
        data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
      },
      yAxis: {
        type: 'value',
        splitLine: {
          show: false
        },
        axisLabel: {
          formatter: '{value} °C'
        }
      },
      series: [
        {
          name: '最高气温',
          type: 'line',
          data: [10, 11, 13, 11, 12, 12, 9]
        },
        {
          name: '最低气温',
          type: 'line',
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
        legend: { ...defaultOptions.legend, ...legend.value },
        grid: { ...grid.value },
        xAxis: { ...defaultOptions.xAxis, ...xAxis.value },
        yAxis: { ...yAxis.value }
      };
    });

    const createChart = () => {
      if (lineChartRef.value) {
        lineChart = echarts.init(lineChartRef.value);
        lineChart.setOption(options.value);
      }
    };

    const debounceRerender = debounce(() => {
      if (lineChart) {
        lineChart.dispose();
        lineChart = null;
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
      () => debounceRerender(),
      { deep: true, immediate: true }
    );

    onMounted(() => createChart());

    return {
      lineChartRef,
      backgroundStyle
    };
  }
});
</script>
