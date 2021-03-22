<template>
  <div class="editor-content-pad">
    <!--    <MBaseConfig v-bind="componentConfig" />-->
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useStore } from 'vuex';
import MBaseConfig from './MBaseConfig.vue';

export default defineComponent({
  name: 'ContentPad',
  components: {
    // MBaseConfig
  },
  setup() {
    // const store = useStore();
    // const activeElementState = store.state.activeElement;
    //
    // const position = computed(() => activeElementState.position);
    // const size = computed(() => activeElementState.size);
    // const zIndex = computed(() => activeElementState.zIndex);
    // const componentConfig = computed(() => activeElementState.componentConfig);
    //
    // return {
    //   position,
    //   size,
    //   zIndex,
    //   componentConfig
    // };
  }
});
</script>
