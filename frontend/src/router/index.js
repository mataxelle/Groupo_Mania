import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '../components/Home'
import Login from '../components/Login'
import SignUp from '../components/SignUp'
import Profil from '../components/Profil'
import ActualityWall from '../components/ActualityWall'
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
    path:'/actualityWall',
    name: 'actualityWall',
    component: ActualityWall
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
