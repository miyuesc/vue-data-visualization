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
          input-size="mini"
          style="width: 100%"
          show-input
        />
      </config-form-item>
    </div>
    <div class="content-pad-row">
      <config-form-item label="边框" :label-width="64">
        <el-color-picker v-model="background.border.color" />
        <el-select v-model="background.border.type">
          <el-option label="-------" value="solid" />
          <el-option label="- - - -" value="dash" />
        </el-select>
        <el-input-number
          v-model="background.border.width"
          :min="0"
          :max="20"
          :step="1"
          :precision="0"
          controls-position="right"
        />
      </config-form-item>
    </div>
    <div class="content-pad-row">
      <config-form-item label="圆角" :label-width="64">
        <div class="border-radius-content">
          <!--          <div class="radius-row">-->
          <!--            <span class="radius-row-label">左上</span>-->
          <!--            <el-input-number v-model="background.borderRadius.tl" :min="0" :max="20" :step="1" :precision="0" />-->
          <!--          </div>-->
          <!--          <div class="radius-row">-->
          <!--            <span class="radius-row-label">右上</span>-->
          <!--            <el-input-number v-model="background.borderRadius.tr" :min="0" :max="20" :step="1" :precision="0" />-->
          <!--          </div>-->
          <!--          <div class="radius-row">-->
          <!--            <span class="radius-row-label">右下</span>-->
          <!--            <el-input-number v-model="background.borderRadius.br" :min="0" :max="20" :step="1" :precision="0" />-->
          <!--          </div>-->
          <!--          <div class="radius-row">-->
          <!--            <span class="radius-row-label">左下</span>-->
          <!--            <el-input-number v-model="background.borderRadius.bl" :min="0" :max="20" :step="1" :precision="0" />-->
          <!--          </div>-->
        </div>
      </config-form-item>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue';

export default defineComponent({
  name: 'MBackground',
  props: {
    config: Object
  },
  setup() {
    const background = reactive({
      color: '',
      type: '',
      borderRadius: {
        tl: 4,
        tr: 4,
        bl: 4,
        br: 4
      },
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
    });

    return {
      background
    };
  }
});
</script>
