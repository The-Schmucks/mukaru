import type { Actions, PageServerLoad } from './$types';
import type IError from '$lib/types/shared/IError';
import type IProfile from '$lib/types/models/profile/IProfile';
import type IAddress from '$lib/types/models/address/IAddress';
import type IModel from '$lib/types/shared/IModel';
import settle from '$lib/utils/settle';
import api from '$lib/api';

export const load = (async (event) => {
	const profileResponse = await api(event).general.get('user_profile');
	const addressResponse = await api(event).general.get('user_address');

	return {
		profile: (await profileResponse.json()) as IProfile,
		address: (await addressResponse.json()) as IAddress
	};
}) satisfies PageServerLoad;

export const actions = {
	info: async (event) => {
		const form = await event.request.formData();

		try {
			const response = await api(event).general.post(`user_profile`, {
				body: JSON.stringify({
					firstName: form.get('firstName'),
					lastName: form.get('lastName'),
					phoneNumber: form.get('phoneNumber')
				})
			});

			return await settle<IProfile, {}>({
				response,
				validation: (data) => ({
					profile: {
						message: data.message,
						errors: data.errors,
						data: {
							firstName: form.get('firstName') as string,
							lastName: form.get('lastName') as string,
							phoneNumber: form.get('phoneNumber') as string
						}
					}
				}),
				done: (data) => ({
					success: true
				})
			});
		} catch (e) {
			throw e;
		}
	},
	address: async (event) => {
		const form = await event.request.formData();

		try {
			const response = await api(event).general.post(`user_address`, {
				body: JSON.stringify({
					street_address: form.get('street_address'),
					city: form.get('city'),
					state: form.get('state'),
					country: form.get('country'),
					postal_code: form.get('postal_code'),
					place_id: form.get('place_id')
				})
			});

			return await settle<Omit<IAddress, keyof IModel | 'place_id'>>({
				response,
				validation: (data) => ({
					address: {
						message: data.message,
						errors: data.errors,
						data: {
							street_address: form.get('street_address') as string,
							city: form.get('city') as string,
							state: form.get('state') as string,
							country: form.get('country') as string,
							postal_code: form.get('postal_code') as string
						}
					}
				}),
				done: (data) => ({
					success: true
				})
			});
		} catch (e) {
			throw e;
		}
	}
} satisfies Actions;
