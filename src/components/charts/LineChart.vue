<template>
  <div class="chart-component line-chart-component" ref="lineChartRef">
    <!--    <div class="line-chart-canvas"></div>-->
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, watch, ComputedRef, getCurrentInstance, onMounted } from 'vue';
import * as echarts from 'echarts';
import { debounce } from '@/utils/commonUtils';

export default defineComponent({
  name: 'LineChart',
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
          data: [150, 230, 224, 218, 135, 147, 260],
          type: 'line'
        }
      ]
    };

    let lineChart: any = null;

    const createChart = () => {
      if (instance) {
        lineChart = echarts.init(instance.ctx.$el);
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
  }
});
</script>

<style lang="scss" scoped>
.chart-component {
  width: 100%;
  height: 100%;
}
</style>
