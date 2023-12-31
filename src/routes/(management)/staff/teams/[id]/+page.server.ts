import { type Actions } from '@sveltejs/kit';
import api from '$lib/api';
import type ITeam from '$lib/types/models/team/ITeam';
import type { PageServerLoad } from './$types';
import type IError from '$lib/types/shared/IError';
import type IAddress from '$lib/types/models/address/IAddress';
import type IModel from '$lib/types/shared/IModel';
import settle from '$lib/utils/settle';

type IAddressError = IError<Omit<IAddress, keyof IModel | 'place_id'>>;

export const load = (async (event) => {
	const teamsResponse = await api(event).staff.get(`teams/${event.params.id}`);
	const addressResponse = await api(event).staff.get(`teams/${event.params.id}/address`);

	return {
		team: (await teamsResponse.json()) as ITeam,
		address: (await addressResponse.json()) as IAddress
	} satisfies {
		team: Omit<ITeam, keyof IModel>;
		address: Omit<IAddress, keyof IModel | 'place_id'>;
	};
}) satisfies PageServerLoad;

export const actions = {
	team: async (event) => {
		const form = await event.request.formData();

		try {
			const response = await api(event).staff.post(`teams/${event.params.id}`, {
				body: JSON.stringify({ name: form.get('name') })
			});

			return await settle<{ name: string }>({
				response,
				validation: (data) => ({
					team: {
						message: data.message,
						errors: data.errors,
						data: { name: form.get('name') as string }
					}
				}),
				done: (data) => ({ success: true })
			});
		} catch (e) {
			throw e;
		}
	},
	address: async (event) => {
		const form = await event.request.formData();

		try {
			const response = await api(event).staff.post(`teams/${event.params.id}/address`, {
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
				})
			});
		} catch (e) {
			throw e;
		}
	}
} satisfies Actions;
