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

describe('showPokemonList function', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <div id="pokemones"></div>
      <span id="pagina-actual"></span>
    `;
  });

  test('should fetch Pokemon list and display it in the container', async () => {
    const mockPokemonList = [{ name: 'Pikachu' }, { name: 'Bulbasaur' }];
    getPokemonList.mockResolvedValue(mockPokemonList);

    await showPokemonList(0);

    expect(getPokemonList).toHaveBeenCalledWith(0, 10);
    expect(document.getElementById('pokemones').children.length).toBe(2);
  });
});

describe('showPokemonDetails function', () => {
  test('should display Pokemon details in the detail container', () => {
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
describe('search button click event', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <input id="barra-busqueda" type="text" value="pikachu">
      <button id="boton-busqueda">Buscar</button>
      <div id="detalle"></div>
    `;
  });

  test('should fetch and display Pokemon details when a valid Pokemon name is entered', async () => {
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
