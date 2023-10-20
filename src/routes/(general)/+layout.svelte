<script lang="ts">
	import Footer from '$lib/components/ui/theme/layout/main/footer.svelte';
	import Header from '$lib/components/ui/theme/layout/main/header.svelte';
	import type { LayoutData } from './$types';

	export let data: LayoutData;
</script>

<header
	class="sticky top-0 z-[99] border-b-[.5px] border-black/20 dark:border-white/20 backdrop-blur-xl"
>
	<div class="py-4 sm:mx-8">
		<Header user={data.user} />
	</div>
</header>

<main class="basis-full">
	<div class="sm:mx-8">
		<slot />
	</div>
</main>

<footer class="border-t-[.5px] border-black/20 dark:border-white/20">
	<div class="py-4 sm:mx-8">
		<Footer />
	</div>
</footer>
