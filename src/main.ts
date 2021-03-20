import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import ConfigFormItem from '@/components/other/ConfigFormItem.vue';

createApp(App as any)
  .use(store)
  .use(router)
  .use(Antd, { size: 'small' })
  .component("ConfigFormItem", ConfigFormItem)
  .mount('#app');
