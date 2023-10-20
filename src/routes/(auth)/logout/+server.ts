import axios from 'axios';
import type { RequestHandler } from './$types';
import { redirect } from '@sveltejs/kit';

export const GET = (async ({ cookies }) => {
	try {
		await axios.get('logout');
	} catch (error) {}
	cookies.delete('access_token');
	cookies.delete('refresh_token');

	throw redirect(302, '/');

	// return new Response('/');
}) satisfies RequestHandler;
