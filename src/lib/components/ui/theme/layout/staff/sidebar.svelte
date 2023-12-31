<script lang="ts">
	import Icon from '$lib/components/ui/icon.svelte';
	import CgChevronDown from 'svelte-icons-pack/cg/CgChevronDown';
	import BiHomeCircle from 'svelte-icons-pack/bi/BiHomeCircle';
	import BiKey from 'svelte-icons-pack/bi/BiKey';
	import VscSettings from 'svelte-icons-pack/vsc/VscSettings';
	import RiUserTeamLine from 'svelte-icons-pack/ri/RiUserTeamLine';

	let routes: Array<{ href: string; icon: any; title: string }> = [
		{ href: '/staff', icon: BiHomeCircle, title: 'Home' },
		{ href: '/staff/teams', icon: RiUserTeamLine, title: 'teams' },
		{ href: '/staff/roles', icon: BiKey, title: 'Roles & Permissions' },
		{ href: '/staff/settings', icon: VscSettings, title: 'Settings' }
	];
	export let user: App.Locals['user'];
</script>

<div class="flex w-60 flex-col items-start justify-start gap-5 py-4">
	<div class="flex w-full items-center justify-between gap-3 px-4">
		<div class="w-12">
			<img src={user?.avatar?.url} alt={`${user?.firstName ?? 'N/A'}'s Avatar`} class="rounded-full" />
		</div>
		<div class="flex flex-col text-xs">
			<span class="font-semibold">{user?.firstName ?? 'N/A'}</span>
			<span class="font-light">{user?.email}</span>
		</div>
		<div>
			<Icon src={CgChevronDown} class="transition-transform hover:rotate-180" />
		</div>
	</div>

	<div class="flex w-full flex-col gap-2 px-2.5">
		<span class="px-4 text-sm font-light text-neutral-900 dark:text-neutral-200">Menu</span>
		<div class="flex flex-col justify-center [&>*]:px-4 [&>*]:py-1.5">
			{#each routes as route}
				<a
					href={route.href}
					class="flex items-center justify-start gap-3 rounded-full hover:bg-black hover:text-white hover:dark:bg-white hover:dark:text-black"
					data-sveltekit-preload-data="tap"
				>
					<Icon src={route.icon} class="h-6 w-6" />
					<span class="first-letter:uppercase">{route.title}</span>
				</a>
			{/each}
		</div>
	</div>
</div>
