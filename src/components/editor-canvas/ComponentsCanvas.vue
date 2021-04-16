<template>
  <div
    class="editor-canvas-area"
    :style="cpStyle"
    @mousedown.stop="clearActivity"
    @dragover.prevent
    @dragleave.prevent
    @dragenter.prevent
    @drop="drop"
  >
    <div
      v-for="(cpt, index) in componentsList"
      :key="cpt.id"
      :class="`cp cp__${cpt.id}`"
      :style="{
        width: `${cpt.size.width}px`,
        height: `${cpt.size.height}px`,
        left: `${cpt.position.left}px`,
        top: `${cpt.position.top}px`,
        zIndex: index + 1
      }"
      @mousedown.stop="dragStart($event, cpt, index)"
    >
      <ComponentTransform :info="cpt" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, watchEffect, ref } from 'vue';
import { useStore } from 'vuex';
import dragEventHook from '@/components/hooks/dragEventHook';
import dropEventHook from '@/components/hooks/dropEventHook';
import ComponentTransform from './indicators/ComponentTransform.vue';

export default defineComponent({
  name: 'ComponentsCanvas',
  props: { cpStyle: String },
  components: {
    ComponentTransform
  },
  setup() {
    const store = useStore();

    const components = computed(() => store.state.components);
    const componentsList = ref({});

    watchEffect(() => (componentsList.value = components.value));

    const clearActivity = () => {
      store.commit('setActivated', { type: 'background', component: {} });
    };

    const { dragStart } = dragEventHook();
    const { drop } = dropEventHook();

    return {
      componentsList,
      clearActivity,
      dragStart,
      drop
    };
  }
});
</script>

<style lang="scss">
.cp {
  position: absolute;
  box-sizing: border-box;
}
</style>
