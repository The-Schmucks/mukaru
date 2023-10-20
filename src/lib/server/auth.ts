import type IUser from '$lib/types/models/user/IUser';
import type { Cookies, RequestEvent } from '@sveltejs/kit';
import axios, { AxiosError } from 'axios';
import { AUTH_CLIENT_ID, AUTH_CLIENT_SECRET } from '$env/static/private';
import api from '$lib/api';
import type { ILoginResponse } from '$lib/types/models/auth/IAuth';

const getUser = async ({
	locals,
	cookies,
	headers
}: {
	locals: App.Locals;
	cookies: Cookies;
	headers: RequestEvent['request']['headers'];
}) => {
	let count = 1;
	if (count > 5) return;
	if (cookies.get('access_token') !== undefined && cookies.get('refresh_token') !== undefined) {
		try {
			const response = await axios.get<
				Pick<IUser, 'id' | 'email' | 'roles' | 'permissions' | 'avatar'> & {
					profile?: {
						firstName: string;
						lastName: string;
					};
				}
			>('/user');

			locals.user = {
				id: response.data.id,
				email: response.data.email,
				firstName: response.data.profile?.firstName!,
				lastName: response.data.profile?.lastName!,
				roles: response.data.roles,
				permissions: response.data.permissions,
				avatar: response.data.avatar
			};
		} catch (e) {
			if (axios.isAxiosError(e)) {
				const error = e as AxiosError;
				if (error.response?.status === 401) {
				}
			}
		}
	} else if (cookies.get('refresh_token')) {
		count = count + 1;
		await refreshToken({ cookies: cookies, locals: locals });
		await getUser({ cookies: cookies, locals: locals, headers: headers });
	}
};

const refreshToken = async ({ cookies, locals }: { cookies: Cookies; locals: App.Locals }) => {
	try {
		const response = await api.auth().post<ILoginResponse>('oauth/token', {
			grant_type: 'refresh_token',
			refresh_token: cookies.get('refresh_token'),
			client_id: AUTH_CLIENT_ID,
			client_secret: AUTH_CLIENT_SECRET,
			scope: ''
		});

		auth.setAccessTokens({
			cookies: cookies,
			access_token: response.data.access_token,
			expires_in: response.data.expires_in
		});

		auth.setRefreshTokens({
			cookies: cookies,
			refresh_token: response.data.refresh_token
		});
	} catch (error) {
		const e = error as AxiosError<{ error: string }>;

		auth.setRefreshTokens({
			cookies: cookies,
			refresh_token: ''
		});

		auth.deleteTokens({ cookies });
	}
};

const auth = {
	authenticate: async ({
		locals,
		cookies,
		headers
	}: {
		locals: App.Locals;
		cookies: Cookies;
		headers: RequestEvent['request']['headers'];
	}) => {
		await getUser({ locals: locals, cookies: cookies, headers });
	},
	setAccessTokens: ({
		cookies,
		access_token,
		expires_in
	}: {
		access_token: string;
		expires_in: number;
		cookies: Cookies;
	}) => {
		cookies.set('access_token', access_token, {
			path: '/',
			httpOnly: true,
			sameSite: 'strict',
			secure: process.env.NODE_ENV == 'production',
			maxAge: expires_in
		});
	},
	setRefreshTokens: ({ cookies, refresh_token }: { refresh_token: string; cookies: Cookies }) => {
		cookies.set('refresh_token', refresh_token, {
			path: '/',
			httpOnly: true,
			sameSite: 'strict',
			secure: process.env.NODE_ENV == 'production',
			maxAge: 60 * 60 * 24 * 30
		});
	},
	deleteTokens: ({ cookies }: { cookies: Cookies }) => {
		cookies.delete('access_token');
		cookies.delete('refresh_token');
	}
};

export default auth;
