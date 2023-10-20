<script lang="ts">
	import Pre from '$lib/components/debug/pre.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<Pre object={data.user} />
