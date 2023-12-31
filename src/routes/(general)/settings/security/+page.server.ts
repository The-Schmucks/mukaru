import type { PageServerLoad } from './$types';
import type IToken from '$lib/types/models/auth/IToken';
import type IPaginate from '$lib/types/shared/IPaginate';
import api from '$lib/api';

export const load = (async (event) => {
	const mfaResponse = await api(event).general.get('mfa');
	const sessionsResponse = await api(event).general.get('sessions');
	return {
		mfa: (await mfaResponse.json()) as { qrCode: string },
		sessions: (await sessionsResponse.json()) as IPaginate<IToken>
	};
}) satisfies PageServerLoad;
