<template>
  <div class="component-base-config">
    <div class="content-pad-item__title">标题与单位</div>
    <div class="content-pad-row">
      <config-form-item label="显示状态" :label-width="64">
        <el-switch v-model="titleConfig.visible" />
      </config-form-item>
    </div>
    <el-collapse-transition>
      <div v-show="titleConfig.visible">
        <div class="content-pad-row" style="margin-top: 8px">
          <config-form-item label="标题" :label-width="64">
            <el-input v-model="titleConfig.titleContent" :maxlength="20" />
          </config-form-item>
        </div>
        <div class="content-pad-row">
          <config-form-item label="字体" :label-width="64">
            <el-color-picker v-model="titleConfig.titleColor" />
            <el-button
              :type="titleConfig.titleBold ? 'primary' : 'default'"
              icon="ri-bold"
              style="margin-left: 8px"
              @click="changeTitleBold"
            />
            <el-button
              :type="titleConfig.titleItalic ? 'primary' : 'default'"
              icon="ri-italic"
              @click="changeTitleItalic"
            />
            <el-input-number
              v-model="titleConfig.titleSize"
              :step="1"
              :min="12"
              controls-position="right"
              style="margin-left: 8px"
            />
          </config-form-item>
        </div>
        <div class="content-pad-row">
          <config-form-item label="显示单位" :label-width="64">
            <el-switch v-model="titleConfig.unitVisible" />
          </config-form-item>
        </div>
        <div class="content-pad-row" style="margin-top: 8px" v-show="titleConfig.unitVisible">
          <config-form-item label="单位" :label-width="64">
            <el-input v-model="titleConfig.unitContent" :maxlength="6" />
          </config-form-item>
        </div>
        <div class="content-pad-row" v-show="titleConfig.unitVisible">
          <config-form-item label="字体" :label-width="64">
            <el-color-picker v-model="titleConfig.unitColor" />
            <el-button
              :type="titleConfig.unitBold ? 'primary' : 'default'"
              icon="ri-bold"
              style="margin-left: 8px"
              @click="changeUnitBold"
            />
            <el-button
              :type="titleConfig.unitItalic ? 'primary' : 'default'"
              icon="ri-italic"
              @click="changeUnitItalic"
            />
            <el-input-number
              v-model="titleConfig.unitSize"
              :step="1"
              :min="12"
              controls-position="right"
              style="margin-left: 8px"
            />
          </config-form-item>
        </div>
      </div>
    </el-collapse-transition>
  </div>
</template>

<script lang="ts">
import { defineComponent, shallowReactive, computed, watch, toRaw } from 'vue';
import { useStore } from 'vuex';
import { resetObjectValue } from '@/utils/commonUtils';

export default defineComponent({
  name: 'MTitle',
  props: {
    config: {
      required: true,
      type: Object,
      default: () => ({})
    }
  },
  setup() {
    const store = useStore();
    const activityComponent = computed(() => store.state.activity.component);
    // 默认配置
    const defaultConfig = {
      visible: false,
      titleContent: '',
      titleColor: '#eeeeee',
      titleBold: false,
      titleItalic: false,
      titleSize: 20,
      unitVisible: false,
      unitContent: '',
      unitColor: '#eeeeee',
      unitBold: false,
      unitItalic: false,
      unitSize: 14
    };
    // 响应式代理
    const titleConfig = shallowReactive({ ...defaultConfig });

    // 监听id 变化重新赋值
    watch(
      () => activityComponent.value?.id,
      () => {
        if (activityComponent.value?.titleConfig) {
          resetObjectValue(titleConfig, toRaw(activityComponent.value.titleConfig));
        } else {
          resetObjectValue(titleConfig, defaultConfig);
        }
      },
      { immediate: true }
    );

    // 监听变化，更新组件状态
    watch(
      () => titleConfig,
      // [
      //   () => titleConfig.visible,
      //   () => titleConfig.titleContent,
      //   () => titleConfig.titleSize,
      //   () => titleConfig.titleColor,
      //   () => titleConfig.titleItalic,
      //   () => titleConfig.titleBold,
      //   () => titleConfig.unitVisible,
      //   () => titleConfig.unitContent,
      //   () => titleConfig.unitColor,
      //   () => titleConfig.unitBold,
      //   () => titleConfig.unitItalic,
      //   () => titleConfig.unitSize
      // ],
      () => {
        store.commit('updateComponent', { ...activityComponent.value, titleConfig: { ...titleConfig } });
      },
      { deep: true }
    );

    const changeTitleBold = () => (titleConfig.titleBold = !titleConfig.titleBold);
    const changeTitleItalic = () => (titleConfig.titleItalic = !titleConfig.titleItalic);
    const changeUnitBold = () => (titleConfig.unitBold = !titleConfig.unitBold);
    const changeUnitItalic = () => (titleConfig.unitItalic = !titleConfig.unitItalic);

    return {
      titleConfig,
      changeTitleBold,
      changeTitleItalic,
      changeUnitBold,
      changeUnitItalic
    };
  }
});
</script>
