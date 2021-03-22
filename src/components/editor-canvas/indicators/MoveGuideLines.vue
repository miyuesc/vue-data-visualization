<template>
  <div class="move-guide-line vertical-line l-vertical-line" v-show="isMoving" v-bind:style="verticalStyleL"></div>
  <div class="move-guide-line vertical-line r-vertical-line" v-show="isMoving" v-bind:style="verticalStyleR"></div>
  <div
    class="move-guide-line horizontal-line t-horizontal-line"
    v-show="isMoving"
    v-bind:style="horizontalStyleT"
  ></div>
  <div
    class="move-guide-line horizontal-line b-horizontal-line"
    v-show="isMoving"
    v-bind:style="horizontalStyleB"
  ></div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useStore } from 'vuex';

export default defineComponent({
  name: 'MoveGuideLines',
  setup() {
    const store = useStore();
    const isMoving = computed(() => store.state.activity.isMoving);
    const position = computed(() => store.state.activity.component?.position);
    const size = computed(() => store.state.activity.component?.size);

    const borderWidth = computed(() => {
      return Math.floor(2 / store.state.canvas.scale) || 1;
    });

    const verticalStyleL = computed(() => {
      if (!isMoving.value) return 'display: none';
      return `left: ${position.value.left}px; border-width: 0; border-right-width: ${borderWidth.value}px`;
    });
    const verticalStyleR = computed(() => {
      if (!isMoving.value) return 'display: none';
      return `left: ${
        position.value.left + size.value.width - borderWidth.value
      }px; border-width: 0; border-right-width: ${borderWidth.value}px`;
    });
    const horizontalStyleT = computed(() => {
      if (!isMoving.value) return 'display: none';
      return `top: ${position.value.top}px; border-width: 0; border-bottom-width: ${borderWidth.value}px`;
    });
    const horizontalStyleB = computed(() => {
      if (!isMoving.value) return 'display: none';
      return `top: ${
        position.value.top + size.value.height - borderWidth.value
      }px; border-width: 0; border-bottom-width: ${borderWidth.value}px`;
    });

    return {
      isMoving,
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
  z-index: 0;
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
