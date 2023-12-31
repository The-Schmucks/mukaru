import * as Sentry from '@sentry/node';
import api from '$lib/api';
import auth from '$lib/server/auth';
import type { Handle, HandleServerError } from '@sveltejs/kit';
import Middleware from '$lib/utils/middleware';
import Authenticated from '$lib/server/Authenticated.middleware';
import ensureUserHasProfile from '$lib/shared/ensureUserHasProfile.middleware';
import ensureUserIsStaff from '$lib/shared/ensureUserIsStaff.middleware';
import { SERVER_SENTRY_DSN } from '$env/static/private';

Sentry.init({
	dsn: SERVER_SENTRY_DSN
});

export const handleError: HandleServerError = async ({ error, event }) => {
	const errorId = crypto.randomUUID();

	Sentry.captureException(error, { extra: { event, errorId } });

	console.log('Whoops: ', error);

	return {
		message: 'Whoops!',
		errorId
	};
};

export const handle = (async ({ event, resolve }) => {
	await auth.authenticate(event);

	// Run all middlewares registered in the middleware file
	await new Middleware({
		event,
		list: [Authenticated, ensureUserIsStaff, ensureUserHasProfile]
	}).run();

	const response = await resolve(event);

	return response;
}) satisfies Handle;
