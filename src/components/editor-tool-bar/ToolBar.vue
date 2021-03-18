<template>
  <div class="editor-tools-bar"></div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "ToolBar"
});
</script>

<style lang="scss" scoped>
.editor-tools-bar {
  position: absolute;
  left: 50%;
  top: 48px;
  width: 600px;
  height: 48px;
  background: #00b9ff;
  transform: translateX(-50%);
  z-index: 2;
}
</style>
