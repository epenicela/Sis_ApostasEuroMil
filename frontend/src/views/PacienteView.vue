<template>
  <Paciente />
</template>

<script>
import { defineComponent } from 'vue';

// Components
import Paciente from '../components/Paciente.vue';

export default defineComponent({
  name: 'PacienteView',

  components: {
    Paciente,
  },
});
</script>