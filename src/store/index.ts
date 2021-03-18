import { createStore } from "vuex";
import activeElement from "@/store/activeElement";
import canvas from "@/store/canvas";
import components from "@/store/components";
import mouseStatus from "@/store/mouseStatus";

export default createStore({
  modules: {
    activeElement,
    canvas,
    components,
    mouseStatus
  }
});
