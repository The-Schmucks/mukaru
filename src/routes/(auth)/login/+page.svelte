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
	<span
		class="absolute left-0 right-0 bottom-0 z-50 bg-red-600 text-white py-3 text-center text-xl font-normal blur-0"
	>
		You must be logged in to access this page
	</span>
{/if}

<div class="basis-full flex flex-col mx-56 justify-center space-y-6">
	<div class="space-y-2 flex flex-col">
		<span class="text-2xl">Welcome Back</span>
		<span class="text-sm text-black/75 dark:text-white/75">
			Welcome back, Please enter your details
		</span>
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
		<div class="space-x-4">
			<Submit loading={$loading} />
			<span class="flex items-center justify-center">
				Don't have an account?
				<a data-sveltekit-preload-data="tap" href="register" class="font-bold ml-1 hover:underline">
					Register
				</a>
			</span>
		</div>
	</form>
</div>
