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

    const data = {
      name: 'flare',
      children: [
        {
          name: 'data',
          children: []
        },
        {
          name: 'display',
          children: [
            { name: 'DirtySprite', value: 8833 },
            { name: 'LineSprite', value: 1732 },
            { name: 'RectSprite', value: 3623 }
          ]
        },
        {
          name: 'flex',
          children: [{ name: 'FlareVis', value: 4116 }]
        },
        {
          name: 'query',
          children: [
            { name: 'AggregateExpression', value: 1616 },
            { name: 'And', value: 1027 },
            { name: 'Arithmetic', value: 3891 },
            { name: 'Average', value: 891 },
            { name: 'Minimum', value: 843 },
            { name: 'Not', value: 1554 },
            { name: 'Or', value: 970 },
            { name: 'Query', value: 13896 },
            { name: 'Range', value: 1594 },
            { name: 'StringUtil', value: 4130 },
            { name: 'Sum', value: 791 },
            { name: 'Variable', value: 1124 },
            { name: 'Variance', value: 1876 },
            { name: 'Xor', value: 1101 }
          ]
        },
        {
          name: 'scale',
          children: [
            { name: 'IScaleMap', value: 2105 },
            { name: 'LinearScale', value: 1316 },
            { name: 'LogScale', value: 3151 },
            { name: 'OrdinalScale', value: 3770 },
            { name: 'QuantileScale', value: 2435 },
            { name: 'QuantitativeScale', value: 4839 },
            { name: 'RootScale', value: 1756 },
            { name: 'Scale', value: 4268 },
            { name: 'ScaleType', value: 1821 },
            { name: 'TimeScale', value: 5833 }
          ]
        }
      ]
    };

    const options = {
      tooltip: {
        trigger: 'item',
        triggerOn: 'mousemove'
      },
      series: [
        {
          type: 'tree',
          id: 0,
          name: 'tree1',
          data: [data],

          top: '10%',
          left: '8%',
          bottom: '22%',
          right: '20%',

          symbolSize: 7,

          edgeShape: 'polyline',
          edgeForkPosition: '63%',
          initialTreeDepth: 2,

          lineStyle: {
            width: 2
          },

          label: {
            backgroundColor: '#fff',
            position: 'left',
            verticalAlign: 'middle',
            align: 'right'
          },

          leaves: {
            label: {
              position: 'right',
              verticalAlign: 'middle',
              align: 'left'
            }
          },

          emphasis: {
            focus: 'descendant'
          },

          expandAndCollapse: true,
          animationDuration: 550,
          animationDurationUpdate: 750
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
