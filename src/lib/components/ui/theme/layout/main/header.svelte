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

<div class="relative flex items-center justify-between overflow-x-clip">
	<div class="flex items-end justify-center gap-4">
		<a data-sveltekit-preload-data="tap" href={'/'} class="text-2xl">Logo</a>
		{#if can('staff@view', user)}
			<a
				href={'/staff'}
				class="flex items-center justify-center gap-1 rounded-md border border-black px-3 transition-transform hover:scale-105 dark:border-white/20"
				data-sveltekit-preload-data="off"
			>
				<Icon src={RiUserAdminLine} />
				<span>Staff</span>
			</a>
		{/if}
	</div>
	<div class="relative hidden items-center justify-center md:flex">
		<div class="absolute flex w-full items-center justify-center gap-5">
			<NavItem href={'/about'}>About</NavItem>
			<NavItem href={'/rent'}>Rent</NavItem>
			<NavItem href={'/lease'}>Lease</NavItem>
			<NavItem href={'/contact'}>Contact</NavItem>
		</div>
	</div>
	<div class="relative flex items-center justify-between space-x-4">
		<div
			class="flex h-full w-full flex-col items-center justify-center rounded-2xl border border-black/20 px-1 py-1 shadow-inner md:px-2 md:py-1.5 dark:border-white/20 dark:bg-transparent dark:shadow-white/10"
		>
			<DarkModeToggle />
		</div>
		<UserNotifications />
		<UserAccount {user} />
	</div>
</div>
