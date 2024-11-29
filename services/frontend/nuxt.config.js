export default {
    devServer: {
      host: '0.0.0.0', // Necessário para funcionar dentro do container Docker
      port: 3001
    },
    runtimeConfig: {
      public: {
        apiBase: '/api'
      }
    }
  };
  