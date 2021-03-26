<template>
  <div class="chart-title-component">
    <span class="chart-title" :style="titleStyle">{{ titleContent }}</span>
    <span class="chart-unit" :style="unitStyle">{{ unitContent }}</span>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { useStore } from 'vuex';

export default defineComponent({
  name: 'ChartTitle',
  setup() {
    const store = useStore();
    const activity = store.state.activity;

    const titleContent = computed(() => activity.component?.title.titleContent ?? '请输入标题');
    const unitContent = computed(() => activity.component?.title.unitContent ?? '单位');

    const titleStyle = computed(() => {
      return {
        fontWeight: activity.component?.title?.titleBold ? 'bold' : 'normal',
        fontSize: activity.component?.title?.titleBold ? `${activity.component.title.titleBold}px` : '12px',
        fontStyle: activity.component?.title?.titleItalic ? 'italic' : 'normal',
        color: activity.component?.title?.titleColor || '#333333'
      };
    });

    const unitStyle = computed(() => {
      return {
        fontSize: activity.component?.title?.unitSize ? `${activity.component.title.unitSize}px` : '12px',
        color: activity.component?.title?.unitColor || '#333333'
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
