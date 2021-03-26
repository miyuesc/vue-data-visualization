<template>
  <div class="component-base-config">
    <div class="content-pad-item__title">标题与单位</div>
    <div class="content-pad-row">
      <config-form-item label="显示状态" :label-width="64">
        <el-switch v-model="visible" />
      </config-form-item>
    </div>
    <el-collapse-transition>
      <div v-show="visible">
        <div class="content-pad-row" style="margin-top: 8px">
          <config-form-item label="标题内容" :label-width="64">
            <el-input v-model="title" :maxlength="20" />
          </config-form-item>
        </div>
        <div class="content-pad-row">
          <config-form-item label="字体设置" :label-width="64">
            <el-color-picker v-model="color" />
            <el-button :type="titleBold ? 'primary' : 'default'" icon="ri-bold" @click="changeTitleBold" />
            <el-button :type="titleItalic ? 'primary' : 'default'" icon="ri-italic" @click="changeTitleItalic" />
            <el-input-number
              v-model="titleSize"
              :step="1"
              :min="12"
              controls-position="right"
              style="margin-left: 8px"
            />
          </config-form-item>
        </div>
        <div class="content-pad-row" style="margin-top: 8px">
          <config-form-item label="单位" :label-width="64">
            <el-input v-model="unit" :maxlength="6" />
          </config-form-item>
        </div>
        <div class="content-pad-row">
          <config-form-item label="字体设置" :label-width="64">
            <el-color-picker v-model="unitColor" />
            <el-input-number
              v-model="unitSize"
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
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'MTitle',
  props: {
    config: Object
  },
  setup() {
    const title = ref('');
    const visible = ref(true);
    const titleColor = ref('#333333');
    const titleBold = ref(true);
    const titleItalic = ref(true);
    const titleSize = ref(12);

    const unit = ref('');
    const unitColor = ref('#333333');
    const unitSize = ref(8);

    const changeTitleBold = () => (titleBold.value = !titleBold.value);
    const changeTitleItalic = () => (titleItalic.value = !titleItalic.value);

    return {
      title,
      visible,
      titleColor,
      titleBold,
      titleItalic,
      titleSize,
      unit,
      unitColor,
      unitSize,
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
