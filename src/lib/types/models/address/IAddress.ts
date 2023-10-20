import type IModel from '$lib/types/shared/IModel';

export default interface IAddress extends IModel {
	place_id: string;
	street_address: string;
	city: string;
	state: string;
	country: string;
	postal_code: string;
}
