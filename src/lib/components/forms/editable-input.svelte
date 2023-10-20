<script lang="ts">
	import type { HTMLInputTypeAttribute } from 'svelte/elements';
	import Input from './input.svelte';

	export let value: HTMLInputElement['value'];
	export let placeholder: HTMLInputElement['placeholder'];
	export let type: HTMLInputTypeAttribute;
	export let autocomplete: HTMLInputElement['autocomplete'] | undefined;
	export let name: string;
	export let hasErrors: boolean = false;
	export let edit: boolean = false;
	$: value;
</script>

<Input {value} {placeholder} {type} {autocomplete} {name} {hasErrors} hidden={!edit} />
{#if !edit && value !== ''}
	<span class="text-sm">{value}</span>
{:else if value == '' && !edit}
	<span class="text-sm text-red-500 dark:text-red-500/50" hidden={edit}>Empty...</span>
{/if}
