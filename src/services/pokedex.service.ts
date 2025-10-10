import { http } from './Http';
import type { AxiosResponse } from 'axios';

interface PokemonListItem {
	name: string;
	url: string;
}

interface PokemonListResponse {
	count: number;
	next: string | null;
	previous: string | null;
	results: PokemonListItem[];
}

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

interface Pokemon {
	id: number;
	name: string;
	height: number;
	weight: number;
	sprites: PokemonSprites;
	types: PokemonType[];
}

export default {
	// Listar pokémon con offset
	list(limit = 20, offset = 0): Promise<AxiosResponse<PokemonListResponse>> {
		return http().get(`/v2/pokemon?limit=${limit}&offset=${offset}`);
	},

	// Obtener un pokémon por ID o nombre
	show(idOrName: number | string): Promise<AxiosResponse<Pokemon>> {
		return http().get(`/v2/pokemon/${idOrName}`);
	},
};
