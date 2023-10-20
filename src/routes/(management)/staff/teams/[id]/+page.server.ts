import { error, fail, type Actions } from '@sveltejs/kit';
import api from '$lib/api';
import type ITeam from '$lib/types/models/team/ITeam';
import type { PageServerLoad } from './$types';
import axios, { AxiosError } from 'axios';
import type IError from '$lib/types/shared/IError';
import type IAddress from '$lib/types/models/address/IAddress';
import type IModel from '$lib/types/shared/IModel';
import settle from '$lib/utils/settle';

type IAddressError = IError<Omit<IAddress, keyof IModel | 'place_id'>>;

export const load = (async ({ params }) => {
	try {
		const [team, address] = await Promise.allSettled([
			axios.get<ITeam>(`teams/${params.id}`),
			axios.get<IAddress>(`teams/${params.id}/address`)
		]);

		return {
			team: settle({ object: team, defaults: ['name'] }),
			address: settle({
				object: address,
				defaults: ['city', 'country', 'postal_code', 'state', 'street_address']
			})
		} satisfies {
			team: Omit<ITeam, keyof IModel>;
			address: Omit<IAddress, keyof IModel | 'place_id'>;
		};
	} catch (error) {
		return {
			team: {
				name: ''
			},
			address: {
				city: '',
				country: '',
				postal_code: '',
				state: '',
				street_address: ''
			}
		} satisfies {
			team: Omit<ITeam, keyof IModel>;
			address: Omit<IAddress, keyof IModel | 'place_id'>;
		};
	}
}) satisfies PageServerLoad;

export const actions = {
	team: async ({ request, params }) => {
		const form = await request.formData();

		try {
			const result = await axios.post<{ name: string }>(`teams/${params.id}`, {
				name: form.get('name')
			});
			return { success: true };
		} catch (e) {
			if (axios.isAxiosError(e)) {
				const { response } = e as AxiosError<IError<{ name: string }>>;
				return fail(response?.status!, {
					team: {
						message: response?.data.message,
						errors: response?.data.errors,
						data: {
							name: form.get('name')
						} as {
							name: string;
						}
					}
				});
			}
			throw e;
		}
	},
	address: async ({ request, params }) => {
		const form = await request.formData();

		try {
			const result = await axios.post<Omit<IAddress, keyof IModel | 'place_id'>>(
				`teams/${params.id}/address`,
				{
					street_address: form.get('street_address'),
					city: form.get('city'),
					state: form.get('state'),
					country: form.get('country'),
					postal_code: form.get('postal_code'),
					place_id: form.get('place_id')
				}
			);
			return { success: true };
		} catch (e) {
			if (axios.isAxiosError(e)) {
				const { response } = e as AxiosError<IAddressError>;
				return fail(response?.status!, {
					address: {
						message: response?.data.message,
						errors: response?.data.errors,
						data: {
							street_address: form.get('street_address'),
							city: form.get('city'),
							state: form.get('state'),
							country: form.get('country'),
							postal_code: form.get('postal_code')
						} as {
							street_address: string;
							city: string;
							state: string;
							country: string;
							postal_code: string;
						}
					}
				});
			}
			throw e;
		}
	}
} satisfies Actions;
