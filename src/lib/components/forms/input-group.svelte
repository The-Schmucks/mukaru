<script lang="ts">
	import type { HTMLInputTypeAttribute } from 'svelte/elements';
	import InputError from './input-error.svelte';
	import InputLabel from './input-label.svelte';
	import Input from './input.svelte';
	export let label: string;
	export let name: HTMLInputElement['name'];
	export let type: HTMLInputTypeAttribute;
	export let value: HTMLInputElement['value'];
	export let placeholder: HTMLInputElement['placeholder'];
	export let errors: string[] = [];
	export let autocomplete: HTMLInputElement['autocomplete'] | undefined;
	$: value;
</script>

<div class="w-full flex flex-col">
	<InputLabel {label} {name} />
	<Input {autocomplete} {placeholder} {value} {type} {name} hasErrors={errors?.length > 0} />
	<InputError {errors} />
</div>
