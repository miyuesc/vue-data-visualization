<template>
  <div class="component-base-config">
    <div class="content-pad-item__title">位置与尺寸</div>
    <div class="content-pad-row">
      <config-form-item label="X" :label-width="20">
        <a-input-number
          v-model:value="left"
          size="small"
          controls-position="right"
          :step="1"
          :min="0"
          @change="debounceUpdatePosition()"
        />
      </config-form-item>
      <config-form-item label="Y" :label-width="20">
        <a-input-number
          v-model:value="top"
          size="small"
          controls-position="right"
          :step="1"
          :min="0"
          @change="debounceUpdatePosition()"
        />
      </config-form-item>
    </div>
    <div class="content-pad-row">
      <config-form-item label="W" :label-width="20">
        <a-input-number
          v-model:value="width"
          size="small"
          controls-position="right"
          :step="1"
          :min="0"
          @change="debounceUpdateSize()"
        />
      </config-form-item>
      <config-form-item label="H" :label-width="20">
        <a-input-number
          v-model:value="height"
          size="small"
          controls-position="right"
          :step="1"
          :min="0"
          @change="debounceUpdateSize()"
        />
      </config-form-item>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue';
import { useStore } from 'vuex';
import { debounce } from '@/utils/commonUtils';

export default defineComponent({
  name: 'MBaseConfig',
  setup() {
    const store = useStore();
    const activeElement = store.state.activeElement;

    const left = ref(0);
    const top = ref(0);
    const width = ref(0);
    const height = ref(0);

    watch(
      () => activeElement.position,
      () => {
        left.value = activeElement.position.left;
        top.value = activeElement.position.top;
      }
    );

    watch(
      () => activeElement.size,
      () => {
        width.value = activeElement.size.width;
        height.value = activeElement.size.height;
      }
    );

    const debounceUpdatePosition = debounce(function () {
      store.commit('activeElement/updatePosition', { left: left.value, top: top.value });
      store.commit('components/update', { component: { ...activeElement }, index: activeElement.index });
    }, 200);
    const debounceUpdateSize = debounce(function () {
      console.log(1);
      store.commit('activeElement/updateSize', { width: width.value, height: height.value });
      store.commit('components/update', { component: { ...activeElement }, index: activeElement.index });
    }, 200);

    return {
      left,
      top,
      width,
      height,
      debounceUpdatePosition,
      debounceUpdateSize
    };
  }
});
</script>
