import {
  shallowMount,
  createLocalVue
} from '@vue/test-utils';
import Vuex from 'vuex';
import HelloWorld from 'components/HelloWorld';

const localVue = createLocalVue();
localVue.use(Vuex);

const factory = () => {
  const state = {
    appName: 'Adobe Premiere Pro CC',
    appVersion: "12.0"
  };
  const store = new Vuex.Store({
    state
  });
  return shallowMount(HelloWorld, {
    localVue: localVue,
    store: store
  });
};

describe('HelloWorld', () => {
  it('is a Vue instance', () => {
    const wrapper = factory();
    expect(wrapper.isVueInstance()).toBeTruthy()
  });
  it('has a created hook', () => {
    expect(typeof HelloWorld.created).toBe('function')
  });
})