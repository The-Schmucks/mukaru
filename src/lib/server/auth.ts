import type IUser from '$lib/types/models/user/IUser';
import type { Cookies, RequestEvent } from '@sveltejs/kit';
import { AUTH_CLIENT_ID, AUTH_CLIENT_SECRET } from '$env/static/private';
import api from '$lib/api';
import type { ILoginResponse } from '$lib/types/models/auth/IAuth';

const getUser = async (event: RequestEvent) => {
	let count = 1;
	if (count > 5) {
		auth.deleteTokens({ cookies: event.cookies });
		return;
	}
	if (
		![undefined, 'undefined'].includes(event.cookies.get('access_token')) &&
		![undefined, 'undefined'].includes(event.cookies.get('refresh_token'))
	) {
		try {
			type ICurrentUser = Pick<IUser, 'id' | 'email' | 'roles' | 'permissions' | 'avatar'> & {
				profile?: {
					firstName: string;
					lastName: string;
				};
			};

			const response = await api(event).general.get('user');
			const data = (await response.json()) as ICurrentUser;

			event.locals.user = {
				id: data.id,
				email: data.email,
				firstName: data.profile?.firstName!,
				lastName: data.profile?.lastName!,
				roles: data.roles,
				permissions: data.permissions,
				avatar: data.avatar
			};
		} catch (e) {
			count = count + 1;
			await refreshToken(event);
			await getUser(event);
		}
	} else if (event.cookies.get('refresh_token')) {
		count = count + 1;
		await refreshToken(event);
		await getUser(event);
	} else{
		auth.deleteTokens({ cookies: event.cookies });
	}
};

const refreshToken = async (event: RequestEvent) => {
	try {
		const body = JSON.stringify({
			grant_type: 'refresh_token',
			refresh_token: event.cookies.get('refresh_token'),
			client_id: AUTH_CLIENT_ID,
			client_secret: AUTH_CLIENT_SECRET,
			scope: ''
		});

		const response = await api(event).auth.post('oauth/token', { body });
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
	} catch (error) {
		auth.setRefreshTokens({
			cookies: event.cookies,
			refresh_token: ''
		});

		auth.deleteTokens({ cookies: event.cookies });
	}
};

const auth = {
	authenticate: async (event: RequestEvent) => {
		await getUser(event);
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
		cookies.delete('access_token', { path: '/' });
		cookies.delete('refresh_token', { path: '/' });
	}
};

export default auth;
