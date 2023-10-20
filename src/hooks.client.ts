import * as Sentry from '@sentry/svelte';
import type { HandleClientError } from '@sveltejs/kit';
import type { Handle } from '@sveltejs/kit';
import Middleware from '$lib/utils/middleware';
import ensureUserHasProfile from '$lib/shared/ensureUserHasProfile.middleware';
import ensureUserIsStaff from '$lib/shared/ensureUserIsStaff.middleware';
import { PUBLIC_CLIENT_SENTRY_DSN } from '$env/static/public';

Sentry.init({
	dsn: PUBLIC_CLIENT_SENTRY_DSN
});

export const handleError: HandleClientError = async ({ error, event }) => {
	const errorId = crypto.randomUUID();

	Sentry.captureException(error, { extra: { event, errorId } });

	return {
		message: 'Whoops!',
		errorId
	};
};

export const handle = (async ({ event, resolve }) => {
	// Run all middlewares registered in the middleware file
	await new Middleware({ event, list: [ensureUserIsStaff, ensureUserHasProfile] }).run();

	const response = await resolve(event);

	return response;
}) satisfies Handle;
