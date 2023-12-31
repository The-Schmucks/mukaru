<script lang="ts">
	import Pre from '$lib/components/debug/pre.svelte';
	import Input from '$lib/components/forms/input.svelte';
	import EditButton from '$lib/components/ui/buttons/edit-button.svelte';
	import Icon from '$lib/components/ui/icon.svelte';
	import AiOutlineEdit from 'svelte-icons-pack/ai/AiOutlineEdit';
	import AiOutlineDelete from 'svelte-icons-pack/ai/AiOutlineDelete';
	import type { PageData } from '../$types';
	import type { PageServerData } from './$types';

	export let data: PageServerData;
</script>

<div class="w-full border-collapse rounded-t-xl border border-black/20 px-6 py-3 dark:border-white/20">
	<!-- <Pre object={data.teams} /> -->
	<table class="w-full">
		<thead class="border-b">
			<tr class="child:pb-4 child:pt-2.5 child:text-start child:text-sm">
				<th class="w-8 !text-center">
					<div>
						<input
							class="form-checkbox border-black bg-white text-black ring-black focus:bg-white dark:border-white dark:bg-black dark:text-white dark:ring-white focus:dark:bg-black"
							type="checkbox"
							checked
						/>
					</div>
				</th>
				<th>Name</th>
				<th>Owner</th>
				<th>Contact</th>
				<th>Properties</th>
				<th>Members</th>
				<th class="w-10 pr-5">Action</th>
			</tr>
		</thead>
		<tbody>
			{#each data.teams.data as row}
				<tr class="text-xs child:py-3.5 hover:bg-neutral-200 dark:hover:bg-neutral-900">
					<td class="w-8 !text-center">
						<div>
							<input
								class="form-checkbox border-black bg-white text-black ring-black focus:bg-white dark:border-white dark:bg-black dark:text-white dark:ring-white focus:dark:bg-black"
								type="checkbox"
								checked
							/>
						</div>
					</td>
					<td>
						<a href={`/staff/teams/${row.id}`} class="hover:underline">{row.name}</a>
					</td>
					<td>
						{row.users?.at(0)?.profile?.firstName ?? 'N/A'}
					</td>
					<td>{row.users?.at(0)?.email ?? 'N/A'}</td>
					<td>
						{row.properties_count ?? 'N/A'}
					</td>
					<td>{row.users_count}</td>
					<td class="flex items-center justify-start gap-5 pr-5">
						<a
							href={`/staff/teams/${row.id}`}
							class="flex items-center justify-center gap-1 transition-all hover:scale-110 hover:text-indigo-500 hover:underline"
						>
							<Icon src={AiOutlineEdit} class="h-4 w-4" />
							<span>Edit</span>
						</a>
						<button
							class="flex items-center justify-center gap-1 transition-all hover:scale-110 hover:text-red-500 hover:underline"
						>
							<Icon src={AiOutlineDelete} class="h-4 w-4" />
							<span>Delete</span>
						</button>
					</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>
