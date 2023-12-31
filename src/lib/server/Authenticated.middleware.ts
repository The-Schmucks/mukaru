import type IMiddleware from '$lib/types/shared/IMiddleware';
import { redirect, type RequestEvent } from '@sveltejs/kit';

const protectedRoute: Array<string> = ['/(general)/settings', '/(management)'];

const Authenticated: IMiddleware = ({ event: { route, locals, url }, abort: next }) => {
	if (protectedRoute.some((x) => route.id?.startsWith(x)) && !locals.user) {
		next({ url });
	}
};

export default Authenticated;
