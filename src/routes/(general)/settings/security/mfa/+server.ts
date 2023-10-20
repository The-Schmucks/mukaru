import axios from 'axios';
import type { RequestHandler } from './$types';
import { json, redirect } from '@sveltejs/kit';

export const POST = (async ({ request }) => {
	const formData: { payload: 'on' | 'off' } = await request.json();
	try {
		if (formData.payload == 'on') await axios.post('mfa/on');
		else await axios.post('mfa/off');
	} catch (error) {
		return json({ invalidate: false });
	}

	return json({
		invalidate: true
	});
}) satisfies RequestHandler;
