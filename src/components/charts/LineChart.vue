<template>
  <div class="chart-component line-chart-component">
    <ChartTitle :title-config="info.titleConfig || {}" />
    <div ref="lineChartRef" class="chart-canvas line-chart-canvas"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, watch, ComputedRef, onMounted } from 'vue';
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
    const size: ComputedRef = computed(() => props.info?.size);
    const lineChartRef: any = ref(null);

    const options = {
      tooltip: {
        trigger: 'axis'
      },
      grid: {
        left: '10%',
        top: '10%',
        right: '10%',
        bottom: '10%'
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
          data: [10, 11, 13, 11, 12, 12, 9],
          markPoint: {
            data: [
              { type: 'max', name: '最大值' },
              { type: 'min', name: '最小值' }
            ]
          }
        },
        {
          name: '最低气温',
          type: 'line',
          data: [1, -2, 2, 5, 3, 2, 0],
          markPoint: {
            data: [{ name: '周最低', value: -2, xAxis: 1, yAxis: -1.5 }]
          }
        }
      ]
    };

    let lineChart: any = null;

    const createChart = () => {
      if (lineChartRef.value) {
        lineChart = echarts.init(lineChartRef.value);
        lineChart.setOption(options);
      }
    };

    onMounted(() => createChart());

    const debounceResize = debounce(() => {
      if (lineChart) {
        lineChart.dispose();
        lineChart = null;
      }
      createChart();
    }, 200);

    watch(size, (newVal: any, oldVal: any) => {
      if (newVal.width !== oldVal.width || newVal.height !== oldVal.height) {
        debounceResize();
      }
    });

    watch(
      () => props.info?.titleConfig?.visible,
      () => debounceResize()
    );

    return {
      lineChartRef
    };
  }
});
</script>
