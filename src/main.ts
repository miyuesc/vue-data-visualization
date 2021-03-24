import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import ElementPlus from 'element-plus';
import ConfigFormItem from '@/components/other/ConfigFormItem.vue';

import 'element-plus/lib/theme-chalk/index.css';

createApp(App as any)
  .use(store)
  .use(router)
  .use(ElementPlus, { size: 'mini' })
  .component("ConfigFormItem", ConfigFormItem)
  .mount('#app');
