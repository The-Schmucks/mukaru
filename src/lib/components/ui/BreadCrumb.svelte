<script lang="ts">
	export let links: string[];
</script>

<div class="flex items-center justify-start gap-2 text-neutral-700">
	{#each links as link, i}
		{#if i + 1 != links.length}
			<a
				href={`/${links
					.slice(0, i + 1)
					.join('/')
					.toLowerCase()}`}
			>
				{link}</a
			>
		{:else}
			<a
				href={`/${links
					.slice(0, i + 1)
					.join('/')
					.toLowerCase()}`}
				class="before:content-['/'] before:pr-2"
			>
				{link}
			</a>
		{/if}
	{/each}
</div>
