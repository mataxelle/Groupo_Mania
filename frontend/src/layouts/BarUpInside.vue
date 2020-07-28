<template>
  <v-container>
    <v-app-bar app color="purple">
      <v-toolbar-title>
        <router-link to="/message">
          <v-img src="../assets/icon-left-font-monochrome-white-sm.png"></v-img>
        </router-link>
      </v-toolbar-title>
      <v-row justify="end">
        <v-btn text rounded class="my-2">
          <router-link to="/adminBoard" class="color">
            <v-icon>mdi-view-dashboard</v-icon>
          </router-link>
        </v-btn>
        <v-btn text rounded class="my-2">
          <router-link to="/actualityWall" class="color">
            <v-icon>mdi-message-text</v-icon>
          </router-link>
        </v-btn>
        <v-btn text rounded class="my-2">
          <router-link to="/profil" class="color">
            <v-icon>mdi-account-circle</v-icon>
          </router-link>
        </v-btn>
        <v-btn text rounded class="my-2 color" @click.prevent="signout">
          <v-icon>mdi-arrow-right-circle</v-icon>
        </v-btn>
      </v-row>
    </v-app-bar>

    <v-card color="pink">
      <v-row justify="space-between">
        <v-btn text rounded class="my-2">
          <router-link to="/adminBoard" class="color">
          <v-icon>mdi-view-dashboard</v-icon>
          </router-link>
        </v-btn>
        <v-btn text rounded class="my-2">
          <router-link to="/actualityWall" class="color">
          <v-icon>mdi-message-text</v-icon>
          </router-link>
        </v-btn>
        <v-btn text rounded class="my-2">
          <router-link to="/profil" class="color">
          <v-icon>mdi-account-circle</v-icon>
          </router-link>
        </v-btn>
        <v-btn text rounded class="my-2 color" @click.prevent="signout">
          <v-icon>mdi-arrow-right-circle</v-icon>
        </v-btn>
      </v-row>
    </v-card>
  </v-container>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";

const userToken = JSON.parse(localStorage.getItem('userTkn'));
//const userId = JSON.parse(localStorage.getItem("userId"));

export default {
  name: 'BarUpInside',

  data () {
    return {
      user: {}
    }
  },

  methods: {
    signout() {
      axios
        .post("http://localhost:3000/api/auth/logout", {
        headers: {
          Authorization: `Bearer ${userToken}`
        }
      })
        .then(response => {
          localStorage.clear();
          Swal.fire("Déconnecion réussie !");
          this.$router.replace({
            name: "home",
            params: { message: response.data.success }
          });
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};
</script>

<style scoped>
.color {
  color: white;
  text-decoration: none;
}

@media screen and (max-width: 500px) {
  .row.justify-end {
    display: none;
  }
}

@media screen and (min-width: 499px){
  .row.justify-space-between {
    display: none;
  }
}
</style>