<template>
  <div class="chart-component gauge-chart-component">
    <ChartTitle :title-config="info.titleConfig || {}" />
    <div ref="gaugeChartRef" class="chart-canvas gauge-chart-canvas"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, watch, ComputedRef, onMounted, ref } from 'vue';
import * as echarts from 'echarts';
import { debounce } from '@/utils/commonUtils';

export default defineComponent({
  name: 'GaugeChart',
  props: {
    info: Object
  },
  setup(props) {
    const size: ComputedRef = computed(() => props.info?.size);
    const gaugeChartRef: any = ref(null);

    const options = {
      tooltip: {
        formatter: '{a} <br/>{b} : {c}%'
      },
      grid: {
        left: 20,
        top: 20,
        right: 20,
        bottom: 20,
        containLabel: true
      },
      series: [
        {
          name: 'Pressure',
          type: 'gauge',
          progress: {
            show: true
          },
          detail: {
            valueAnimation: true,
            formatter: '{value}'
          },
          data: [
            {
              value: 50,
              name: 'SCORE'
            }
          ]
        }
      ]
    };

    let gaugeChart: any = null;

    const createChart = () => {
      if (gaugeChartRef.value) {
        gaugeChart = echarts.init(gaugeChartRef.value);
        gaugeChart.setOption(options);
      }
    };

    const debounceResize = debounce(() => {
      if (gaugeChart) {
        gaugeChart.dispose();
        gaugeChart = null;
      }
      createChart();
    }, 200);

    onMounted(() => createChart());

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
      gaugeChartRef
    };
  }
});
</script>

<style lang="scss" scoped>
.chart-component {
  width: 100%;
  height: 100%;
}
</style>
