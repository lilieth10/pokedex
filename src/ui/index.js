
// console.log(window.location.href);
// Importar las funciones del servicio
// Importar las funciones del servicio
import { getPokemonList, getPokemonDetails } from '../services/pokedex.js';
import { avanzarPagina, retrocederPagina } from '../ui/paginado.js';

let currentPage = 1;
const limit = 10;

async function showPokemonList(offset) {
    console.log("Mostrando lista de Pokémon...");
    const pokemonList = await getPokemonList(offset, limit);
    const pokemonContainer = document.getElementById('pokemones');

    pokemonContainer.innerHTML = '';

    pokemonList.forEach(async pokemon => {
        const pokemonElement = document.createElement('div');
        pokemonElement.textContent = pokemon.name;
        pokemonElement.addEventListener('click', async () => {
            const pokemonDetails = await getPokemonDetails(pokemon.name);
            showPokemonDetails(pokemonDetails);
        });
        pokemonContainer.appendChild(pokemonElement);
    });

    // Actualizar el número de página actual en la interfaz
    document.getElementById('pagina-actual').textContent = `Página ${currentPage}`;
}

async function showPokemonDetails(pokemonDetails) {
    const detailContainer = document.getElementById('detalle');
    detailContainer.innerHTML = ''; // Limpiar los detalles anteriores

    // Crear elementos HTML para mostrar los detalles del Pokémon
    const detailImage = document.createElement('img');
    detailImage.src = pokemonDetails.sprites.front_default; // Acceder a la propiedad 'sprites' y 'front_default'
    detailImage.alt = pokemonDetails.name;
    detailContainer.appendChild(detailImage);

    // Mostrar otros detalles como nombre, experiencia, peso, altura, etc.
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
    detailHeight.textContent = `Altura: ${pokemonDetails.height / 10} m`; // Convertir la altura a metros
    detailContainer.appendChild(detailHeight);
}
let timeout;

document.getElementById('boton-busqueda').addEventListener('click', async () => {
    clearTimeout(timeout); // Limpiar el temporizador si se hace clic en el botón de búsqueda
    const searchValue = document.getElementById('barra-busqueda').value.toLowerCase();

    if (searchValue) {
        const pokemon = await getPokemonDetails(searchValue);
        if (pokemon) {
            showPokemonDetails(pokemon);
            } else {
                alert('¡Pokémon no encontrado!');
            }
        } else {
            // Limpiar los detalles del Pokémon si el campo de búsqueda está vacío
            document.getElementById('detalle').innerHTML = '';
        }
    }, 500); // Espera 500 ms después de que el usuario haya dejado de escribir


document.addEventListener('DOMContentLoaded', () => {
    showPokemonList(0);
});

document.getElementById('btnNext').addEventListener('click', async () => {
    avanzarPagina(() => showPokemonList(currentPage * limit));
    currentPage++;
});

document.getElementById('btnPrev').addEventListener('click', async () => {
    currentPage--;
    retrocederPagina(() => showPokemonList((currentPage - 1) * limit));
});
