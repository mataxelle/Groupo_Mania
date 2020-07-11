<template>
  <v-container>
    <BarUp />

    <v-main>
      <v-card>
        <v-card-title>Inscription</v-card-title>
        <v-card-text>
          <v-form>
            <v-text-field label="Nom" v-model="firstName" required></v-text-field>
            <v-text-field label="Prénom" v-model="lastName" required></v-text-field>
            <v-text-field label="Email" v-model="email" :rules="emailRules" required></v-text-field>
            <v-text-field label="Mot de passe" v-model="password" type="password" :rules="passwordRules" required></v-text-field>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-btn type="submit" value="submit" color="blue">Valider</v-btn>
        </v-card-actions>
      </v-card>
    </v-main>
  </v-container>
</template>

<script>
import BarUp from "../layouts/BarUp";

export default {
  name: "Signin",
  components: {
    BarUp
  }
};
</script>