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
        <el-color-picker v-model="background.border.color" />
        <el-select v-model="background.border.type" style="margin-left: 8px">
          <el-option value="solid">
            <span style="display: inline-block; width: 100%; height: 0; border-bottom: 1px solid #cccccc"></span>
          </el-option>
          <el-option value="dash">
            <span style="display: inline-block; width: 100%; height: 0; border-bottom: 1px dashed #cccccc"></span>
          </el-option>
        </el-select>
        <el-input-number
          v-model="background.border.width"
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
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, toRaw, watch } from 'vue';
import { useStore } from 'vuex';
import { objectDeepClone } from '@/utils/commonUtils';

export default defineComponent({
  name: 'MBackground',
  props: {
    config: Object
  },
  setup() {
    const store = useStore();
    const activityComponent = computed(() => store.state.activity.component);

    const defaultBackground = {
      color: '',
      borderRadius: 0,
      border: {
        width: 0,
        type: 'solid',
        color: ''
      },
      opacity: 0.8,
      shadow: {
        color: '',
        x: 0,
        y: 0,
        blur: 0
      }
    };
    const background = reactive({ ...JSON.parse(JSON.stringify(defaultBackground)) });

    // 监听id 变化重新赋值
    watch(
      () => activityComponent.value?.id,
      () => {
        console.log(activityComponent.value);
        if (activityComponent.value && activityComponent.value.background) {
          objectDeepClone(background, toRaw(activityComponent.value.background));
        } else {
          objectDeepClone(background, defaultBackground);
        }
      }
    );

    watch(
      () => background,
      () => {
        store.commit('updateComponent', {
          ...activityComponent.value,
          background: JSON.parse(JSON.stringify(toRaw(background)))
        });
      },
      { deep: true }
    );

    return {
      background
    };
  }
});
</script>
