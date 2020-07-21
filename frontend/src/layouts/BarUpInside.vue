<template>
  <v-container>
    <v-app-bar app color="purple">
        <v-toolbar-title>
        <router-link to="/profil" class="color">Groupomania</router-link>
      </v-toolbar-title>
        <v-row justify="end">
      <v-btn text rounded class="my-2">
          <router-link to="/actualityWall" class="color">
                Actualités
            </router-link>
      </v-btn>
      <v-btn text rounded class="my-2">
          <router-link to="/profil" class="color">
                Profil
            </router-link>
      </v-btn>
      <v-btn text rounded class="my-2">
          <router-link to="" class="color">
                Déconnexion
            </router-link>
      </v-btn>
        </v-row>
    </v-app-bar>
  </v-container>
</template>

<script>
export default {

};
</script>

<style scoped>
.color {
  color: white;
  text-decoration: none;
}

</style>