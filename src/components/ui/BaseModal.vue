<template>
	<Transition name="modal">
		<div
			v-if="show"
			class="fixed inset-0 z-50 flex items-center justify-center p-4"
			@click.self="emit('close')"
		>
			<!-- Backdrop -->
			<div class="absolute inset-0 bg-black bg-opacity-50" @click="emit('close')"></div>

			<!-- Modal content -->
			<div class="relative z-10 w-full max-w-md" @click.stop>
				<slot />
			</div>
		</div>
	</Transition>
</template>

<script setup lang="ts">
	import { onMounted, onUnmounted } from 'vue';

	defineProps<{
		show: boolean;
	}>();

	const emit = defineEmits<{
		close: [];
	}>();

	const handleEscape = (e: KeyboardEvent) => {
		if (e.key === 'Escape') {
			emit('close');
		}
	};

	onMounted(() => {
		document.addEventListener('keydown', handleEscape);
	});

	onUnmounted(() => {
		document.removeEventListener('keydown', handleEscape);
	});
</script>

<style scoped>
	.modal-enter-active,
	.modal-leave-active {
		transition: opacity 0.25s ease;
	}

	.modal-enter-from,
	.modal-leave-to {
		opacity: 0;
	}
</style>
