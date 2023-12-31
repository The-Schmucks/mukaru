<script>
	import Backdrop from '$lib/components/ui/auth/backdrop.svelte';
	import DarkModeToggle from '$lib/components/ui/theme/header/darkModeToggle.svelte';
</script>

<div class="flex basis-full justify-center divide-x divide-black dark:divide-white">
	<div class="flex w-full flex-col transition-[width] lg:w-1/2">
		<div class="mx-4 my-3">
			<a data-sveltekit-preload-data="tap" href="/" class="text-2xl">Logo</a>
		</div>
		<slot />
	</div>
	<div class="invisible relative flex w-0 items-center justify-center bg-black transition-all lg:visible lg:w-1/2">
		<div class="absolute right-0 top-0 z-50 mr-5 mt-5 text-white dark:text-black">
			<DarkModeToggle dark={true} />
		</div>
		<div class="h-40 w-40 rounded-full bg-white shadow-2xl" />
		<Backdrop />
	</div>
</div>
