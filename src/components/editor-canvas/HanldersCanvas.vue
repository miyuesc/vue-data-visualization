<template>
  <div class="editor-handler-area" :style="cpStyle">
    <MoveGuideLines />
    <ResizePointers />
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import MoveGuideLines from '@/components/editor-canvas/indicators/MoveGuideLines.vue';
import ResizePointers from '@/components/editor-canvas/indicators/ResizePointers.vue';

export default defineComponent({
  name: 'HandlersCanvas',
  props: { cpStyle: String },
  components: { MoveGuideLines, ResizePointers },
  setup() {
    return {};
  }
});
</script>
