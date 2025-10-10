<template>
	<div class="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-8">
		<div class="max-w-md w-full text-center">
			<!-- Pikachu Logo -->
			<div class="mb-8 flex justify-center">
				<div class="w-40 h-40 md:w-56 md:h-56">
					<img
						src="@/assets/images/pikachu-welcome-min.png"
						alt="Pikachu welcome"
						class="w-full h-full object-contain"
					/>
				</div>
			</div>

			<h1 class="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Welcome to Pokédex</h1>

			<p class="text-sm md:text-base text-gray-600 leading-relaxed mb-12 px-4">
				The digital encyclopedia created by Professor Oak is an invaluable tool
				to Trainers in the Pokémon world.
			</p>

			<button
				@click="handleGetStarted"
				class="bg-pokemon-red hover:bg-red-600 active:bg-red-700 text-white font-semibold py-3 px-8 rounded-full transition-colors duration-200 shadow-md hover:shadow-lg transform hover:scale-105 active:scale-95"
			>
				Get started
			</button>
		</div>
	</div>
</template>

<script setup lang="ts">
	import { useRouter } from 'vue-router';

	const router = useRouter();

	const handleGetStarted = (): void => {
		// router.push('/pokedex');
		router.push({ name: 'loading' });
	};
</script>
