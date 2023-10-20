<script lang="ts">
	import type { HTMLAttributes, HTMLLinkAttributes } from 'svelte/elements';

	export let href: string;
	export let dataSveltekitPreloadData: HTMLLinkAttributes['data-sveltekit-preload-data'] = 'tap';
</script>

<a
	{href}
	class="hover:cursor-pointer text-sm hover:text-base transition-[font-size_border] hover:border-b border-black dark:border-white hover:px-2"
	data-sveltekit-preload-data={dataSveltekitPreloadData}
>
	<slot />
</a>
