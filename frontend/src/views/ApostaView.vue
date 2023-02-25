<template>
    <Aposta />
  </template>
  
  <script>
  import { defineComponent } from 'vue';
  
  // Components
  import Aposta from '../components/Aposta.vue';
  
  export default defineComponent({
    name: 'ApostaView',
  
    components: {
      Aposta,
    },
  });
  </script>