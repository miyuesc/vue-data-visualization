<template>
  <div ref="triangleShapeRef" class="shape-canvas triangle-shape-canvas"></div>
</template>

<script lang="ts">
import { defineComponent, watch, onMounted, ref, computed } from 'vue';

export default defineComponent({
  name: 'triangle',
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
