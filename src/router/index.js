import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Game from '../views/Game.vue'
import endGame from "../views/endGame.vue"
import lostGame from "../views/lostGame.vue"
import userLoot from "../views/userLoot.vue"






Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/game',
    name: 'Game',
    component: Game
  },
  {
    path: '/endGame',
    name: 'endGame',
    component: endGame
  },
  {
    path: '/lostGame',
    name: 'lostGame',
    component: lostGame
  },
  {
    path: '/userLoot',
    name: 'userLoot',
    component: userLoot
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
