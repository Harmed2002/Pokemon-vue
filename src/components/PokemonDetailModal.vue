<template>
	<BaseModal :show="show" @close="emit('close')">
		<div class="bg-white rounded-lg overflow-hidden shadow-2xl relative w-[315px] md:w-[570px] h-[506px]">
			<!-- Botón cerrar -->
			<button
				@click="emit('close')"
				class="absolute top-4 right-4 z-20 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-100 transition-colors"
				aria-label="Close modal"
			>
				<svg
					class="w-5 h-5 text-blue-500"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="4"
						d="M6 18L18 6M6 6l12 12"
					/>
				</svg>
			</button>

			<div class="relative h-64 overflow-hidden">
				<img
					:src="BackgroundImage"
					alt="Pokemon background"
					class="absolute inset-0 w-full h-full object-cover"
				/>
				<!-- Pokemon superpuesto con z-10 -->
				<div class="relative z-10 h-full flex items-center justify-center pt-6">
					<img
						v-if="pokemon"
						:src="pokemonImage"
						:alt="formattedName"
						class="w-48 h-48 object-contain drop-shadow-2xl"
					/>
				</div>
			</div>

			<!-- Sector de detalle de Pokemon -->
			<div class="p-6 space-y-3">
				<div class="flex items-start justify-between">
					<div class="space-y-3 flex-1">
						<p class="text-gray-700">
							<span class="font-semibold">Name:</span>
							{{ formattedName }}
						</p>

						<p class="text-gray-700">
							<span class="font-semibold">Weight:</span>
							{{ pokemon?.weight }}
						</p>

						<p class="text-gray-700">
							<span class="font-semibold">Height:</span>
							{{ pokemon?.height }}
						</p>

						<p class="text-gray-700">
							<span class="font-semibold">Types:</span>
							{{ formattedTypes }}
						</p>
					</div>
				</div>

				<!-- Botones de acción -->
				<div class="flex items-center justify-between pt-4">
					<!-- Botón de compartir - Alineado a la izquierda -->
					<button
						@click="shareToFriends"
						class="bg-red-500 hover:bg-red-600 active:bg-red-700 text-white font-semibold rounded-full transition-colors shadow-md text-sm"
						style="width: 195px; height: 44px; font-size: 18px;"
					>
						<span v-if="!isCopied">Share to my friends</span>
						<span v-else class="flex items-center justify-center gap-2">
							<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
							</svg>
							Copied!
						</span>
					</button>

					<!-- Botón de Favoritos - Alineado a la derecha -->
					<button
						@click="toggleFavorite"
						class="w-14 h-14 flex items-center justify-center bg-white hover:bg-gray-50 rounded-full shadow-md transition-all flex-shrink-0"
						:class="isFavorite ? 'scale-110' : ''"
						aria-label="Toggle favorite"
					>
						<svg
							class="w-7 h-7 transition-all"
							:class="isFavorite ? 'text-yellow-400 fill-current' : 'text-gray-300 fill-current'"
							viewBox="0 0 24 24"
							>
								<path
									d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
								/>
						</svg>
					</button>
				</div>
			</div>
		</div>
	</BaseModal>
</template>

<script setup lang="ts">
	import { computed } from 'vue';
	import BaseModal from '@/components/ui/BaseModal.vue';
	import { useFavoritesStore } from '@/stores/favorites.store';
	import { useClipboard } from '@/composables/useClipboard';
	import type { Pokemon } from '@/stores/pokemon.store';
	import BackgroundImage from '@/assets/images/Background.png';

	const props = defineProps<{
		pokemon: Pokemon | null;
		show: boolean;
	}>();

	const emit = defineEmits<{
		close: [];
	}>();

	const favoritesStore = useFavoritesStore();
	const { copyToClipboard, isCopied } = useClipboard();

	const pokemonImage = computed(() => {
		if (!props.pokemon) return '';

		return (
			props.pokemon.sprites.other?.['official-artwork']?.front_default ||
			props.pokemon.sprites.front_default ||
			''
		);
	});

	const formattedName = computed(() => {
		if (!props.pokemon) return '';
		return props.pokemon.name.charAt(0).toUpperCase() + props.pokemon.name.slice(1);
	});

	const formattedTypes = computed(() => {
		if (!props.pokemon) return '';
		return props.pokemon.types
			.map((t) => t.type.name.charAt(0).toUpperCase() + t.type.name.slice(1))
			.join(', ');
	});

	const isFavorite = computed(() => {
		return props.pokemon ? favoritesStore.isFavorite(props.pokemon.id) : false;
	});

	const toggleFavorite = () => {
		if (!props.pokemon) return;
		favoritesStore.toggleFavorite(props.pokemon.id);
	};

	// Se copia al portapapeles el nombre, peso, altura y tipos del Pokémon
	const shareToFriends = async () => {
		if (!props.pokemon) return;

		const shareText = `Name: ${formattedName.value}, Weight: ${props.pokemon.weight}, Height: ${props.pokemon.height}, Types: ${formattedTypes.value}`;

		await copyToClipboard(shareText);
	};
</script>
