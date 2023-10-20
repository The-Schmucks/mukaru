import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import axios, { AxiosError } from 'axios';
import type { IAuth, IRegisterRequest } from '$lib/types/models/auth/IAuth';
import type IError from '$lib/types/shared/IError';

export const load: PageServerLoad = async ({ locals }) => {
	if (locals.user) throw redirect(302, '/');
};

export const actions = {
	default: async (event) => {
		const form = await event.request.formData();

		try {
			const response = await axios.post('/register', {
				email: form.get('email'),
				password: form.get('password'),
				password_confirmation: form.get('password_confirmation')
			});
			throw redirect(303, '/');
		} catch (e) {
			if (axios.isAxiosError(e)) {
				const { response } = e as AxiosError<IError<IRegisterRequest>>;
				return fail(response?.status ?? 500, {
					message: response?.data.message,
					errors: response?.data.errors,
					data: {
						email: form.get('email'),
						password: form.get('password'),
						password_confirmation: form.get('password_confirmation')
					} as IRegisterRequest
				});
			}
			throw e;
		}
	}
} satisfies Actions;
