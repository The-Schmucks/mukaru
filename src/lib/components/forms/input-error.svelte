<script lang="ts">
	export let errors: string[] | undefined;
</script>

<div class="flex flex-col text-sm text-red-600">
	{#if errors !== undefined && errors?.length > 0}
		{#each errors as error}
			<span class="text-xs">{error}</span>
		{/each}
	{/if}
</div>
