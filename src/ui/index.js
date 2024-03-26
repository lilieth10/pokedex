// index.js
import { getPokemonList, getPokemonDetails } from '../services/pokedex.js';
import { avanzarPagina, retrocederPagina } from '../ui/paginado.js';

let currentPage = 1;
const limit = 10;

async function showPokemonList(offset) {
    const pokemonList = await getPokemonList(offset, limit);
    const pokemonContainer = document.getElementById('pokemones');
    
    pokemonContainer.innerHTML = '';

    pokemonList.forEach(pokemon => {
        const pokemonElement = document.createElement('div');
        pokemonElement.textContent = pokemon.name;
        pokemonElement.addEventListener('click', async () => {
            const pokemonDetails = await getPokemonDetails(pokemon.name);
            showPokemonDetails(pokemonDetails);
        });
        pokemonContainer.appendChild(pokemonElement);
    });

    document.getElementById('pagina-actual').textContent = `Página ${currentPage}`;
}

async function showPokemonDetails(pokemonDetails) {
    const detailContainer = document.getElementById('detalle');
    detailContainer.innerHTML = ''; 

    const detailImage = document.createElement('img');
    detailImage.src = pokemonDetails.sprites.front_default; 
    detailImage.alt = pokemonDetails.name;
    detailContainer.appendChild(detailImage);

    const detailName = document.createElement('div');
    detailName.textContent = `Nombre: ${pokemonDetails.name}`;
    detailContainer.appendChild(detailName);

    const detailExperience = document.createElement('div');
    detailExperience.textContent = `Experiencia: ${pokemonDetails.base_experience}`;
    detailContainer.appendChild(detailExperience);

    const detailWeight = document.createElement('div');
    detailWeight.textContent = `Peso: ${pokemonDetails.weight} kg`;
    detailContainer.appendChild(detailWeight);

    const detailHeight = document.createElement('div');
    detailHeight.textContent = `Altura: ${pokemonDetails.height / 10} m`; 
    detailContainer.appendChild(detailHeight);
}
let timeout;
function setupEventListeners() {
    const botonBusqueda = document.getElementById('boton-busqueda');
    if (botonBusqueda) {
        botonBusqueda.addEventListener('click', async () => {
            clearTimeout(timeout);
            const searchValue = document.getElementById('barra-busqueda').value.toLowerCase();
            if (searchValue) {
                const pokemon = await getPokemonDetails(searchValue);
                if (pokemon) {
                    showPokemonDetails(pokemon);
                } else {
                    alert('¡Pokémon no encontrado!');
                }
            } else {
                document.getElementById('detalle').innerHTML = '';
            }
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    setupEventListeners();
    showPokemonList(0);
});

const btnNext = document.getElementById('btnNext');
if (btnNext) {
    btnNext.addEventListener('click', async () => {
        avanzarPagina(() => showPokemonList(currentPage * limit));
        currentPage++;
    });
}

const btnPrev = document.getElementById('btnPrev');
if (btnPrev) {
    btnPrev.addEventListener('click', async () => {
        currentPage--;
        retrocederPagina(() => showPokemonList((currentPage - 1) * limit));
    });
}
export { showPokemonList, showPokemonDetails  };
