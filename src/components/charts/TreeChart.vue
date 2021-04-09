<template>
  <div ref="treeChartRef" class="chart-canvas bar-chart-canvas"></div>
</template>

<script lang="ts">
import { defineComponent, computed, watch, ComputedRef, onMounted, ref } from 'vue';
import * as echarts from 'echarts';
import { debounce } from '@/utils/commonUtils';

export default defineComponent({
  name: 'TreeChart',
  props: {
    info: Object
  },
  setup(props) {
    const size: ComputedRef = computed(() => props.info?.size);
    const treeChartRef: any = ref(null);

    const options = {
      grid: {
        left: 20,
        top: 20,
        right: 20,
        bottom: 20,
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

    let treeChart: any = null;

    const createChart = () => {
      if (treeChartRef.value) {
        treeChart = echarts.init(treeChartRef.value);
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
      treeChartRef
    };
  }
});
</script>
