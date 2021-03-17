<template>
  <div class="editor-palette-bar"></div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'PaletteBar',
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
          content: "";
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
