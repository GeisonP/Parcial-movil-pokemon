import { createRouter, createWebHistory } from 'vue-router'
import PokemonsListView from '@/views/PokemonsListView.vue'
import PokemonDetailView from '@/views/PokemonDetailView.vue'
import JuegoAdivinaelPokemon from '@/views/JuegoAdivinaelPokemon.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: PokemonsListView
  },
  {
    path: '/pokemon/:name',
    name: 'Pokemon',
    component: PokemonDetailView
  },
  {
    path: '/juego',
    name: 'juego',
    component: JuegoAdivinaelPokemon
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router

