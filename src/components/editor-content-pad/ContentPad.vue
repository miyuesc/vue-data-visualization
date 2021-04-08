<template>
  <div class="editor-content-pad">
    <MBaseConfig v-if="activatedFlag.type !== 'background'" />
    <!--    <component v-for="c in configComponent" :key="c" :is="c" v-bind="componentDetails" />-->
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useStore } from 'vuex';
import MBaseConfig from '@/components/editor-content-pad/MBaseConfig.vue';
// import MBackground from '@/components/editor-content-pad/MBackground.vue';
// import MLegend from '@/components/editor-content-pad/MLegend.vue';
// import MLineConfig from '@/components/editor-content-pad/MLineConfig.vue';
// import MTitle from '@/components/editor-content-pad/MTitle.vue';
// import MXAxis from '@/components/editor-content-pad/MXAxis.vue';
// import MYAxis from '@/components/editor-content-pad/MYAxis.vue';

export default defineComponent({
  name: 'ContentPad',
  components: {
    //   MBackground,
    MBaseConfig
    //   MLegend,
    //   MLineConfig,
    // MTitle
    //   MXAxis,
    //   MYAxis
  },
  setup() {
    const store = useStore();
    //
    const activatedFlag = computed(() => store.state.activatedFlag);
    const activatedComponent = computed(() => store.state.activatedComponent).value;
    //
    const configComponent = computed(() => {
      if (activatedComponent?.config?.length) {
        return activatedComponent.config.map((o: string) => `M${o.replace(o[0], o[0].toUpperCase())}`);
      }
      return [];
    });

    return {
      activatedFlag,
      activatedComponent,
      configComponent
    };
  }
});
</script>
