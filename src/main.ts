import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

createApp(App as any)
  .use(store)
  .use(router)
  .mount("#app");
