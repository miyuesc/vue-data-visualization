<template>
  <div class="component-base-config">
    <div class="content-pad-item__title not-tag">位置与尺寸</div>
    <div class="content-pad-row">
      <config-form-item label="X" :label-width="20">
        <el-input-number
          v-model="left"
          :step="1"
          :min="0"
          controls-position="right"
          @change="debounceUpdatePosition()"
        />
      </config-form-item>
      <config-form-item label="Y" :label-width="20">
        <el-input-number
          v-model="top"
          :step="1"
          :min="0"
          controls-position="right"
          @change="debounceUpdatePosition()"
        />
      </config-form-item>
    </div>
    <div class="content-pad-row">
      <config-form-item label="W" :label-width="20">
        <el-input-number v-model="width" :step="1" :min="0" controls-position="right" @change="debounceUpdateSize()" />
      </config-form-item>
      <config-form-item label="H" :label-width="20">
        <el-input-number v-model="height" :step="1" :min="0" controls-position="right" @change="debounceUpdateSize()" />
      </config-form-item>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watchEffect } from 'vue';
import { useStore } from 'vuex';
import { debounce } from '@/utils/commonUtils';

export default defineComponent({
  name: 'MBaseConfig',
  setup() {
    const store = useStore();
    // const acComponent = computed(() => store.state.acComponent).value;

    const left = ref(0);
    const top = ref(0);
    const width = ref(0);
    const height = ref(0);

    watchEffect(
      () => {
        if (store.state.acComponent && store.state.acComponent.id) {
          left.value = store.state.acComponent.position.left;
          top.value = store.state.acComponent.position.top;
          width.value = store.state.acComponent.size.width;
          height.value = store.state.acComponent.size.height;
        }
      },
      { flush: 'sync' }
    );

    const debounceUpdatePosition = debounce(function () {
      const position = { left: left.value, top: top.value };
      store.commit('updateComponent', { newState: { ...position }, key: 'position' });
    }, 100);

    const debounceUpdateSize = debounce(function () {
      const size = { width: width.value, height: height.value };
      store.commit('updateComponent', { newState: { ...size }, key: 'size' });
    }, 100);

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
