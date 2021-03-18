<template>
  <div class="editor-canvas-area" :style="cpStyle">
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
    ></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ComputedRef } from "vue";
import { useStore } from "vuex";
import { ChartComponent, ChartComponents } from "@/types/components";

export default defineComponent({
  name: "ComponentsCanvas",
  props: { cpStyle: String },
  setup() {
    const componentsState: ChartComponents = useStore().state.components;

    const componentsList: ComputedRef<ChartComponent[]> = computed(() => componentsState.components);

    return {
      componentsList
    };
  }
});
</script>

<style lang="scss">
.cp {
  background: #00b9ff99;
  position: absolute;
}
</style>
