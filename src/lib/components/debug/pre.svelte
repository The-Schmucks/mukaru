<script lang="ts">
	import { dev } from '$app/environment';

	export let object: any;
</script>

{#if dev}
	<span class="text-base">
		<pre>{JSON.stringify({ object }, null, 2)}</pre>
	</span>
{/if}
