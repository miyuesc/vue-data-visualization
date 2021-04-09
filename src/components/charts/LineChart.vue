<template>
  <div ref="lineChartRef" class="chart-canvas line-chart-canvas"></div>
</template>

<script lang="ts">
import { defineComponent, ref, watch, computed, onMounted } from 'vue';
import * as echarts from 'echarts';
import { debounce } from '@/utils/commonUtils';

export default defineComponent({
  name: 'LineChart',
  props: {
    info: {
      type: Object,
      default: () => ({})
    }
  },
  setup(props) {
    let lineChart: any = null;

    const lineChartRef: any = ref(null);

    const defaultOptions = {
      tooltip: {
        trigger: 'axis'
      },
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
      if (lineChartRef.value) {
        lineChart = echarts.init(lineChartRef.value);
        lineChart.setOption(options.value);
      }
    };

    const debounceResize = debounce(() => {
      if (lineChart) {
        lineChart.dispose();
        lineChart = null;
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
      lineChartRef
    };
  }
});
</script>
