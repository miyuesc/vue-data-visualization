<template>
  <div ref="rectangleShapeRef" class="shape-canvas rectangle-shape-canvas"></div>
</template>

<script lang="ts">
import { defineComponent, watch, onMounted, ref, computed } from 'vue';

export default defineComponent({
  name: 'Rectangle',
  props: {
    info: {
      type: Object,
      default: () => ({})
    }
  },
  setup() {
    return {};
  }
});
</script>
