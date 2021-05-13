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
      xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          data: [120, 200, 150, 80, 70, 110, 130],
          type: 'bar'
        }
      ]
    };

    const grid = computed(() => props.info.grid || defaultOptions.grid);
    const xAxis = computed(() => props.info.xAxis || defaultOptions.xAxis);
    const yAxis = computed(() => props.info.yAxis || defaultOptions.yAxis);

    const options = computed(() => {
      return {
        ...defaultOptions,
        grid: { ...grid.value },
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
      () => {
        return {
          size: props.info?.size,
          borderWidth: props.info?.background?.borderWidth,
          titleVisible: props.info?.titleConfig?.titleVisible,
          unitVisible: props.info?.titleConfig?.unitVisible
        };
      },
      () => debounceResize(),
      { deep: true }
    );

    watch([props.info?.xAxis, props.info?.yAxis], () => debounceResize(), { deep: true, immediate: true });

    onMounted(() => createChart());

    return {
      barChartRef,
      backgroundStyle
    };
  }
});
</script>
