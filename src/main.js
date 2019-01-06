import Vue from 'vue';
import Vuex from 'vuex';
import App from './App.vue';
import store from './store/store.js';

Vue.use(Vuex);

window.vm = new Vue({
  store,
  el: '#app',
  template: '<App/>',
  components: {
    App
  },
  mounted: function () {
    const csInterface = new CSInterface();
    const appName = csInterface.hostEnvironment.appName;
    const appVersion = csInterface.hostEnvironment.appVersion;

    this.$store.commit('setAppName', appName);
    this.$store.commit('setAppVersion', appVersion);
  }
})