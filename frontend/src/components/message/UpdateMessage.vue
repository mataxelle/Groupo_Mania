<template>
  <v-container>
    <BarUpInside />

    <h1>Modifier votre message</h1>

    <v-card class="card-space">
      <v-form ref="form" @submit.prevent="msgForm" v-model="isValid">
        <div class="space">
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>
                <v-text-field
                  outlined
                  v-model="title"
                  label="Titre"
                  type="text"
                ></v-text-field>
              </v-list-item-title>
              <v-list-item-subtitle
                >De : {{ user.firstName }}</v-list-item-subtitle
              >
            </v-list-item-content>
          </v-list-item>
        </div>

        <div class="space">
          <v-file-input
            label="File input"
            prepend-icon="mdi-camera"
            outlined
            dense
          ></v-file-input>
        </div>

        <div class="space">
          <v-textarea
            outlined
            v-model="text"
            label="Mon message"
            type="text"
          ></v-textarea>
        </div>

        <div class="space">
          <v-btn text color="green accent-4" type="submit" value="submit"
            >Poster</v-btn
          >
          <v-btn text color="red accent-4" @click="clear">Annuler</v-btn>
        </div>
      </v-form>
    </v-card>

    <FooterView />
  </v-container>
</template>

<script>
import BarUpInside from "@/layouts/BarUpInside";
import FooterView from "@/layouts/FooterView";
import axios from "axios";
import Swal from "sweetalert2";

const userToken = JSON.parse(localStorage.getItem("userTkn"));

export default {
  name: "UpdateMessage",
  components: {
    BarUpInside,
    FooterView,
  },

  data() {
    return {
      title: "",
      text: "",
      user: {},
      isValid: true,
    };
  },

  mounted() {
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
        this.title = response.data.title;
        this.text = response.data.text;
        this.loading = false;
      })
      .catch((error) => {
        console.log(error);
      });
  },

  methods: {
    msgForm(e) {
      e.preventDefault();

      if (this.title == null || this.text == null) {
        return false;
      }

      const allContent = {
        title: this.title,
        text: this.text,
      };

      axios
        .put(
          "http://localhost:3000/api/articles/" + this.$route.params.articleId,
          allContent,
          {
            headers: {
              Authorization: `Bearer ${userToken}`,
            },
          }
        )
        .then((response) => {
          localStorage.setItem(
            "allContent",
            JSON.stringify(response.data.allContent)
          );
          localStorage.setItem("articleId", JSON.stringify(response.data.id));
          Swal.fire("Article modifiée !");
          this.$router.replace({
            name: "actualityWall",
            params: { message: response.data.success },
          });
        })
        .catch((error) => {
          console.log(error);
        });
    },

    clear() {
      this.$refs.form.reset();
    },
  },
};
</script>

<style scoped>
h1 {
  text-align: center;
}

.card-space {
  margin: 40px 0px;
}

.space {
  margin: 30px 40px;
}
</style>
