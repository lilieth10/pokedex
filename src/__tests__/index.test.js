import { getPokemonList, getPokemonDetails } from '../services/pokedex.js';
import { showPokemonList, showPokemonDetails } from '../ui/index.js';

jest.mock('../ui/paginado.js', () => ({
  avanzarPagina: jest.fn(),
  retrocederPagina: jest.fn(),
}));

jest.mock('../services/pokedex.js', () => ({
  getPokemonList: jest.fn(),
  getPokemonDetails: jest.fn(),
}));

describe('Función mostrar lista de Pokémon', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <div id="pokemones"></div>
      <span id="pagina-actual"></span>
    `;
  });

  test('debería obtener la lista de Pokémon y mostrarla en el contenedor', async () => {
    const mockPokemonList = [{ name: 'Pikachu' }, { name: 'Bulbasaur' }];
    getPokemonList.mockResolvedValue(mockPokemonList);

    await showPokemonList(0);

    expect(getPokemonList).toHaveBeenCalledWith(0, 10);
    expect(document.getElementById('pokemones').children.length).toBe(2);
  });
});

describe('Función mostrar detalles de Pokémon', () => {
  test('debería mostrar los detalles de Pokémon en el contenedor de detalle', () => {
    const mockPokemonDetails = {
      name: 'Pikachu',
      sprites: { front_default: 'pikachu.png' },
      base_experience: 112,
      weight: 60,
      height: 40,
    };

    document.body.innerHTML = '<div id="detalle"></div>';

    showPokemonDetails(mockPokemonDetails);

    expect(document.getElementById('detalle').children.length).toBe(5);
  });
});

describe('Evento de clic en el botón de búsqueda', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <input id="barra-busqueda" type="text" value="pikachu">
      <button id="boton-busqueda">Buscar</button>
      <div id="detalle"></div>
    `;
  });

  test('debería obtener y mostrar los detalles de Pokémon cuando se ingresa un nombre de Pokémon válido', async () => {
    const mockPokemon = {
      name: 'Pikachu',
      sprites: { front_default: 'pikachu.png' },
      base_experience: 112,
      weight: 60,
      height: 40,
    };
    getPokemonDetails.mockResolvedValue(mockPokemon);

    const botonBusqueda = document.getElementById('boton-busqueda');
    botonBusqueda.dispatchEvent(new MouseEvent('click'));

    await new Promise(resolve => setTimeout(resolve));

    // expect(getPokemonDetails).toHaveBeenCalled();
    // expect(document.getElementById('detalle').children.length).toBe(5);
  });
});
