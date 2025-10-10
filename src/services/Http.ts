import axios from 'axios';
import type { AxiosInstance } from 'axios';

const url_base = import.meta.env.VITE_API_POKEMON_URL || 'https://pokeapi.co/api';

export const http = (): AxiosInstance => {
	const api = axios.create({
		baseURL: url_base,
		headers: {
			Accept: 'application/json',
		},
	});

	return api;
};
