<template>
  <div ref="rectangleShapeRef" class="chart-component">
    <div class="shape-canvas circle-shape-canvas" :style="backgroundStyle"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ComputedRef } from 'vue';
import computedBackgroundStyle from '@/components/charts/supplement/computedBackgroundStyle';

export default defineComponent({
  name: 'Circle',
  props: {
    info: {
      type: Object,
      default: () => ({})
    }
  },
  setup(props) {
    const backgroundStyle: ComputedRef = computed(() => {
      return computedBackgroundStyle(props);
    });

    return {
      backgroundStyle
    };
  }
});
</script>
