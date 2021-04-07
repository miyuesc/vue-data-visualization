<template>
  <div class="chart-component graph-chart-component">
    <ChartTitle :title-config="info.titleConfig || {}" />
    <div ref="graphChartRef" class="chart-canvas graph-chart-canvas"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, watch, ComputedRef, onMounted, ref } from 'vue';
import * as echarts from 'echarts';
import { debounce } from '@/utils/commonUtils';

export default defineComponent({
  name: 'GraphChart',
  props: {
    info: Object
  },
  setup(props) {
    const size: ComputedRef = computed(() => props.info?.size);
    const graphChartRef: any = ref(null);

    const options = {
      tooltip: {},
      grid: {
        left: 20,
        top: 20,
        right: 20,
        bottom: 20,
        containLabel: true
      },
      animationDurationUpdate: 1500,
      animationEasingUpdate: 'quinticInOut',
      series: [
        {
          type: 'graph',
          layout: 'none',
          symbolSize: 50,
          roam: true,
          label: {
            show: true
          },
          edgeSymbol: ['circle', 'arrow'],
          edgeSymbolSize: [4, 10],
          edgeLabel: {
            fontSize: 20
          },
          data: [
            {
              name: '节点1',
              x: 300,
              y: 300
            },
            {
              name: '节点2',
              x: 800,
              y: 300
            },
            {
              name: '节点3',
              x: 550,
              y: 100
            },
            {
              name: '节点4',
              x: 550,
              y: 500
            }
          ],
          // links: [],
          links: [
            {
              source: 0,
              target: 1,
              symbolSize: [5, 20],
              label: {
                show: true
              },
              lineStyle: {
                width: 5,
                curveness: 0.2
              }
            },
            {
              source: '节点2',
              target: '节点1',
              label: {
                show: true
              },
              lineStyle: {
                curveness: 0.2
              }
            },
            {
              source: '节点1',
              target: '节点3'
            },
            {
              source: '节点2',
              target: '节点3'
            },
            {
              source: '节点2',
              target: '节点4'
            },
            {
              source: '节点1',
              target: '节点4'
            }
          ],
          lineStyle: {
            opacity: 0.9,
            width: 2,
            curveness: 0
          }
        }
      ]
    };

    let graphChart: any = null;

    const createChart = () => {
      if (graphChartRef.value) {
        graphChart = echarts.init(graphChartRef.value);
        graphChart.setOption(options);
      }
    };

    const debounceResize = debounce(() => {
      if (graphChart) {
        graphChart.dispose();
        graphChart = null;
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
      graphChartRef
    };
  }
});
</script>
