import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: '/',
			name: 'welcome',
			component: () => import('@/views/WelcomeView.vue'),
		},
		{
			path: '/pokedex',
			name: 'pokemon-list',
			component: () => import('@/views/PokemonListView.vue'),
		},
		{
			path: '/loading',
			name: 'loading',
			component: () => import('@/views/LoadingView.vue'),
		},
	],
});

export default router;
