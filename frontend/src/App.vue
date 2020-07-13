<template>
  <v-app>
    <v-main>
      <router-view><Home /></router-view>
    </v-main>
  </v-app>
</template>

<script>
import Home from "./components/Home"

export default {
  name: "App",
  components: {
    Home
  },

  data: () => ({
    //
  }),

};
</script>

<style>
</style>
