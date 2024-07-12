<template>
  <v-container>
    <BarUpInside />

    <v-card>
      <v-list-item>
        <v-list-item-content>
          <v-row>
            <v-col>
              <v-list-item-title>
                Titre :
                <span class="titleArt">{{ article.title }}</span>
              </v-list-item-title>
              <v-list-item-subtitle
                >De : {{ article.userId }}
              </v-list-item-subtitle>
            </v-col>
            <v-col v-if="article.userId === user.id || user.isAdmin">
              <!--affichache conditionné-->
              <v-row justify="end" class="margin">
                <v-tooltip top>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn v-bind="attrs" v-on="on" text color="green" small>
                      <router-link
                        :to="{
                          name: 'updateMessage',
                          params: { articleId: article.id },
                        }"
                        class="color"
                      >
                        <v-icon>mdi-lead-pencil</v-icon>
                      </router-link>
                    </v-btn>
                  </template>
                  <span>Modifier</span>
                </v-tooltip>
                <v-tooltip top>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      v-bind="attrs"
                      v-on="on"
                      text
                      color="red"
                      small
                      @click="deleteArticle"
                    >
                      <v-icon>mdi-delete</v-icon>
                    </v-btn>
                  </template>
                  <span>Supprimer</span>
                </v-tooltip>
              </v-row>
            </v-col>
          </v-row>
        </v-list-item-content>
      </v-list-item>

      <v-img></v-img>

      <v-card-text class="ArtColor">{{ article.text }}</v-card-text>

      <v-card-text class="end">Publié le : {{ article.createdAt }}</v-card-text>

      <v-row class="align-center mx-3">
        <v-col>
          <v-btn
            href="#comment"
            class="align-center mx-3"
            small
            text
            color="blue"
            >Poster un commentaire</v-btn
          >
        </v-col>
        <v-col>
          <v-row justify="end" class="margin">
            <v-tooltip top>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  v-bind="attrs"
                  v-on="on"
                  class="ma-2"
                  text
                  icon
                  color="blue"
                >
                  <span>
                    {{ article.like }}
                    <v-icon>mdi-thumb-up</v-icon>
                  </span>
                </v-btn>
              </template>
              <span>J'aime</span>
            </v-tooltip>
            <v-tooltip top>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  v-bind="attrs"
                  v-on="on"
                  class="ma-2"
                  text
                  icon
                  color="red"
                >
                  <span>
                    {{ article.dislike }}
                    <v-icon>mdi-thumb-down</v-icon>
                  </span>
                </v-btn>
              </template>
              <span>J'aime pas</span>
            </v-tooltip>
          </v-row>
        </v-col>
      </v-row>
    </v-card>

    <div class="noComment" v-if="comments.length <= 0">
      Aucun commentaire disponible !
    </div>

    <CommentView :comments="comments" v-on:supprimer="cancel" />
    <!--Composant enfant-->

    <CommentForm v-on:commented="updateComment" />

    <FooterView />
  </v-container>
</template>

<script>
import BarUpInside from "@/layouts/BarUpInside";
import FooterView from "@/layouts/FooterView";
import CommentForm from "../comment/CommentForm";
import CommentView from "../comment/CommentView";
import axios from "axios";
import Swal from "sweetalert2";

const userToken = JSON.parse(localStorage.getItem("userTkn"));

export default {
  name: "MessageView",
  components: {
    BarUpInside,
    FooterView,
    CommentView,
    CommentForm,
  },

  data() {
    return {
      user: {},
      article: {},
      loading: false,
      comments: [],
    };
  },

  mounted() {
    this.loading = true;

    axios
      .get(
        "http://localhost:3000/api/articles/" + this.$route.params.articleId,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      )
      .then((response) => {
        this.article = response.data;
        this.loading = false;

        console.log(this.article);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });

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

    axios
      .get(
        "http://localhost:3000/api/articles/" +
          this.$route.params.articleId +
          "/comments",
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      )
      .then((response) => {
        this.comments = response.data;
        this.loading = false;

        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  },

  methods: {
    //permet de définir des fonctions auxquelles l'application aura accès
    updateComment(comment) {
      this.comments.unshift(comment); // unshift permet de d'ajouter le commentaire en tête de liste.
    },

    cancel() {
      //A terminer
    },

    deleteArticle() {
      axios
        .delete(
          "http://localhost:3000/api/articles/" + this.$route.params.articleId,
          {
            headers: {
              Authorization: `Bearer ${userToken}`,
            },
          }
        )
        .then((response) => {
          if (response.status == 200) {
            Swal.fire("Article supprimé !");
          }
          this.$router.replace({
            name: "actualityWall",
            params: { message: "Article supprimé avec succès ! " },
          });
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style scoped>
.noComment {
  text-align: center;
  margin: 20px 0px;
}

.margin {
  margin-right: 30px;
}

.v-application a {
  text-decoration: none;
}

.titleArt {
  color: rgb(199, 61, 61);
  font-size: larger;
}

.ArtColor {
  color: rgb(13, 14, 14) !important;
  font-size: larger;
}

.end {
  text-align: end;
  font-size: xx-small;
}
</style>
