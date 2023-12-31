import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import type { ILoginError, ILoginResponse } from '$lib/types/models/auth/IAuth';
import { AUTH_CLIENT_ID, AUTH_CLIENT_SECRET } from '$env/static/private';
import api from '$lib/api';
import auth from '$lib/server/auth';

export const load: PageServerLoad = async ({ locals }) => {
	if (locals.user) redirect(302, '/');
};

export const actions = {
	default: async (event) => {
		const form = await event.request.formData();
		try {
			const response = await api(event).auth.post('oauth/token', {
				body: JSON.stringify({
					grant_type: 'password',
					client_id: `${AUTH_CLIENT_ID}`,
					client_secret: `${AUTH_CLIENT_SECRET}`,
					username: form.get('email'),
					password: form.get('password'),
					scope: ''
				})
			});

			if (response.status === 400 || response.status === 422) {
				const data = (await response.json()) as ILoginError;
				return fail(response?.status!, {
					message: data.message,
					errors: data.errors,
					data: { email: form.get('email'), password: form.get('password') } as {
						[key: string]: string;
					}
				});
			} else if (response.status !== 200) {
				throw Error('Something wrong with the api');
			}

			const data = (await response.json()) as ILoginResponse;

			auth.setAccessTokens({
				cookies: event.cookies,
				access_token: data.access_token,
				expires_in: data.expires_in
			});

			auth.setRefreshTokens({
				cookies: event.cookies,
				refresh_token: data.refresh_token
			});
			const redirectTo = event.url.searchParams.get('from');

			if (redirectTo) redirect(302, `/${redirectTo.slice(1)}`);
			redirect(302, `/`);
		} catch (e) {
			throw e;
		}
	}
} satisfies Actions;
