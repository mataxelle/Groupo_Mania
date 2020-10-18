<template>
  <v-container>
    <v-card>
      <div class="comment-box" id="comment">

        <v-form ref="form" @submit.prevent="commentSubmit" class="form">
          <v-textarea outlined v-model="comment" type="text" placeholder="Votre commentaire..." required></v-textarea>
          <v-card-text>De : {{ user.id }}</v-card-text>
          <div class="commentSubBtn">
            <v-btn type="submit" small value="submit" color="blue">Poster un commentaire</v-btn>
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

export default {
    name: "CommentForm",

    data() {
        return {
            comment: "",
            user: {},
            isValid: true,
        }
    },

    mounted() {
    axios
      .get("http://localhost:3000/api/users/profil", {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      })
      .then((response) => {
        this.user = response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  },

    methods: {
    commentSubmit() {

      if (this.comment == null) {
        return false;
      }
        
      axios.post("http://localhost:3000/api/articles/" + this.$route.params.articleId + "/comment/", {comment: this.comment}, {
        headers: {
          Authorization: `Bearer ${userToken}`
        }
      })
        .then(response => {
          localStorage.setItem("comment", JSON.stringify(response.data.comment))
          localStorage.setItem("commentId", JSON.stringify(response.data.comment.id))
          this.$emit('commented', response.data.comment)
          this.comment = ""; // vider
          Swal.fire("Commentaire ajouté !");
        })
        .catch(error => {
          console.log(error);
        });
        
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