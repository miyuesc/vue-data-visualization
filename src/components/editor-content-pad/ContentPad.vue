<template>
  <div class="editor-content-pad">
    <MPosition />
    <MSize />
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useStore } from 'vuex';
import MSize from './MSize.vue';
import MPosition from './MPosition.vue';

export default defineComponent({
  name: 'ContentPad',
  components: { MSize, MPosition },
  setup() {
    const store = useStore();
    const activeElementState = store.state.activeElement;

    const position = computed(() => activeElementState.position);
    const size = computed(() => activeElementState.size);
    const zIndex = computed(() => activeElementState.zIndex);
    const componentConfig = computed(() => activeElementState.componentConfig);

    return {
      position,
      size,
      zIndex,
      componentConfig
    };
  }
});
</script>
