<script lang="ts">
	import Pre from '$lib/components/debug/pre.svelte';
	import type { LayoutData } from './$types';

	export let data: LayoutData;
</script>

<div>
	<Pre object={data} />
</div>
