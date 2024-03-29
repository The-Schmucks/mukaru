import type IMiddleware from '$lib/types/shared/IMiddleware';
import { cannot } from '$lib/utils/permissions';
import { error } from '@sveltejs/kit';

const ensureUserIsStaff: IMiddleware = ({ event: { route, locals, url }, abort: abort }) => {
	if (locals.user) {
		if (route.id?.startsWith('/(management)') && cannot('staff@view', locals.user)) {
			error(403, { message: 'Unauthorized' });
		}
	}
};

export default ensureUserIsStaff;
