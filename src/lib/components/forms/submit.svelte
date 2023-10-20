<script lang="ts">
	import Icon from '$lib/components/ui/icon.svelte';
	import AiOutlineLoading from 'svelte-icons-pack/ai/AiOutlineLoading';

	export let loading: boolean = false;
</script>

<button
	type="submit"
	class={`bg-black dark:bg-white disabled:bg-black/80 disabled:dark:bg-white/80 hover:underline w-full flex items-center justify-center py-1.5 text-white dark:text-black rounded-md gap-2`}
	disabled={loading}
>
	{#if loading}
		<Icon src={AiOutlineLoading} class="animate-spin" />
	{/if}
	Submit
</button>
