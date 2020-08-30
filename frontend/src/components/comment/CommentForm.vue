<template>
  <v-container>
    <v-card>
      <div class="comment-box" id="comment">
        <div class="loader" v-show="loading">
          <span class="spinner"></span>
        </div>

        <v-form @submit.prevent="commentSubmit" class="form">
          <v-textarea v-model="text" type="text" placeholder="Votre commentaire..." required></v-textarea>
          <v-card-text>De :</v-card-text>
          <div class="commentSubBtn">
            <v-btn :disabled="loading" type="submit" small value="Comment" color="blue">Poster un commentaire</v-btn>
          </div>
          </v-form>
      </div>
    </v-card>
  </v-container>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";

const userToken = JSON.parse(localStorage.getItem('userTkn'));
//const userId = JSON.parse(localStorage.getItem("userId"));

export default {
    name: "CommentForm",

    data () {
        return {
            text: "",
            loading: false,
        }
    },

    methods: {
    commentSubmit(e) {
      e.preventDefault();

        this.loading = true;

        if (this.text == null) {
        return false;
      }
        
        axios.post("http://localhost:3000/api/articles/" + this.$route.params.articleId + "/comment", this.text, {
        headers: {
          Authorization: `Bearer ${userToken}`
        }
      })
        .then(response => {
            this.$emit('commented', response.data);
            this.text = ""; // vider
            this.loading = false;
            Swal.fire("Commentaire ajouté !");
        })
        .catch(error => {
          console.log(error);
        })
        
    }
  }
}
</script>

<style scoped>

.form {
  padding: 50px;
}

.commentSubBtn {
  text-align: center;
  margin-top: 10px;
}
</style>