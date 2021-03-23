<template>
  <component :is="componentType" v-bind="$props" />
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import LineChart from '@/components/charts/LineChart.vue';

export default defineComponent({
  name: 'ComponentTransform',
  props: {
    info: Object
  },
  components: { LineChart },
  setup(props) {
    const componentType = computed(() => props.info?.code || '');
    return {
      componentType
    };
  }
});
</script>

<style lang="scss" scoped></style>
