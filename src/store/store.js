import Vue from 'vue';
import Vuex from 'vuex';
import path from 'path';
import Preset from '../models/presets';

Vue.use(Vuex);

const csInterface = window.__adobe_cep__ ?  new CSInterface() : { hostEnvironment: { appName: '1.0.0', appVersion: 'debug' },evalScript: function(script, callback) {console.log("window.__adobe_cep__ is not found")}};

export default new Vuex.Store({
  state: {
    appName: '',
    appVersion: '',
    clips: [],
    project: null,
    presets: [],
  },
  mutations: {
    getAppName(state) {
      state.appName = csInterface.hostEnvironment.appName;
    },
    getAppVersion(state) {
      state.appVersion = csInterface.hostEnvironment.appVersion;
    },
    getProject(state) {
      csInterface.evalScript('getProject()', function(result) { 
        state.project = JSON.parse(result);
      });
    },
    getClips(state) {
      csInterface.evalScript('getClips()', function(result) { 
        const clips = JSON.parse(result);
        for(let clip of clips) {
          clip.seconds = clip.duration.seconds;
        }
        state.clips = clips;
      });
    },
    getPresets(state) {
      csInterface.evalScript('getPresets()', function(result) {
        const files = result.split(',');
        state.presets = files.map(f => new Preset({ fullPath: f }));
      });
    }
  }
});