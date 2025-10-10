import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

const STORAGE_KEY = 'pokemon-favorites'; // Clave para localStorage

// Store para manejar favoritos
export const useFavoritesStore = defineStore('favorites', () => {
	const favoriteIds = ref<number[]>([]);

	// Cargar desde localStorage al iniciar
	const loadFromStorage = (): void => {
		const stored = localStorage.getItem(STORAGE_KEY);
		if (stored) {
			try {
				const parsed = JSON.parse(stored);
				favoriteIds.value = Array.isArray(parsed) ? parsed : [];
			} catch (error) {
				console.error('Error loading favorites:', error);
				favoriteIds.value = [];
			}
		}
	};

	// Persistir en localStorage
	const saveToStorage = (): void => {
		localStorage.setItem(STORAGE_KEY, JSON.stringify(favoriteIds.value));
	};

	// Agregar favorito
	const addFavorite = (id: number): void => {
		if (!favoriteIds.value.includes(id)) {
			favoriteIds.value.push(id);
			saveToStorage();
		}
	};

	// Remover favorito
	const removeFavorite = (id: number): void => {
		const index = favoriteIds.value.indexOf(id);
		if (index > -1) {
			favoriteIds.value.splice(index, 1);
			saveToStorage();
		}
	};

	// Toggle favorito
	const toggleFavorite = (id: number): void => {
		if (isFavorite(id)) {
			removeFavorite(id);
		} else {
			addFavorite(id);
		}
	};

	// Verificar si es favorito
	const isFavorite = (id: number): boolean => {
		return favoriteIds.value.includes(id);
	};

	// Limpiar todos los favoritos
	const clearFavorites = (): void => {
		favoriteIds.value = [];
		saveToStorage();
	};

	// Computed
	const favoritesCount = computed(() => favoriteIds.value.length);
	const hasFavorites = computed(() => favoriteIds.value.length > 0);

	// Inicializar al crear el store
	loadFromStorage();

	return {
		favoriteIds,
		favoritesCount,
		hasFavorites,
		addFavorite,
		removeFavorite,
		toggleFavorite,
		isFavorite,
		clearFavorites,
	};
});
