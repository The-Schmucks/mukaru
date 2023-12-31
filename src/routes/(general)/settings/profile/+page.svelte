<script lang="ts">
	import Icon from '$lib/components/ui/icon.svelte';
	import { writable } from 'svelte/store';
	import { enhance } from '$app/forms';
	import type { ActionData, PageData } from './$types';
	import AiOutlineLoading from 'svelte-icons-pack/ai/AiOutlineLoading';
	import AiOutlineSave from 'svelte-icons-pack/ai/AiOutlineSave';
	import EditableInputGroup from '$lib/components/forms/editable-input-group.svelte';
	import EditButton from '$lib/components/ui/buttons/edit-button.svelte';
	import { invalidate } from '$app/navigation';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import Loader from '$lib/utils/address-loader';
	import Pre from '$lib/components/debug/pre.svelte';
	import { json } from '@sveltejs/kit';
	let loading = writable(false);
	let toggleEdit = writable({ avatar: false, info: false, address: false });

	onMount(async () => {
		const loader = new Loader({ form_id: 'settings-profile-address' });
		loader.load();
	});

	export let form: ActionData;
	export let data: PageData;
</script>

<h3 class="mx-3 text-xl">My Profile</h3>

<div class="mx-3 grid grid-cols-2 items-start gap-6 py-5">
	<div class="flex w-full flex-col gap-6">
		<div
			class="flex w-full items-center justify-between rounded-lg border border-black/20 px-8 py-4 dark:border-white/20"
		>
			<div class="flex items-start justify-start">
				<div class="">Avatar</div>
			</div>
			<EditButton
				edit={$toggleEdit.avatar}
				on:click={() => toggleEdit.set({ ...$toggleEdit, avatar: !$toggleEdit.avatar })}
			/>
		</div>

		<div
			class="flex w-full flex-col items-start justify-start space-y-3 rounded-lg border border-black/20 px-8 py-4 transition-all duration-1000 dark:border-white/20"
		>
			<div class="flex w-full items-center justify-between">
				<span class="text-xl font-bold">Personal Information</span>
				<EditButton
					edit={$toggleEdit.info}
					on:click={() => toggleEdit.set({ ...$toggleEdit, info: !$toggleEdit.info })}
				/>
			</div>
			<div class="w-full">
				<form
					class="w-full space-y-8"
					method="POST"
					action="?/info"
					use:enhance={async () => {
						loading.set(true);
						return async ({ result, update }) => {
							loading.set(false);
							await update({ reset: false });
							if (result.status === 200) {
								toggleEdit.set({ ...$toggleEdit, info: !$toggleEdit.info });
								await invalidate((url) => url.pathname === '/settings/profile');
							}
						};
					}}
				>
					{#if form?.profile?.message}
						<span class="text-red-500">{form?.profile?.message}</span>
					{/if}
					<div class="grid w-full grid-cols-2 gap-6">
						<EditableInputGroup
							label="First Name"
							autocomplete="family-name"
							name="firstName"
							placeholder="First Name"
							type="text"
							value={$page.form?.profile?.data?.firstName ?? data.profile.firstName ?? ''}
							errors={$page.form?.profile?.errors?.firstName}
							edit={$toggleEdit.info}
						/>
						<EditableInputGroup
							label="Last Name"
							autocomplete="given-name"
							name="lastName"
							placeholder="Last Name"
							type="text"
							value={$page.form?.profile?.data?.lastName ?? data.profile.lastName ?? ''}
							errors={$page.form?.profile?.errors?.lastName}
							edit={$toggleEdit.info}
						/>
						<EditableInputGroup
							label="Phone Number"
							autocomplete="tel"
							name="phoneNumber"
							placeholder="Phone Number"
							type="number"
							value={$page.form?.profile?.data?.phoneNumber ?? data.profile.phoneNumber ?? ''}
							errors={$page.form?.profile?.errors?.phoneNumber}
							edit={$toggleEdit.info}
						/>
					</div>
					<div class="">
						{#if $toggleEdit.info}
							<button
								type="submit"
								class={`flex items-center justify-center gap-1.5 rounded-md bg-black px-3 py-1 text-white hover:underline disabled:bg-black/80 dark:bg-white dark:text-black disabled:dark:bg-white/80`}
							>
								{#if $loading}
									<Icon src={AiOutlineLoading} class="animate-spin" />
								{:else}
									<Icon src={AiOutlineSave} />
								{/if}
								Save
							</button>
						{/if}
					</div>
				</form>
			</div>
		</div>
	</div>

	<div
		class="flex w-full flex-col items-start justify-start space-y-3 rounded-lg border border-black/20 px-8 py-4 transition-all duration-1000 dark:border-white/20"
	>
		<div class="flex w-full items-center justify-between">
			<span class="text-xl font-bold">Address</span>
			<EditButton
				edit={$toggleEdit.address}
				on:click={() => toggleEdit.set({ ...$toggleEdit, address: !$toggleEdit.address })}
			/>
		</div>
		<div class="w-full">
			<form
				id="settings-profile-address"
				action="?/address"
				method="POST"
				class="w-full space-y-8"
				use:enhance={async () => {
					loading.set(true);
					return async ({ result, update }) => {
						loading.set(false);
						await update({ reset: false });
						if (result.status === 200) {
							toggleEdit.set({ ...$toggleEdit, address: !$toggleEdit.address });
							await invalidate((url) => url.pathname === '/settings/profile');
						}
					};
				}}
			>
				{#if form?.address?.message}
					<span class="text-red-500">{form?.address?.message}</span>
				{/if}
				<div class="flex w-full flex-col space-y-3">
					<input type="hidden" name="place_id" />
					<div class="flex items-center justify-between">
						<EditableInputGroup
							label="Street Address"
							autocomplete="street-address"
							name="street_address"
							placeholder="Street address"
							type="text"
							class="w-[66%]"
							value={form?.address?.data?.street_address ?? data.address.street_address ?? ''}
							errors={form?.address?.errors?.street_address}
							edit={$toggleEdit.address}
						/>
						<EditableInputGroup
							label="City"
							autocomplete="address-level2"
							name="city"
							placeholder="City"
							type="text"
							class="w-[32%]"
							value={form?.address?.data?.city ?? data.address.city ?? ''}
							errors={form?.address?.errors?.city}
							edit={$toggleEdit.address}
						/>
					</div>
					<div class="flex w-full items-center justify-between [&>*]:w-[32%]">
						<EditableInputGroup
							label="State"
							autocomplete="address-level1"
							name="state"
							placeholder="State"
							type="text"
							value={form?.address?.data?.state ?? data.address.state ?? ''}
							errors={form?.address?.errors?.state}
							edit={$toggleEdit.address}
						/>

						<EditableInputGroup
							label="Country"
							autocomplete="country-name"
							name="country"
							placeholder="Country"
							type="text"
							value={form?.address?.data?.country ?? data.address.country ?? ''}
							errors={form?.address?.errors?.country}
							edit={$toggleEdit.address}
						/>

						<EditableInputGroup
							label="Postal Code"
							autocomplete="postal-code"
							name="postal_code"
							placeholder="Postal Code"
							type="text"
							value={form?.address?.data?.postal_code ?? data.address.postal_code ?? ''}
							errors={form?.address?.errors?.postal_code}
							edit={$toggleEdit.address}
						/>
					</div>
				</div>
				<div>
					{#if $toggleEdit.address}
						<button
							type="submit"
							class={`flex items-center justify-center gap-1.5 rounded-md bg-black px-3 py-1 text-white hover:underline disabled:bg-black/80 dark:bg-white dark:text-black disabled:dark:bg-white/80`}
						>
							{#if $loading}
								<Icon src={AiOutlineLoading} class="animate-spin" />
							{:else}
								<Icon src={AiOutlineSave} />
							{/if}
							Save
						</button>
					{/if}
				</div>
			</form>
		</div>
	</div>
</div>
