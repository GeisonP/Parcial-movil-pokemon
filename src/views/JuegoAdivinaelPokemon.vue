<template>
  <div class="pokemon-game container">
    <div v-if="loading" class="text-center my-5">
      <div class="spinner-border" role="status">
        <span class="sr-only">Cargando...</span>
      </div>
    </div>
    <div v-else>
      <div class="pokemon-silhouette text-center my-4">
        <img :src="pokemonImage" :class="{ silhouette: !revealImage }" class="img-fluid"/>
      </div>
      <div class="options row justify-content-center my-3">
        <div class="col-6 col-md-3 mb-2" v-for="option in options" :key="option">
          <button
            class="btn w-100"
            :class="{
              'btn-primary': !revealImage,
              'btn-success': option === correctAnswer && revealImage,
              'btn-danger': option === selectedOption && option !== correctAnswer
            }"
            @click="checkAnswer(option)"
            :disabled="revealImage"
          >
            {{ option }}
          </button>
        </div>
      </div>
      <div class="message text-center mt-4" v-if="message">
        <p>{{ message }}</p>
        <button class="btn btn-secondary mt-2" @click="resetGame">Reiniciar</button>
      </div>
    </div>
  </div>
</template>

<script>
import pokemonServices from '@/services/PokemonServices.js';

export default {
  data() {
    return {
      pokemon: null,
      options: [],
      pokemonImage: '',
      correctAnswer: '',
      selectedOption: '',
      message: '',
      revealImage: false,
      loading: true,
    };
  },
  methods: {
    async fetchPokemon() {
      this.loading = true;
      const randomIndex = Math.floor(Math.random() * 200) + 1;
      const randomPokemon = await pokemonServices.getPokemonDetail(randomIndex);
      this.correctAnswer = randomPokemon.name;
      this.pokemonImage = randomPokemon.sprites.other['official-artwork'].front_default;
      this.generateOptions(randomPokemon.name);
      this.loading = false;
    },
    async generateOptions(correctName) {
      let options = [correctName];
      while (options.length < 4) {
        const randomIndex = Math.floor(Math.random() * 600) + 1;
        const randomPokemon = await pokemonServices.getPokemonDetail(randomIndex);
        if (!options.includes(randomPokemon.name)) {
          options.push(randomPokemon.name);
        }
      }
      this.options = options.sort(() => Math.random() - 0.5);
    },
    checkAnswer(option) {
      this.selectedOption = option;
      this.revealImage = true;
      if (option === this.correctAnswer) {
        this.message = `¡Felicidades! Has seleccionado el Pokémon correcto: ${this.correctAnswer}`;
      } else {
        this.message = `Incorrecto, la respuesta correcta era: ${this.correctAnswer}`;
      }
    },
    resetGame() {
      this.message = '';
      this.selectedOption = '';
      this.revealImage = false;
      this.fetchPokemon();
    },
  },
  async mounted() {
    await this.fetchPokemon();
  },
};
</script>

<style>
.pokemon-silhouette .silhouette {
  filter: brightness(0%);
  max-width: 300px;
  height: auto;
}
</style>