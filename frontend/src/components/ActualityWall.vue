<template>
  <v-container>
    <BarUpInside />

    <v-container>
      <v-main>
        <v-card>
          <v-card-title>Quoi de neuf ?</v-card-title>
          <v-row>
            <v-col cols="8">
              <v-btn>Créer un post</v-btn>
          </v-col>
          <v-col cols="4">
              <v-btn>Supprimer le post</v-btn>
          </v-col>
          </v-row>
        </v-card>
      </v-main>
    </v-container>

    <Footer />
  </v-container>
</template>

<script>
import BarUpInside from "../layouts/BarUpInside"
import Footer from "../layouts/Footer"

export default {
  name: "ActualityWall",
  components: {
    BarUpInside,
    Footer
  },

  data: () => ({
    drawer: null
  })
};
</script>