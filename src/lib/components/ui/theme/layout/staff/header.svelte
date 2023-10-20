<script lang="ts">
	import DarkModeToggle from '$lib/components/ui/theme/header/darkModeToggle.svelte';
	import Icon from '$lib/components/ui/icon.svelte';
	import BiLogOut from 'svelte-icons-pack/bi/BiLogOut';
	import UserNotifications from '$lib/components/ui/theme/layout/shared/user-notifications.svelte';
</script>

<div class="flex items-center justify-between relative overflow-x-clip">
	<div class="flex items-center justify-center gap-3">
		<a data-sveltekit-preload-data="tap" href={'/'} class="text-2xl">Logo</a>
		<a
			href={'/'}
			class="flex items-center justify-center gap-1 transition-transform border border-black/20 dark:border-white/20 hover:text-white dark:hover:text-black hover:bg-black dark:hover:bg-white px-1.5 py-0.5 rounded-md"
			data-sveltekit-preload-data="tap"
		>
			<Icon src={BiLogOut} class="text-sm stroke-[.1] w-6 h-6" />
			<span>Go Back</span>
		</a>
	</div>
	<div class="flex items-center justify-between relative space-x-4">
		<div
			class="w-full h-full flex flex-col justify-center items-center shadow-inner dark:shadow-white/10 dark:bg-transparent border border-black/20 dark:border-white/20 rounded-2xl px-1 md:px-2 py-1 md:py-1.5"
		>
			<DarkModeToggle />
		</div>
		<UserNotifications />
	</div>
</div>
