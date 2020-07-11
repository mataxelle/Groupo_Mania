<template>
  <v-container>
    <BarUp />

    <v-main>
      <v-card>
        <v-card-title>Connexion</v-card-title>
        <v-card-text>
          <v-form>
            <v-text-field label="Email" v-model="email" :rules="emailRules" required></v-text-field>
            <v-text-field
              label="Mot de passe"
              v-model="password"
              type="password"
              :rules="passwordRules"
              required
            ></v-text-field>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-btn type="submit" value="submit" color="blue">Se connecter</v-btn>
        </v-card-actions>
      </v-card>
    </v-main>
  </v-container>
</template>

<script>
import BarUp from "../layouts/BarUp";

export default {
  name: "Login",
  components: {
    BarUp
  },
  data: () => ({
    emailRules: [v => !!v || "Veuillez renseigner un email valide"],
    passwordRules: [v => !!v || "Veuillez renseigner votre mot de passe"]
  })
};
</script>