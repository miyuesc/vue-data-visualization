<template>
  <div class="config-form-item">
    <div class="config-form-item__label" :style="labelWidthStyle">{{ label }}</div>
    <div class="config-form-item__content">
      <slot></slot>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, computed } from 'vue';

export default defineComponent({
  name: 'ConfigFormItem',
  props: {
    label: {
      type: String
    },
    labelWidth: {
      type: Number,
      default: 80
    }
  },
  setup(props) {
    const labelWidthStyle = computed(() => {
      return `width: ${props.labelWidth}px; min-width: ${props.labelWidth}px`;
    });

    return {
      labelWidthStyle
    };
  }
});
</script>

<style lang="scss">
.config-form-item {
  width: 100%;
  //height: 28px;
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;
  .config-form-item__label {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    word-break: break-word;
    text-align: right;
    font-size: 12px;
    line-height: 28px;
    align-self: flex-start;
  }
  .config-form-item__content {
    flex: 1;
    box-sizing: border-box;
    padding-left: 16px;
    display: flex;
    align-items: center;
    > .el-select {
      width: 80px;
    }
    > .el-input-number {
      width: 96px;
    }
    > .el-slider .el-input,
    > .el-slider .el-input-number {
      width: 80px;
    }
    .el-slider__runway.show-input {
      margin-right: 96px;
    }
  }
}
</style>
