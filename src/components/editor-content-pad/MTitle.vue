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
          <config-form-item label="标题内容" :label-width="64">
            <el-input v-model="titleConfig.titleContent" :maxlength="20" />
          </config-form-item>
        </div>
        <div class="content-pad-row">
          <config-form-item label="字体设置" :label-width="64">
            <el-color-picker v-model="titleConfig.titleColor" />
            <el-button :type="titleConfig.titleBold ? 'primary' : 'default'" icon="ri-bold" @click="changeTitleBold" />
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
        <div class="content-pad-row" style="margin-top: 8px">
          <config-form-item label="单位" :label-width="64">
            <el-input v-model="titleConfig.unitContent" :maxlength="6" />
          </config-form-item>
        </div>
        <div class="content-pad-row">
          <config-form-item label="字体设置" :label-width="64">
            <el-color-picker v-model="titleConfig.unitColor" />
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
import { defineComponent, reactive } from 'vue';

export default defineComponent({
  name: 'MTitle',
  props: {
    config: Object
  },
  setup() {
    const titleConfig = reactive({
      titleContent: '',
      visible: false,
      titleColor: '#333333',
      titleBold: false,
      titleItalic: false,
      titleSize: 12,
      unitContent: '',
      unitColor: '#333333',
      unitSize: 8
    });

    const changeTitleBold = () => (titleConfig.titleBold = !titleConfig.titleBold);
    const changeTitleItalic = () => (titleConfig.titleItalic = !titleConfig.titleItalic);

    return {
      titleConfig,
      changeTitleBold,
      changeTitleItalic
    };
  }
});
</script>

<style lang="scss" scoped>
::v-deep .el-button--mini {
  height: 28px;
  margin-left: 8px;
}
</style>
