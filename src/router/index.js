import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import About from "@/views/About";
import Leaders from "@/views/Leaders";
import Cowards from "@/views/Cowards";
import Timemachine from "@/views/Timemachine";
import Wallet from "@/views/Wallet";
import npgoress from 'nprogress';
import GolfScore from "@/views/GolfScore";
import ArenaScore from "@/views/ArenaScore";
import ScarSupply from "@/views/ScarSupply";
import SymbolCounts from "@/views/SymbolCounts";

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
  {
    path: '/timemachine',
    name: 'Timemachine',
    component: Timemachine
  },
  {
    path: '/golf-score',
    name: 'GolfScores',
    component: GolfScore
  },
  {
    path: '/arena-score',
    name: 'ArenaScores',
    component: ArenaScore
  },
  {
    path: '/scar-supply',
    name: 'ScarSupply',
    component: ScarSupply
  },
  {
    path: '/symbols',
    name: 'SymbolCounts',
    component: SymbolCounts
  }
]

const router = new VueRouter({
  base: process.env.BASE_URL,
  routes
});

router.beforeResolve((to, from, next) => {
  // If this isn't an initial page load.
  if (to.name) {
    // Start the route progress bar.
    npgoress.start()
  }
  next()
})

router.afterEach((to, from) => {
  // Complete the animation of the route progress bar.
  npgoress.done()
})


export default router
