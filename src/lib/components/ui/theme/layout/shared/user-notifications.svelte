<script lang="ts">
	import VscBell from 'svelte-icons-pack/vsc/VscBell';
	import Icon from '$lib/components/ui/icon.svelte';
</script>

<div
	class="relative w-full h-full flex flex-col justify-center items-center border border-black/20 dark:border-white/20 py-1.5 px-1.5 rounded-full"
>
	<Icon src={VscBell} />
	<span class="absolute p-1 bg-red-600 rounded-full top-0 right-0 mt-1 mr-1" />
</div>
