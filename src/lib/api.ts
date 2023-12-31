import type { RequestEvent } from '@sveltejs/kit';
import { VITE_API_URL } from '$env/static/private';

const api = (event: RequestEvent) => {
	const baseUrl = `${VITE_API_URL.replace(/\/+$/, '')}`;
	const headers = {
		Authorization: `Bearer ${event.cookies.get('access_token')}`,
		Accept: 'application/json',
		'Content-Type': 'application/json',
		'X-Forwarded-For': event.getClientAddress(),
		'user-agent': event.request.headers.get('user-agent') ?? 'node'
	};

	const instances = {
		auth: {
			get: async (url: string, init?: RequestInit) =>
				await event.fetch(`${baseUrl}/${url}`, { ...init, headers: headers, method: 'GET' }),
			post: async (url: string, init?: RequestInit) =>
				await event.fetch(`${baseUrl}/${url}`, { ...init, headers: headers, method: 'POST' }),
			update: async (url: string, init?: RequestInit) =>
				await event.fetch(`${baseUrl}/${url}`, { ...init, headers: headers, method: 'UPDATE' }),
			delete: async (url: string, init?: RequestInit) =>
				await event.fetch(`${baseUrl}/${url}`, { ...init, headers: headers, method: 'DELETE' })
		},
		staff: {
			get: async (url: string, init?: RequestInit) =>
				await event.fetch(`${baseUrl}/api/staff/${url}`, { ...init, headers: headers, method: 'GET' }),
			post: async (url: string, init?: RequestInit) =>
				await event.fetch(`${baseUrl}/api/staff/${url}`, { ...init, headers: headers, method: 'POST' }),
			update: async (url: string, init?: RequestInit) =>
				await event.fetch(`${baseUrl}/api/staff/${url}`, { ...init, headers: headers, method: 'UPDATE' }),
			delete: async (url: string, init?: RequestInit) =>
				await event.fetch(`${baseUrl}/api/staff/${url}`, { ...init, headers: headers, method: 'DELETE' })
		},
		general: {
			get: async (url: string, init?: RequestInit) =>
				await event.fetch(`${baseUrl}/api/${url}`, { ...init, headers: headers, method: 'GET' }),
			post: async (url: string, init?: RequestInit) =>
				await event.fetch(`${baseUrl}/api/${url}`, { ...init, headers: headers, method: 'POST' }),
			update: async (url: string, init?: RequestInit) =>
				await event.fetch(`${baseUrl}/api/${url}`, { ...init, headers: headers, method: 'UPDATE' }),
			delete: async (url: string, init?: RequestInit) =>
				await event.fetch(`${baseUrl}/api/${url}`, { ...init, headers: headers, method: 'DELETE' })
		}
	};

	return instances;
};
export default api;
