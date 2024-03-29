<template>
  <div class="chart-component" :style="backgroundStyle">
    <ChartTitle :title-config="info.titleConfig || {}" />
    <div ref="pieChartRef" class="chart-canvas pie-chart-canvas"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, watch, ComputedRef, onMounted, ref } from 'vue';
import * as echarts from 'echarts';
import { debounce } from '@/utils/commonUtils';
import computedBackgroundStyle from '@/components/charts/supplement/computedBackgroundStyle';

export default defineComponent({
  name: 'PieChart',
  props: {
    info: Object
  },
  setup(props) {
    const backgroundStyle: ComputedRef = computed(() => {
      return computedBackgroundStyle(props);
    });

    const size: ComputedRef = computed(() => props.info?.size);
    const pieChartRef: any = ref(null);

    const options = {
      tooltip: {
        trigger: 'item'
      },
      grid: {
        left: 20,
        top: 20,
        right: 20,
        bottom: 20,
        containLabel: true
      },
      legend: {
        top: '5%',
        left: 'center'
      },
      series: [
        {
          name: '访问来源',
          type: 'pie',
          radius: ['40%', '70%'],
          avoidLabelOverlap: false,
          label: {
            show: false,
            position: 'center'
          },
          emphasis: {
            label: {
              show: true,
              fontSize: '40',
              fontWeight: 'bold'
            }
          },
          labelLine: {
            show: false
          },
          data: [
            { value: 1048, name: '搜索引擎' },
            { value: 735, name: '直接访问' },
            { value: 580, name: '邮件营销' },
            { value: 484, name: '联盟广告' },
            { value: 300, name: '视频广告' }
          ]
        }
      ]
    };

    let pieChart: any = null;

    const createChart = () => {
      if (pieChartRef.value) {
        pieChart = echarts.init(pieChartRef.value);
        pieChart.setOption(options);
      }
    };

    const debounceResize = debounce(() => {
      if (pieChart) {
        pieChart.dispose();
        pieChart = null;
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
      pieChartRef,
      backgroundStyle
    };
  }
});
</script>
