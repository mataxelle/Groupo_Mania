<template>
  <v-container>

      <BarUp />
    <v-main>
        <v-container>
        <v-img src="../assets/people.jpg" alt="image of people"></v-img>
        </v-container>
        <v-container>
      <v-tabs>
        <v-tab to="/login">Connexion</v-tab>
        <v-tab to="/signin">Créer un compte</v-tab>
      </v-tabs>
        </v-container>
    </v-main>

  </v-container>
</template>

<script>
import BarUp from "../layouts/BarUp"

export default {
	name: 'Home',
	components: {
		BarUp
	}
}
</script>


<style scoped>

</style>