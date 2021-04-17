<template>
  <div class="editor-tools-bar">
    <span class="tool-bar-button">
      <svg aria-hidden="true">
        <use xlink:href="#dv-undo"></use>
      </svg>
    </span>
    <span class="tool-bar-button">
      <svg aria-hidden="true">
        <use xlink:href="#dv-redo"></use>
      </svg>
    </span>
    <span class="tool-bar-button">
      <svg aria-hidden="true" @click="swapComponent('lowest')">
        <use xlink:href="#dv-zhidi"></use>
      </svg>
    </span>
    <span class="tool-bar-button">
      <svg aria-hidden="true" @click="swapComponent('highest')">
        <use xlink:href="#dv-zhiding"></use>
      </svg>
    </span>
    <span class="tool-bar-button" @click="swapComponent('up')">
      <svg aria-hidden="true">
        <use xlink:href="#dv-shangyi"></use>
      </svg>
    </span>
    <span class="tool-bar-button" @click="swapComponent('down')">
      <svg aria-hidden="true">
        <use xlink:href="#dv-xiayi"></use>
      </svg>
    </span>
    <el-input-number
      class="canvas-scale-num"
      v-model="canvasScale"
      :step="5"
      :min="20"
      :max="150"
      controls-position="right"
      @change="updateCanvasScale"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useStore } from 'vuex';

export default defineComponent({
  name: 'ToolBar',
  setup() {
    const store = useStore();
    const canvasScale = ref(store.state.canvas.scale * 100);

    const updateCanvasScale = () => {
      store.commit('updateCanvas', { scale: canvasScale.value / 100 });
    };

    const swapComponent = (type: string) => {
      store.commit('swapComponent', type);
    };

    return {
      canvasScale,
      updateCanvasScale,
      swapComponent
    };
  }
});
</script>

<style lang="scss" scoped>
.editor-tools-bar {
  position: absolute;
  left: 50%;
  top: 0;
  bottom: 0;
  width: 600px;
  background: rgba(0, 0, 0, 0.2);
  transform: translateX(-50%);
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: space-around;
  .tool-bar-button {
    width: 24px;
    height: 24px;
    color: #e4e4e4;
  }
  svg {
    width: 100%;
    height: 100%;
    fill: #666666;
    &:hover {
      fill: #aaaaaa;
      cursor: pointer;
    }
  }
}
</style>
