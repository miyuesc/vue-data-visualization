<template>
  <div class="component-base-config">
    <div class="content-pad-item__title with-tag" :class="{ 'is-open': titleContentVisible }" @click.stop="changeVisible">
      标题与单位
    </div>
    <el-collapse-transition>
      <div v-show="titleContentVisible">
        <div class="content-pad-row">
          <config-form-item label="显示标题" :label-width="64">
            <el-switch v-model="titleConfig.titleVisible" />
          </config-form-item>
        </div>
        <el-collapse-transition>
          <div v-show="titleConfig.titleVisible">
            <div class="content-pad-row">
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
          </div>
        </el-collapse-transition>
        <div class="content-pad-row" style="margin-top: 8px">
          <config-form-item label="显示单位" :label-width="64">
            <el-switch v-model="titleConfig.unitVisible" />
          </config-form-item>
        </div>
        <el-collapse-transition>
          <div v-show="titleConfig.unitVisible">
            <div class="content-pad-row">
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
    </el-collapse-transition>
  </div>
</template>

<script lang="ts">
import { defineComponent, shallowReactive, computed, watch, toRaw, ref } from 'vue';
import { useStore } from 'vuex';
import { objectDeepClone } from '@/utils/commonUtils';

export default defineComponent({
  name: 'MTitleConfig',
  setup() {
    const store = useStore();
    const activityComponent = computed(() => store.state.activatedComponent).value;

    const titleContentVisible = ref(false);

    const changeVisible = () => (titleContentVisible.value = !titleContentVisible.value);

    // 默认配置, 主要是为了防止下面的 change 方法报错
    const defaultConfig = {
      titleBold: false,
      titleItalic: false,
      unitBold: false,
      unitItalic: false
    };
    // 响应式代理
    const titleConfig = shallowReactive({ ...defaultConfig });

    // 监听id 变化重新赋值
    watch(
      () => activityComponent.id,
      () => {
        titleContentVisible.value = false;
        objectDeepClone(titleConfig, toRaw(store.state.activatedComponent.titleConfig));
      },
      { immediate: true }
    );

    // 监听变化，更新组件状态
    watch(
      () => titleConfig,
      () => {
        store.commit('updateComponent', { newState: titleConfig, key: 'titleConfig' });
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
      changeUnitItalic,
      titleContentVisible,
      changeVisible
    };
  }
});
</script>
