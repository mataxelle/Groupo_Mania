<template>
    <v-container>
        <v-card v-for="comment in comments" :key="comment.id" :comment="comment">
            <v-img></v-img>
            <v-row>
              <v-col>
              <v-card-text>De : {{ comment.userId }} </v-card-text>
            </v-col>
            <v-col>
              <v-card-text>à : {{ comment.createdAt }}</v-card-text>
            </v-col>
            </v-row>
            <v-card-text>{{ comment.commentaire }}</v-card-text>
        </v-card>
    </v-container>
</template>

<script>
import axios from "axios";

const userToken = JSON.parse(localStorage.getItem('userTkn'));

export default {
    
    data () {
        return {
            comments: {},
            user: {}
        }
    },

     mounted() {
    axios
      .get("http://localhost:3000/api/articles/" + this.$route.params.articleId + "/comment", {
        headers: {
          Authorization: `Bearer ${userToken}`,
        }
      })
      .then((response) => {
        this.user = response.data;
        this.comments = response.data;
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });

    },

    /*computed:  {
        avatar () {
            return 'https://api.adorable.io/avatars/48/' + this.comment.name.toString().toLowerCase().trim().replace(/[\s\W-]+/g, '-')  + '@adorable.io.png'
        }
    }*/
}
</script>