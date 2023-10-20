import type IModel from '../../shared/IModel';
import type IPermission from '../permission/IPermission';
import type IUser from '../user/IUser';

export default interface IRole extends IModel {
	team_id: string;
	name: string;
	users?: IUser[];
	permissions?: IPermission[];
}
