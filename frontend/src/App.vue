<template>
  <v-app>
    <v-app-bar
      app color="purple"
    >
    </v-app-bar>

    <v-content>
      <Accueil/>
    </v-content>
  </v-app>
</template>

<script>
import Accueil from './components/Accueil';

export default {
  name: 'App',

  components: {
    Accueil,
  },

  data: () => ({
    //
  }),
};
</script>
