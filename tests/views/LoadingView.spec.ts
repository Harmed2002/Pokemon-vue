import { describe, it, expect, beforeEach, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import { createPinia, setActivePinia } from 'pinia';
import { createRouter, createMemoryHistory } from 'vue-router';
import LoadingView from '@/views/LoadingView.vue';
import { usePokemonStore } from '@/stores/pokemon.store';

const router = createRouter({
	history: createMemoryHistory(),
	routes: [
		{ path: '/', name: 'loading', component: LoadingView },
		{ path: '/pokemon', name: 'pokemon-list', component: { template: '<div>List</div>' } },
	],
});

describe('LoadingView', () => {
	let pokemonStore: ReturnType<typeof usePokemonStore>;

	beforeEach(() => {
		setActivePinia(createPinia());
		pokemonStore = usePokemonStore();
		vi.clearAllMocks();
	});

	it('should render loading text', () => {
		const wrapper = mount(LoadingView, {
			global: {
				plugins: [router],
			},
		});

		expect(wrapper.text()).toContain('Connecting to PokéAPI...');
	});

	it('should call loadInitialBatch on mount', async () => {
		const loadSpy = vi.spyOn(pokemonStore, 'loadInitialBatch').mockResolvedValue();

		mount(LoadingView, {
			global: {
				plugins: [router],
			},
		});

		await new Promise((resolve) => setTimeout(resolve, 0));
		expect(loadSpy).toHaveBeenCalled();
	});

	it('should redirect to pokemon-list after loading', async () => {
		vi.spyOn(pokemonStore, 'loadInitialBatch').mockResolvedValue();
		const pushSpy = vi.spyOn(router, 'push');

		mount(LoadingView, {
			global: {
				plugins: [router],
			},
		});

		await new Promise((resolve) => setTimeout(resolve, 600));
		expect(pushSpy).toHaveBeenCalledWith({ name: 'pokemon-list' });
	});
});
