export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  generate: {
    fallback: true,
  },

  // Target: https://go.nuxtjs.dev/config-target
  // target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'deep-space-store',
    htmlAttrs: {
      lang: 'pt-BR',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.png' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '@/plugins/mock', mode: 'client' },
    '@/plugins/axios.ts',
    '@/plugins/error-handler.ts'
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: [
    '~/components/',
    '~/components/organisms',
    '~/components/molecules',
    '~/components/atoms'
  ],

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: ['@nuxtjs/axios'],

  axios: {
    // See https://github.com/nuxt-community/axios-module#options
  },

  routes: [
    {
      path: '/',
      component: 'pages/index.vue',
      children: [
        {
          path: '/:code',
          component: 'pages/index.vue',
          name: 'index'
        }
      ]
    }
  ],

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['@/assets/scss/variables.scss'],
    treeShake: true,
    icons: {
      iconfont: 'md'
    },
    theme: {
      themes: {
        light: {
          primary: '#0A1631',
          primary_0: '#EC6623',
          primary_1: '#EC7E47',
          primary_2: '#E04B00',
          blue_0: '#0A1631',
          blue_1: '#0F214A',
          blue_2: '#050A17',
          black_0: '#2A2A2A',
          black_1: '#424242',
          black_2: '#0F0F0F',
          while: 'FFFFFF',
          gray_0: '9C9EA1',
          gray_1: 'B4B7BA',
          gray_2: '838587',
          danger: '#EC2F23',
          info_danger: '#FFECEB',
          warning: '#ECD823',
          info: '#1F4496',
          info_50: '#EAEFFA',
          success: '#78B82A'
        }
      }
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
};
