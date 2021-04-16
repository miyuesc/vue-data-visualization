<template>
  <div class="component-base-config">
    <div
      class="content-pad-item__title with-tag"
      :class="{ 'is-open': backgroundContentVisible }"
      @click.stop="changeVisible"
    >
      背景与边框
    </div>
    <el-collapse-transition>
      <div v-show="backgroundContentVisible">
        <config-form-item label="填充色" :label-width="64">
          <el-color-picker v-model="background.color" />
          <el-input v-model="background.color" :maxlength="6" style="width: 100px; margin-left: 8px" />
        </config-form-item>
        <config-form-item label="透明度" :label-width="64">
          <el-slider
            v-model="background.opacity"
            :max="1"
            :step="0.01"
            :show-tooltip="false"
            :show-input-controls="false"
            input-size="mini"
            style="width: 100%"
            show-input
          />
        </config-form-item>
        <config-form-item label="边框" :label-width="64">
          <el-color-picker v-model="background.borderColor" />
          <el-select v-model="background.borderStyle" style="margin-left: 8px">
            <el-option value="solid">
              <span style="display: inline-block; width: 100%; height: 0; border-bottom: 1px solid #cccccc"></span>
            </el-option>
            <el-option value="double">
              <span
                style="
                  display: inline-block;
                  width: 100%;
                  height: 4px;
                  border-top: 1px solid #cccccc;
                  border-bottom: 1px solid #cccccc;
                "
              ></span>
            </el-option>
            <el-option value="dashed">
              <span style="display: inline-block; width: 100%; height: 0; border-bottom: 1px dashed #cccccc"></span>
            </el-option>
          </el-select>
          <el-input-number
            v-model="background.borderWidth"
            :min="0"
            :max="20"
            :step="1"
            :precision="0"
            style="margin-left: 8px"
            controls-position="right"
          />
        </config-form-item>
        <config-form-item label="边框透明度" :label-width="64">
          <el-slider
            v-model="background.borderOpacity"
            :max="1"
            :step="0.01"
            :show-tooltip="false"
            :show-input-controls="false"
            input-size="mini"
            style="width: 100%"
            show-input
          />
        </config-form-item>
        <config-form-item label="圆角" :label-width="64">
          <el-slider
            v-model="background.borderRadius"
            :min="0"
            :max="100"
            :step="1"
            :show-tooltip="false"
            :show-input-controls="false"
            input-size="mini"
            style="width: 100%"
            show-input
          />
        </config-form-item>
        <config-form-item label="阴影颜色" :label-width="64">
          <el-color-picker v-model="background.shadowColor" />
        </config-form-item>
        <config-form-item label="X轴偏移" :label-width="64">
          <el-input-number
            v-model="background.shadowX"
            :min="-100"
            :max="200"
            :step="1"
            :precision="0"
            controls-position="right"
          />
        </config-form-item>
        <config-form-item label="Y轴偏移" :label-width="64">
          <el-input-number
            v-model="background.shadowY"
            :min="-100"
            :max="200"
            :step="1"
            :precision="0"
            controls-position="right"
          />
        </config-form-item>
        <config-form-item label="虚化距离" :label-width="64">
          <el-input-number
            v-model="background.shadowBlur"
            :min="0"
            :max="200"
            :step="1"
            :precision="0"
            controls-position="right"
          />
        </config-form-item>
        <config-form-item label="扩散距离" :label-width="64">
          <el-input-number
            v-model="background.shadowDiff"
            :min="0"
            :max="200"
            :step="1"
            :precision="0"
            controls-position="right"
          />
        </config-form-item>
      </div>
    </el-collapse-transition>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, shallowReactive, watch, ref } from 'vue';
import { useStore } from 'vuex';
import { objectDeepClone } from '@/utils/commonUtils';

export default defineComponent({
  name: 'MBackground',
  props: {
    config: Object
  },
  setup() {
    const store = useStore();
    const activityComponent = computed(() => store.state.acComponent).value;

    const background = shallowReactive({});
    const backgroundContentVisible = ref(false);

    // 监听id 变化重新赋值
    watch(
      () => activityComponent.id,
      () => {
        // if (activityComponent && activityComponent.background) {
        objectDeepClone(background, activityComponent.background);
        backgroundContentVisible.value = false;
        // } else {
        //   objectDeepClone(background, defaultBackground);
        // }
      },
      { immediate: true }
    );

    watch(
      () => background,
      () => store.commit('updateComponent', { newState: background, key: 'background' }),
      { deep: true }
    );

    const changeVisible = () => (backgroundContentVisible.value = !backgroundContentVisible.value);

    return {
      background,
      backgroundContentVisible,
      changeVisible
    };
  }
});
</script>
<style scoped>
.config-form-item + .config-form-item {
  margin-top: 8px;
}
</style>
