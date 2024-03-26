
const BASE_URL = 'https://pokeapi.co/api/v2/';

async function getPokemonList(offset = 0, limit = 30) {
    const response = await fetch(`${BASE_URL}pokemon?offset=${offset}&limit=${limit}`);
    const data = await response.json();
    return data.results;
  
}

async function getPokemonDetails(name) {
    const response = await fetch(`${BASE_URL}pokemon/${name}`);
    const data = await response.json();
    return data;
}

export { getPokemonList, getPokemonDetails };
