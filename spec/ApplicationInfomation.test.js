import {
  mount,
  shallowMount,
  createLocalVue
} from '@vue/test-utils';
import Vuex from 'vuex';
import ApplicationInfomation from 'components/ApplicationInfomation';

import ElementUI from 'element-ui';
import locale from 'element-ui/lib/locale';
import lang from 'element-ui/lib/locale/lang/ja';

locale.use(lang);

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(ElementUI);

const factory = () => {
  const state = {
    appName: 'Adobe Premiere Pro CC',
    appVersion: "12.0"
  };
  const mutations = {
    getAppName: () => {},
    getAppVersion: () => {},
    getProject: () => {}
  }
  const store = new Vuex.Store({
    state,
    mutations
  });
  return shallowMount(ApplicationInfomation, {
    localVue: localVue,
    store: store
  });
}

describe('ApplicationInfomation ', () => {
  it('is a Vue instance', () => {
    const wrapper = factory();
    expect(wrapper.isVueInstance()).toBeTruthy()
  });
  it('has a created hook', () => {
    expect(typeof ApplicationInfomation.created).toBe('function')
  });
})