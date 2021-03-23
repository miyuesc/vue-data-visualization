<template>
  <div class="chart-component bar-chart-component" ref="lineChartRef"></div>
</template>

<script lang="ts">
import { defineComponent, computed, watch, ComputedRef, getCurrentInstance, onMounted } from 'vue';
import * as echarts from 'echarts';
import { debounce } from '@/utils/commonUtils';

export default defineComponent({
  name: 'BarChart',
  props: {
    info: Object
  },
  setup(props) {
    const instance: any = getCurrentInstance();

    const size: ComputedRef = computed(() => props.info?.size);

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
          data: [120, 200, 150, 80, 70, 110, 130],
          type: 'bar'
        }
      ]
    };

    let barChart: any = null;

    const createChart = () => {
      if (instance) {
        barChart = echarts.init(instance.ctx.$el);
        barChart.setOption(options);
      }
    };

    const debounceResize = debounce(() => {
      if (barChart) {
        barChart.dispose();
        barChart = null;
      }
      createChart();
    }, 200);

    onMounted(() => createChart());

    watch(size, (newVal: any, oldVal: any) => {
      if (newVal.width !== oldVal.width || newVal.height !== oldVal.height) {
        debounceResize();
      }
    });
  }
});
</script>

<style lang="scss" scoped>
.chart-component {
  width: 100%;
  height: 100%;
}
</style>
