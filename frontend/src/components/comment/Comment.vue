<template>
  <v-container>
    <v-card v-for="(comment, index) in filterComments" :key="comment.id" :comment="comment">
      <v-row>
        <v-col>
          <v-card-text>De : {{ comment.userId }}</v-card-text>
        </v-col>
        <v-col>
          <v-row justify="end" class="margin">
            <v-tooltip top>
              <template v-slot:activator="{ on, attrs }">
                <v-btn v-bind="attrs" v-on="on" text color="red" small @click="deleteComment(index,comment.id)">
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
              </template>
              <span>Supprimer</span>
            </v-tooltip>
          </v-row>
        </v-col>
      </v-row>
      <v-card-text class="color">{{ comment.commentaire }}</v-card-text>
      <v-card-text class="end">à : {{ comment.createdAt }}</v-card-text>
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
      user: {},
    };
  },

  methods: {
    deleteComment(index, id) {
      axios
        .delete(
          "http://localhost:3000/api/articles/" + this.$route.params.articleId + "/comment/" + id ,
          //+ this.$route.params.id, UNDIFINED
          //{comment: this.comment}, 404 NOT FOUND
          {
            headers: {
              Authorization: `Bearer ${userToken}`,
            },
          }
        )
        .then((response) => {
          this.$emit('supprimer') // 2 param: le nom de l'évènement émit et un payload(optionnel)
          if (response.status == 200) {
            this.comments.splice(index, 1);
            Swal.fire("Commentaire supprimé !");
          }
          document.location.reload(true);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },

  computed: {
    
    filterComments() {
     try {
       return this.comments.filter(comment => comment.articleId == this.$route.params.articleId) //filter permet de filtrer les comments liés à un article
     } catch (error) {
       return []
     }
    }
  }
};
</script>

<style scoped>
.v-card {
  margin: 20px;
}

.margin {
  margin-right: 30px;
}

.color {
  color: rgb(13, 14, 14) !important;
  font-size: medium;
}

.end {
  text-align: end;
  font-size: xx-small;
}
</style>