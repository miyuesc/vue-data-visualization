<template>
  <div class="component-base-config">
    <div class="content-pad-item__title">背景</div>
    <div class="content-pad-row">
      <config-form-item label="填充色" :label-width="64">
        <el-color-picker v-model="background.color" />
        <el-input v-model="background.color" :maxlength="6" style="width: 120px; margin-left: 8px" />
      </config-form-item>
    </div>
    <div class="content-pad-row">
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
    </div>
    <div class="content-pad-row">
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
    </div>
    <div class="content-pad-row">
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
    </div>
    <div class="content-pad-row">
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
    </div>
    <div class="content-pad-row">
      <config-form-item label="阴影" :label-width="64">
        <div class="shadow-config-form">
          <div class="shadow-config-item">
            <span class="shadow-config-item_label">颜色</span>
            <el-color-picker v-model="background.shadowColor" />
          </div>
          <div class="shadow-config-item">
            <span class="shadow-config-item_label">X轴偏移</span>
            <el-input-number
              v-model="background.shadowX"
              :min="-100"
              :max="200"
              :step="1"
              :precision="0"
              controls-position="right"
            />
          </div>
          <div class="shadow-config-item">
            <span class="shadow-config-item_label">Y轴偏移</span>
            <el-input-number
              v-model="background.shadowY"
              :min="-100"
              :max="200"
              :step="1"
              :precision="0"
              controls-position="right"
            />
          </div>
          <div class="shadow-config-item">
            <span class="shadow-config-item_label">虚化距离</span>
            <el-input-number
              v-model="background.shadowBlur"
              :min="0"
              :max="200"
              :step="1"
              :precision="0"
              controls-position="right"
            />
          </div>
          <div class="shadow-config-item">
            <span class="shadow-config-item_label">扩散距离</span>
            <el-input-number
              v-model="background.shadowDiff"
              :min="0"
              :max="200"
              :step="1"
              :precision="0"
              controls-position="right"
            />
          </div>
        </div>
      </config-form-item>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, shallowReactive, watch } from 'vue';
import { useStore } from 'vuex';
import { objectDeepClone } from '@/utils/commonUtils';

export default defineComponent({
  name: 'MBackground',
  props: {
    config: Object
  },
  setup() {
    const store = useStore();
    const activityComponent = computed(() => store.state.activatedComponent).value;

    const defaultBackground = {
      color: '',
      borderRadius: 0,
      borderWidth: 0,
      borderStyle: 'solid',
      borderColor: '#000000',
      borderOpacity: 0.6,
      opacity: 0.8,
      shadowColor: '#000000',
      shadowX: 0,
      shadowY: 0,
      shadowBlur: 0,
      shadowDiff: 0
    };
    const background = shallowReactive({});

    // 监听id 变化重新赋值
    watch(
      () => activityComponent.id,
      () => {
        // if (activityComponent && activityComponent.background) {
        objectDeepClone(background, activityComponent.background);
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

    return {
      background
    };
  }
});
</script>
