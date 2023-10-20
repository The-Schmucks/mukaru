import axios from 'axios';
import type { PageServerLoad } from './$types';
import type IToken from '$lib/types/models/auth/IToken';
import settle from '$lib/utils/settle';
import type IPaginate from '$lib/types/shared/IPaginate';

export const load = (async ({ locals }) => {
	try {
		const [mfa, sessions] = await Promise.allSettled([
			axios.get<{ qrCode: string }>(`mfa`),
			axios.get<IPaginate<IToken>>(`sessions`)
		]);

		if (mfa.status === 'fulfilled') {
			if (mfa.value.status === 204) return {};
		}

		const res = {
			mfa: settle({ object: mfa, defaults: ['qrCode'] }),
			sessions: settle({ object: sessions, defaults: ['data', 'per_page'] })
		} satisfies {
			mfa: { qrCode: string };
			sessions: IPaginate<IToken>;
		};

		return res;
	} catch (error) {}
	return {
		mfa: { qrCode: undefined },
		sessions: {} as IPaginate<IToken>
	};
}) satisfies PageServerLoad;
