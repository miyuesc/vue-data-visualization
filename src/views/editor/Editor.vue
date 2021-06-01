<template>
  <div class="editor-container">
    <header class="editor-header">
      <ToolBar />
    </header>
    <main class="editor-main">
      <PaletteBar />
      <ContentPad />
      <OverviewPad />
      <div class="editor-content">
        <div class="screen">
          <!-- 场景元素区域 Scenes-->
          <ScenesCanvas :cp-style="screenStyle" />
          <!-- 元素存在区域 -->
          <ComponentsCanvas :cp-style="screenStyle" />
          <!-- 指示器区域 -->
          <HandlersCanvas :cp-style="screenStyle" />
        </div>
      </div>
    </main>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useStore } from 'vuex';
import ToolBar from '../../components/editor-tool-bar/ToolBar.vue';
import ComponentsCanvas from '../../components/editor-canvas/ComponentsCanvas.vue';
import ScenesCanvas from '../../components/editor-canvas/ScenesCanvas.vue';
import HandlersCanvas from '../../components/editor-canvas/HanldersCanvas.vue';
import PaletteBar from '../../components/editor-palette/PaletteBar.vue';
import ContentPad from '../../components/editor-content-pad/ContentPad.vue';
import OverviewPad from '@/components/editor-overview-pad/OverviewPad.vue';
import type { ComputedRef } from 'vue';
import type { Store } from 'vuex';
import type { Canvas } from '@/types/canvas';
import type { StoreState } from '@/types/store';

export default defineComponent({
  name: 'Editor',
  components: {
    OverviewPad,
    PaletteBar,
    HandlersCanvas,
    ComponentsCanvas,
    ScenesCanvas,
    ToolBar,
    ContentPad
  },
  setup() {
    const store: Store<StoreState> = useStore();
    const canvasState: Canvas = store.state.canvas;

    const screenStyle: ComputedRef<string> = computed(() => `transform: scale(${canvasState.scale});`);

    return {
      screenStyle
    };
  }
});
</script>

<style lang="scss">
@import '../../assets/styles/editor-styles';
</style>
