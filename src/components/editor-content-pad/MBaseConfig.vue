<template>
  <div class="component-base-config">
    <div class="content-pad-item__title">位置与尺寸</div>
    <div class="content-pad-row">
      <config-form-item label="X" :label-width="20">
        <el-input-number v-model="left" :step="1" :min="0" @change="debounceUpdatePosition()" />
      </config-form-item>
      <config-form-item label="Y" :label-width="20">
        <el-input-number v-model="top" :step="1" :min="0" @change="debounceUpdatePosition()" />
      </config-form-item>
    </div>
    <div class="content-pad-row">
      <config-form-item label="W" :label-width="20">
        <el-input-number v-model="width" :step="1" :min="0" @change="debounceUpdateSize()" />
      </config-form-item>
      <config-form-item label="H" :label-width="20">
        <el-input-number v-model="height" :step="1" :min="0" @change="debounceUpdateSize()" />
      </config-form-item>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch, toRef } from 'vue';
import { useStore } from 'vuex';
import { debounce } from '@/utils/commonUtils';

export default defineComponent({
  name: 'MBaseConfig',
  props: {
    config: Object
  },
  setup(props) {
    const store = useStore();

    const config = toRef(props, 'config');

    const left = ref(0);
    const top = ref(0);
    const width = ref(0);
    const height = ref(0);

    watch(config, () => {
      left.value = config.value?.position?.left || 0;
      top.value = config.value?.position?.top || 0;
      width.value = config.value?.size?.width || 0;
      height.value = config.value?.size?.height || 0;
    });

    const debounceUpdatePosition = debounce(function () {
      const position = { left: left.value, top: top.value };
      store.commit('updateActivity', { ...config.value, position });
    }, 200);

    const debounceUpdateSize = debounce(function () {
      const size = { width: width.value, height: height.value };
      store.commit('updateActivity', { ...config.value, size });
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
