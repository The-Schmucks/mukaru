<script lang="ts">
	import type { HTMLLinkAttributes } from 'svelte/elements';
	import { twMerge } from 'tailwind-merge';
	export let href = '';
	let className = '';
	export let dataSveltekitPreloadData: HTMLLinkAttributes['data-sveltekit-preload-data'] = 'tap';

	export { className as class };
</script>

<a
	{href}
	data-sveltekit-preload-data={dataSveltekitPreloadData}
	class={twMerge(
		'py-2 px-3 hover:bg-black/10 dark:hover:bg-white/10 hover:underline flex items-center justify-start space-x-1',
		className
	)}
>
	<slot />
</a>
