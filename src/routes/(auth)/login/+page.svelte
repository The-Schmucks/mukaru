<script lang="ts">
	import { enhance } from '$app/forms';
	import type { ActionData } from './$types';
	import InputGroup from '$lib/components/forms/input-group.svelte';
	import Submit from '$lib/components/forms/submit.svelte';
	import { writable } from 'svelte/store';
	import { page } from '$app/stores';
	export let form: ActionData;
	let loading = writable(false);
	$: loading;
	$: redirect = $page.url.searchParams.get('from') ? true : false;
</script>

{#if redirect}
	<span class="absolute bottom-0 left-0 right-0 z-50 bg-red-600 py-3 text-center text-xl font-normal text-white blur-0">
		You must be logged in to access this page
	</span>
{/if}

<div class="mx-56 flex basis-full flex-col justify-center space-y-6">
	<div class="flex flex-col space-y-2">
		<span class="text-2xl">Welcome Back</span>
		<span class="text-sm text-black/75 dark:text-white/75"> Welcome back, Please enter your details </span>
	</div>

	<form
		class="space-y-6"
		method="POST"
		use:enhance={({}) => {
			loading.set(true);
			return async ({ result, update }) => {
				loading.set(false);
				await update();
			};
		}}
	>
		{#if form?.message}
			<span class="text-red-500">{form?.message}</span>
		{/if}
		<div class="space-y-3">
			<InputGroup
				type="email"
				name="email"
				label="Email"
				value={form?.data.email ?? ''}
				placeholder="Enter you email..."
				autocomplete="email"
				errors={[]}
			/>
			<InputGroup
				type="password"
				name="password"
				label="Password"
				value={''}
				placeholder="Enter you password..."
				autocomplete="current-password"
				errors={[]}
			/>
		</div>
		<div class="space-x-4 space-y-1">
			<Submit loading={$loading} />
			<span class="font- flex items-center justify-center">
				Don't have an account?
				<a data-sveltekit-preload-data="tap" href="register" class="ml-1 font-bold hover:underline"> Register </a>
			</span>
		</div>
	</form>
</div>
