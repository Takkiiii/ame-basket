import {
  mount,
  shallowMount,
  createLocalVue
} from '@vue/test-utils';
import Vuex from 'vuex';
import ElementUI from 'element-ui';
import locale from 'element-ui/lib/locale';
import lang from 'element-ui/lib/locale/lang/ja';

import EncodingSettings from 'components/EncodingSettings';

locale.use(lang);

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(ElementUI);

const factory = () => {
  const state = {
  };
  const mutations = {
  }
  const store = new Vuex.Store({
    state,
    mutations
  });
  return shallowMount(EncodingSettings, {
    localVue: localVue,
    store: store,
    propsData: {
      presets: [],
      multipleSelection: [],
    }
  });
}

describe('EncodimngSettings', () => {
  it('is a Vue instance', () => {
    const wrapper = factory();
    wrapper.setData({})
    expect(wrapper.isVueInstance()).toBeTruthy()
  });
  it('has a created hook', () => {
    expect(typeof EncodingSettings.created).toBe('function')
  });
})