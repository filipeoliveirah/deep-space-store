import axios from 'axios';
import Vue from 'vue';

export default function ({ error }: any) {
  window.addEventListener('error', (event) => {
    console.log('Captured in error EventListener', event.error);
  });
  window.addEventListener('unhandledrejection', (event) => {
    console.log('Captured in unhandledrejection EventListener', event.reason);
  });

  Vue.config.errorHandler = (err, _vm, info) => {
    console.log(`Captured in Vue.config.errorHandler: ${info}`, err);

    if (axios.isAxiosError(err)) {
      if (!info.match(/(created|mounted)/)) {
        console.log('!created|mounted:', err);
        return;
      }
      console.log('created|mounted:', err);

      error({ statusCode: err.response?.request.status });
    } else {
      console.log('axiosのエラーではない:', err);
    }
  };
}
