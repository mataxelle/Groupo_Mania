<template>
  <v-container>
    <BarUpInside />

    <div class="members" v-if="members.length <= 0">Aucun utilisateur disponible !</div>

    <div v-if="members.length > 0"> Utilisateurs disponibles par ordre décroisssant :

      <v-card v-for="member in members" :key="member.id" class="eachCard">
      <v-card color="#F3D664">
          <v-card-title> <v-icon>mdi-card-account-details</v-icon> Utilisateur :</v-card-title>
          <v-divider></v-divider>
        <v-card-text>
            <v-icon>mdi-alpha-n-box</v-icon>
          Nom :
          <span>{{ member.lastName }}</span>
        </v-card-text>
        <v-card-text>
            <v-icon>mdi-alpha-p-box</v-icon>
          Prénom :
          <span>{{ member.firstName }}</span>
        </v-card-text>
        <v-card-text>
            <v-icon>mdi-email</v-icon>
          Adresse email :
          <span>{{ member.email }}</span>
        </v-card-text>
      </v-card>
      <v-layout align-center justify-end>
        <v-btn text class="my-2" color="red" small @click="deleteUser">
           <v-icon>mdi-delete</v-icon> Supprimer utilisateur</v-btn>
      </v-layout>
    </v-card>
    </div>
  </v-container>
</template>

<script>
import BarUpInside from "@/layouts/BarUpInside";
import axios from "axios";

export default {
  name: "AdminBoard",
  components: {
    BarUpInside
  },

  data() {
    return {
      members: {}
    };
  },

  mounted() {
    axios
      .get("http://localhost:3000/api/users")
      .then(response => {
        this.members = response.data;
        console.log(this.members);
        console.log(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  },

  methods: {
      deleteUser() {
      }
  }
};
</script>

<style scoped>
.eachCard {
  margin: 20px auto;
}

.v-icon {
    color: #041740;
}

.v-card__text {
  color: rgb(12, 12, 14)!important;
}
</style>