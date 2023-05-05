import { createStore } from 'vuex';
import mutations from './mutations';
import actions from './actions';
import getters from './getter';

const store = createStore({
  mutations,
  actions,
  getters,
});

export default store;
