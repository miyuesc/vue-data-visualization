<template>
  <div class="editor-tools-bar"></div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ToolBar'
});
</script>

<style lang="scss" scoped>
.editor-tools-bar {
  position: absolute;
  left: 50%;
  top: 0;
  bottom: 0;
  width: 600px;
  background: rgba(0, 0, 0, 0.2);
  transform: translateX(-50%);
  z-index: 2;
}
</style>
