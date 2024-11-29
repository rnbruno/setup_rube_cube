export default {
  devtools: { enabled: true },
  ssr: false,
  modules: [
    '@bg-dev/nuxt-naiveui',
    '@nuxtjs/tailwindcss',
    'nuxt-icon',
  ],
  tailwindcss: {
    exposeConfig: true,
  },
  i18n: {
    locales: [], // Nenhuma configuração de idiomas
    defaultLocale: 'en', // Define um idioma padrão
  },
  app: {
    pageTransition: {
      name: 'slide-left',
      mode: 'out-in',
    },
  },
  naiveui: {
    colorModePreference: 'light',
  },
  devServer: {
    host: '0.0.0.0', // Necessário para funcionar dentro do container Docker
    port: 3001
  },
  runtimeConfig: {
    public: {
      apiBase: 'http://localhost:3000/api' // Define o caminho base da API
    }
  },

  // Aqui você pode acessar diretamente o runtimeConfig
  hooks: {
    'build:before'(builder) {
      // Acessando o apiBase diretamente no build
      console.log('API Base URL:', process.env.API_BASE || 'Not set');
    }
  }
  
};
  