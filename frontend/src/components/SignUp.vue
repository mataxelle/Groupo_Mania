<template>
  <v-container>
    <BarUp />

    <v-main>
      <v-card>
        <v-card-title>Inscription</v-card-title>
        <v-card-text>
          <v-form ref="form" @submit.prevent="submitForm"> 
            <v-text-field label="Prénom" v-model="firstName" required></v-text-field>
            <v-text-field label="Nom" v-model="lastName" required></v-text-field>
            <v-text-field label="Email" v-model="email" :rules="emailRules" required></v-text-field>
            <v-text-field
              label="Mot de passe"
              v-model="password"
              type="password"
              :rules="passwordRules"
              required
            ></v-text-field>
            <v-btn type="submit" value="submit" color="blue">Valider</v-btn>
          <v-btn @click="clear">Annuler</v-btn>
          </v-form>
        </v-card-text>
      </v-card>
    </v-main>
  </v-container>
</template>

<script>
import BarUp from "../layouts/BarUp";
import axios from "axios"

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
    ]
    };
  },

  methods: {

    submitForm (e) {

      e.preventDefault();
      console.log('HELLLLLLOO')
      if (this.firstName == null || this.lastName == null || this.email == null || this.password == null) {
        return false;
      }

      const formdata = {
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        password: this.password
      }
      
      axios.post('http://localhost:3000/api/auth/signup', formdata) 
      .then(response => {
        this.resp = response;
        console.log(response)
      })
      .catch(error => {
        console.log(error)
      })
    },

    
    clear() {
      this.$refs.form.reset()
    },
  }
};
</script>