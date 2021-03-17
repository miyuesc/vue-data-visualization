<template>
  <div class="editor-handler-area" :style="cpStyle">
  </div>
</template>

<script>
import { useStore } from 'vuex';
import { computed, defineComponent } from 'vue';

export default defineComponent({
  name: 'HandlersCanvas',
  props: { cpStyle: String },
  setup() {
    return {};
  },
});
</script>
