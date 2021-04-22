<template>
  <div class="component-base-config">
    <div class="content-pad-item__title with-tag" :class="{ 'is-open': contentVisible }" @click.stop="changeVisible">
      图例
    </div>
    <el-collapse-transition>
      <div v-show="contentVisible">
        <config-form-item label="显示图例" :label-width="64">
          <el-switch v-model="legend.show" />
        </config-form-item>
        <el-collapse-transition>
          <div v-show="legend.show" class="legend-content">
            <config-form-item label="对齐方式" :label-width="64">
              <el-select v-model="legend.orient" style="width: 100%">
                <el-option label="水平对齐" value="horizontal" />
                <el-option label="垂直对齐" value="vertical" />
              </el-select>
            </config-form-item>
            <config-form-item label="图标设置" :label-width="64">
              <div class="content-pad-row">
                <config-form-item label="W" :label-width="12">
                  <el-input-number v-model="legend.itemWidth" :step="1" :min="10" :max="50" controls-position="right" />
                </config-form-item>
                <config-form-item label="H" :label-width="24">
                  <el-input-number v-model="legend.itemHeight" :step="1" :min="6" :max="50" controls-position="right" />
                </config-form-item>
              </div>
            </config-form-item>
            <config-form-item label="图标高度" :label-width="64">
              <el-input-number v-model="legend.itemHeight" :step="1" :min="6" :max="50" controls-position="right" />
            </config-form-item>
            <config-form-item label="字体设置" :label-width="64">
              <el-color-picker v-model="legend.textStyle.color" />
              <el-select v-model="legend.textStyle.fontWeight" style="margin-left: 8px">
                <el-option label="正常" value="normal" />
                <el-option label="较粗" value="bolder" />
                <el-option label="较细" value="lighter" />
              </el-select>
              <el-input-number
                v-model="legend.textStyle.fontSize"
                :step="1"
                :min="8"
                :max="40"
                controls-position="right"
                style="margin-left: 8px"
              />
            </config-form-item>
          </div>
        </el-collapse-transition>
      </div>
    </el-collapse-transition>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, Ref, toRaw, watch } from 'vue';
import { objectDeepClone } from '@/utils/commonUtils';
import { legend as defaultConfig } from '@/assets/components/defaultConfig';
import { useStore } from 'vuex';
import type { Store } from 'vuex';
import type { StoreState } from '@/types/store';

export default defineComponent({
  name: 'MLegend',
  setup() {
    const store: Store<StoreState> = useStore();
    const legend = reactive(defaultConfig);

    const contentVisible: Ref<boolean> = ref(false);
    const changeVisible = () => (contentVisible.value = !contentVisible.value);

    // 监听id 变化重新赋值
    watch(
      () => store.state.acComponent?.id,
      (val: string | undefined) => {
        contentVisible.value = false;
        !!val && store.state.acComponent && objectDeepClone(legend, toRaw(store.state.acComponent.legend));
      },
      { immediate: true }
    );

    watch(
      () => legend,
      () => {
        store.commit('updateComponent', { newState: legend, key: 'legend' });
      },
      { deep: true }
    );

    return {
      legend,
      contentVisible,
      changeVisible
    };
  }
});
</script>

<style lang="scss" scoped>
.legend-content {
  margin-top: 8px;
  > .config-form-item + .config-form-item {
    margin-top: 8px;
  }
}
</style>
