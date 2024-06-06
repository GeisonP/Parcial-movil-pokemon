<template>
    <div>
      <div class="row d-flex justify-content-center">
        <div class="col-sm-8">
          <div class="card">
            <div v-if="pokemon">
              <h2>{{ pokemon.name }}</h2>
              <img :src="pokemon?.sprites?.other?.dream_world?.front_default" alt="Front sprite">
            </div>
            <div class="card-body">
            <!-- Mostrar detalles adicionales del pokemon -->
              <h5 class="card-title">{{ pokemon.name }}</h5>
              <p class="card-text">Altura: {{ pokemon.height }}</p>
              <p class="card-text">Peso: {{ pokemon.weight }}</p>
              <p v-if="pokemon.types">Tipo(s): {{ pokemon.types.join(', ') }}</p> <!-- Mostrar tipos de cada pokemon -->
              <p v-if="pokemon.abilities">Habilidades: {{ abilities.join(', ') }}</p> <!-- Mostrar habilidades de cada pokemon -->
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import PokemonServices from '@/services/PokemonServices'
  
  export default {
    name: 'PokemonDetailView',
    data() {
      return {
        pokemon: {},
        abilities: [] // Almacenar las habilidades del pokemon 
      }
    },
    async created() {
      try {
        const name = this.$route.params.name;  // Obtener el nombre del pokemon
        this.pokemon = await PokemonServices.getPokemonDetail(name);  // Obtener detalles del pokemon
        await this.getPokemonAbilities(this.pokemon);  // Obtener habilidades del pokemon
      } catch (error) {
        console.error(error);
      }
    },
    methods: {
     // Método para obtener las habilidades del pokemon
      async getPokemonAbilities(pokemon) {
        try {
          this.abilities = pokemon.abilities.map(ability => ability.ability.name);  // Extraer nombres de habilidades
        } catch (error) {
          console.error(error);
        }
      }
    }
  }
  </script>
  
  <style scoped>
  
  </style>
  