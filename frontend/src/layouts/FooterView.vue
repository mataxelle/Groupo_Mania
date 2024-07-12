<template>
  <v-container>
    <v-footer absolute color="purple" dark class="font-weight-medium">
      <v-row justify="space-around">
        <!--   <v-btn text rounded class="my-2">
            <router-link to="/actualityWall" class="color">
                Actualités
            </router-link>
            </v-btn>
        <v-btn  text rounded class="my-2">
            <router-link to="/about" class="color">
                A propos de
            </router-link>
        </v-btn>-->
        <v-col class="text-center" cols="12">
          {{ new Date().getFullYear() }} —
          <strong>Groupomania</strong>
        </v-col>
      </v-row>
    </v-footer>
  </v-container>
</template>

<script>
export default {};
</script>

<style scoped>
.color {
  color: white;
  text-decoration: none;
}
</style>