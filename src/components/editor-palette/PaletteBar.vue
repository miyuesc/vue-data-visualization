<template>
  <div class="editor-palette-bar" ref="paletteRef">
    <div class="root-content">
      <div
        v-for="i in presetComponentsList"
        :class="{ 'component-type-button': true, 'is-selected': i.icon === selectedComponentType.activeKey }"
        :key="'type' + i.icon"
        :id="'type-' + i.icon"
        @click.stop="openChildrenPenal(i)"
      >
        <svg class="component-type-button__icon" aria-hidden="true" style="pointer-events: none">
          <use :xlink:href="`#${i.icon}`"></use>
        </svg>
      </div>
    </div>
    <div :class="{ 'component-support-list': true, 'is-show': showPanel }">
      <a
        v-for="p in selectedComponentType.list"
        :key="p.code"
        class="component-support-item"
        @mousedown.stop="dragStart($event, p)"
        @dragstart.stop.prevent
      >
        <img
          src="https://cdn.jsdelivr.net/gh/apache/echarts-website@asf-site/examples/data/thumb/line-simple.webp?_v_=1612615474746"
          alt="test"
        />
      </a>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue';
import presetComponents from '@/assets/components/presetComponents';
import { useStore } from 'vuex';
import { MouseDownCoordinator } from '@/types/mouseStatus';

export default defineComponent({
  name: 'PaletteBar',
  setup() {
    const store = useStore();
    const presetComponentsList = presetComponents;
    const selectedComponentType = reactive({ list: [], activeKey: '' });
    const showPanel = ref(false);

    const openChildrenPenal = (i: any) => {
      showPanel.value = !(selectedComponentType.activeKey === i.icon);
      selectedComponentType.activeKey = selectedComponentType.activeKey === i.icon ? '' : i.icon;
      selectedComponentType.list = Object.values(i.children || {});
    };

    const dragStart = (e: MouseEvent, p: any) => {
      const mdc: MouseDownCoordinator = {
        x: 0,
        y: 0,
        mouseX: e.offsetX,
        mouseY: e.offsetY,
        width: 0,
        height: 0
      };
      store.commit('mouseStatus/updateMDC', mdc);
      store.commit('mouseStatus/updateMAT', 'create');
      store.commit('components/dragging', JSON.stringify(p));
    };

    return {
      presetComponentsList,
      selectedComponentType,
      showPanel,
      openChildrenPenal,
      dragStart
    };
  }
});
</script>

<style lang="scss" scoped>
.editor-palette-bar {
  width: 48px;
  height: 100%;
  position: relative;
  .root-content {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background: #ccf2f4;
    z-index: 10;
    .component-type-button {
      width: 48px;
      height: 48px;
      display: flex;
      justify-content: center;
      align-items: center;
      box-sizing: border-box;
      position: relative;
      &:hover {
        cursor: pointer;
        background: #00b9ff22;
      }
      &.is-selected {
        background: #00b9ff22;

        &:before {
          content: '';
          width: 2px;
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          background: #4a71fe;
        }
      }
      .component-type-button__icon {
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        padding: 25%;
      }
    }
  }
  .component-support-list {
    position: absolute;
    right: 0;
    top: 0;
    bottom: 0;
    width: 256px;
    z-index: 8;
    background: #ccf2f4;
    display: flex;
    flex-direction: column;
    padding: 16px;
    box-sizing: border-box;
    overflow-y: auto;
    transition: all ease 0.2s;
    transform: translateX(-25%);
    pointer-events: auto;
    &::-webkit-scrollbar {
      display: none;
    }
    &.is-show {
      transform: translateX(102%);
    }
    .component-support-item {
      box-sizing: border-box;
      width: 100%;
      min-height: 128px;
      max-height: 128px;
      display: block;
      background: #f4f9f9;
      overflow: hidden;
      img {
        width: 100%;
        height: 100%;
      }
      & + .component-support-item {
        margin-top: 16px;
      }
    }
  }
}
</style>
