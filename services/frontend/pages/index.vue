<template>
    <div>
      <h1>Welcome to Nuxt.js Frontend!</h1>
      <p>{{ message }}</p>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        message: 'Loading...'
      };
    },
    async mounted() {
      const res = await fetch(this.$config.public.apiBase);
      this.message = await res.text();
    }
  };
  </script>
  