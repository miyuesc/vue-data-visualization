<template>
  <component :is="componentType" v-bind="$props" />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import LineChart from '@/components/charts/LineChart.vue';

export default defineComponent({
  name: 'ComponentTransform',
  props: {
    info: String,
    size: Object
  },
  components: { LineChart },
  setup(props) {
    const componentInfo: string | undefined = props?.info;
    const componentType = componentInfo ? JSON.parse(componentInfo).code : '';
    return {
      componentType
    };
  }
});
</script>

<style lang="scss" scoped></style>
