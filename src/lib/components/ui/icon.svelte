<script lang="ts">
	//@ts-ignore
	import Icon from 'svelte-icons-pack/Icon.svelte';
	import { twMerge } from 'tailwind-merge';

	export let src: any;
	export let title: any = undefined;
	let className = '';
	export { className as class };
</script>

<Icon {src} color="currentColor" {title} className={twMerge('w-6 h-6', className)} />
