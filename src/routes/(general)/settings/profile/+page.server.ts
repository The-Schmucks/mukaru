import { fail } from '@sveltejs/kit';
import axios, { AxiosError } from 'axios';
import type { Actions, PageServerLoad } from './$types';
import type IError from '$lib/types/shared/IError';
import type IProfile from '$lib/types/models/profile/IProfile';
import type IAddress from '$lib/types/models/address/IAddress';
import type IModel from '$lib/types/shared/IModel';
import settle from '$lib/utils/settle';

type IAddressError = IError<Omit<IAddress, keyof IModel | 'place_id'>>;

export const load = (async ({ locals }) => {
	try {
		const [profile, address] = await Promise.allSettled([
			axios.get<IProfile>(`user_profile`),
			axios.get<IAddress>(`user_address`)
		]);

		return {
			profile: settle({ object: profile, defaults: ['firstName', 'lastName', 'phoneNumber'] }),
			address: settle({
				object: address,
				defaults: ['city', 'country', 'postal_code', 'state', 'street_address']
			})
		} satisfies {
			profile: IProfile;
			address: Omit<IAddress, keyof IModel | 'place_id'>;
		};
	} catch (error) {
		return {
			profile: {
				firstName: '',
				lastName: '',
				phoneNumber: ''
			},
			address: {
				city: '',
				country: '',
				postal_code: '',
				state: '',
				street_address: ''
			}
		} satisfies {
			profile: IProfile;
			address: Omit<IAddress, keyof IModel | 'place_id'>;
		};
	}
}) satisfies PageServerLoad;

export const actions = {
	info: async (event) => {
		const form = await event.request.formData();

		try {
			const result = await axios.post<IProfile>(`user_profile`, {
				firstName: form.get('firstName'),
				lastName: form.get('lastName'),
				phoneNumber: form.get('phoneNumber')
			});
			return { success: true };
		} catch (e) {
			if (axios.isAxiosError(e)) {
				const { response } = e as AxiosError<IError<IProfile>>;
				return fail(response?.status!, {
					profile: {
						message: response?.data.message,
						errors: response?.data.errors,
						data: {
							firstName: form.get('firstName'),
							lastName: form.get('lastName'),
							phoneNumber: form.get('phoneNumber')
						} as {
							firstName: string;
							lastName: string;
							phoneNumber: string;
						}
					}
				});
			}
			throw e;
		}
	},
	address: async (event) => {
		const form = await event.request.formData();

		try {
			const result = await axios.post<Omit<IAddress, keyof IModel | 'place_id'>>(`user_address`, {
				street_address: form.get('street_address'),
				city: form.get('city'),
				state: form.get('state'),
				country: form.get('country'),
				postal_code: form.get('postal_code'),
				place_id: form.get('place_id')
			});
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
