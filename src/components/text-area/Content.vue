<template>
  <div class="chart-component" :style="backgroundStyle">
    <div class="text-area-component text-content">请输入正文</div>
  </div>
</template>

<script lang="ts">
import { computed, ComputedRef, defineComponent } from 'vue';
import computedBackgroundStyle from '@/components/charts/supplement/computedBackgroundStyle';

export default defineComponent({
  name: 'Content',
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
