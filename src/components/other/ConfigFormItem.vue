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
      return `width: ${props.labelWidth}px`;
    });

    return {
      labelWidthStyle
    };
  }
});
</script>

<style lang="scss" scoped>
.config-form-item {
  width: 100%;
  height: 32px;
  line-height: 32px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  .config-form-item__label {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    word-break: break-word;
    text-align: right;
  }
  .config-form-item__content {
    flex: 1;
    box-sizing: border-box;
    padding-left: 8px;
  }
}
</style>
