<template>
  <component :is="componentType" v-bind="$props" />
</template>

<script lang="ts">
import { defineComponent, computed, ComputedRef } from 'vue';
import BarChart from '@/components/charts/BarChart.vue';
import FunnelChart from '@/components/charts/FunnelChart.vue';
import GaugeChart from '@/components/charts/GaugeChart.vue';
import GraphChart from '@/components/charts/GraphChart.vue';
import KChart from '@/components/charts/KChart.vue';
import LineChart from '@/components/charts/LineChart.vue';
import PieChart from '@/components/charts/PieChart.vue';
import RadarChart from '@/components/charts/RadarChart.vue';
import TreeChart from '@/components/charts/TreeChart.vue';

import Circle from '@/components/shapes/Circle.vue';
import Rectangle from '@/components/shapes/Rectangle.vue';
import Triangle from '@/components/shapes/Triangle.vue';

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
