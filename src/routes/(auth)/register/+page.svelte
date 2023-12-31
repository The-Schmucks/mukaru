<script lang="ts">
	import { enhance } from '$app/forms';
	import InputGroup from '$lib/components/forms/input-group.svelte';
	import Submit from '$lib/components/forms/submit.svelte';
	import type { ActionData } from './$types';
	import { writable } from 'svelte/store';
	export let form: ActionData;

	let loading = writable(false);
	$: loading;
</script>

<div class="mx-56 flex basis-full flex-col justify-center space-y-6">
	<div class="flex flex-col space-y-2">
		<span class="text-2xl">Register</span>
		<span class="text-sm text-black/75 dark:text-white/75"> Create your account to explore more features! </span>
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
				value={form?.data?.email ?? ''}
				placeholder="Enter your email..."
				errors={form?.errors?.email}
				autocomplete="email"
			/>

			<InputGroup
				type="password"
				name="password"
				label="Password"
				value={form?.data?.password ?? ''}
				placeholder="Enter your Password..."
				errors={form?.errors?.password}
				autocomplete="new-password"
			/>

			<InputGroup
				type="password"
				name="password_confirmation"
				label="Confirm Password"
				value={form?.data?.password_confirmation ?? ''}
				placeholder="Password Confirmation..."
				errors={form?.errors?.password_confirmation}
				autocomplete="new-password"
			/>
		</div>
		<div class="space-x-4">
			<Submit loading={$loading} />
			<span class="flex items-center justify-center">
				Already have an account?
				<a data-sveltekit-preload-data="tap" href="login" class="ml-1 font-bold hover:underline"> Login </a>
			</span>
		</div>
	</form>
</div>
