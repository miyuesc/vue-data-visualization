<template>
  <div class="chart-title-component" v-show="titleConfig && (titleConfig.titleVisible || titleConfig.unitVisible)">
    <span class="chart-title" :style="titleStyle">{{ titleContent }}</span>
    <span class="chart-unit" :style="unitStyle">{{ unitContent }}</span>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';

export default defineComponent({
  name: 'ChartTitle',
  props: {
    titleConfig: {
      type: Object,
      default: () => ({})
    }
  },
  setup(props) {
    const titleContent = computed(() => props.titleConfig?.titleContent || '请输入标题');
    const unitContent = computed(() => props.titleConfig?.unitContent || '单位');

    const titleStyle = computed(() => {
      return {
        display: props.titleConfig.titleVisible ? 'inline' : 'none',
        fontWeight: props.titleConfig.titleBold ? 'bold' : 'normal',
        fontSize: props.titleConfig.titleSize ? `${props.titleConfig.titleSize}px` : '12px',
        fontStyle: props.titleConfig.titleItalic ? 'italic' : 'normal',
        color: props.titleConfig.titleColor || '#333333'
      };
    });

    const unitStyle = computed(() => {
      return {
        display: props.titleConfig.unitVisible ? 'inline' : 'none',
        fontWeight: props.titleConfig.unitBold ? 'bold' : 'normal',
        fontSize: props.titleConfig.unitSize ? `${props.titleConfig.unitSize}px` : '12px',
        fontStyle: props.titleConfig.unitItalic ? 'italic' : 'normal',
        color: props.titleConfig.unitColor || '#333333'
      };
    });

    return {
      titleContent,
      unitContent,
      titleStyle,
      unitStyle
    };
  }
});
</script>

<style lang="scss" scoped>
.chart-title-component {
  display: flex;
  width: 100%;
  height: max-content;
  min-height: 40px;
  max-height: 60px;
  justify-content: space-between;
  align-items: baseline;
  box-sizing: border-box;
  padding: 8px;
  .chart-title,
  .chart-unit {
    overflow: hidden;
    white-space: nowrap;
    word-break: break-word;
    text-overflow: clip;
  }
  .chart-title {
    width: 75%;
  }
  .chart-unit {
    width: 25%;
    text-align: right;
  }
}
</style>
