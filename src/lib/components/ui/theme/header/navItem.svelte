<script lang="ts">
	import type { HTMLAttributes, HTMLLinkAttributes } from 'svelte/elements';

	export let href: string;
	export let dataSveltekitPreloadData: HTMLLinkAttributes['data-sveltekit-preload-data'] = 'tap';
</script>

<a
	{href}
	class="border-black text-sm transition-[font-size_border] hover:cursor-pointer hover:border-b hover:px-2 hover:text-base dark:border-white"
	data-sveltekit-preload-data={dataSveltekitPreloadData}
>
	<slot />
</a>
