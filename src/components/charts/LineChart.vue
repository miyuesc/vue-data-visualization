<template>
  <div class="chart-component line-chart-component">
    <ChartTitle :title-config="info.title || {}" />
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
      xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          data: [150, 230, 224, 218, 135, 147, 260],
          type: 'line'
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
      () => props.info.title.visible,
      () => debounceResize()
    );

    return {
      lineChartRef
    };
  }
});
</script>
