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
/// <reference types="jquery" />

function obtenerPokemones(offset = '0', limit = '11') {
    const URL = 'https://pokeapi.co/api/v2/pokemon';
  
    return fetch(`${URL}?offset=${offset}&limit=${limit}`)
      .then((respuesta) => respuesta.json())
      .then((respuestaJSON) => respuestaJSON.results);
  }
  
  function mostrarListadoPokemones(pokemones) {
    const $lista = document.createElement('div');
    $lista.className = 'list-group';
  
    pokemones.forEach((pokemon) => {
      const nombrePokemon = Object.values(pokemon)[0];
      const $item = document.createElement('a');
      $item.href = '#';
  
      $item.classList.add('list-group-item', 'list-group-item-action');
      $item.textContent = nombrePokemon;
      $item.dataset.base = nombrePokemon; //data-base='bulbasaur'
  
      $item.addEventListener('click', () => {
        const $itemActivo = document.querySelector('.list-group-item.active');
  
        if ($itemActivo) {
          $itemActivo.classList.remove('active');
        }
        $item.classList.add('active');
        actualizar();
      });
      $lista.appendChild($item);
    });
    document.querySelector('#pokemones').appendChild($lista);
  }
  
  function actualizar() {
    ocultarPokebola();
    mostrarCartelActualizacion();
    obtenerDetallePokemonSeleccionado(obtenerPokemonSeleccionado()).then(
      (detallePokemonJSON) =>
        mostrarDetallePokemonSeleccionado(detallePokemonJSON)
    );
  }
  
  function mostrarCartelActualizacion() {
    document.querySelector('#detalle-imagen').innerHTML = 'Cargando...';
  }
  
  function mostrarDetallePokemonSeleccionado(detallePokemonJSON) {
    document.querySelector('#detalle-imagen').innerHTML = '';
    document.querySelector('#detalle').classList.remove('oculto');
  
    const $guardarNombreTitulo = document.querySelector('#nombre');
  
    const $guardarNombre = document.querySelector('#detalle-nombre');
    $guardarNombre.innerHTML = 'Nombre';
  
    const $guardarExperiencia = document.querySelector('#detalle-experiencia');
    $guardarExperiencia.innerHTML = 'Experiencia';
  
    const $guardarPeso = document.querySelector('#detalle-peso');
    $guardarPeso.innerHTML = 'Peso';
  
    const $guardarAltura = document.querySelector('#detalle-altura');
    $guardarAltura.innerHTML = 'Altura';
  
    const $pokemonNombre = detallePokemonJSON.name;
    const $pokemonExperiencia = detallePokemonJSON.base_experience;
    const $pokemonPeso = detallePokemonJSON.weight;
    const $pokemonAltura = detallePokemonJSON.height;
    const $pokemonId = detallePokemonJSON.id;
  
    borrarImagenesPokemon();
    obtenerFotoPokemon($pokemonId);
  
    $guardarNombreTitulo.innerHTML = $pokemonNombre;
    $guardarNombre.innerHTML = `Nombre: ${$pokemonNombre}`;
    $guardarExperiencia.innerHTML = `Experiencia: ${$pokemonExperiencia}`;
    $guardarPeso.innerHTML = `Peso: ${$pokemonPeso} hg.`;
    $guardarAltura.innerHTML = `Altura: ${$pokemonAltura} dc.`;
  }
  
  function borrarImagenesPokemon() {
    const $imagenesPokemon = document.querySelectorAll('img');
  
    if ($imagenesPokemon) {
      $imagenesPokemon.forEach((imagen) => {
        imagen.src = ''; //imagen.style.display = 'none';
      });
    }
  }
  
  function obtenerFotoPokemon(idPokemon) {
    const $guardarImagen = document.querySelector('#detalle-imagen');
  
    const $fotoPokemon = document.createElement('img');
    $fotoPokemon.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${idPokemon}.png`;
  
    $guardarImagen.appendChild($fotoPokemon);
  }
  
  function obtenerDetallePokemonSeleccionado(nombrePokemon) {
    const URL = 'https://pokeapi.co/api/v2/pokemon';
    return fetch(`${URL}/${nombrePokemon}`).then((detallePokemon) =>
      detallePokemon.json()
    );
  }
  
  function obtenerPokemonSeleccionado() {
    const $activeItem = document.querySelector('.list-group-item.active');
    if ($activeItem) {
      return $activeItem.dataset.base; //nombre
    }
  }
  
  function iniciar(offsetIniciar = '0') {
    obtenerPokemones((offset = offsetIniciar)).then((pokemon) =>
      mostrarListadoPokemones(pokemon)
    );
  }
  
  iniciar(0);
  let paginaActual = 1;
  
  const $siguiente = document.querySelector('#siguiente');
  $siguiente.addEventListener('click', avanzarPagina);
  
  const $anterior = document.querySelector('#atras');
  $anterior.addEventListener('click', retrocederPagina);
  
  function avanzarPagina() {
    const POKEMONES_POR_PAGINA = 11;
    const ULTIMA_PAGINA = 119;
    const CANTIDAD_PAGINA_A_AVANZAR = 1;
    const offsetSiguiente = paginaActual * POKEMONES_POR_PAGINA;
  
    if (paginaActual < ULTIMA_PAGINA) {
      limpiarListaPokemones();
      iniciar(offsetSiguiente);
      paginaActual = paginaActual + CANTIDAD_PAGINA_A_AVANZAR;
    }
  }
  
  function retrocederPagina() {
    const POKEMONES_POR_PAGINA = 11;
    const ULTIMA_PAGINA = 1;
    const CANTIDAD_PAGINA_A_RETROCEDER = 1;
    const CANTIDAD_OFFSET_A_RETROCEDER = 2;
  
    const offsetAnterior =
      (paginaActual - CANTIDAD_OFFSET_A_RETROCEDER) * POKEMONES_POR_PAGINA;
  
    if (paginaActual > ULTIMA_PAGINA) {
      limpiarListaPokemones();
      iniciar(offsetAnterior);
      paginaActual = paginaActual - CANTIDAD_PAGINA_A_RETROCEDER;
    }
  }
  
  function limpiarListaPokemones() {
    document.querySelector('#pokemones').textContent = '';
  }
  
  function ocultarPokebola() {
    document.querySelector('#pokebola').classList.add('oculto');
  }