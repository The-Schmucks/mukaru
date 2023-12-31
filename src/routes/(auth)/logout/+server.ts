import api from '$lib/api';
import type { RequestHandler } from './$types';
import { redirect } from '@sveltejs/kit';

export const GET = (async (event) => {
	try {
		await api(event).general.get('logout');
	} catch (error) {}

	event.cookies.delete('access_token', { path: '/' });
	event.cookies.delete('refresh_token', { path: '/' });

	redirect(302, '/');

	// return new Response('/');
}) satisfies RequestHandler;
