import Vue from 'vue'
import VueRouter from 'vue-router'

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
    component: Profil
  },
  {
    path: '/updateProfil',
    name: 'updateProfil',
    component: UpdateProfil
  },
  {
    path: '/adminBoard',
    name: 'adminBoard',
    component: AdminBoard
  },
  {
    path:'/actualityWall',
    name: 'actualityWall',
    component: ActualityWall
  },
  {
    path:'/createMessage',
    name: 'createMessage',
    component: CreateMessage
  },
  {
    path:'/message',
    name: 'message',
    component: Message
  },
  {
    path:'/updateMessage',
    name: 'updateMessage',
    component: UpdateMessage
  },
  {
    path:'/comment',
    name: 'comment',
    component: Comment
  },
  {
    path:'/commentForm',
    name: 'commentForm',
    component: CommentForm
  },
  {
    path:'/about',
    name: 'about',
    component: About
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router;
