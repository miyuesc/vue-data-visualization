<template>
  <div class="chart-component pie-chart-component" ref="lineChartRef"></div>
</template>

<script lang="ts">
import { defineComponent, computed, watch, ComputedRef, getCurrentInstance, onMounted } from 'vue';
import * as echarts from 'echarts';
import { debounce } from '@/utils/commonUtils';

export default defineComponent({
  name: 'PieChart',
  props: {
    info: Object
  },
  setup(props) {
    const instance: any = getCurrentInstance();

    const size: ComputedRef = computed(() => props.info?.size);

    const options = {
      tooltip: {
        trigger: 'item'
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
      if (instance) {
        pieChart = echarts.init(instance.ctx.$el);
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
