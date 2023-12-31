<script lang="ts">
	import VscBell from 'svelte-icons-pack/vsc/VscBell';
	import Icon from '$lib/components/ui/icon.svelte';
</script>

<div
	class="relative flex h-full w-full flex-col items-center justify-center rounded-full border border-black/20 px-1.5 py-1.5 dark:border-white/20"
>
	<Icon src={VscBell} />
	<span class="absolute right-0 top-0 mr-1 mt-1 rounded-full bg-red-600 p-1" />
</div>
