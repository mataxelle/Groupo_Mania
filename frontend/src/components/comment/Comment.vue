<template>
    <v-container>
        <v-card>
            <v-img></v-img>
            <v-card-text>{{ user.firstName }} <span class="date">{{ comment.createdAt }}</span></v-card-text>
            <v-card-text>{{ comment.commentaire }}</v-card-text>
        </v-card>
    </v-container>
</template>

<script>
import axios from "axios";

const userToken = JSON.parse(localStorage.getItem('userTkn'));
//const userId = JSON.parse(localStorage.getItem("userId"));

export default {
    
    data () {
        return {
            comment: {},
            user: {}
        }
    },

     mounted() {
    axios
      .get("http://localhost:3000/api/articles/:id/comment", {
        headers: {
          Authorization: `Bearer ${userToken}`,
        }
      })
      .then((response) => {
        this.user = response.data;
        this.comment = response.data;
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