<template>
  <div class="component-base-config">
    <div class="content-pad-item__title">标题设置</div>
    <div class="content-pad-row">
      <config-form-item label="标题" :label-width="40">
        <el-input v-model="title" />
      </config-form-item>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'MTitle',
  setup() {
    const title = ref('');

    return {
      title
    };
  }
});
</script>
