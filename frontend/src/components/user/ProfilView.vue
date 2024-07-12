<template>
  <v-container>
    <BarUpInside />

    <v-container>
      <v-main>
        <v-card>
          <v-img
            src="https://cdn.vuetifyjs.com/images/lists/ali.png"
            height="300px"
            dark
          >
            <v-card-title>Mon profil</v-card-title>
          </v-img>

          <v-list>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title
                  >Prénom : {{ user.firstName }}</v-list-item-title
                >
              </v-list-item-content>
            </v-list-item>

            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>Nom : {{ user.lastName }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>

            <v-divider></v-divider>

            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>Email : {{ user.email }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-card>

        <v-card class="d-flex my-2">
          <v-row class="align-center mx-3">
            <v-col cols="7">Modifier mon compte</v-col>
            <v-col cols="5">
              <v-btn rounded color="purple lighten-2" dark small>
                <router-link to="/updateProfil" class="color"
                  >Modifier</router-link
                >
              </v-btn>
            </v-col>
          </v-row>
        </v-card>

        <v-card class="d-flex my-2">
          <v-row class="align-center mx-3">
            <v-col cols="7">Supprimer mon compte</v-col>
            <v-col cols="5">
              <v-btn
                @click="deleteProfil"
                rounded
                color="red darken-1"
                dark
                small
                >Supprimer</v-btn
              >
            </v-col>
          </v-row>
        </v-card>
      </v-main>
    </v-container>

    <FooterView />
  </v-container>
</template>

<script>
import BarUpInside from "@/layouts/BarUpInside";
import FooterView from "@/layouts/FooterView";
import axios from "axios";
import Swal from "sweetalert2";

const userToken = JSON.parse(localStorage.getItem("userTkn"));
//const userId = JSON.parse(localStorage.getItem("userId"));

export default {
  name: "ProfilView",
  components: {
    BarUpInside,
    FooterView,
  },

  data() {
    return {
      user: {},
    };
  },

  created() {
    //représente la durée pendant laquelle le composant est en construction
    axios
      .get("http://localhost:3000/api/users/profil", {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      })
      .then((response) => {
        this.user = response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  },

  methods: {
    //permet de définir des fonctions auxquelles l'application aura accès
    deleteProfil() {
      axios
        .delete("http://localhost:3000/api/users/profil", {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        })
        .then((response) => {
          if (response.status == 200) {
            Swal.fire("Compte supprimé !");
          }
          this.$router.replace({
            name: "home",
            params: { message: "Compte supprimé avec succès ! " },
          });
          localStorage.clear();
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style scoped>
.color {
  color: white;
  text-decoration: none;
}
</style>
