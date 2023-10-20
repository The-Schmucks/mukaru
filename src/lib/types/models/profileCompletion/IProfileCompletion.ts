import type IModel from '$lib/types/shared/IModel';
import type IUser from '../user/IUser';

export default interface IProfileCompletion extends IModel {
	user_id: string;
	firstName: boolean;
	lastName: boolean;
	avatar: boolean;
	address: boolean;
	phoneNumber: boolean;
	progress: number;
	user?: IUser;
}
