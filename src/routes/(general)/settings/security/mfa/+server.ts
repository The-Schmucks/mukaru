import type { RequestHandler } from './$types';
import { json } from '@sveltejs/kit';
import api from '$lib/api';

export const POST = (async (event) => {
	const formData: { payload: 'on' | 'off' } = await event.request.json();
	try {
		if (formData.payload == 'on') await api(event).general.post('mfa/on');
		else await api(event).general.post('mfa/off');
	} catch (error) {
		return json({ invalidate: false });
	}

	return json({
		invalidate: true
	});
}) satisfies RequestHandler;
