<template>
  <div class="chart-component k-chart-component">
    <ChartTitle :title-config="info.titleConfig || {}" />
    <div ref="kChartRef" class="chart-canvas bar-chart-canvas"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, watch, ComputedRef, onMounted, ref } from 'vue';
import * as echarts from 'echarts';
import { debounce } from '@/utils/commonUtils';

export default defineComponent({
  name: 'KChart',
  props: {
    info: Object
  },
  setup(props) {
    const size: ComputedRef = computed(() => props.info?.size);
    const kChartRef: any = ref(null);

    const options = {
      grid: {
        left: 20,
        top: 20,
        right: 20,
        bottom: 20,
        containLabel: true
      },
      xAxis: {
        data: ['2017-10-24', '2017-10-25', '2017-10-26', '2017-10-27']
      },
      yAxis: {},
      series: [
        {
          type: 'k',
          data: [
            [20, 34, 10, 38],
            [40, 35, 30, 50],
            [31, 38, 33, 44],
            [38, 15, 5, 42]
          ]
        }
      ]
    };

    let kChart: any = null;

    const createChart = () => {
      if (kChartRef.value) {
        kChart = echarts.init(kChartRef.value);
        kChart.setOption(options);
      }
    };

    const debounceResize = debounce(() => {
      if (kChart) {
        kChart.dispose();
        kChart = null;
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
      kChartRef
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
