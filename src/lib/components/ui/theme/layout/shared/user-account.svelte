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
	class="group group relative flex items-center justify-center space-x-1.5 rounded-full border border-black/20 px-2.5 py-1.5 hover:cursor-pointer hover:bg-black hover:text-white dark:border-white/20 dark:hover:bg-white dark:hover:text-black"
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
	<span class="flex items-center justify-center transition-transform duration-300 ease-in-out group-hover:rotate-180">
		<Icon src={CgChevronDown} />
	</span>
	<div
		class="invisible absolute right-0 top-full w-52 translate-x-full opacity-0 transition-transform ease-in-out group-hover:visible group-hover:translate-x-0 group-hover:opacity-100"
	>
		<div
			class="mt-2 divide-y divide-white rounded-md bg-black text-xs text-white dark:divide-black/30 dark:bg-white dark:text-black"
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
