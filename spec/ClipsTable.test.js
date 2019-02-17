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
    clips: [{isSelected: false, name: 'hoge.mp4', fullPath: '/path/to/hoge.mp4', mediaType: 'Video', seconds: 5.0}],
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
    expect(wrapper.isVueInstance()).toBeTruthy();
  });
  it('has a created hook', () => {
    expect(typeof ClipsTable.created).toBe('function');
  });
  it('has video clips data', () => {
    const wrapper = factory();
    const expected = [{isSelected: false, name: 'hoge.mp4', fullPath: '/path/to/hoge.mp4', mediaType: 'Video', seconds: 5.0}];
    expect(wrapper.vm.videoClips).toEqual(expected);
  });
})