<template>
  <div class="editor-tools-bar" style="color: #999999; font-size: 12px; text-align: center">
    目前只有折线图是具有最多的配置项，体验最好。其他的图表及元素正在开发中~~~
  </div>
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
