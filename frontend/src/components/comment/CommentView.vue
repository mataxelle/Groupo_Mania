<template>
  <v-container>
    <v-card
      v-for="(comment, index) in filterComments"
      :key="comment.id"
      :comment="comment"
    >
      <v-row>
        <v-col>
          <v-card-text>
            <v-icon small>mdi-account-circle</v-icon>
            {{ comment.user.firstName }}
          </v-card-text>
        </v-col>
        <v-col class="mt-3" v-if="comment.userId === user.id || user.isAdmin">
          <v-row justify="end" class="margin">
            <v-tooltip top>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  v-bind="attrs"
                  v-on="on"
                  text
                  color="red"
                  small
                  @click="deleteComment(index, comment.id)"
                >
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
  props: ["comments"],

  data() {
    return {
      user: {},
      localComments: [...this.comments], // Copie locale de comments
    };
  },

  watch: {
    comments(newComments) {
      this.localComments = [...newComments]; // Met à jour la copie locale si la prop change
    },
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
    deleteComment(index, id) {
      axios
        .delete(
          "http://localhost:3000/api/articles/" +
            this.$route.params.articleId +
            "/comment/" +
            id,
          //+ this.$route.params.id, UNDIFINED
          //{comment: this.comment}, 404 NOT FOUND
          {
            headers: {
              Authorization: `Bearer ${userToken}`,
            },
          }
        )
        .then((response) => {
          if (response.status == 200) {
            this.localComments.splice(index, 1); // Modifie la copie locale
            this.$emit("update:comments", this.localComments); // Émet un événement pour informer le parent
            Swal.fire("Commentaire supprimé !");
            document.location.reload(true);
          }
          /*this.$emit("supprimer"); // 2 param: le nom de l'évènement émit et un payload(optionnel)
          if (response.status == 200) {
            this.comments.splice(index, 1);
            Swal.fire("Commentaire supprimé !");
          }
          document.location.reload(true);*/
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },

  computed: {
    //Propriété calculé qui prend un objet: une fonction qui retourne le résultat

    filterComments() {
      try {
        return this.localComments.filter(
          (comment) => comment.articleId == this.$route.params.articleId
        ); //filter permet de filtrer les comments liés à un article
      } catch (error) {
        return [];
      }
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

.color {
  color: rgb(13, 14, 14) !important;
  font-size: medium;
}

.end {
  text-align: end;
  font-size: xx-small;
}
</style>
