<template>
  <div class="editor-content-pad">
    <template v-if="acFlag !== 'background'">
      <MBaseConfig />
      <component v-for="c in configComponent" :key="c" :is="c" />
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue';
import { useStore } from 'vuex';
import MBaseConfig from '@/components/editor-content-pad/configuration/MBaseConfig.vue';
import MBackground from '@/components/editor-content-pad/configuration/MBackground.vue';
import MLegend from '@/components/editor-content-pad/configuration/MLegend.vue';
import MLineConfig from '@/components/editor-content-pad/configuration/MLineConfig.vue';
import MTitleConfig from '@/components/editor-content-pad/configuration/MTitleConfig.vue';
import MXAxis from '@/components/editor-content-pad/configuration/MXAxis.vue';
import MYAxis from '@/components/editor-content-pad/configuration/MYAxis.vue';
import MFont from '@/components/editor-content-pad/configuration/MFont.vue';

export default defineComponent({
  name: 'ContentPad',
  components: {
    MBackground,
    MBaseConfig,
    MLegend,
    MLineConfig,
    MTitleConfig,
    MXAxis,
    MYAxis,
    MFont
  },
  setup() {
    const store = useStore();

    const acFlag = ref('background');
    const configComponent = ref([]);

    watch(
      () => store.state.acFlag.type,
      (val: string) => (acFlag.value = val),
      { immediate: true, deep: true }
    );
    watch(
      () => store.state.acComponent?.config,
      (config: any) => {
        if (!!config) {
          configComponent.value = config.map((o: string) => `M${o.replace(o[0], o[0].toUpperCase())}`);
        } else {
          configComponent.value = [];
        }
      },
      { immediate: true, deep: true }
    );

    return {
      acFlag,
      configComponent
    };
  }
});
</script>
