import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import About from "@/views/About";
import Leaders from "@/views/Leaders";
import Cowards from "@/views/Cowards";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/leaders',
    name: 'Leaders',
    component: Leaders
  },
  {
    path: '/eliminated',
    name: 'Eliminated',
    component: About
  },
  {
    path: '/cowards',
    name: 'Coward',
    component: Cowards
  },
]

const router = new VueRouter({
  base: process.env.BASE_URL,
  routes
})

export default router
