<template>
  <div class="component-base-config">
    <div class="content-pad-item__title">标题设置</div>
    <div class="content-pad-row">
      <config-form-item label="显示标题" :label-width="64">
        <el-switch v-model="visible" />
      </config-form-item>
    </div>
    <el-collapse-transition>
      <div v-show="visible">
        <div class="content-pad-row" style="margin-top: 8px">
          <config-form-item label="标题内容" :label-width="64">
            <el-input v-model="title" />
          </config-form-item>
        </div>
        <div class="content-pad-row">
          <config-form-item label="字体设置" :label-width="64">
            <el-color-picker v-model="color" />
            <el-button :type="bold ? 'primary' : 'default'" icon="ri-bold" @click="changeTitleBold" />
            <el-button :type="italic ? 'primary' : 'default'" icon="ri-italic" @click="changeTitleItalic" />
            <el-input-number v-model="size" :step="1" :min="12" controls-position="right" style="margin-left: 8px" />
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
  setup() {
    const title = ref('');
    const visible = ref(true);
    const color = ref('#333333');
    const bold = ref(true);
    const italic = ref(true);
    const size = ref(12);

    const changeTitleBold = () => (bold.value = !bold.value);
    const changeTitleItalic = () => (italic.value = !italic.value);

    return {
      title,
      visible,
      color,
      bold,
      italic,
      size,
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
