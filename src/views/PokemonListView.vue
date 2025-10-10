<template>
	<div class="min-h-screen bg-gray-50 flex items-center justify-center py-8 px-4">
		<div class="w-full max-w-3xl flex flex-col" style="height: 60px; max-height: 80vh; min-height: 400px; width: 570px;">
			<div class="flex-1 bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col">
				<!-- Search -->
				<div class="px-6 py-4 bg-white border-b border-gray-100">
					<div class="relative">
						<svg
							class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
							/>
						</svg>
						<input
							v-model="searchQuery"
							type="text"
							placeholder="Search"
							class="w-full pl-10 pr-4 py-2.5 bg-gray-50 border-0 rounded-[5px] text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:bg-white transition-colors"
						/>
					</div>
				</div>

				<!-- Pokemon list -->
				<div ref="listContainer" class="flex-1 overflow-y-auto">
					<div v-if="hasResults">
						<div
							v-for="pokemon in filteredPokemons"
							:key="pokemon.id"
							class="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-0"
						>
							<!-- Pokemon name (clickable) -->
							<button
								@click="openPokemonDetail(pokemon)"
								class="text-gray-900 font-normal text-base text-left hover:text-red-500 transition-colors"
							>
								{{ formatName(pokemon.name) }}
							</button>

							<!-- Favorite star -->
							<button
								@click.stop="favoritesStore.toggleFavorite(pokemon.id)"
								class="flex-shrink-0"
							>
								<svg
									class="w-6 h-6 transition-all"
									:class="
										favoritesStore.isFavorite(pokemon.id)
											? 'text-yellow-400 fill-current scale-110'
											: 'text-gray-300 fill-current'
									"
									viewBox="0 0 24 24"
								>
									<path
										d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
									/>
								</svg>
							</button>
						</div>
					</div>

					<!-- Loading -->
					<div
						v-if="pokemonStore.isLoadingMore && !showOnlyFavorites && hasResults"
						class="flex justify-center items-center py-6"
					>
						<div
							class="animate-spin rounded-full h-8 w-8 border-3 border-red-500 border-t-transparent"
						></div>
					</div>

					<!-- Empty state -->
					<div
						v-if="showEmptyState"
						class="flex flex-col items-center justify-center h-full px-8 text-center"
					>
						<h2 class="text-3xl font-bold text-gray-800 mb-3">Uh-oh!</h2>
						<p class="text-gray-600 mb-6">You look lost on your journey!</p>
						<button
							@click="resetFilters"
							class="bg-red-500 text-white px-8 py-3 rounded-full font-semibold hover:bg-red-600 transition-colors shadow-md"
						>
							Go back home
						</button>
					</div>
				</div>
			</div>

			<!-- Bottom bar -->
			<div
				v-if="hasResults"
				class="mt-4 bg-white rounded-2xl shadow-lg flex items-center justify-center px-6"
				style="height: 80px"
			>
				<div class="flex gap-4 w-full max-w-md">
					<button
						@click="showOnlyFavorites = false"
						class="flex-1 h-12 rounded-full font-semibold text-sm transition-all flex items-center justify-center gap-2"
						:class="
							!showOnlyFavorites
								? 'bg-red-500 text-white shadow-md'
								: 'bg-gray-200 text-gray-600 hover:bg-gray-300'
						"
					>
						<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M4 6h16M4 10h16M4 14h16M4 18h16"
							/>
						</svg>
						All
					</button>

					<button
						@click="showOnlyFavorites = true"
						class="flex-1 h-12 rounded-full font-semibold text-sm transition-all flex items-center justify-center gap-2"
						:class="
							showOnlyFavorites
								? 'bg-red-500 text-white shadow-md'
								: 'bg-gray-200 text-gray-600 hover:bg-gray-300'
						"
					>
						<svg
							class="w-5 h-5"
							:class="showOnlyFavorites ? 'fill-current' : ''"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
							/>
						</svg>
						Favorites
					</button>
				</div>
			</div>
		</div>
	</div>

	<!-- Modal -->
	<PokemonDetailModal
		:pokemon="selectedPokemon"
		:show="showModal"
		@close="closeModal"
	/>
</template>

<script setup lang="ts">
	import { onMounted, ref, computed } from 'vue';
	import { usePokemonStore } from '@/stores/pokemon.store';
	import { useFavoritesStore } from '@/stores/favorites.store';
	import PokemonDetailModal from '@/components/PokemonDetailModal.vue';
	import type { Pokemon } from '@/stores/pokemon.store';

	const pokemonStore = usePokemonStore();
	const favoritesStore = useFavoritesStore();

	const searchQuery = ref('');
	const showOnlyFavorites = ref(false);
	const listContainer = ref<HTMLElement | null>(null);

	// Modal state
	const selectedPokemon = ref<Pokemon | null>(null);
	const showModal = ref(false);

	const SCROLL_THRESHOLD = 0.8; // Se usa para avanzar la carga cuando se alcanza el 80% del scroll

	const handleScroll = () => {
		if (!listContainer.value || showOnlyFavorites.value) return;

		const { scrollTop, scrollHeight, clientHeight } = listContainer.value;
		const scrollPercentage = (scrollTop + clientHeight) / scrollHeight;

		// Cargar más pokémones cuando se alcanza el umbral
		if (
			scrollPercentage > SCROLL_THRESHOLD &&
			!pokemonStore.isLoadingMore &&
			pokemonStore.hasMore

		) {
			pokemonStore.loadMore();
		}
	};

	const filteredPokemons = computed(() => {
		let filtered = pokemonStore.pokemons;

		if (showOnlyFavorites.value) {
			filtered = filtered.filter((p) => favoritesStore.isFavorite(p.id));
		}

		if (searchQuery.value.trim()) {
			const query = searchQuery.value.toLowerCase();
			filtered = filtered.filter((p) => p.name.toLowerCase().includes(query));
		}

		// Asegurar que no hay duplicados en la vista
		const uniqueMap = new Map<number, Pokemon>();

		filtered.forEach(pokemon => {
			uniqueMap.set(pokemon.id, pokemon);
		});

		return Array.from(uniqueMap.values());

		// return filtered;
	});

	const hasResults = computed(() => filteredPokemons.value.length > 0);
	const showEmptyState = computed(() => !hasResults.value && !pokemonStore.isLoading);

	const formatName = (name: string): string => {
		return name.charAt(0).toUpperCase() + name.slice(1);
	};

	const resetFilters = (): void => {
		searchQuery.value = '';
		showOnlyFavorites.value = false;
	};

	// Modal handlers
	const openPokemonDetail = async (pokemon: Pokemon) => {
		selectedPokemon.value = pokemon;
		showModal.value = true;
	};

	const closeModal = () => {
		showModal.value = false;

		// Limpiar después de la animación
		setTimeout(() => {
			selectedPokemon.value = null;
		}, 300);
	};

	onMounted(() => {
		// Limpiar duplicados existentes al montar
		pokemonStore.removeDuplicates();


		if (listContainer.value) {
			listContainer.value.addEventListener('scroll', handleScroll);
		}
	});
</script>
