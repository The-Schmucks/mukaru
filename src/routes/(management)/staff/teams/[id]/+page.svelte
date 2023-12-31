<script lang="ts">
	import Pre from '$lib/components/debug/pre.svelte';
	import type { ActionData, PageServerData } from './$types';
	import BreadCrumb from '$lib/components/ui/BreadCrumb.svelte';
	import EditButton from '$lib/components/ui/buttons/edit-button.svelte';
	import { writable } from 'svelte/store';
	import { enhance } from '$app/forms';
	import { page } from '$app/stores';
	import { invalidate } from '$app/navigation';
	import EditableInputGroup from '$lib/components/forms/editable-input-group.svelte';
	import AiOutlineLoading from 'svelte-icons-pack/ai/AiOutlineLoading';
	import AiOutlineSave from 'svelte-icons-pack/ai/AiOutlineSave';
	import Icon from '$lib/components/ui/icon.svelte';
	import { onMount } from 'svelte';
	import Loader from '$lib/utils/address-loader';

	let toggleEdit = writable({ team: false, address: true });
	let loading = false;
	export let form: ActionData;
	export let data: PageServerData;

	onMount(async () => {
		const loader = new Loader({ form_id: 'staff-teams-edit-address' });
		loader.load();
	});
</script>

<BreadCrumb links={['Staff', 'Teams']} />
<div class="mx-3 mt-3 grid grid-cols-2 items-start gap-6">
	<div
		class="flex flex-col items-start justify-start space-y-3 rounded-lg border border-black/20 px-8 py-4 transition-all duration-1000 dark:border-white/20"
	>
		<div class="flex w-full items-center justify-between">
			<span class="text-xl font-bold">Team Info</span>
			<EditButton
				edit={$toggleEdit.team}
				on:click={() => toggleEdit.set({ ...$toggleEdit, team: !$toggleEdit.team })}
			/>
		</div>
		<div class="w-full">
			<form
				class="w-full space-y-8"
				method="POST"
				action="?/team"
				use:enhance={async () => {
					loading = true;
					return async ({ result, update }) => {
						loading = false;
						await update({ reset: false });
						if (result.status === 200) {
							toggleEdit.set({ ...$toggleEdit, team: !$toggleEdit.team });
							await invalidate((url) => url.pathname === `/staff/teams/${$page.params.id}`);
						}
					};
				}}
			>
				{#if form?.team?.message}
					<span class="text-red-500">{form?.team?.message}</span>
				{/if}
				<div class="w-full">
					<EditableInputGroup
						label="Name"
						autocomplete="name"
						name="name"
						placeholder=" Name"
						type="text"
						value={$page.form?.team?.data?.name ?? data.team.name ?? ''}
						errors={$page.form?.team?.errors?.name}
						edit={$toggleEdit.team}
					/>
				</div>
				<div class="">
					{#if $toggleEdit.team}
						<button
							type="submit"
							class={`flex items-center justify-center gap-1.5 rounded-md bg-black px-3 py-2 text-sm text-white hover:underline disabled:bg-black/80 dark:bg-white dark:text-black disabled:dark:bg-white/80`}
						>
							{#if loading}
								<Icon src={AiOutlineLoading} class="h-5 w-5 animate-spin" />
							{:else}
								<Icon src={AiOutlineSave} class="h-5 w-5" />
							{/if}
							Save
						</button>
					{/if}
				</div>
			</form>
		</div>
	</div>

	<div
		class="flex flex-col items-start justify-start space-y-3 rounded-lg border border-black/20 px-8 py-4 transition-all duration-1000 dark:border-white/20"
	>
		<div class="flex w-full items-center justify-between">
			<span class="text-xl font-bold">Team Address</span>
			<EditButton
				edit={$toggleEdit.address}
				on:click={() => toggleEdit.set({ ...$toggleEdit, team: !$toggleEdit.address })}
			/>
		</div>
		<div class="w-full">
			<form
				class="w-full space-y-8"
				method="POST"
				action="?/address"
				use:enhance={async () => {
					loading = true;
					return async ({ result, update }) => {
						loading = false;
						await update({ reset: false });
						if (result.status === 200) {
							toggleEdit.set({ ...$toggleEdit, team: !$toggleEdit.address });
							await invalidate((url) => url.pathname === `/staff/teams/${$page.params.id}`);
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
				<div class="">
					{#if $toggleEdit.team}
						<button
							type="submit"
							class={`flex items-center justify-center gap-1.5 rounded-md bg-black px-3 py-2 text-sm text-white hover:underline disabled:bg-black/80 dark:bg-white dark:text-black disabled:dark:bg-white/80`}
						>
							{#if loading}
								<Icon src={AiOutlineLoading} class="h-5 w-5 animate-spin" />
							{:else}
								<Icon src={AiOutlineSave} class="h-5 w-5" />
							{/if}
							Save
						</button>
					{/if}
				</div>
			</form>
		</div>
	</div>
</div>

<Pre object={data.team} />
