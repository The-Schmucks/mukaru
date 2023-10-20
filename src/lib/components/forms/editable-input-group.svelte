<script lang="ts">
	import type { HTMLInputTypeAttribute } from 'svelte/elements';
	import InputError from './input-error.svelte';
	import InputLabel from './input-label.svelte';
	import EditableInput from './editable-input.svelte';
	import { twMerge } from 'tailwind-merge';
	export let label: string;
	export let name: HTMLInputElement['name'];
	export let type: HTMLInputTypeAttribute;
	export let value: HTMLInputElement['value'];
	export let placeholder: HTMLInputElement['placeholder'];
	export let errors: string[] | undefined;
	export let autocomplete: HTMLInputElement['autocomplete'] | undefined;
	export let edit: boolean = false;
	let className = '';
	export { className as class };
	$: value;
</script>

<div class={twMerge('w-full flex flex-col', className)}>
	<InputLabel {label} {name} />
	<EditableInput
		{autocomplete}
		{placeholder}
		{value}
		{type}
		{name}
		hasErrors={errors !== undefined && errors.length > 0}
		{edit}
	/>
	<InputError {errors} />
</div>
