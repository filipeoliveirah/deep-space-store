import { Plugin } from '@nuxt/types';
import { AxiosError } from 'axios';

const axiosPlugin: Plugin = ({ $axios }): void => {
  $axios.onResponseError((response: AxiosError): void => {
    console.log('$axios.onResponseError');
    if (!response.response) {
      return;
    }

    const { status } = response.response;

    // 404
    if (status === 404) {
    }
  });
};

export default axiosPlugin;
