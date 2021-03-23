<template>
  <div class="chart-component k-chart-component" ref="lineChartRef"></div>
</template>

<script lang="ts">
import { defineComponent, computed, watch, ComputedRef, getCurrentInstance, onMounted } from 'vue';
import * as echarts from 'echarts';
import { debounce } from '@/utils/commonUtils';

export default defineComponent({
  name: 'KChart',
  props: {
    info: Object
  },
  setup(props) {
    const instance: any = getCurrentInstance();

    const size: ComputedRef = computed(() => props.info?.size);

    const options = {
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
      if (instance) {
        kChart = echarts.init(instance.ctx.$el);
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

    watch([() => size.value.width, () => size.value.height], () => debounceResize());
  }
});
</script>

<style lang="scss" scoped>
.chart-component {
  width: 100%;
  height: 100%;
}
</style>
