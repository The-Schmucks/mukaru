<script lang="ts">
	import type { HTMLInputTypeAttribute } from 'svelte/elements';
	import { twMerge } from 'tailwind-merge';

	export let value: HTMLInputElement['value'] | undefined = undefined;
	export let placeholder: HTMLInputElement['placeholder'] | undefined = undefined;
	export let type: HTMLInputTypeAttribute;
	export let autocomplete: HTMLInputElement['autocomplete'] | undefined = undefined;
	export let name: string;
	export let hasErrors: boolean = false;
	export let hidden = false;
	$: value;

	const inputType = (element: HTMLInputElement) => {
		element.type = type;
	};
</script>

<input
	{name}
	{placeholder}
	{hidden}
	{value}
	class={twMerge(
		`form-input rounded-md bg-white px-3 py-2 text-xs placeholder:text-black/70 focus:border-black focus:ring-black dark:bg-black dark:placeholder:text-white/70 focus:dark:border-white focus:dark:ring-white ${
			hasErrors ? 'border-red-600 ring-red-600' : 'ring-black/50 dark:ring-white/50'
		}`
	)}
	{autocomplete}
	use:inputType
/>
