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

<div
	class="w-full rounded-t-xl border border-collapse border-black/20 dark:border-white/20 py-3 px-6"
>
	<table class="w-full">
		<thead class="border-b">
			<tr class="child:text-start child:text-sm child:pb-4 child:pt-2.5">
				<th class="w-10 pl-5">
					<div>
						<input
							class="form-checkbox text-black dark:text-white ring-black dark:ring-white border-black dark:border-white bg-white dark:bg-black focus:bg-white focus:dark:bg-black"
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
				<tr class="text-xs child:py-3.5 hover:bg-neutral-200">
					<td class="w-10 pl-5">
						<div>
							<input
								class="form-checkbox text-black dark:text-white ring-black dark:ring-white border-black dark:border-white bg-white dark:bg-black focus:bg-white focus:dark:bg-black"
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
							class="hover:underline flex items-center justify-center gap-1 hover:text-indigo-500 transition-all hover:scale-110"
						>
							<Icon src={AiOutlineEdit} class="w-4 h-4" />
							<span>Edit</span>
						</a>
						<button
							class="hover:underline flex items-center justify-center gap-1 hover:text-red-500 transition-all hover:scale-110"
						>
							<Icon src={AiOutlineDelete} class="w-4 h-4" />
							<span>Delete</span>
						</button>
					</td>
				</tr>
			{/each}
		</tbody>
	</table>
	<Pre object={data.teams} />
</div>
