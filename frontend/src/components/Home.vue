<template>
  <v-container>
    <BarUp />

    <v-main>
      <v-container>
        <!--<v-img src="../assets/people.jpg" alt="image of people"></v-img>-->
      </v-container>
      <v-container>
        <v-tabs grow>
          <v-tab>Connexion</v-tab>
          <v-tab to="/signup">Créer un compte</v-tab>
        </v-tabs>
        <Login />
      </v-container>
    </v-main>
  </v-container>
</template>

<script>
import BarUp from "../layouts/BarUp"
import Login from "../components/Login"

export default {
  name: "Home",
  components: {
    BarUp,
    Login
  }
};
</script>


<style scoped>
</style>