<template>
  <div class="chart-component bar-chart-component" :style="backgroundStyle">
    <ChartTitle :title-config="info.titleConfig || {}" />
    <div ref="barChartRef" class="chart-canvas bar-chart-canvas"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, watch, ComputedRef, onMounted, ref } from 'vue';
import * as echarts from 'echarts';
import { debounce } from '@/utils/commonUtils';
import computedBackgroundStyle from '@/components/charts/supplement/computedBackgroundStyle';

export default defineComponent({
  name: 'BarChart',
  props: {
    info: Object
  },
  setup(props) {
    const background: ComputedRef = computed(() => props.info?.background);
    const barChartRef: any = ref(null);

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

    let barChart: any = null;

    const createChart = () => {
      if (barChartRef.value) {
        barChart = echarts.init(barChartRef.value);
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

    const backgroundStyle = computed(() => {
      return computedBackgroundStyle(background.value);
    });

    onMounted(() => createChart());

    return {
      barChartRef,
      backgroundStyle
    };
  }
});
</script>
