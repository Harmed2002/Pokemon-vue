import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import pokedexService from '@/services/pokedex.service';

interface PokemonSprites {
	front_default: string;
	other?: {
		'official-artwork'?: {
			front_default: string;
		};
	};
}

interface PokemonType {
	slot: number;
	type: {
		name: string;
		url: string;
	};
}

export interface Pokemon {
	id: number;
	name: string;
	height: number;
	weight: number;
	sprites: PokemonSprites;
	types: PokemonType[];
}

export const usePokemonStore = defineStore('pokemon', () => {
	const pokemons = ref<Pokemon[]>([]);
	const totalCount = ref(0);
	const currentOffset = ref(0);
	const isLoading = ref(false);
	const isLoadingMore = ref(false);
	const isInitialLoadComplete = ref(false);
	const hasError = ref(false);
	const errorMessage = ref('');

	const LIMIT = 10;

	const hasMore = computed(() => pokemons.value.length < totalCount.value);

	// Extrae el ID del URL del pokémon
	const extractIdFromUrl = (url: string): number => {
		const matches = url.match(/\/(\d+)\/$/);
		return matches && matches[1] !== undefined ? parseInt(matches[1]) : 0;
	};

	// Agrega pokémon sin duplicar
	const addPokemonToCache = (pokemon: Pokemon): void => {
		const exists = pokemons.value.some((p) => p.id === pokemon.id);
		if (!exists) {
			pokemons.value.push(pokemon);
		}
	};

	// Cargamos los pokemones con offset
	const loadPokemons = async (limit: number, offset: number, isInitial = false,): Promise<void> => {
		if (isInitial) {
			isLoading.value = true;

		} else {
			isLoadingMore.value = true;
		}

		hasError.value = false;
		errorMessage.value = '';

		try {
			const response = await pokedexService.list(limit, offset);
			const data = response.data;

			totalCount.value = data.count;

			// Cargamos detalles de cada pokémon en paralelo
			const pokemonDetails = await Promise.all(
				data.results.map(async (item: { name: string; url: string }) => {
					try {
						const id = extractIdFromUrl(item.url);

						// Verificamos si ya existe en caché
						const existing = pokemons.value.find((p) => p.id === id);
						if (existing) return existing;

						const detailResponse = await pokedexService.show(id);
						return detailResponse.data as Pokemon;

					} catch (error) {
						console.error(`Error loading pokemon ${item.name}:`, error);
						return null;
					}
				}),
			);

			// Se filtran nulls y se agregan a la lista sin duplicados
			const validPokemons = pokemonDetails.filter((p): p is Pokemon => p !== null);
			// pokemons.value.push(...validPokemons);
			validPokemons.forEach((pokemon) => {
				addPokemonToCache(pokemon);
			});

			currentOffset.value = offset + limit;

		} catch (error) {
			hasError.value = true;
			errorMessage.value = error instanceof Error ? error.message : 'Failed to load pokemon';
			throw error;

		} finally {
			isLoading.value = false;
			isLoadingMore.value = false;
		}
	};

	// Cargamos el lote inicial (primeros 10)
	const loadInitialBatch = async (): Promise<void> => {
		await loadPokemons(LIMIT, 0, true);
		isInitialLoadComplete.value = true;
	};

	// Cargamos siguiente lote (infinite scroll)
	const loadMore = async (): Promise<void> => {
		if (!hasMore.value || isLoadingMore.value) return;
		await loadPokemons(LIMIT, currentOffset.value, false);
	};

	// Búsqueda por nombre
	const searchByName = async (name: string): Promise<Pokemon | null> => {
		if (!name.trim()) return null;

		try {
			// Se busca en caché primero
			const cached = pokemons.value.find((p) => p.name.toLowerCase() === name.toLowerCase());

			if (cached) return cached;

			// Se busca en API
			const response = await pokedexService.show(name.toLowerCase());
			const pokemon: Pokemon = response.data;

			// Agregamos al caché sin duplicar
			addPokemonToCache(pokemon);

			return pokemon;

		} catch (error) {
			console.error('Pokemon not found:', error);
			return null;
		}
	};

	const loadedCount = computed(() => pokemons.value.length);

	// Obtener pokémon por ID (con caché)
	const getPokemonById = async (id: number): Promise<Pokemon | null> => {
		// Se busca en caché
		const cached = pokemons.value.find((p) => p.id === id);

		if (cached) return cached;

		// Se carga desde la API si no está en caché
		try {
			const response = await pokedexService.show(id);
			const pokemon: Pokemon = response.data;

			// Agregamos al caché sin duplicar
			addPokemonToCache(pokemon);

			// // Agregamos al caché
			// pokemons.value.push(pokemon);

			return pokemon;

		} catch (error) {
			console.error(`Failed to load pokemon ${id}:`, error);
			return null;
		}
	};

	// Función para eliminar duplicados existentes
	const removeDuplicates = (): void => {
		const seen = new Set<number>();
		const unique: Pokemon[] = [];

		for (const pokemon of pokemons.value) {
			if (!seen.has(pokemon.id)) {
				seen.add(pokemon.id);
				unique.push(pokemon);
			}
		}

		pokemons.value = unique;
	};

	return {
		pokemons,
		totalCount,
		loadedCount,
		isLoading,
		isLoadingMore,
		isInitialLoadComplete,
		hasError,
		errorMessage,
		hasMore,
		loadInitialBatch,
		loadMore,
		searchByName,
		getPokemonById,
		removeDuplicates,
	};
}, {
	persist: {
		key: 'pokemon-store',
		storage: localStorage,
		pick: ['pokemons', 'totalCount', 'currentOffset', 'isInitialLoadComplete']
	}
});
