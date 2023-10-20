<script lang="ts">
	import Header from '$lib/components/ui/theme/layout/staff/header.svelte';
	import Sidebar from '$lib/components/ui/theme/layout/staff/sidebar.svelte';

	import type { LayoutData } from './$types';

	export let data: LayoutData;
</script>

<header
	class="sticky top-0 z-[99] border-b-[.5px] border-black/20 dark:border-white/20 backdrop-blur-xl"
>
	<div class="py-4 sm:mx-8">
		<Header />
	</div>
</header>

<main class="basis-full flex divide-x divide-black/20 dark:divide-white/20 overflow-hidden">
	<Sidebar user={data.user} />
	<div
		class="py-4 px-6 w-full overflow-y-scroll scrollbar-thin scrollbar-corner-red-950 scrollbar-track-neutral-300 scrollbar-thumb-neutral-800 hover:scrollbar-thumb-neutral-600 scrollbar-thumb-rounded scrollbar-track-rounded"
	>
		<div class="contents">
			<slot />
		</div>
	</div>
</main>
