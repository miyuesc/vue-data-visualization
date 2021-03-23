<template>
  <div class="chart-component tree-chart-component" ref="lineChartRef"></div>
</template>

<script lang="ts">
import { defineComponent, computed, watch, ComputedRef, getCurrentInstance, onMounted } from 'vue';
import * as echarts from 'echarts';
import { debounce } from '@/utils/commonUtils';

export default defineComponent({
  name: 'TreeChart',
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

    let treeChart: any = null;

    const createChart = () => {
      if (instance) {
        treeChart = echarts.init(instance.ctx.$el);
        treeChart.setOption(options);
      }
    };

    const debounceResize = debounce(() => {
      if (treeChart) {
        treeChart.dispose();
        treeChart = null;
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
