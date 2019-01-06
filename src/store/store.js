import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    appName: '',
    appVersion: ''
  },
  mutations: {
    setAppName(state, payload) {
      state.appName = payload;
    },
    setAppVersion(state, payload) {
      state.appVersion = payload;
    }
  }
});