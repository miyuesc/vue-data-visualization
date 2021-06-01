<template>
  <div class="editor-overview-pad" ref="paletteRef" v-show="overviewPadVisible">
    <div class="editor-overview-pad__title">图层管理</div>
    <div
      v-for="(cp, index) in componentList"
      :class="{ 'editor-overview-pad__item': true, 'is-active': acId === cp.id }"
      :key="cp.id"
      @click.stop="setActiveComponent(cp, index)"
    >
      <span class="editor-overview-pad__item-name">{{ `${cp.name} - ${cp.id}` }}</span>
      <span v-show="cp.isLocked" class="editor-overview-pad__item-lock">
        <i class="el-icon-lock"></i>
      </span>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { useStore } from 'vuex';
import { Component } from '@/types/component';

export default defineComponent({
  name: 'OverviewPad',
  setup() {
    const store = useStore();
    const overviewPadVisible = computed(() => store.state.editorConfig.overviewPadVisible);
    const componentList = computed(() => store.state.components);
    const acId = computed(() => store.state.acComponent?.id ?? '');

    const setActiveComponent = (component: Component, index: number): void => {
      store.commit('setActivated', { type: 'component', component, index });
    };

    return {
      overviewPadVisible,
      componentList,
      acId,
      setActiveComponent
    };
  }
});
</script>

<style lang="scss" scoped>
.editor-overview-pad {
  position: fixed;
  top: 42px;
  right: 360px;
  z-index: 100;
  width: 240px;
  min-height: 320px;
  max-height: 60vh;
  overflow-y: auto;
  background: #1b1b20;
  color: #b6b8cc;
  &::-webkit-scrollbar {
    width: 0;
    height: 0;
  }
  .editor-overview-pad__title {
    font-size: 14px;
    text-align: center;
    line-height: 32px;
    height: 36px;
    background: #20202a;
    margin-bottom: 8px;
    position: sticky;
    top: 0;
  }
  .editor-overview-pad__item {
    display: flex;
    font-size: 12px;
    line-height: 24px;
    height: 24px;
    box-sizing: border-box;
    padding: 0 8px;
    gap: 8px;
    justify-content: space-between;
    &:hover {
      cursor: pointer;
      background: #20202a;
    }
    &.is-active {
      background: linear-gradient(143deg, #335ae9, #6f6ff5);
      color: #ffffff;
    }
  }
  .editor-overview-pad__item-lock {
  }
}
</style>
