import type { Cookies } from '@sveltejs/kit';
import axios from 'axios';
import { VITE_API_URL } from '$env/static/private';

const init = ({ cookies, headers, ip }: { cookies: Cookies; headers: Headers; ip: string }) => {
	axios.defaults.baseURL = `${VITE_API_URL.replace(/\/+$/, '')}/api`;
	axios.defaults.withCredentials = true;
	axios.defaults.headers.common['Accept'] = `application/json`;
	axios.defaults.headers.common['Authorization'] = `Bearer ${cookies.get('access_token')}`;
	axios.defaults.headers.common['Cookie'] = `laravel_token=${cookies.get('refresh_token')}`;
	axios.defaults.headers.common['User-Agent'] = headers.get('user-agent');
	axios.defaults.headers.common['X-Forwarded-For'] = ip;

	axios.interceptors.request.use(
		(value) => {
			value.baseURL = `${value.baseURL?.replace(/\/+$/, '')}/`;

			return value;
		},
		(error) => {
			return Promise.reject(error);
		}
	);
};

const auth = () =>
	axios.create({
		baseURL: `${VITE_API_URL.replace(/\/+$/, '')}`
	});

const staff = () =>
	axios.create({
		baseURL: `${VITE_API_URL.replace(/\/+$/, '')}/api/staff`,
		withCredentials: axios.defaults.withCredentials,
		headers: axios.defaults.headers
	});

let api = { init: init, auth: auth, staff };
export default api;
