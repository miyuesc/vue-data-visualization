<template>
  <div
    class="editor-canvas-area"
    :style="cpStyle"
    @mousedown.stop="clearActivity"
    @dragover.prevent
    @dragleave.prevent
    @dragenter.prevent
    @drop="dropEnd"
  >
    <div
      v-for="cpt in componentsList"
      :key="cpt.id"
      :class="`cp cp__${cpt.id}`"
      :style="{
        width: `${cpt.size.width}px`,
        height: `${cpt.size.height}px`,
        left: `${cpt.position.left}px`,
        top: `${cpt.position.top}px`,
        zIndex: cpt.zIndex
      }"
      @mousedown.stop="dragStart($event, cpt)"
    >
      <!--      <ComponentTransform :info="cpt.componentInfo" :size="cpt.size" />-->
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useStore } from 'vuex';
import dragEventHook from '@/components/hooks/dragEventHook';
import ComponentTransform from './indicators/ComponentTransform.vue';

export default defineComponent({
  name: 'ComponentsCanvas',
  props: { cpStyle: String },
  components: {
    // ComponentTransform
  },
  setup() {
    const store = useStore();

    const componentsList = computed(() => store.state.components);
    const clearActivity = () => {
      store.commit('setActivity', { type: 'background', component: null });
    };

    const { dragStart } = dragEventHook();

    const dropEnd = (event: MouseEvent) => {
      console.log(event);
    };

    return {
      componentsList,
      clearActivity,
      dragStart,
      dropEnd
    };
  }
});
</script>

<style lang="scss">
.cp {
  position: absolute;
}
</style>
