import axios from "axios";

export default {
  async getPokemons() {
    try {
      const response = await axios.get("https://pokeapi.co/api/v2/pokemon");
      return response.data.results;
    } catch (error) {
      console.log(error);
    }
  },
  async getPokemonDetail(name) {
    try {
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
      const types = response.data.types.map((type) => type.type.name); // Obtener el tipo de pokemon
      return { ...response.data, types }; // Retornar los detalles del Pokémon junto con los tipos
    } catch (error) {
      console.log(error);
    }
  },
  async getPokemonAbilities(pokemon) {
    try {
      const abilitiesUrls = pokemon.abilities.map((ability) => ability.url);
      const responses = await Promise.all(abilitiesUrls.map((url) => axios.get(url))); //promesa que se resuelve con un array de habilidades del pokemon
      return responses.map((response) => response.data); // Retorna las habilidades del pokemon
    } catch (error) {
      console.log(error);
    }
  },
  async getRandomPokemon() {
    const response = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=5");
    const randomIndex = Math.floor(Math.random() * response.data.results.length);
    const randomPokemon = response.data.results[randomIndex];
    return randomPokemon;
  },
  async getPokemonImage(name) {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
    return response.data.sprites.front_default;
  },
  async getPokemonList(start, end) {
    let gottenPokemons = [];
    for (let i = start; i <= end; i++) {
      const itemPokemon = await axios.get(`https://pokeapi.co/api/v2/pokemon/${i}`);
      const addedPokemon = {
        id: itemPokemon.data.id,
        name: itemPokemon.data.name,
        image: itemPokemon.data.sprites.other.dream_world.front_default
      };
      gottenPokemons.push(addedPokemon);
    }
    return gottenPokemons;
  }
};
