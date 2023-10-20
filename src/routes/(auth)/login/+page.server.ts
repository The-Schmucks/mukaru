import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import axios, { type AxiosError } from 'axios';
import type { ILoginError, ILoginResponse } from '$lib/types/models/auth/IAuth';
import type IError from '$lib/types/shared/IError';
import { AUTH_CLIENT_ID, AUTH_CLIENT_SECRET, VITE_API_URL } from '$env/static/private';
import api from '$lib/api';
import auth from '$lib/server/auth';

export const load: PageServerLoad = async ({ locals }) => {
	if (locals.user) throw redirect(302, '/');
};

export const actions = {
	default: async (event) => {
		const form = await event.request.formData();
		try {
			const response = await api.auth().post<ILoginResponse>(
				'/oauth/token',
				{
					grant_type: 'password',
					client_id: `${AUTH_CLIENT_ID}`,
					client_secret: `${AUTH_CLIENT_SECRET}`,
					username: form.get('email'),
					password: form.get('password'),
					scope: ''
				},
				{ baseURL: `${VITE_API_URL.replace(/\/+$/, '')}` }
			);

			auth.setAccessTokens({
				cookies: event.cookies,
				access_token: response.data.access_token,
				expires_in: response.data.expires_in
			});

			auth.setRefreshTokens({
				cookies: event.cookies,
				refresh_token: response.data.refresh_token
			});
			const redirectTo = event.url.searchParams.get('from');

			if (redirectTo) throw redirect(302, `/${redirectTo.slice(1)}`);
			throw redirect(302, `/`);
		} catch (e) {
			if (axios.isAxiosError(e)) {
				const { response } = e as AxiosError<IError<ILoginError>>;
				return fail(response?.status!, {
					message: response?.data.message,
					errors: response?.data.errors,
					data: { email: form.get('email'), password: form.get('password') } as {
						[key: string]: string;
					}
				});
			}
			throw e;
		}
	}
} satisfies Actions;
