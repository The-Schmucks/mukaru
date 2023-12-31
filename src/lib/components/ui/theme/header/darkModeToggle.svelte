<script lang="ts">
	import { theme } from '$lib/store';

	export let dark: boolean = false;
	const toggleDarkMode = () => {
		if ($theme == 'dark') theme.set('light');
		else theme.set('dark');
	};
</script>

<div class="flex items-center justify-center">
	<span class="">
		<svg
			class={`h-4 w-4 ${dark ? 'text-white' : 'text-black'} dark:text-white`}
			fill="none"
			viewBox="0 0 24 24"
			stroke="currentColor"
		>
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="2"
				d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
			/>
		</svg>
	</span>
	<button
		class={`flex h-4 w-7 items-center ${
			dark ? 'bg-white' : 'bg-black'
		} mx-0.5 rounded-full px-0.5 hover:cursor-pointer dark:bg-white`}
		on:click={toggleDarkMode}
	>
		<div
			class={`${
				dark ? 'bg-black' : 'bg-white'
			} h-3 w-3 rounded-full shadow-md transition-transform ease-in-out dark:bg-black ${
				$theme == 'dark' && ' translate-x-3'
			}`}
		/>
	</button>
	<span class="">
		<svg
			class={`h-4 w-4 ${dark ? 'text-white' : 'text-black'} dark:text-white`}
			fill="none"
			viewBox="0 0 24 24"
			stroke="currentColor"
		>
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="2"
				d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
			/>
		</svg>
	</span>
</div>
