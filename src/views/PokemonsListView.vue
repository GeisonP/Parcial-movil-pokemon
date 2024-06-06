<template>
  <div>
    <div class="row">  
      <div class="col d-flex justify-content-center">
        <h3 class="text-primary">Listado de Pokemons</h3>
      </div>
    </div>
    <div class="row p-3 mt-3 mb-3 d-flex justify-content-center">
      <div v-for="pokemon in pokemons" :key="pokemon.name" class="col-sm-10">
        <router-link :to="{ name: 'Pokemon', params: { name: pokemon.name } }">
          <div class="card d-flex justify-content-center align-items-center mb-3">
            <div class="card-title">
              <img :src="pokemon.image" alt="Front sprite" style="width: 180px; height: 180px;">
              <h4>
                {{ pokemon.name }}
              </h4>
            </div>
          </div>
        </router-link>
      </div>
    </div>
    <div class="row">
      <div class="col-md-6">
        <button @click="previousPokemons" :disabled="start <= 1" class="btn btn-primary">Anterior</button>
      </div>
      <div class="col-md-6 text-right">
        <button @click="nextPokemons" :disabled="end >= 465" class="btn btn-primary">Siguiente</button>
      </div>
    </div>
  </div>
</template>

<script>
import PokemonServices from '@/services/PokemonServices'

export default {
  name: "PokemonsListView",
  data() {
    return {
      pokemons: null,
      selectedPokemon: {},
      start: 1,
      end: 10
    };
  },
  async created() {
    this.pokemons = await PokemonServices.getPokemonList(this.start, this.end);
  },
  methods: {
    async chargePokemons() {
      this.pokemons = await PokemonServices.getPokemonList(this.start, this.end);
    },
    previousPokemons() {
      if (this.start >= 1) {
        this.start -= 10;
        this.end -= 10;
        this.chargePokemons();
      }
    },
    nextPokemons() {
      if (this.end <= 465) {
        this.start += 10;
        this.end += 10;
        this.chargePokemons();
      }
    }
  }
}
</script>