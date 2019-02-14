import {
  mount,
  shallowMount,
  createLocalVue
} from '@vue/test-utils';
import Vuex from 'vuex';
import ElementUI from 'element-ui';
import locale from 'element-ui/lib/locale';
import lang from 'element-ui/lib/locale/lang/ja';

import ClipsTable from 'components/ClipsTable';

locale.use(lang);

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(ElementUI);

const factory = () => {
  const state = {
    clips: [],
    presets: []
  };
  const mutations = {
    getPresets: () => {}
  };
  const store = new Vuex.Store({
    state,
    mutations
  });
  return shallowMount(ClipsTable, {
    localVue: localVue,
    store: store,
    propsData: {}
  });
}

describe('ClipTable', () => {
  it('is a Vue instance', () => {
    const wrapper = factory();
    expect(wrapper.isVueInstance()).toBeTruthy()
  });
  it('has a created hook', () => {
    expect(typeof ClipsTable.created).toBe('function')
  });
})