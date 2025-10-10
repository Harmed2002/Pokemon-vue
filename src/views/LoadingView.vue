<script setup lang="ts">
	import { onMounted, ref } from 'vue';
	import { useRouter } from 'vue-router';
	import { usePokemonStore } from '@/stores/pokemon.store';

	const router = useRouter();
	const pokemonStore = usePokemonStore();

	const loadingText = ref('Connecting to PokéAPI...');

	onMounted(async () => {
		try {
			loadingText.value = 'Loading Pokémon...';

			await pokemonStore.loadInitialBatch();

			loadingText.value = 'Ready!';

			await new Promise((resolve) => setTimeout(resolve, 500));

			router.push({ name: 'pokemon-list' });
		} catch (error) {
			console.error('Error loading:', error);
			loadingText.value = 'Error loading data';
		}
	});
</script>

<!-- <template>
	<div
		class="min-h-screen bg-gradient-to-b from-red-500 to-red-600 flex flex-col items-center justify-center px-4"
	>
		<div class="relative mb-8">
			<div class="absolute inset-0 bg-white rounded-full opacity-25 animate-ping"></div>

			<div
				class="relative w-32 h-32 bg-white rounded-full border-4 border-gray-900 overflow-hidden"
			>
				<div class="absolute top-0 left-0 right-0 h-1/2 bg-red-600"></div>
				<div class="absolute bottom-0 left-0 right-0 h-1/2 bg-white"></div>
				<div class="absolute top-1/2 left-0 right-0 h-1 bg-gray-900 -translate-y-1/2"></div>
				<div
					class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full border-4 border-gray-900 flex items-center justify-center"
				>
					<div class="w-6 h-6 bg-gray-900 rounded-full animate-pulse"></div>
				</div>
			</div>
		</div>

		<h2 class="text-white text-2xl font-bold mb-2 animate-pulse">
			{{ loadingText }}
		</h2>

		<p class="text-white/80 text-sm">Please wait a moment</p>
	</div>
</template> -->

<template>
	<div
		class="min-h-screen bg-white flex flex-col items-center justify-center px-4"
	>
		<div class="relative mb-8">
			<div class="absolute inset-0 bg-red-500 rounded-full opacity-25 animate-ping"></div>
			<div
				class="relative w-32 h-32 bg-white rounded-full border-4 border-gray-900 overflow-hidden"
			>
				<div class="absolute top-0 left-0 right-0 h-1/2 bg-red-600"></div>
				<div class="absolute bottom-0 left-0 right-0 h-1/2 bg-white"></div>
				<div class="absolute top-1/2 left-0 right-0 h-1 bg-gray-900 -translate-y-1/2"></div>
				<div
					class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full border-4 border-gray-900 flex items-center justify-center"
				>
					<div class="w-6 h-6 bg-gray-900 rounded-full animate-pulse"></div>
				</div>
			</div>
		</div>
		<h2 class="text-gray-900 text-2xl font-bold mb-2 animate-pulse">
			{{ loadingText }}
		</h2>
		<p class="text-gray-600 text-sm">Please wait a moment</p>
	</div>
</template>
