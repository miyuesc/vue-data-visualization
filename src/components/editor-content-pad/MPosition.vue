<template>
  <div class="editor-content-pad">
    <config-form-item label="X轴：">
      <el-input v-model="left" type="number" />
    </config-form-item>
    <config-form-item label="Y轴：">
      <el-input v-model="top" type="number" />
    </config-form-item>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'MPosition',
  setup() {
    return {
      left: ref('0'),
      top: ref('0')
    };
  }
});
</script>
