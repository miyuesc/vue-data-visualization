<template>
  <div class="component-base-config">
    <div
      class="content-pad-item__title with-tag"
      :class="{ 'is-open': xAxisContentVisible }"
      @click.stop="changeVisible"
    >
      X 轴
    </div>
    <el-collapse-transition>
      <div v-show="xAxisContentVisible">
        <config-form-item label="显示坐标轴" :label-width="80">
          <el-switch v-model="xAxis.show" />
        </config-form-item>
        <el-collapse-transition>
          <div style="margin-top: 8px" v-show="xAxis.show">
            <config-form-item label="坐标轴名称" :label-width="80">
              <el-input v-model="xAxis.name" :maxlength="20" />
            </config-form-item>
            <config-form-item label="字体设置" :label-width="80">
              <el-color-picker v-model="xAxis.nameTextStyle.color" />
              <el-select v-model="xAxis.nameLocation" style="margin-left: 8px">
                <el-option label="右侧" value="end" />
                <el-option label="中间" value="middle" />
                <el-option label="左侧" value="start" />
              </el-select>
              <el-input-number
                v-model="xAxis.nameRotate"
                :step="1"
                :min="0"
                :max="360"
                controls-position="right"
                class="rotate-number-input"
                style="margin-left: 8px"
              />
            </config-form-item>
            <config-form-item label="显示轴线" :label-width="80">
              <el-switch v-model="xAxis.axisLine.show" />
            </config-form-item>
            <el-collapse-transition v-show="xAxis.axisLine.show">
              <config-form-item label="轴线设置" :label-width="80">
                <el-color-picker v-model="xAxis.axisLine.lineStyle.color" />
                <el-select v-model="xAxis.axisLine.lineStyle.type" style="margin-left: 8px">
                  <el-option value="solid">
                    <span
                      style="display: inline-block; width: 100%; height: 0; border-bottom: 1px solid #cccccc"
                    ></span>
                  </el-option>
                  <el-option value="dashed">
                    <span
                      style="display: inline-block; width: 100%; height: 0; border-bottom: 1px dashed #cccccc"
                    ></span>
                  </el-option>
                </el-select>
                <el-input-number
                  v-model="xAxis.axisLine.lineStyle.width"
                  :step="1"
                  :min="1"
                  :max="10"
                  controls-position="right"
                  style="margin-left: 8px"
                />
              </config-form-item>
            </el-collapse-transition>
            <config-form-item label="显示刻度" :label-width="80">
              <el-switch v-model="xAxis.axisTick.show" />
            </config-form-item>
            <el-collapse-transition v-show="xAxis.axisTick.show">
              <config-form-item label="刻度设置" :label-width="80">
                <el-color-picker v-model="xAxis.axisTick.lineStyle.color" />
                <el-select v-model="xAxis.axisTick.lineStyle.type" style="margin-left: 8px">
                  <el-option value="solid">
                    <span
                      style="display: inline-block; width: 100%; height: 0; border-bottom: 1px solid #cccccc"
                    ></span>
                  </el-option>
                  <el-option value="dashed">
                    <span
                      style="display: inline-block; width: 100%; height: 0; border-bottom: 1px dashed #cccccc"
                    ></span>
                  </el-option>
                </el-select>
                <el-input-number
                  v-model="xAxis.axisTick.lineStyle.width"
                  :step="1"
                  :min="1"
                  :max="10"
                  controls-position="right"
                  style="margin-left: 8px"
                />
              </config-form-item>
            </el-collapse-transition>
            <config-form-item label="显示标签" :label-width="80">
              <el-switch v-model="xAxis.axisLabel.show" />
            </config-form-item>
            <el-collapse-transition v-show="xAxis.axisLabel.show">
              <config-form-item label="标签设置" :label-width="80">
                <el-color-picker v-model="xAxis.axisLabel.color" />
                <el-input-number
                  v-model="xAxis.axisLabel.margin"
                  :step="1"
                  :min="0"
                  :max="50"
                  controls-position="right"
                  style="margin-left: 8px"
                />
                <el-input-number
                  v-model="xAxis.axisLabel.rotate"
                  :step="1"
                  :min="0"
                  :max="360"
                  controls-position="right"
                  class="rotate-number-input"
                  style="margin-left: 8px"
                />
              </config-form-item>
            </el-collapse-transition>
            <config-form-item label="显示分割线" :label-width="80">
              <el-switch v-model="xAxis.splitLine.show" />
            </config-form-item>
            <el-collapse-transition v-show="xAxis.splitLine.show">
              <config-form-item label="分割线设置" :label-width="80">
                <el-color-picker v-model="xAxis.splitLine.lineStyle.color" />
                <el-select v-model="xAxis.splitLine.lineStyle.type" style="margin-left: 8px">
                  <el-option value="solid">
                    <span
                      style="display: inline-block; width: 100%; height: 0; border-bottom: 1px solid #cccccc"
                    ></span>
                  </el-option>
                  <el-option value="dashed">
                    <span
                      style="display: inline-block; width: 100%; height: 0; border-bottom: 1px dashed #cccccc"
                    ></span>
                  </el-option>
                </el-select>
                <el-input-number
                  v-model="xAxis.splitLine.lineStyle.width"
                  :step="1"
                  :min="0"
                  :max="50"
                  controls-position="right"
                  style="margin-left: 8px"
                />
              </config-form-item>
            </el-collapse-transition>
          </div>
        </el-collapse-transition>
      </div>
    </el-collapse-transition>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, watch, toRaw } from 'vue';
import { useStore } from 'vuex';
import { xAxis as defaultConfig } from '@/assets/components/defaultConfig';
import { objectDeepClone } from '@/utils/commonUtils';
import type { Ref } from 'vue';
import type { Store } from 'vuex';
import type { StoreState } from '@/types/store';

export default defineComponent({
  name: 'MXAxis',
  setup() {
    const store: Store<StoreState> = useStore();

    const xAxisContentVisible: Ref<boolean> = ref(false);
    const changeVisible = () => (xAxisContentVisible.value = !xAxisContentVisible.value);

    const xAxis = reactive(defaultConfig);

    // 监听id 变化重新赋值
    watch(
      () => store.state.acComponent?.id,
      (val: string | undefined) => {
        xAxisContentVisible.value = false;
        !!val && store.state.acComponent && objectDeepClone(xAxis, toRaw(store.state.acComponent.xAxis));
      },
      { immediate: true }
    );

    // 监听变化，更新组件状态
    watch(
      () => xAxis,
      () => {
        store.commit('updateComponent', { newState: xAxis, key: 'xAxis' });
      },
      { deep: true }
    );

    return {
      xAxisContentVisible,
      changeVisible,
      xAxis
    };
  }
});
</script>
<style scoped>
.config-form-item + .config-form-item {
  margin-top: 8px;
}
</style>
