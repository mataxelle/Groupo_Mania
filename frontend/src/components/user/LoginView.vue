<template>
  <v-container>
    <BarUp />

    <v-main>
      <v-card>
        <v-card-title>Connexion</v-card-title>
        <v-card-text>
          <v-form ref="form" @submit.prevent="loginForm" v-model="isValid">
            <v-text-field
              label="Email"
              v-model="email"
              :rules="emailRules"
              required
            ></v-text-field>
            <v-text-field
              label="Mot de passe"
              v-model="password"
              type="password"
              :rules="passwordRules"
              required
            ></v-text-field>
            <v-card-actions class="mt-5">
              <v-btn type="submit" value="submit" color="blue" small
                >Connexion</v-btn
              >
              <v-spacer></v-spacer>
              <v-btn @click="clear" small>Annuler</v-btn>
            </v-card-actions>
          </v-form>
        </v-card-text>
      </v-card>
    </v-main>
  </v-container>
</template>

<script>
import BarUp from "@/layouts/BarUp";
import axios from "axios";
import Swal from "sweetalert2";

export default {
  name: "LoginView",
  components: {
    BarUp,
  },

  data() {
    return {
      email: "",
      password: "",
      isValid: true,
      emailRules: [
        (v) => !!v || "Veuillez renseigner un email",
        (v) => /.+@.+/.test(v) || "Veuillez reseigner un email valide",
      ],
      passwordRules: [
        (v) => !!v || "Veuillez renseigner votre mot de passe",
        (v) =>
          (v && v.length >= 5) ||
          "Le mot de passe devrait avoir 7 caractères minimum",
        (v) => /(?=.*[A-Z])/.test(v) || "Devrait avoir une majuscule",
        (v) => /(?=.*\d)/.test(v) || "Devrait avoir un chiffre",
        (v) =>
          /([!@$%])/.test(v) || "Devrait avoir un caractère spécial [!@#$%]",
      ],
    };
  },

  methods: {
    clear() {
      this.$refs.form.reset();
    },

    validate() {
      this.$refs.form.validate();
    },

    loginForm() {
      if (this.email == null || this.password == null) {
        return false;
      }

      const formdata = {
        email: this.email,
        password: this.password,
      };

      axios
        .post("http://localhost:3000/api/auth/login", formdata)
        .then((response) => {
          localStorage.setItem("userTkn", JSON.stringify(response.data.token));
          localStorage.setItem("userId", JSON.stringify(response.data.userId));
          Swal.fire("Bonjour,", "bonne navigation !");
          this.$router.replace({
            name: "actualityWall",
            params: { message: response.data },
          });
        })
        .catch((error) => {
          Swal.fire("Vérifiez vos informations !");
          console.log(error);
        });
    },
  },
};
</script>
