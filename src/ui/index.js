// const url = 'https://pokeapi.co/api/v2/pokemon';

// fetch(url)
//     .then(response => {
//         if (!response.ok) {
//             throw new Error('No se pudo obtener la lista de Pokémon');
//         }
//         return response.json();
//     })
//     .then(data => {
//         data.results.forEach(pokemon => {
//             const pokemonElement = document.createElement('div');
//             pokemonElement.textContent = pokemon.name;
//             document.querySelector('.pokemon-list').appendChild(pokemonElement);

//             // Agregar evento de clic para mostrar detalles del Pokémon
//             pokemonElement.addEventListener('click', function() {
//                 const pokemonUrl = pokemon.url;
//                 fetch(pokemonUrl)
//                     .then(response => {
//                         if (!response.ok) {
//                             throw new Error('No se pudieron obtener los detalles del Pokémon');
//                         }
//                         return response.json();
//                     })
//                     .then(pokemonData => {
//                         // Manejar los detalles del Pokémon aquí
//                         console.log(pokemonData);
//                     })
//                     .catch(error => {
//                         console.error('Error al obtener detalles del Pokémon:', error);
//                     });
//             });
//         });
//     })
//     .catch(error => {
//         console.error('Error:', error);
//     });

// const inputBarraBusqueda = document.getElementById('barra-busqueda');
// const listaBusqueda = document.getElementById('lista-busqueda');

// inputBarraBusqueda.addEventListener('input', function() {
//     const searchTerm = inputBarraBusqueda.value.trim().toLowerCase();

//     listaBusqueda.innerHTML = '';

//     if (searchTerm.length === 0) {
//         return;
//     }

//     fetch(`https://pokeapi.co/api/v2/pokemon/${searchTerm}`)
//         .then(response => {
//             if (!response.ok) {
//                 throw new Error('No se encontraron resultados');
//             }
//             return response.json();
//         })
//         .then(pokemonData => {
//             const pokemonElement = document.createElement('li');
//             pokemonElement.textContent = pokemonData.name;
//             listaBusqueda.appendChild(pokemonElement);

//             pokemonElement.addEventListener('click', function() {
//                 mostrarDetallesPokemon(pokemonData.url);
//             });
//         })
//         .catch(error => {
//             console.error('Error al realizar la búsqueda:', error);
//         });
// });

// function mostrarDetallesPokemon(pokemonUrl) {
//     fetch(pokemonUrl)
//         .then(response => {
//             if (!response.ok) {
//                 throw new Error('No se pudieron obtener los detalles del Pokémon');
//             }
//             return response.json();
//         })
//         .then(pokemonData => {
//             // Obtener el nombre del Pokémon de la propiedad "species"
//             const pokemonName = pokemonData.species.name;
//             console.log('Nombre del Pokémon:', pokemonName);
    
//             // Aquí puedes agregar el código para mostrar los detalles del Pokémon en la interfaz de usuario
//         })
//         .catch(error => {
//             console.error('Error al obtener detalles del Pokémon:', error);
//         });
// }
// ui.js
// console.log(window.location.href);
// Importar las funciones del servicio
import { getPokemonList, getPokemonDetails } from '../services/pokedex.js';

/// En tu archivo index.js

// Función para mostrar la lista de Pokémon
async function showPokemonList() {
    const pokemonList = await getPokemonList();
    const pokemonContainer = document.getElementById('pokemones');
    
    // Limpiar el contenido del contenedor
    pokemonContainer.innerHTML = '';

    // Iterar sobre la lista de Pokémon y agregarlos al contenedor
    pokemonList.forEach(pokemon => {
        const pokemonElement = document.createElement('div');
        pokemonElement.textContent = pokemon.name;
        pokemonContainer.appendChild(pokemonElement);
    });
}

// Llamar a la función para mostrar la lista de Pokémon cuando se cargue la página
document.addEventListener('DOMContentLoaded', () => {
    showPokemonList();
});


// Función para mostrar los detalles de un Pokémon
async function showPokemonDetails(pokemonName) {
    const pokemonDetails = await getPokemonDetails(pokemonName);
    // Lógica para mostrar los detalles de un Pokémon en la interfaz
    console.log(pokemonDetails);
}

// Llamar a la función para mostrar la lista de Pokémon cuando se cargue la página
document.addEventListener('DOMContentLoaded', () => {
    showPokemonList();
});
