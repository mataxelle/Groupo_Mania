<template>
  <v-container>
    <v-card>
      <div class="comment-box" id="comment">
        <div class="loader" v-show="loading">
          <span class="spinner"></span>
        </div>

        <v-form @submit.prevent="commentSubmit" class="form">
          <v-textarea v-model="content" class="input-message" name="message" id="message" rows="3" placeholder="Votre commentaire..." required></v-textarea>
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
import axios from "axios"

export default {
    name: "CommentForm",

    data () {
        return {
            loading: false,
            content: "",
        }
    },

    methods: {
    commentSubmit() {
        this.loading = true;
        
        axios.post("http://localhost/api/articles/", this.content)
        .thent(response => {
            this.$emit('commented', response.content);
            this.content = ""; // vider
            this.loading = false;
        })
        .catch()
        
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