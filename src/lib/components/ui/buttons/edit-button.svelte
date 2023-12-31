<script lang="ts">
	import AiOutlineEdit from 'svelte-icons-pack/ai/AiOutlineEdit';
	import AiOutlineClose from 'svelte-icons-pack/ai/AiOutlineClose';
	import Icon from '$lib/components/ui/icon.svelte';

	export let edit: boolean;
</script>

<button
	class="flex items-center justify-center space-x-1.5 rounded-full border border-black/20 bg-black py-1 pl-1.5 pr-3 text-white hover:underline dark:border-white/20 dark:bg-white dark:text-black"
	on:click
>
	{#if edit}
		<Icon src={AiOutlineClose} class="h-4 w-4" />
		<span class="text-xs">Close</span>
	{:else}
		<Icon src={AiOutlineEdit} class="h-4 w-4" />
		<span class="text-xs">Edit</span>
	{/if}
</button>
