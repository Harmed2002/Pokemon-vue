import { ref } from 'vue';

export const useClipboard = () => {
	const isCopied = ref(false);
	const error = ref<string | null>(null);

	const copyToClipboard = async (text: string): Promise<boolean> => {
		try {
			await navigator.clipboard.writeText(text);
			isCopied.value = true;
			error.value = null;

			setTimeout(() => {
				isCopied.value = false;
			}, 2000);

			return true;

		} catch (err) {
			error.value = err instanceof Error ? err.message : 'Failed to copy';
			console.error('Clipboard error:', err);
			return false;
		}
	};

	return {
		copyToClipboard,
		isCopied,
		error,
	};
};
