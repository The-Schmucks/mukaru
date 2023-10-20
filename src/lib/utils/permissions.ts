type IUser = App.Locals['user'];

const is = (role: string, user: IUser) => {
	if (!user) return false;

	return (
		user.roles?.some((r) => {
			return r.name === role || r.name === 'super-admin';
		}) ?? false
	);
};

const isnot = (role: string, user: IUser) => {
	if (!user) return false;

	return !is(role, user);
};

const can = (permission: string, user: IUser) => {
	if (!user) return false;

	if (is('super-admin', user)) return true;

	return (
		user.roles?.some((role) => {
			return role?.permissions?.some((perm) => permission.includes(perm.name));
		}) ?? false
	);
};

const cannot = (permission: string, user: IUser) => {
	if (!user) return false;

	return !can(permission, user);
};

export { is, isnot, can, cannot };
