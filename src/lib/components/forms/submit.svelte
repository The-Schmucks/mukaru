<script lang="ts">
	import Icon from '$lib/components/ui/icon.svelte';
	import AiOutlineLoading from 'svelte-icons-pack/ai/AiOutlineLoading';

	export let loading: boolean = false;
</script>

<button
	type="submit"
	class={`flex w-full items-center justify-center gap-2 rounded-md bg-black py-1.5 text-white hover:underline disabled:bg-black/80 dark:bg-white dark:text-black disabled:dark:bg-white/80`}
	disabled={loading}
>
	{#if loading}
		<Icon src={AiOutlineLoading} class="animate-spin" />
	{/if}
	Submit
</button>
