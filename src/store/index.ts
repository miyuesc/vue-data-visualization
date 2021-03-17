import { createStore } from 'vuex';
import mouseStatus from '@/store/mouseStatus';

export default createStore({
  modules: {
    mouseStatus,
  },
});
