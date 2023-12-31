<script lang="ts">
	import { writable } from 'svelte/store';
	import type { PageData } from './$types';
	import { invalidate, invalidateAll } from '$app/navigation';

	let toggleEdit = writable({ mfa: false });

	export let data: PageData;

	let mfEnabled: boolean = data.mfa?.qrCode !== undefined;

	const toggleMfa = async () => {
		mfEnabled = !mfEnabled;
		const payload = mfEnabled ? 'on' : 'off';
		try {
			const res = await fetch(`/settings/security/mfa`, {
				body: JSON.stringify({ payload: payload }),
				method: 'POST'
			});

			const data = (await res.json()) as { invalidate: boolean };

			if (data.invalidate == true) {
				await invalidateAll();
			} else mfEnabled = !mfEnabled;
		} catch (error) {
			mfEnabled = !mfEnabled;
		}
	};
</script>

<h3 class="mx-3 text-xl">Security</h3>

<div class="mx-3 flex items-start gap-6 py-5">
	<div class="flex w-1/4 flex-col gap-6">
		<div
			class="flex w-full flex-col items-center justify-start space-y-3 rounded-lg border border-black/20 px-8 py-4 dark:border-white/20"
		>
			<div class="flex w-full items-center justify-between">
				<span class="text-lg">Multi Factor Auth</span>
				<button
					class={`mx-0.5 flex h-4 w-7 items-center rounded-full bg-black px-0.5 hover:cursor-pointer dark:bg-white`}
					on:click={toggleMfa}
				>
					<div
						class={`${
							mfEnabled ? 'translate-x-3' : 'translate-x-0'
						} h-3 w-3 rounded-full bg-white shadow-md transition-transform ease-in-out dark:bg-black`}
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
	<div class="w-2/3 space-y-3 rounded-lg border border-black/20 px-8 py-4 dark:border-white/20">
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
				<!-- {#if data.sessions}
					{#each data.sessions.data as token}
						<tr>
							<td>{token.activity?.ip_address ?? ''}</td>
							<td>{token.activity}</td>
							<td>{token.revoked}</td>
						</tr>
					{/each}
				{/if} -->
			</tbody>
		</table>
	</div>
</div>
