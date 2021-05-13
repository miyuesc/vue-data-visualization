<template>
  <div ref="rectangleShapeRef" class="chart-component">
    <div class="shape-canvas rectangle-shape-canvas" :style="backgroundStyle"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, watch, onMounted, ref, computed, ComputedRef } from 'vue';
import computedBackgroundStyle from '@/components/charts/supplement/computedBackgroundStyle';

export default defineComponent({
  name: 'Rectangle',
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
