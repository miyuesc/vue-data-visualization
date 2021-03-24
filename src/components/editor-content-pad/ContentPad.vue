<template>
  <div class="editor-content-pad">
    <MBaseConfig :config="componentDetails" />
    <component v-for="c in configComponent" :key="c" :is="c" v-bind="componentDetails" />
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useStore } from 'vuex';
import MBaseConfig from './MBaseConfig.vue';
import MTitle from '@/components/editor-content-pad/MTitle.vue';

export default defineComponent({
  name: 'ContentPad',
  components: {
    MBaseConfig,
    MTitle
  },
  setup() {
    const store = useStore();
    const activity = store.state.activity;

    const componentDetails = computed(() => activity.component);

    const configComponent = computed(() => {
      if (activity.component?.config?.length) {
        return activity.component.config.map((o: string) => `M${o.replace(o[0], o[0].toUpperCase())}`);
      }
      return [];
    });

    return {
      componentDetails,
      configComponent
    };
  }
});
</script>
