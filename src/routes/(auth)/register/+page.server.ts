import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import type { IRegisterError, IRegisterRequest } from '$lib/types/models/auth/IAuth';
import api from '$lib/api';

export const load: PageServerLoad = async ({ locals }) => {
	if (locals.user) redirect(302, '/');
};

export const actions = {
	default: async (event) => {
		const form = await event.request.formData();

		try {
			const response = await api(event).general.post('/register', {
				body: JSON.stringify({
					email: form.get('email'),
					password: form.get('password'),
					password_confirmation: form.get('password_confirmation')
				})
			});

			if (response.status === 400 || response.status === 422) {
				const data = (await response.json()) as IRegisterError;

				return fail(response.status, {
					message: data.message,
					errors: data.errors,
					data: {
						email: form.get('email'),
						password: form.get('password'),
						password_confirmation: form.get('password_confirmation')
					} as IRegisterRequest
				});
			} else if (response.status !== 200) {
				throw Error('Something wrong with the api');
			}
			redirect(303, '/');
		} catch (e) {
			throw e;
		}
	}
} satisfies Actions;
