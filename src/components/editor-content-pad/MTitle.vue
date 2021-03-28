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
import { defineComponent, shallowReactive, computed, watch } from 'vue';
import { useStore } from 'vuex';

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
    // const config = toRefs(props.config);
    const titleConfig = shallowReactive({
      visible: false,
      titleContent: '',
      titleColor: '#eeeeee',
      titleBold: false,
      titleItalic: false,
      titleSize: 12,
      unitContent: '',
      unitColor: '#eeeeee',
      unitSize: 8
    });

    // 监听id 变化重新赋值
    watch(
      () => activityComponent.value.id,
      (newVal: any, oldVal: any) => {
        if (newVal && newVal !== oldVal) {
          console.log('active changed:', newVal);
          titleConfig.visible = activityComponent.value.title?.visible || false;
          titleConfig.titleContent = activityComponent.value.title?.titleContent || '';
          titleConfig.titleColor = activityComponent.value.title?.titleColor || '#eeeeee';
          titleConfig.titleBold = activityComponent.value.title?.titleBold || false;
          titleConfig.titleItalic = activityComponent.value.title?.titleItalic || false;
          titleConfig.titleSize = activityComponent.value.title?.titleSize || 12;
          titleConfig.unitContent = activityComponent.value.title?.unitContent || '';
          titleConfig.unitColor = activityComponent.value.title?.unitColor || '#eeeeee';
          titleConfig.unitSize = activityComponent.value.title?.unitSize || 8;
        }
      }
    );

    // 监听变化，更新组件状态
    watch(
      [
        () => titleConfig.visible,
        () => titleConfig.titleContent,
        () => titleConfig.titleSize,
        () => titleConfig.titleColor,
        () => titleConfig.titleItalic,
        () => titleConfig.titleBold,
        () => titleConfig.unitContent,
        () => titleConfig.unitColor,
        () => titleConfig.unitSize
      ],
      () => {
        console.log('title config:', { ...titleConfig });
        console.log('activityComponent:', activityComponent.value);
        store.commit('updateComponent', { ...activityComponent.value, title: { ...titleConfig } });
      },
      { deep: true }
    );

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
