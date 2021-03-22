<template>
  <div class="move-guide-line vertical-line l-vertical-line" v-show="moving" v-bind:style="verticalStyleL"></div>
  <div class="move-guide-line vertical-line r-vertical-line" v-show="moving" v-bind:style="verticalStyleR"></div>
  <div class="move-guide-line horizontal-line t-horizontal-line" v-show="moving" v-bind:style="horizontalStyleT"></div>
  <div class="move-guide-line horizontal-line b-horizontal-line" v-show="moving" v-bind:style="horizontalStyleB"></div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useStore } from 'vuex';

export default defineComponent({
  name: 'MoveGuideLines',
  setup() {
    // const activityComponent.value = useStore().state.activeElement;
    // const canvasState = useStore().state.canvas;

    const store = useStore();
    const canvas: any = computed(() => store.state.canvas).value;
    const activityComponent: any = computed(() => store.state.activity.component).value;

    const moving = computed(() => activityComponent?.movable || false);
    const borderWidth = Math.floor(2 / canvas.scale) || 1;

    const verticalStyleL = computed(() => {
      if (!moving.value) return 'display: none';
      return `left: ${activityComponent.position.left}px; border-width: 0; border-right-width: ${borderWidth}px`;
    });
    const verticalStyleR = computed(() => {
      if (!moving.value) return 'display: none';
      return `left: ${
        activityComponent.position.left + activityComponent.component.size.width - borderWidth
      }px; border-width: 0; border-right-width: ${borderWidth}px`;
    });
    const horizontalStyleT = computed(() => {
      if (!moving.value) return 'display: none';
      return `top: ${activityComponent.position.top}px; border-width: 0; border-bottom-width: ${borderWidth}px`;
    });
    const horizontalStyleB = computed(() => {
      if (!moving.value) return 'display: none';
      return `top: ${
        activityComponent.position.top + activityComponent.component.size.height - borderWidth
      }px; border-width: 0; border-bottom-width: ${borderWidth}px`;
    });

    return {
      moving,
      verticalStyleL,
      verticalStyleR,
      horizontalStyleT,
      horizontalStyleB
    };
  }
});
</script>

<style lang="scss" scoped>
.move-guide-line {
  position: absolute;
  background: none;
  outline: none;
  box-sizing: border-box;
  pointer-events: none;
  border-style: dashed;
  border-color: #c8141499;
  z-index: 1;
}
.vertical-line {
  top: 0;
  bottom: 0;
  width: 0;
}
.horizontal-line {
  left: 0;
  right: 0;
  height: 0;
}
</style>
