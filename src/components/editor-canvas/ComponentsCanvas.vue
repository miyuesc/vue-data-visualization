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
      v-for="cpt of componentsList"
      :key="cpt.id"
      :class="`cp cp__${cpt.id}`"
      @mousedown.stop="dragStart($event, cpt)"
      :style="{
        width: `${cpt.size.width}px`,
        height: `${cpt.size.height}px`,
        left: `${cpt.position.left}px`,
        top: `${cpt.position.top}px`,
        zIndex: cpt.zIndex
      }"
    >
      <ComponentTransform :info="cpt" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
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

    const componentsList = computed(() => Object.values(store.state.components ?? {}));

    const clearActivity = () => {
      store.commit('setActivated', { type: 'background', component: null });
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
  overflow: hidden;
}
</style>
