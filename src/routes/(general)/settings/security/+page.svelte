<script lang="ts">
	import EditButton from '$lib/components/ui/buttons/edit-button.svelte';
	import { writable } from 'svelte/store';
	import type { PageData } from './$types';
	import axios from 'axios';
	import { invalidate, invalidateAll } from '$app/navigation';
	import Pre from '$lib/components/debug/pre.svelte';

	let toggleEdit = writable({ mfa: false });

	export let data: PageData;

	let mfEnabled: boolean = data.mfa?.qrCode !== undefined;

	const toggleMfa = async () => {
		mfEnabled = !mfEnabled;
		const payload = mfEnabled ? 'on' : 'off';
		try {
			const res = await axios.post<{ invalidate: boolean }>(`/settings/security/mfa`, {
				payload
			});

			if (res.data.invalidate == true) {
				await invalidateAll();
			} else mfEnabled = !mfEnabled;
		} catch (error) {
			mfEnabled = !mfEnabled;
		}
	};
</script>

<h3 class="mx-3 text-xl">Security</h3>

<div class="mx-3 py-5 gap-6 flex items-start">
	<div class="w-1/4 flex flex-col gap-6">
		<div
			class="flex flex-col items-center justify-start w-full border border-black/20 dark:border-white/20 rounded-lg py-4 px-8 space-y-3"
		>
			<div class="flex items-center justify-between w-full">
				<span class="text-lg">Multi Factor Auth</span>
				<button
					class={`w-7 h-4 flex items-center bg-black dark:bg-white rounded-full mx-0.5 px-0.5 hover:cursor-pointer`}
					on:click={toggleMfa}
				>
					<div
						class={`${
							mfEnabled ? 'translate-x-3' : 'translate-x-0'
						} dark:bg-black bg-white w-3 h-3 rounded-full shadow-md transition-transform ease-in-out`}
					/>
				</button>
			</div>
			{#if data.mfa?.qrCode}
				<div class="w-9/12 py-4">
					<img src={data.mfa?.qrCode} alt="" class="aspect-square w-full" />
				</div>
			{/if}
		</div>
	</div>
	<div class="w-2/3 border border-black/20 dark:border-white/20 rounded-lg py-4 px-8 space-y-3">
		<span class="text-lg">Recent Activity</span>
		<table class="w-full">
			<thead>
				<tr>
					<th>Location</th>
					<th>Last Active</th>
					<th>Expiration</th>
					<th>Status</th>
					<th>Action</th>
				</tr>
			</thead>
			<tbody>
				<!-- {#if data.tokens}
					{#each data.tokens.data as token}
						<tr>
							<td>{token.owner?.ip_address ?? ''}</td>
							<td />
							<td>{token.revoked}</td>
							<td />
						</tr>
					{/each}
				{/if} -->
			</tbody>
		</table>
	</div>
</div>
