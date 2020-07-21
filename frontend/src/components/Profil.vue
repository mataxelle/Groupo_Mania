<template>
  <v-container>
    <BarUpInside/>

    <v-container>
        <v-main>
            <v-card>
      <v-img src="https://cdn.vuetifyjs.com/images/lists/ali.png" height="300px" dark>
        <v-card-title>Mon profil</v-card-title>
      </v-img>

      <v-list>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>PRENOM :</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>NOM :</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-divider></v-divider>

        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>EMAIL :</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-card>

    <v-card class="d-flex my-2">
        <v-row class="align-center mx-3">
            <v-col cols="7">
                Modifier mon compte
            </v-col>
            <v-col cols="5">
                 <v-btn rounded color="purple lighten-2" dark small>Modifier</v-btn>  
            </v-col>
        </v-row>
    </v-card>

    <v-card class="d-flex my-2">
        <v-row class="align-center mx-3">
            <v-col cols="7">
                Supprimer mon compte
            </v-col>
          <v-col cols="5">
              <v-btn rounded color="red darken-1" dark small>Supprimer</v-btn>
          </v-col>
        </v-row>
    </v-card>
        </v-main>
    </v-container>

    <Footer/>

  </v-container>
</template>

<script>
import BarUpInside from "../layouts/BarUpInside"
import Footer from "../layouts/Footer"

export default {
  name: "Profil",
  components: {
    BarUpInside,
    Footer
  }
};
</script>