<template>
  <div class="editor-canvas-area" :style="cpStyle"></div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "ComponentsCanvas",
  props: { cpStyle: String },
  setup() {
    return {};
  },
});
</script>

<style lang="scss">
.cp {
  background: #00b9ff99;
  position: absolute;
}
</style>
