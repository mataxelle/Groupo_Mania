<template>
  <v-container>
    <BarUpInside />

    <div class="center">
      <div
        v-if="user.id !== 1"
        class="messageAlert"
      >Vous devez être un administrateur pour voir ces informations!</div>
      <v-btn>
        <router-link to="/actualityWall" class="link-color"> Retour vers la page principale
        </router-link>
      </v-btn>
    </div>

    <div v-if="user.id === 1">
      <div class="members" v-if="members.length <= 0">Aucun utilisateur disponible !</div>

      <div v-if="members.length > 0">
        Utilisateurs disponibles par ordre décroisssant :
        <v-card v-for="(member, index) in members" :key="member.id" class="eachCard">
          <v-card color="#F3D664">
            <v-card-title>
              <v-icon>mdi-card-account-details</v-icon>Utilisateur :
            </v-card-title>
            <v-divider></v-divider>
            <v-card-text>
              <v-icon>mdi-alpha-n-box</v-icon>Nom :
              <span>{{ member.lastName }}</span>
            </v-card-text>
            <v-card-text>
              <v-icon>mdi-alpha-p-box</v-icon>Prénom :
              <span>{{ member.firstName }}</span>
            </v-card-text>
            <v-card-text>
              <v-icon>mdi-email</v-icon>Adresse email :
              <span>{{ member.email }}</span>
            </v-card-text>
          </v-card>
          <v-layout align-center justify-end>
            <v-btn v-if="user.id === 1" text class="my-2" color="red" small @click="deleteUser(index,member.id)">
              <v-icon>mdi-delete</v-icon>Supprimer utilisateur
            </v-btn>
          </v-layout>
        </v-card>
      </div>
    </div>
  </v-container>
</template>

<script>
import BarUpInside from "@/layouts/BarUpInside";
import axios from "axios";
import Swal from "sweetalert2";

const userToken = JSON.parse(localStorage.getItem("userTkn"));
//const userId = JSON.parse(localStorage.getItem("userId"));

export default {
  name: "AdminBoard",
  components: {
    BarUpInside,
  },

  data() {
    return {
      members: {},
      user: {},
    };
  },

  mounted() {
    axios
      .get("http://localhost:3000/api/users", {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      })
      .then((response) => {
        this.members = response.data;
        console.log(this.members);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });

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
    deleteUser(index, id) {
      axios
        .delete("http://localhost:3000/api/users/profil/" + id, {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        })
        .then((response) => {
          if (response.status == 200) {
            this.members.splice(index, 1);
          }
          Swal.fire("Suppression utilisateur réussie !");
          document.location.reload(true); // La méthode location.reload recharge la page, équivalent au clic sur le bouton Actualiser la page du navigateur
        })
        .catch((erreur) => console.log(erreur));
    },
  },
};
</script>

<style scoped>
.center {
  text-align: center;
}

.messageAlert {
  font-size: xx-large;
  color: red;
}

.link-color {
  color: green;
}

.eachCard {
  margin: 20px auto;
}

.v-icon {
  color: #041740;
}

.v-card__text {
  color: rgb(12, 12, 14) !important;
}
</style>