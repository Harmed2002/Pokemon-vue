import { config } from '@vue/test-utils';
import { vi } from 'vitest';

// Configuración global de Vue Test Utils
config.global.mocks = {
	$route: {
		params: {},
		query: {},
		name: '',
	},
	$router: {
		push: vi.fn(),
		replace: vi.fn(),
		go: vi.fn(),
	},
};

// Mock de IntersectionObserver
global.IntersectionObserver = class IntersectionObserver {
	constructor() {}
	disconnect() {}
	observe() {}
	takeRecords() {
		return [];
	}
	unobserve(): void {}
} as unknown as typeof IntersectionObserver;
