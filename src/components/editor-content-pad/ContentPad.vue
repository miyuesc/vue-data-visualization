<template>
  <div class="editor-content-pad">
    <MBaseConfig :config="componentConfig" />
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useStore } from 'vuex';
import MBaseConfig from './MBaseConfig.vue';

export default defineComponent({
  name: 'ContentPad',
  components: {
    MBaseConfig
  },
  setup() {
    const store = useStore();
    const activity = store.state.activity;

    const componentConfig = computed(() => activity.component);

    return {
      componentConfig
    };
  }
});
</script>
