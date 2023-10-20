<script>
	import Backdrop from '$lib/components/ui/auth/backdrop.svelte';
	import DarkModeToggle from '$lib/components/ui/theme/header/darkModeToggle.svelte';
</script>

<div class="basis-full flex justify-center divide-x divide-black dark:divide-white">
	<div class="w-full transition-[width] lg:w-1/2 flex flex-col">
		<div class="mx-4 my-3">
			<a data-sveltekit-preload-data="tap" href="/" class="text-2xl">Logo</a>
		</div>
		<slot />
	</div>
	<div
		class="w-0 invisible transition-all lg:visible lg:w-1/2 flex items-center justify-center relative bg-black"
	>
		<div class="absolute right-0 top-0 mr-5 mt-5 z-50 text-white dark:text-black">
			<DarkModeToggle dark={true} />
		</div>
		<div class="w-40 h-40 bg-white shadow-2xl rounded-full" />
		<Backdrop />
	</div>
</div>
