<template>
  <div ref="circleShapeRef" class="shape-canvas circle-shape-canvas"></div>
</template>

<script lang="ts">
import { defineComponent, watch, onMounted, ref, computed } from 'vue';

export default defineComponent({
  name: 'Circle',
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
