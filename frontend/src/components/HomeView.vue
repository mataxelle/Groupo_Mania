<template>
  <v-container>
    <BarUp />

    <v-main>
      <v-container>
        <!--<v-img src="../assets/people.jpg" alt="image of people"></v-img>-->
      </v-container>

      <v-container>
        <v-tabs grow color="purple">
          <v-tab>Connexion</v-tab>
        </v-tabs>
        <LoginView />
      </v-container>

      <v-container class="center">
        <router-link class="link" to="/signup"
          >Créer un compte si première connexion</router-link
        >
      </v-container>
    </v-main>
  </v-container>
</template>

<script>
import BarUp from "../layouts/BarUp";
import LoginView from "../components/user/LoginView";

export default {
  name: "HomeView",
  components: {
    BarUp,
    LoginView,
  },
};
</script>

<style scoped>
.center {
  text-align: center;
}

.link {
  color: purple;
  text-decoration: none;
}
</style>
