import Vue from 'vue'
import VueRouter from 'vue-router'
import Swal from "sweetalert2"

import Home from '../components/Home'
import Login from '../components/user/Login'
import SignUp from '../components/user/SignUp'
import Profil from '../components/user/Profil'
import UpdateProfil from '../components/user/UpdateProfil'
import AdminBoard from '../components/admin/AdminBoard'
import ActualityWall from '../components/message/ActualityWall'
import CreateMessage from '../components/message/CreateMessage'
import Message from '../components/message/Message'
import UpdateMessage from '../components/message/UpdateMessage'
import Comment from '../components/comment/Comment'
import CommentForm from '../components/comment/CommentForm'
import About from '../components/About'

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '*',
    name: '*',
    component: Home
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/signup',
    name: 'signup',
    component: SignUp
  },
  {
    path: '/profil',
    name: 'profil',
    component: Profil,
    beforeEnter: (to, from, next) => {
      if (localStorage.getItem('userTkn') == null) {
        next({ name: 'home' })
        Swal.fire('Accès interdit !')
      } else {
        next()
      } next()
    }
  },
  {
    path: '/updateProfil',
    name: 'updateProfil',
    component: UpdateProfil,
    beforeEnter: (to, from, next) => {
      if (localStorage.getItem('userTkn') == null) {
        next({ name: 'home' })
        Swal.fire('Accès interdit !')
      } else {
        next()
      } next()
    }
  },
  {
    path: '/adminBoard',
    name: 'adminBoard',
    component: AdminBoard,
    beforeEnter: (to, from, next) => {
      if (localStorage.getItem('userTkn') == null) {
        next({ name: 'home' })
        Swal.fire('Accès interdit !')
      } else {
        next()
      } next()
    }
  },
  {
    path: '/actualityWall',
    name: 'actualityWall',
    component: ActualityWall,
    beforeEnter: (to, from, next) => {
      if (localStorage.getItem('userTkn') == null) {
        next({ name: 'home' })
        Swal.fire('Accès interdit !')
      } else {
        next()
      } next()
    }
  },
  {
    path: '/createMessage',
    name: 'createMessage',
    component: CreateMessage,
    beforeEnter: (to, from, next) => {
      if (localStorage.getItem('userTkn') == null) {
        next({ name: 'home' })
        Swal.fire('Accès interdit !')
      } else {
        next()
      } next()
    }
  },
  {
    path: '/message',
    name: 'message',
    component: Message,
    beforeEnter: (to, from, next) => {
      if (localStorage.getItem('userTkn') == null) {
        next({ name: 'home' })
        Swal.fire('Accès interdit !')
      } else {
        next()
      } next()
    }
  },
  {
    path: '/updateMessage',
    name: 'updateMessage',
    component: UpdateMessage,
    beforeEnter: (to, from, next) => {
      if (localStorage.getItem('userTkn') == null) {
        next({ name: 'home' })
        Swal.fire('Accès interdit !')
      } else {
        next()
      } next()
    }
  },
  {
    path: '/comment',
    name: 'comment',
    component: Comment,
    beforeEnter: (to, from, next) => {
      if (localStorage.getItem('userTkn') == null) {
        next({ name: 'home' })
        Swal.fire('Accès interdit !')
      } else {
        next()
      } next()
    }
  },
  {
    path: '/commentForm',
    name: 'commentForm',
    component: CommentForm,
    beforeEnter: (to, from, next) => {
      if (localStorage.getItem('userTkn') == null) {
        next({ name: 'home' })
        Swal.fire('Accès interdit !')
      } else {
        next()
      } next()
    }
  },
  {
    path: '/about',
    name: 'about',
    component: About,
    beforeEnter: (to, from, next) => {
      if (localStorage.getItem('userTkn') == null) {
        next({ name: 'home' })
        Swal.fire('Accès interdit !')
      } else {
        next()
      } next()
    }
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router;
