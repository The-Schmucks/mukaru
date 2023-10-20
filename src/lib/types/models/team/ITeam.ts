import type IModel from '../../shared/IModel';
import type IUser from '../user/IUser';

export default interface ITeam extends IModel {
	name: string;
	users?: IUser[];
	recentMember?: IUser;
	properties_count?: number;
	users_count?: number;
}
