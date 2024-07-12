import Vue from "vue";
import VueRouter from "vue-router";
import Swal from "sweetalert2";

import HomeView from "../components/HomeView";
import LoginView from "../components/user/LoginView";
import SignUp from "../components/user/SignUp";
import ProfilView from "../components/user/ProfilView";
import UpdateProfil from "../components/user/UpdateProfil";
import AdminBoard from "../components/admin/AdminBoard";
import ActualityWall from "../components/message/ActualityWall";
import CreateMessage from "../components/message/CreateMessage";
import MessageView from "../components/message/MessageView";
import UpdateMessage from "../components/message/UpdateMessage";
import CommentView from "../components/comment/CommentView";
import CommentForm from "../components/comment/CommentForm";
import AboutView from "../components/AboutView";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "*",
    name: "*",
    component: HomeView,
  },
  {
    path: "/login",
    name: "login",
    component: LoginView,
  },
  {
    path: "/signup",
    name: "signup",
    component: SignUp,
  },
  {
    path: "/profil",
    name: "profil",
    component: ProfilView,
    beforeEnter: (to, from, next) => {
      if (localStorage.getItem("userTkn") == null) {
        next({ name: "home" });
        Swal.fire("Accès interdit !");
      } else {
        next();
      }
      next();
    },
  },
  {
    path: "/updateProfil",
    name: "updateProfil",
    component: UpdateProfil,
    beforeEnter: (to, from, next) => {
      if (localStorage.getItem("userTkn") == null) {
        next({ name: "home" });
        Swal.fire("Accès interdit !");
      } else {
        next();
      }
      next();
    },
  },
  {
    path: "/adminBoard",
    name: "adminBoard",
    component: AdminBoard,
    beforeEnter: (to, from, next) => {
      if (localStorage.getItem("userTkn") == null) {
        next({ name: "home" });
        Swal.fire("Accès interdit !");
      } else {
        next();
      }
      next();
    },
  },
  {
    path: "/actualityWall",
    name: "actualityWall",
    component: ActualityWall,
    beforeEnter: (to, from, next) => {
      if (localStorage.getItem("userTkn") == null) {
        next({ name: "home" });
        Swal.fire("Accès interdit !");
      } else {
        next();
      }
      next();
    },
  },
  {
    path: "/createMessage",
    name: "createMessage",
    component: CreateMessage,
    beforeEnter: (to, from, next) => {
      if (localStorage.getItem("userTkn") == null) {
        next({ name: "home" });
        Swal.fire("Accès interdit !");
      } else {
        next();
      }
      next();
    },
  },
  {
    path: "/message/:articleId",
    name: "message",
    component: MessageView,
    beforeEnter: (to, from, next) => {
      if (localStorage.getItem("userTkn") == null) {
        next({ name: "home" });
        Swal.fire("Accès interdit !");
      } else {
        next();
      }
      next();
    },
  },
  {
    path: "/updateMessage/:articleId",
    name: "updateMessage",
    component: UpdateMessage,
    beforeEnter: (to, from, next) => {
      if (localStorage.getItem("userTkn") == null) {
        next({ name: "home" });
        Swal.fire("Accès interdit !");
      } else {
        next();
      }
      next();
    },
  },
  {
    path: "/comment",
    name: "comment",
    component: CommentView,
    beforeEnter: (to, from, next) => {
      if (localStorage.getItem("userTkn") == null) {
        next({ name: "home" });
        Swal.fire("Accès interdit !");
      } else {
        next();
      }
      next();
    },
  },
  {
    path: "/commentForm",
    name: "commentForm",
    component: CommentForm,
    beforeEnter: (to, from, next) => {
      if (localStorage.getItem("userTkn") == null) {
        next({ name: "home" });
        Swal.fire("Accès interdit !");
      } else {
        next();
      }
      next();
    },
  },
  {
    path: "/about",
    name: "about",
    component: AboutView,
    beforeEnter: (to, from, next) => {
      if (localStorage.getItem("userTkn") == null) {
        next({ name: "home" });
        Swal.fire("Accès interdit !");
      } else {
        next();
      }
      next();
    },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
