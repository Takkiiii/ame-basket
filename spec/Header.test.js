import {
  mount,
  shallowMount,
  createLocalVue
} from '@vue/test-utils';
import Vuex from 'vuex';
import ElementUI from 'element-ui';
import locale from 'element-ui/lib/locale';
import lang from 'element-ui/lib/locale/lang/ja';

import Header from 'components/Header';

locale.use(lang);

const localVuew = createLocalVue();
localVuew.use(Vuex);
localVuew.use(ElementUI);

const factory = () => {
  return shallowMount(Header, { localVuew });
};

describe('AppHeader', () => {
  it('is a Vue instance', () => {
    const wrapper = factory();
    expect(wrapper.isVueInstance()).toBeTruthy();
  });
  it('has a created hook', () => {
    expect(typeof Header.created).toBe('function')
  });
});