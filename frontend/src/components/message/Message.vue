<template>
  <v-container>
    <BarUpInside />

    <v-card>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title>Titre : {{ article.titre }}</v-list-item-title>
          <v-list-item-subtitle>De : {{ user.frstName }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-img></v-img>

      <v-card-text></v-card-text>

      <v-card-text>Fait le : {{ article.createdAt }} </v-card-text>

      <v-row class="align-center mx-3">
        <v-col>
          <v-btn class="align-center mx-3" small text color="blue">Poster un commentaire</v-btn>
        </v-col>
        <v-col>
          <v-row justify="end" class="margin">
            <v-tooltip top>
              <template v-slot:activator="{ on, attrs }">
                <v-btn v-bind="attrs" v-on="on" class="ma-2" text icon color="blue">
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
                <v-btn v-bind="attrs" v-on="on" class="ma-2" text icon color="red">
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

    <div class="noComment" v-if="comments.length <= 0">Aucun commentaire disponible !</div>

    <!--  v-for="comment in comments" :key="comment" :comment="message" -->
    <Comment v-for="comment in comments" :key="comment" :comment="message" />

    <!-- v-on:commented="updateComment" -->
    <CommentForm />

    <Footer />
  </v-container>
</template>

<script>
import BarUpInside from "@/layouts/BarUpInside";
import Footer from "@/layouts/Footer";
import CommentForm from "../comment/CommentForm";
import Comment from "../comment/Comment";
import axios from "axios";
//import Swal from "sweetalert2";

export default {
  name: "Message",
  components: {
    BarUpInside,
    Footer,
    Comment,
    CommentForm
  },

  data() {
    return {
      user: {},
      article: {},
      loading: false,
      comments: {}
    };
  },

  created () {
    this.loading = true;

    axios.get("http://localhost:3000/api/articles/")
      .then(response => {
        this.comments = response.data;
        this.loading = false;
      })
      .catch()
  },

  methods: {
    updateComment (comment) {
      this.comments.push(comment);
    }
  }
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
</style>