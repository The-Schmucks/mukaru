<script lang="ts">
	import DropdownItem from '$lib/components/ui/theme/header/dropdownItem.svelte';
	import Icon from '$lib/components/ui/icon.svelte';
	import RiUserUser6Line from 'svelte-icons-pack/ri/RiUserUser6Line';
	import CgChevronDown from 'svelte-icons-pack/cg/CgChevronDown';
	import VscSettingsGear from 'svelte-icons-pack/vsc/VscSettingsGear';
	import AiOutlinePoweroff from 'svelte-icons-pack/ai/AiOutlinePoweroff';

	export let user: App.Locals['user'];
</script>

<div
	class="group relative group flex items-center justify-center px-2.5 py-1.5 space-x-1.5 rounded-full border border-black/20 dark:border-white/20 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black hover:cursor-pointer"
>
	<span class="flex items-center justify-center">
		<Icon src={RiUserUser6Line} />
	</span>
	{#if user}
		{#if user.firstName}
			<span class="hidden md:block">
				{user.firstName}
			</span>
		{/if}
	{:else}
		<span class="hidden md:block"> Account </span>
	{/if}
	<span
		class="flex items-center justify-center group-hover:rotate-180 transition-transform ease-in-out duration-300"
	>
		<Icon src={CgChevronDown} />
	</span>
	<div
		class="absolute transition-transform ease-in-out top-full right-0 w-52 translate-x-full opacity-0 invisible group-hover:translate-x-0 group-hover:visible group-hover:opacity-100"
	>
		<div
			class="mt-2 bg-black dark:bg-white text-white dark:text-black rounded-md text-xs divide-y divide-white dark:divide-black/30"
		>
			{#if !user}
				<DropdownItem href={'/login'}>Login</DropdownItem>
				<DropdownItem href={'/register'}>Register</DropdownItem>
			{:else}
				<DropdownItem href={'/settings/profile'} class="space-x-1.5 py-3 dark:hover:bg-black/10">
					<span><Icon src={VscSettingsGear} /></span>
					<span>Settings</span>
				</DropdownItem>
				<DropdownItem href={'/logout'} class="space-x-1.5 py-3 dark:hover:bg-black/10">
					<span><Icon src={AiOutlinePoweroff} /></span>
					<span>Logout</span>
				</DropdownItem>
			{/if}
		</div>
	</div>
</div>
