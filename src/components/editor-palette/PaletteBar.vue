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
        class="component-support-item"
        :key="p.code"
        draggable
        @dragstart="dragToCreate($event, p)"
        @click="clickToCreate(p)"
      >
        <img
          :src="imagesObject[p.code] ?? require('../../assets/images/no-image.png')"
          :class="`item-image-${selectedComponentType.activeKey}`"
          :alt="p.code"
        />
        <div class="component-support-item__name">{{ p.name }}</div>
      </a>
    </div>
  </div>
</template>

<script lang="ts">
import presetComponents from '@/assets/components/presetComponents';
import images from '@/assets/components/componentImages';
import { defineComponent, reactive, ref } from 'vue';
import { useStore } from 'vuex';
import type { Ref } from 'vue';
import type { Store } from 'vuex';
import type { StoreState } from '@/types/store';
import { Size } from '@/types/component';

export default defineComponent({
  name: 'PaletteBar',
  setup() {
    const store: Store<StoreState> = useStore();
    const presetComponentsList: any = presetComponents;
    const imagesObject: { [key: string]: string } = images;
    const selectedComponentType = reactive({ list: [], activeKey: '' });
    const showPanel: Ref<boolean> = ref(false);

    const openChildrenPenal = (i: any): void => {
      showPanel.value = !(selectedComponentType.activeKey === i.icon);
      selectedComponentType.activeKey = selectedComponentType.activeKey === i.icon ? '' : i.icon;
      selectedComponentType.list = Object.values(i.children || {});
    };

    const dragToCreate = (event: any, component: any): void => {
      const { offsetX, offsetY } = event;
      store.commit('setDraggedComponent', { component, config: { offsetX, offsetY } });
    };

    const clickToCreate = (component: any): void => {
      const canvasSize: Size = store.state.canvas.size;
      const defaultSize = { ...store.state.editorConfig.defaultComponentSize };

      const newComponent = {
        component: JSON.stringify(component),
        size: defaultSize,
        position: {
          left: (canvasSize.width - defaultSize.width) / 2,
          top: (canvasSize.height - defaultSize.height) / 2
        }
      };

      store.commit('createComponent', newComponent);
    };

    return {
      presetComponentsList,
      imagesObject,
      selectedComponentType,
      showPanel,
      openChildrenPenal,
      dragToCreate,
      clickToCreate
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
    background: #1b1b20;
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
        background: rgba(111, 111, 245, 0.2);
      }
      &.is-selected {
        background: rgba(111, 111, 245, 0.2);
        &:before {
          content: '';
          width: 4px;
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          background: linear-gradient(180deg, #0225df, #ff42ca 59%, #fc1535);
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
    background: #1b1b20;
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
      overflow: hidden;
      border-radius: 4px;
      position: relative;
      text-align: center;
      img {
        height: 100px;
        //margin-top: 14px;
      }
      .item-image-dv-xuritu {
        filter: invert(1);
        width: 100%;
        height: 100%;
      }
      .component-support-item__name {
        position: absolute;
        left: 0;
        bottom: 0;
        height: 40px;
        width: 100%;
        font-size: 12px;
        color: #ffffff;
        z-index: 2;
        line-height: 36px;
        box-sizing: border-box;
        padding-left: 8px;
        background: linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 1));
        transition: all ease 0.2s;
        transform: translateY(100%);
      }
      & + .component-support-item {
        margin-top: 16px;
      }
      &:hover {
        box-shadow: 0 0 0 1px #335ae9;
        cursor: pointer;
        .component-support-item__name {
          transform: translateY(0);
        }
      }
    }
  }
}
</style>
