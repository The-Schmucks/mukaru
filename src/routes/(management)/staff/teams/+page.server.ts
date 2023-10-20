import type { PageServerLoad } from '../$types';
import type ITeam from '$lib/types/models/team/ITeam';
import settle from '$lib/utils/settle';
import type IPaginate from '$lib/types/shared/IPaginate';
import api from '$lib/api';
import { IPaginateKeys } from '$lib/types/shared/IPaginate';

export const load = (async (event) => {
	try {
		const [teams] = await Promise.allSettled([api.staff().get<IPaginate<ITeam>>(`teams`)]);
		return {
			teams: settle({
				object: teams,
				defaults: IPaginateKeys as Array<keyof IPaginate<ITeam>>
			})
		} satisfies {
			teams: IPaginate<ITeam>;
		};
	} catch (error) {
		return {
			teams: {
				data: [],
				next_cursor: '',
				next_page_url: '',
				path: '',
				per_page: 15,
				prev_cursor: '',
				prev_page_url: ''
			}
		} satisfies {
			teams: IPaginate<ITeam>;
		};
	}
}) satisfies PageServerLoad;
