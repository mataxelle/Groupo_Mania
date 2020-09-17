<template>
  <v-container>
    <v-card v-for="comment in comments" :key="comment.id" :comment="comment">
      <v-row>
        <v-col>
          <v-card-text>De : {{ comment.userId }}</v-card-text>
        </v-col>
        <v-col>
          <v-row justify="end" class="margin">
            <v-tooltip top>
              <template v-slot:activator="{ on, attrs }">
                <v-btn v-bind="attrs" v-on="on" text color="red" small @click="deleteComment">
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
              </template>
              <span>Supprimer</span>
            </v-tooltip>
          </v-row>
        </v-col>
      </v-row>
      <v-card-text>{{ comment.commentaire }}</v-card-text>
      <v-card-text>à : {{ comment.createdAt }}</v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";

const userToken = JSON.parse(localStorage.getItem("userTkn"));

export default {
  props: ['comments'],

  data() {
    return {
      //comments: {},
      user: {},
    };
  },

  mounted() {
    /*axios
      .get(
        "http://localhost:3000/api/articles/" +
          this.$route.params.articleId +
          "/comment",
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      )
      .then((response) => {
        this.user = response.data;
        this.comments = response.data;
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });*/
  },

  methods: {
    deleteComment() {
      axios
        .delete(
          "http://localhost:3000/api/articles/" + this.$route.params.articleId + "/comment/" + this.$route.params.commentId,
          {
            headers: {
              Authorization: `Bearer ${userToken}`,
            },
          }
        )
        .then((response) => {
          if (response.status == 200) {
            Swal.fire("Commentaire supprimé !");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style scoped>
.v-card {
  margin: 20px;
}

.margin {
  margin-right: 30px;
}
</style>