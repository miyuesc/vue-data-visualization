<template>
  <div class="component-base-config">
    <div
      class="content-pad-item__title with-tag"
      :class="{ 'is-open': fontContentVisible }"
      @click.stop="changeVisible"
    >
      字体设置
    </div>
    <el-collapse-transition>
      <div v-show="fontContentVisible">
        <div class="content-pad-row">
          <config-form-item label="标题" :label-width="64">
            <el-input v-model="fontConfig.titleContent" :maxlength="20" />
          </config-form-item>
        </div>
        <div class="content-pad-row">
          <config-form-item label="字体" :label-width="64">
            <el-color-picker v-model="fontConfig.titleColor" />
            <el-button
              :type="fontConfig.titleBold ? 'primary' : 'default'"
              icon="ri-bold"
              style="margin-left: 8px"
              @click="changeTitleBold"
            />
            <el-button
              :type="fontConfig.titleItalic ? 'primary' : 'default'"
              icon="ri-italic"
              @click="changeTitleItalic"
            />
            <el-input-number
              v-model="fontConfig.titleSize"
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
import { defineComponent, ref, shallowReactive, toRaw, watch } from 'vue';
import { useStore } from 'vuex';
import { objectDeepClone } from '@/utils/commonUtils';

export default defineComponent({
  name: 'MFont',
  setup() {
    const store = useStore();
    const fontContentVisible = ref(false);

    // 默认配置, 主要是为了防止下面的 change 方法报错
    const defaultConfig = {
      titleBold: false,
      titleItalic: false,
      unitBold: false,
      unitItalic: false
    };
    // 响应式代理
    const fontConfig = shallowReactive({ ...defaultConfig });

    const changeVisible = () => {
      fontContentVisible.value = !fontContentVisible.value;
    };

    const changeTitleBold = () => (fontConfig.titleBold = !fontConfig.titleBold);
    const changeTitleItalic = () => (fontConfig.titleItalic = !fontConfig.titleItalic);

    // 监听id 变化重新赋值
    watch(
      () => store.state.acComponent?.id,
      (val: string) => {
        fontContentVisible.value = true;
        !!val && objectDeepClone(fontConfig, toRaw(store.state.acComponent.font));
      },
      { immediate: true }
    );

    // 监听变化，更新组件状态
    watch(
      () => fontConfig,
      () => {
        store.commit('updateComponent', { newState: fontConfig, key: 'font' });
      },
      { deep: true }
    );

    return {
      fontContentVisible,
      fontConfig,
      changeVisible,
      changeTitleBold,
      changeTitleItalic
    };
  }
});
</script>
