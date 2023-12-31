<script lang="ts">
	import Header from '$lib/components/ui/theme/layout/staff/header.svelte';
	import Sidebar from '$lib/components/ui/theme/layout/staff/sidebar.svelte';

	import type { LayoutData } from './$types';

	export let data: LayoutData;
</script>

<header class="sticky top-0 z-[99] border-b-[.5px] border-black/20 backdrop-blur-xl dark:border-white/20">
	<div class="py-4 sm:mx-8">
		<Header />
	</div>
</header>

<main class="flex basis-full divide-x divide-black/20 overflow-hidden dark:divide-white/20">
	<Sidebar user={data.user} />
	<div
		class="w-full overflow-y-scroll px-6 py-4 scrollbar-thin scrollbar-track-neutral-300 scrollbar-thumb-neutral-800 scrollbar-corner-red-950 scrollbar-track-rounded scrollbar-thumb-rounded hover:scrollbar-thumb-neutral-600"
	>
		<div class="contents">
			<slot />
		</div>
	</div>
</main>
