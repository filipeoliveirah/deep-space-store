import * as storeIndex from '@/store/index';
import { createLocalVue } from '@vue/test-utils';
import axios from 'axios';
import Vuex, { Store } from 'vuex';

const localVue = createLocalVue();
localVue.use(Vuex);

describe('storeIndex tests', () => {
  let store: any;

  beforeEach(() => {
    // @ts-ignore
    store = new Store(storeIndex);
    store.$axios = axios;
  });

  test('api', async (done) => {
    // @ts-ignore
    await store.dispatch('fetchApi');
    expect(store.getters.getResult.name).toBe('foo');
    done();
  });

  test('api', async (done) => {
    // @ts-ignore
    await store.dispatch('fetchApi');
    expect(store.state.result[1].name).toBe('bar');
    done();
  });
});
