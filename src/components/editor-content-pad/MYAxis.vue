<template>
  <div class="component-base-config">
    <div
      class="content-pad-item__title with-tag"
      :class="{ 'is-open': yAxisContentVisible }"
      @click.stop="changeVisible"
    >
      Y 轴
    </div>
    <el-collapse-transition>
      <div v-show="yAxisContentVisible">
        <config-form-item label="显示坐标轴" :label-width="80">
          <el-switch v-model="yAxis.show" />
        </config-form-item>
        <el-collapse-transition>
          <div style="margin-top: 8px" v-show="yAxis.show">
            <config-form-item label="坐标轴名称" :label-width="80">
              <el-input v-model="yAxis.name" :maxlength="20" />
            </config-form-item>
            <config-form-item label="字体设置" :label-width="80">
              <el-color-picker v-model="yAxis.nameTextStyle.color" />
              <el-select v-model="yAxis.nameLocation" style="margin-left: 8px">
                <el-option label="上侧" value="end" />
                <el-option label="中间" value="middle" />
                <el-option label="下侧" value="start" />
              </el-select>
              <el-input-number
                v-model="yAxis.nameRotate"
                :step="1"
                :min="0"
                :max="360"
                controls-position="right"
                class="rotate-number-input"
                style="margin-left: 8px"
              />
            </config-form-item>
            <config-form-item label="显示轴线" :label-width="80">
              <el-switch v-model="yAxis.axisLine.show" />
            </config-form-item>
            <el-collapse-transition v-show="yAxis.axisLine.show">
              <config-form-item label="轴线设置" :label-width="80">
                <el-color-picker v-model="yAxis.axisLine.lineStyle.color" />
                <el-select v-model="yAxis.axisLine.lineStyle.type" style="margin-left: 8px">
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
                  v-model="yAxis.axisLine.lineStyle.width"
                  :step="1"
                  :min="1"
                  :max="10"
                  controls-position="right"
                  style="margin-left: 8px"
                />
              </config-form-item>
            </el-collapse-transition>
            <config-form-item label="显示刻度" :label-width="80">
              <el-switch v-model="yAxis.axisTick.show" />
            </config-form-item>
            <el-collapse-transition v-show="yAxis.axisTick.show">
              <config-form-item label="刻度设置" :label-width="80">
                <el-color-picker v-model="yAxis.axisTick.lineStyle.color" />
                <el-select v-model="yAxis.axisTick.lineStyle.type" style="margin-left: 8px">
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
                  v-model="yAxis.axisTick.lineStyle.width"
                  :step="1"
                  :min="1"
                  :max="10"
                  controls-position="right"
                  style="margin-left: 8px"
                />
              </config-form-item>
            </el-collapse-transition>
            <config-form-item label="显示标签" :label-width="80">
              <el-switch v-model="yAxis.axisLabel.show" />
            </config-form-item>
            <el-collapse-transition v-show="yAxis.axisLabel.show">
              <config-form-item label="标签设置" :label-width="80">
                <el-color-picker v-model="yAxis.axisLabel.color" />
                <el-input-number
                  v-model="yAxis.axisLabel.margin"
                  :step="1"
                  :min="0"
                  :max="50"
                  controls-position="right"
                  style="margin-left: 8px"
                />
                <el-input-number
                  v-model="yAxis.axisLabel.rotate"
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
              <el-switch v-model="yAxis.splitLine.show" />
            </config-form-item>
            <el-collapse-transition v-show="yAxis.splitLine.show">
              <config-form-item label="分割线设置" :label-width="80">
                <el-color-picker v-model="yAxis.splitLine.lineStyle.color" />
                <el-select v-model="yAxis.splitLine.lineStyle.type" style="margin-left: 8px">
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
                  v-model="yAxis.splitLine.lineStyle.width"
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
import { computed, defineComponent, ref, reactive, watch, toRaw } from 'vue';
import { useStore } from 'vuex';
import { yAxis as defaultConfig } from '@/assets/components/defaultConfig';
import { objectDeepClone } from '@/utils/commonUtils';

export default defineComponent({
  name: 'MXAxis',
  setup() {
    const store = useStore();
    const activityComponent = computed(() => store.state.activatedComponent).value;

    const yAxisContentVisible = ref(false);
    const changeVisible = () => (yAxisContentVisible.value = !yAxisContentVisible.value);

    const yAxis = reactive(defaultConfig);

    // 监听id 变化重新赋值
    watch(
      () => activityComponent.id,
      () => {
        yAxisContentVisible.value = false;
        objectDeepClone(yAxis, toRaw(store.state.activatedComponent.yAxis));
      },
      { immediate: true }
    );

    // 监听变化，更新组件状态
    watch(
      () => yAxis,
      () => {
        store.commit('updateComponent', { newState: yAxis, key: 'yAxis' });
      },
      { deep: true }
    );

    return {
      yAxisContentVisible,
      changeVisible,
      yAxis
    };
  }
});
</script>
<style scoped>
.config-form-item + .config-form-item {
  margin-top: 8px;
}
</style>
