<script lang="ts">
	import DarkModeToggle from '$lib/components/ui/theme/header/darkModeToggle.svelte';
	import Icon from '$lib/components/ui/icon.svelte';
	import BiLogOut from 'svelte-icons-pack/bi/BiLogOut';
	import UserNotifications from '$lib/components/ui/theme/layout/shared/user-notifications.svelte';
</script>

<div class="relative flex items-center justify-between overflow-x-clip">
	<div class="flex items-center justify-center gap-3">
		<a data-sveltekit-preload-data="tap" href={'/'} class="text-2xl">Logo</a>
		<a
			href={'/'}
			class="flex items-center justify-center gap-1 rounded-md border border-black/20 px-1.5 py-0.5 transition-transform hover:bg-black hover:text-white dark:border-white/20 dark:hover:bg-white dark:hover:text-black"
			data-sveltekit-preload-data="tap"
		>
			<Icon src={BiLogOut} class="h-6 w-6 stroke-[.1] text-sm" />
			<span>Go Back</span>
		</a>
	</div>
	<div class="relative flex items-center justify-between space-x-4">
		<div
			class="flex h-full w-full flex-col items-center justify-center rounded-2xl border border-black/20 px-1 py-1 shadow-inner md:px-2 md:py-1.5 dark:border-white/20 dark:bg-transparent dark:shadow-white/10"
		>
			<DarkModeToggle />
		</div>
		<UserNotifications />
	</div>
</div>
