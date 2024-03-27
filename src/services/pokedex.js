import Pokemon from "../clases/pokemon.js";

const BASE_URL = 'https://pokeapi.co/api/v2/';

async function getPokemonList(offset = 0, limit = 30) {
    const response = await fetch(`${BASE_URL}pokemon?offset=${offset}&limit=${limit}`);
    const data = await response.json();
    
    const pokemonList = data.results.map(pokemonData => {
        return new Pokemon(pokemonData.name);
    });
    return pokemonList;
  
}

async function getPokemonDetails(name) {
    const response = await fetch(`${BASE_URL}pokemon/${name}`);
    const data = await response.json();
    
    const pokemon = new Pokemon(
        data.name,
        data.sprites,
        data.base_experiencie,
        data.weight,
        data.height

    );
    return pokemon;
}

export { getPokemonList, getPokemonDetails };
