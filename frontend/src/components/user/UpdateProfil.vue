<template>
  <v-container>
    <BarUpInside />

    <v-container>
      <v-card>
        <v-card-title>Modification de compte</v-card-title>
        <v-card-text>
          <v-form ref="form" @submit.prevent="updateForm">
            <v-text-field
              label="Prénom"
              v-model="firstName"
              required
            ></v-text-field>
            <v-text-field
              label="Nom"
              v-model="lastName"
              required
            ></v-text-field>
            <v-text-field
              label="Email"
              v-model="email"
              :rules="emailRules"
              required
            ></v-text-field>
            <v-btn type="submit" value="submit" color="blue">Valider</v-btn>
            <v-btn @click="clear">Annuler</v-btn>
          </v-form>
        </v-card-text>
      </v-card>
    </v-container>

    <FooterView />
  </v-container>
</template>

<script>
import BarUpInside from "@/layouts/BarUpInside";
import axios from "axios";
import Swal from "sweetalert2";

const userToken = JSON.parse(localStorage.getItem("userTkn"));
//const userId = JSON.parse(localStorage.getItem("userId"));

export default {
  name: "UpdateProfil",
  components: {
    BarUpInside,
  },

  data() {
    return {
      firstName: "",
      lastName: "",
      email: "",
      emailRules: [
        (v) => !!v || "Veuillez renseigner un email valide",
        (v) => /.+@.+/.test(v) || "Veuillez reseigner un email valide",
      ],
    };
  },

  mounted() {
    axios
      .get("http://localhost:3000/api/users/profil", {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      })
      .then((response) => {
        this.firstName = response.data.firstName;
        this.lastName = response.data.lastName;
        this.email = response.data.email;
      })
      .catch((error) => {
        console.log(error);
      });
  },

  methods: {
    updateForm(e) {
      e.preventDefault();

      if (
        this.firstName == null ||
        this.lastName == null ||
        this.email == null
      ) {
        return false;
      }

      const formdata = {
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
      };

      axios
        .put("http://localhost:3000/api/users/profil", formdata, {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        })
        .then((response) => {
          console.log(response);
          Swal.fire("Modification réussie !");
          this.$router.replace({
            name: "profil",
            params: { message: response.data.success },
          });
        })
        .catch((error) => {
          console.log(error);
        });
    },

    clear() {
      this.$refs.form.reset();
    },
  },
};
</script>
