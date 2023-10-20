import type IMiddlware from '$lib/types/shared/IMiddleware';
import { redirect, type RequestEvent } from '@sveltejs/kit';

const ensureUserHasProfile: IMiddlware = ({ event: { route, locals, url }, abort: abort }) => {
	if (locals.user) {
		if (
			!route.id?.startsWith('/(general)/settings') &&
			locals.user?.profileCompletion?.firstName == false
		) {
			abort({ url, route: '/settings/profile', prev: false });
		}
	}
};

export default ensureUserHasProfile;
