<template>
  <router-view />
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'APP',
  mounted() {
    document.documentElement.oncontextmenu = ev => ev.preventDefault();
  }
});
</script>

<style lang="scss">
body,
html {
  padding: 0;
  margin: 0;
}
#app {
  height: 100vh;
  width: 100vw;
}
</style>
