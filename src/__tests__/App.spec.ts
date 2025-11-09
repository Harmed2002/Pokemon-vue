import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import { createRouter, createMemoryHistory } from 'vue-router';
import { createPinia } from 'pinia';
import App from '../App.vue';

const router = createRouter({
	history: createMemoryHistory(),
	routes: [{ path: '/', component: { template: '<div>Home</div>' } }],
});

describe('App', () => {
	it('mounts renders properly', async () => {
		await router.push('/');
		await router.isReady();

		const wrapper = mount(App, {
			global: {
				plugins: [router, createPinia()],
			},
		});

		expect(wrapper.exists()).toBe(true);
	});
});
