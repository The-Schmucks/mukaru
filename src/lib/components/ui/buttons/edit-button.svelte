<script lang="ts">
	import AiOutlineEdit from 'svelte-icons-pack/ai/AiOutlineEdit';
	import AiOutlineClose from 'svelte-icons-pack/ai/AiOutlineClose';
	import Icon from '$lib/components/ui/icon.svelte';

	export let edit: boolean;
</script>

<button
	class="flex items-center justify-center space-x-1.5 border border-black/20 dark:border-white/20 pl-1.5 pr-3 py-1 rounded-full bg-black text-white dark:bg-white dark:text-black hover:underline"
	on:click
>
	{#if edit}
		<Icon src={AiOutlineClose} class="w-4 h-4" />
		<span class="text-xs">Close</span>
	{:else}
		<Icon src={AiOutlineEdit} class="w-4 h-4" />
		<span class="text-xs">Edit</span>
	{/if}
</button>
