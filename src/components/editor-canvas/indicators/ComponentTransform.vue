<template>
  <component :is="componentType" v-bind="$props" />
</template>

<script lang="ts">
import { defineComponent, defineAsyncComponent, computed, ComputedRef } from 'vue';

// 图表
const BarChart = defineAsyncComponent(() => import('../../charts/BarChart.vue'));
const FunnelChart = defineAsyncComponent(() => import('../../charts/FunnelChart.vue'));
const GaugeChart = defineAsyncComponent(() => import('../../charts/GaugeChart.vue'));
const GraphChart = defineAsyncComponent(() => import('../../charts/GraphChart.vue'));
const KChart = defineAsyncComponent(() => import('../../charts/KChart.vue'));
const LineChart = defineAsyncComponent(() => import('../../charts/LineChart.vue'));
const PieChart = defineAsyncComponent(() => import('../../charts/PieChart.vue'));
const RadarChart = defineAsyncComponent(() => import('../../charts/RadarChart.vue'));
const TreeChart = defineAsyncComponent(() => import('../../charts/TreeChart.vue'));
// 形状
const Circle = defineAsyncComponent(() => import('../../shapes/Circle.vue'));
const Rectangle = defineAsyncComponent(() => import('../../shapes/Rectangle.vue'));
const Triangle = defineAsyncComponent(() => import('../../shapes/Triangle.vue'));

export default defineComponent({
  name: 'ComponentTransform',
  props: {
    info: Object
  },
  components: {
    BarChart,
    FunnelChart,
    GaugeChart,
    GraphChart,
    KChart,
    LineChart,
    PieChart,
    RadarChart,
    TreeChart,
    Circle,
    Rectangle,
    Triangle
  },
  setup(props) {
    const componentType: ComputedRef = computed(() => props.info?.code || '');

    return {
      componentType
    };
  }
});
</script>
