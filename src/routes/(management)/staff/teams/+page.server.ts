import type { PageServerLoad } from '../$types';
import type ITeam from '$lib/types/models/team/ITeam';
import type IPaginate from '$lib/types/shared/IPaginate';
import api from '$lib/api';

export const load = (async (event) => {
	const teamsResponse = await api(event).staff.get(`teams`);
	return {
		teams: (await teamsResponse.json()) as IPaginate<ITeam>
	};
}) satisfies PageServerLoad;
