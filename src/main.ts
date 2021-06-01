import { createApp } from 'vue';
import APP from './App.vue';
import router from './router';
import store from './store';
import ElementPlus from 'element-plus';
import ConfigFormItem from '@/components/editor-content-pad/ConfigFormItem.vue';
import ChartTitle from '@/components/charts/supplement/ChartTitle.vue';
import 'remixicon/fonts/remixicon.css';
import '@/assets/styles/element-override.scss';
import '@/assets/styles/chart-component.scss';

createApp(APP)
  .use(store)
  .use(router)
  .use(ElementPlus, { size: 'mini' })
  .component('ConfigFormItem', ConfigFormItem)
  .component('ChartTitle', ChartTitle)
  .mount('#app');
