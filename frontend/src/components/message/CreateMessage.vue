<template>
  <v-container>
    <BarUpInside/>

    <h1>Nouveau message</h1>

    <v-card class="card-space">
      <v-form ref="form" @submit.prevent="msgForm">
        <div class="space">
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>
                <v-text-field outlined v-model="title" label="Titre"></v-text-field>
              </v-list-item-title>
              <v-list-item-subtitle>De : {{user.firstName}}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </div>

        <div class="space">
          <v-file-input label="File input" prepend-icon="mdi-camera" outlined dense></v-file-input>
        </div>

        <div class="space">
          <v-textarea outlined v-model="message" label="Mon message"></v-textarea>
        </div>

        <div class="space">
          <v-btn text color="green accent-4" type="submit" value="submit">Poster</v-btn>
          <v-btn text color="red accent-4" @click="clear">Annuler</v-btn>
        </div>
      </v-form>
    </v-card>

    <Footer/>
  </v-container>
</template>

<script>
import BarUpInside from "@/layouts/BarUpInside";
import Footer from "@/layouts/Footer";
import axios from "axios";
import Swal from "sweetalert2";

export default {
  name: "CreateMessage",
  components: {
    BarUpInside,
    Footer
  },

  data() {
    return {
      title: "",
      message: "",
      user: {}
    };
  },

  methods: {
    msgForm() {
      if (this.title == null || this.message == null) {
        return false;
      }

      const message = {
        title: this.title,
        message: this.message
      };

      axios
        .post("http://localhost:3000/api/articles", message)
        .then(response => {
          localStorage.setItem("message", JSON.stringify(response.data.message))
          Swal.fire("Message créé !");
          this.$router.replace({
            name: "actualityWall",
            params: { message: response.data.success }
          });
        })
        .catch(error => {
          console.log(error);
        });
    },

    clear() {
      this.$refs.form.reset();
    },
  }
};
</script>

<style scoped>

h1 {
  text-align: center;
}

.card-space {
  margin: 40px 0px;
}

.space {
  margin: 30px 100px;
}
</style>