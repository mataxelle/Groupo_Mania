<template>
  <v-container>
    <BarUpInside />

    <v-container>
      <v-main>
        <div>
          <h1 class="titreMur">Bonjour {{ user.firstName }}</h1>
          <h3 class="titreMur">Messages du mur</h3>
        </div>

        <div>
          <v-row>
            <v-col class="col-sm-12 col-md-10 offset-md-1">
              <v-card>
                <v-img height="350" src="@/assets/salaries.png"></v-img>
                <v-card-title>Quoi de neuf ?</v-card-title>
                <v-card-text>Une envie de poster un message ?</v-card-text>
                <v-divider class="mx-4"></v-divider>
                <v-card-actions>
                  <v-btn color="purple lighten-2">
                    <router-link to="/createMessage" class="color"
                      >C'est par ici</router-link
                    >
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
        </div>

        <div class="ifMessage" v-if="articles.length <= 0">
          Aucune publication disponible !
        </div>

        <div v-if="articles.length > 0">
          <div class="ifArticle">Les publications disponibles !</div>

          <v-row>
            <v-col class="col-sm-12 col-md-10 offset-md-1">
              <v-card
                v-for="article in articles"
                :key="article.id"
                :article="article"
              >
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title class="mb-2 text-body-2">
                      Titre :
                      <router-link
                        :to="{
                          name: 'message',
                          params: { articleId: article.id },
                        }"
                      >
                        <span class="size">{{ article.title }}</span>
                      </router-link>
                    </v-list-item-title>
                    <v-list-item-subtitle>
                      <v-icon small>mdi-account-circle</v-icon>
                      {{ article.user.firstName }}
                    </v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>

                <v-divider></v-divider>

                <v-img src alt></v-img>

                <v-card-text>
                  <span class="size-message">{{ article.text }}</span>
                </v-card-text>

                <v-card-text class="x-small"
                  >Publié le : {{ article.createdAt }}
                </v-card-text>

                <v-divider class="mb-3"></v-divider>

                <v-row class="align-center mx-3">
                  <v-col class="text-caption text-sm-body-1">
                    <router-link
                      class="align-center mx-3"
                      small
                      text
                      color="blue"
                      :to="{
                        name: 'message',
                        params: { articleId: article.id },
                      }"
                      >Commentaires</router-link
                    >
                  </v-col>
                  <v-col class="">
                    <v-row justify="end" class="mr-md-3">
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
                            <v-icon>mdi-thumb-up</v-icon>
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
                            <v-icon>mdi-thumb-down</v-icon>
                          </v-btn>
                        </template>
                        <span>J'aime pas</span>
                      </v-tooltip>
                    </v-row>
                  </v-col>
                </v-row>
              </v-card>
            </v-col>
          </v-row>
        </div>
      </v-main>
    </v-container>
  </v-container>
</template>

<script>
import BarUpInside from "@/layouts/BarUpInside";
//import FooterView from "@/layouts/FooterView";
import axios from "axios";

const userToken = JSON.parse(localStorage.getItem("userTkn"));
//const userId = JSON.parse(localStorage.getItem("userId"));
//const articleId = JSON.parse(localStorage.getItem("articleId"));

export default {
  name: "ActualityWall",
  components: {
    BarUpInside,
    //FooterView
  },

  data: () => {
    //stocke les données afin de pouvoir les réutiliser via la syntaxe en moustache.
    return {
      user: {},
      articles: {},
    };
  },

  mounted() {
    //représente le moment durant lequel le composant va être rendu sur la page
    axios
      .get("http://localhost:3000/api/articles", {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      })
      .then((response) => {
        this.articles = response.data;
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
  },
};
</script>

<style scoped>
h1,
h3 {
  text-align: center;
  color: rgb(240, 196, 0);
}

h3 {
  margin: 40px 0 40px 0;
}

.v-image {
  background-color: #e3d6ee;
}

.v-card {
  margin: 80px 0 80px 0;
}

.v-list-item__title,
.v-card__text {
  color: rgb(2, 0, 0) !important;
}

.v-list-item__title {
  white-space: normal;
}

.v-application a {
  text-decoration: none;
}

.size {
  color: rgb(199, 61, 61);
  font-size: larger;
}

.size-message {
  font-size: medium;
}

.x-small {
  font-size: xx-small;
  text-align: end;
}

.ifArticle {
  text-align: center;
  margin: 50px 0px;
}

.color {
  text-decoration: none;
  color: white;
}

.com {
  text-decoration: none;
}

.margin {
  margin-right: 30px;
}
</style>
