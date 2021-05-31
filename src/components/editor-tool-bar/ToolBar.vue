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
      <svg aria-hidden="true" @click="removeComponent()">
        <use xlink:href="#dv-delete"></use>
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
    <span class="tool-bar-button" @click="previewConfig">
      <svg aria-hidden="true">
        <use xlink:href="#dv-yulan"></use>
      </svg>
    </span>
  </div>

  <el-dialog v-model="previewModelVisible" title="预览" width="80vw" destroy-on-close append-to-body>
    <pre class="preview-code-style">
      <code>
        {{ componentsConfig }}
      </code>
    </pre>
  </el-dialog>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useStore } from 'vuex';
import type { Ref } from 'vue';
import type { Store } from 'vuex';
import type { StoreState } from '@/types/store';

export default defineComponent({
  name: 'ToolBar',
  setup() {
    const store: Store<StoreState> = useStore();
    const canvasScale: Ref<number> = ref(store.state.canvas.scale * 100);
    const previewModelVisible: Ref<boolean> = ref(false);
    const componentsConfig = ref('');

    const updateCanvasScale = (): void => {
      store.commit('updateCanvas', { scale: canvasScale.value / 100 });
    };

    const swapComponent = (type: string): void => {
      store.commit('swapComponent', type);
    };

    const removeComponent = (): void => {
      store.commit('removeComponent');
    };

    const previewConfig = (): void => {
      componentsConfig.value = JSON.stringify(store.state.components, null, 2);
      previewModelVisible.value = true;
    };

    return {
      canvasScale,
      previewModelVisible,
      componentsConfig,
      updateCanvasScale,
      swapComponent,
      removeComponent,
      previewConfig
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
.preview-code-style {
  width: 100%;
  height: 100%;
  max-height: 80vh;
  overflow-y: auto;
  font-family: Menlo, Monaco, Consolas, Courier, monospace;
}
</style>
