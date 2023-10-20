import type IModel from '../../shared/IModel';
import type IImage from '../images/IImage';
import type IPermission from '../permission/IPermission';
import type IProfile from '../profile/IProfile';
import type IProfileCompletion from '../profileCompletion/IProfileCompletion';
import type IRole from '../role/IRole';
import type ITeam from '../team/ITeam';

export default interface IUser extends IModel {
	email: string;
	password: string;
	roles?: IRole[];
	permissions?: IPermission[];
	teams?: ITeam[];
	recentTeam?: ITeam;
	profileCompletion?: IProfileCompletion;
	avatar?: IImage;
	profile?: IProfile;
}
