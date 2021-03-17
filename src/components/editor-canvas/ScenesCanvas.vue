<template>
  <div class="editor-wrapper-area" :style="cpStyle"></div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "ScenesCanvas",
  props: { cpStyle: String },
  setup() {
    return {};
  },
});
</script>
