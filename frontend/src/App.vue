<template>
  <v-app>
    <v-main>
      <router-view><HomeView /></router-view>
    </v-main>
  </v-app>
</template>

<script>
import HomeView from "./components/HomeView";

export default {
  name: "App",
  components: {
    HomeView,
  },

  data: () => ({
    //
  }),
};
</script>

<style></style>
