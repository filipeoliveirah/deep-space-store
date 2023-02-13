import { AxiosRequestConfig } from 'axios';
import Vue from 'vue';

/**
 * Interface para objeto json de resposta
 */
export interface UserInterface {
  userId: string;
  name: string;
  email: string;
  phone: string;
  updatedAt: string;
  address: object;
}

export interface ProductInterface {
  id: string;
  title: string;
  price: number;
  sale: number;
  description: string;
  category: string;
  image: string;
  rating: object;
}

export interface AddressInterface {
  cep: string;
  city: string;
  state: number;
  district: number;
  description: string;
  street: string;
  number: string;
}

/**
 * interface para store
 */
export interface StateInterface {
  user: UserInterface[];
  products: ProductInterface[];
  address: AddressInterface[];
}

/**
 * state
 */
export const state = (): StateInterface => ({
  user: [],
  products: [],
  address: []
});

/**
 * getters
 */
export const getters = {
  getUser(state: StateInterface): UserInterface | undefined {
    if (!state.user || state.user.length <= 0) {
      return;
    }

    return state.user[0];
  },

  getProductsOnSale(state: StateInterface): ProductInterface | undefined {
    if (!state.products || state.products.length <= 0) {
      return;
    }

    return state.products[0];
  },

  getAddress(state: StateInterface): AddressInterface | undefined {
    if (!state.address || state.address.length <= 0) {
      return;
    }

    return state.address[0];
  },
};

/**
 * mutations
 */
export const mutations = {
  SET_USERS(state: StateInterface, userResponse: UserInterface[]): void {
    state.user = userResponse;  
  },
  SET_PRODUCTS(state: StateInterface, productsResponse: ProductInterface[]): void {
    state.products = productsResponse;
  },
  SET_ADDRESS(state: StateInterface, addressResponse: AddressInterface[]): void {
    state.address = addressResponse;
  },
};

/**
 * actions
 */
export const actions = {
  async ['fetchUser'](
    this: Vue,
    // @ts-ignore
    { _, commit }: any
  ): Promise<void> {
    try {
      // https://uncle-javascript.com/weird-nuxt-3-axios-data-fetch
      // @ts-ignore
      const { data }: any = await this.$axios.get(
        '/users',
        {} as AxiosRequestConfig // https://github.com/axios/axios/blob/master/index.d.ts
      );

      commit('SET_USERS', data);
    } catch (err) {
      // @ts-ignore
      console.log(err.message);
    }
  },

  async ['fetchOffers'](
    this: Vue,
    { _, commit }: any,
    code: string
  ): Promise<object> {
    try {
      // https://uncle-javascript.com/weird-nuxt-3-axios-data-fetch
      // @ts-ignore
      const { data }: any = await this.$axios.get(
        `/offers/${code}`,
        {} as AxiosRequestConfig // https://github.com/axios/axios/blob/master/index.d.ts
      );

      commit('SET_PRODUCTS', data);

      return data;
    } catch (err) {
      // @ts-ignore
      console.log(err.message);
      return {}
    }
  },

  async ['fetchAddress'](
    this: Vue,
    { _, commit }: any,
    number: string
  ): Promise<object> {
    try {
      // https://uncle-javascript.com/weird-nuxt-3-axios-data-fetch
      // @ts-ignore
      const { data }: any = await this.$axios.get(
        `/cep/${number}`,
        {} as AxiosRequestConfig // https://github.com/axios/axios/blob/master/index.d.ts
      );

      commit('SET_ADDRESS', data);

      return data;
    } catch (err) {
      // @ts-ignore
      console.log(err.message);
      return {}
    }
  },

  async ['fetchPayment'](
    this: Vue,
    { _, commit }: any,
    number: string
  ): Promise<object> {
    try {
      // https://uncle-javascript.com/weird-nuxt-3-axios-data-fetch
      // @ts-ignore
      const { data }: any = await this.$axios.post(
        `/offers/${number}/create_order`,
        {} as AxiosRequestConfig // https://github.com/axios/axios/blob/master/index.d.ts
      );

      commit('SET_ADDRESS', data);

      return data;
    } catch (err) {
      // @ts-ignore
      console.log(err.message);
      return {}
    }
  },
};
