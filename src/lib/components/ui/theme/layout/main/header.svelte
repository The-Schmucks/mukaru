<script lang="ts">
	import NavItem from '$lib/components/ui/theme/header/navItem.svelte';
	import UserAccount from '$lib/components/ui/theme/layout/shared/user-account.svelte';
	import DarkModeToggle from '$lib/components/ui/theme/header/darkModeToggle.svelte';
	import Icon from '$lib/components/ui/icon.svelte';
	import RiUserAdminLine from 'svelte-icons-pack/ri/RiUserAdminLine';
	import UserNotifications from '$lib/components/ui/theme/layout/shared/user-notifications.svelte';
	import { can } from '$lib/utils/permissions';

	export let user: App.Locals['user'];
</script>

<div class="flex items-center justify-between relative overflow-x-clip">
	<div class="flex items-end justify-center gap-4">
		<a data-sveltekit-preload-data="tap" href={'/'} class="text-2xl">Logo</a>
		{#if can('staff@view', user)}
			<a
				href={'/staff'}
				class="flex items-center justify-center gap-1 hover:scale-105 transition-transform border border-black dark:border-white/20 px-3 rounded-md"
				data-sveltekit-preload-data="off"
			>
				<Icon src={RiUserAdminLine} />
				<span>Staff</span>
			</a>
		{/if}
	</div>
	<div class="hidden md:flex items-center justify-center relative">
		<div class="absolute w-full flex items-center justify-center gap-5">
			<NavItem href={'/about'}>About</NavItem>
			<NavItem href={'/rent'}>Rent</NavItem>
			<NavItem href={'/lease'}>Lease</NavItem>
			<NavItem href={'/contact'}>Contact</NavItem>
		</div>
	</div>
	<div class="flex items-center justify-between relative space-x-4">
		<div
			class="w-full h-full flex flex-col justify-center items-center shadow-inner dark:shadow-white/10 dark:bg-transparent border border-black/20 dark:border-white/20 rounded-2xl px-1 md:px-2 py-1 md:py-1.5"
		>
			<DarkModeToggle />
		</div>
		<UserNotifications />
		<UserAccount {user} />
	</div>
</div>
