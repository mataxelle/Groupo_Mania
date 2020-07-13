<template>
  <v-container>
    <BarUp />

    <v-main>
      <v-card>
        <v-card-title>Inscription</v-card-title>
        <v-card-text>
          <v-form ref="form" v-model="isValid">
            <v-text-field label="Nom" v-model="firstName" required></v-text-field>
            <v-text-field label="Prénom" v-model="lastName" required></v-text-field>
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
          <v-btn type="submit" @click="submit" value="submit" color="blue" :disabled="!isValid">Valider</v-btn>
          <v-btn @click="clear">Annuler</v-btn>
        </v-card-actions>
      </v-card>
    </v-main>
  </v-container>
</template>

<script>
import BarUp from "../layouts/BarUp";
//import axios from "axios"

export default {
  name: "SignUp",
  components: {
    BarUp
  },

  data() {
    return {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    isValid: true,
    emailRules: [
      v => !!v || "Veuillez renseigner un email valide",
      v => /.+@.+/.test(v) || "Veuillez reseigner un email valide"
    ],
    passwordRules: [
      v => !!v || "Veuillez renseigner votre mot de passe",
      v => (v && v.length >= 5) || "Le mot de passe devrait avoir 7 caractères minimum",
      v => /(?=.*[A-Z])/.test(v) || "Devrait avoir une majuscule",
      v => /(?=.*\d)/.test(v) || "Devrait avoir un chiffre",
      v => /([!@$%])/.test(v) || "Devrait avoir un caractère spécial [!@#$%]"
    ]};
  },

  methods: {
    
    submit() {
      this.$refs.form.validate()
    },

    clear() {
      this.$refs.form.reset()
    }

    /*createUserSubmit () {
      const formdata = new FormData()
      formdata.append('firstName', this.firstName)
      formdata.append('lastName', this.lastName)
      formdata.append('email', this.email)
      formdata.append('password', this.password)

      axios.post('/signup', formdata)
      .then(function (response) {
        console.log(response)
      })
      .cath(function (error) {
        console.log(error)
      })
    }*/
  }
};
</script>